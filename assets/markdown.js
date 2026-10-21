/* Small, dependency-free Markdown for the site's own articles.
 * Supported: headings, paragraphs, fences, lists (including nested lists),
 * blockquotes, tables, links, images, emphasis and inline code.
 * Raw HTML is always escaped. This is not a full CommonMark implementation.
 */
(function () {
  "use strict";

  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);

  function safeUrl(value, image = false) {
    const url = value.trim();
    if (!url || /[\u0000-\u0020\u007f\\]/.test(url) || url.startsWith("//")) return null;
    try {
      const parsed = new URL(url, "https://markdown.invalid/");
      if (!["https:", "http:", ...(image ? [] : ["mailto:"])].includes(parsed.protocol)) return null;
      return url;
    } catch { return null; }
  }

  // Find a balanced closing delimiter, respecting escaped characters.
  function closing(text, start, open, close) {
    let depth = 1;
    for (let i = start + 1; i < text.length; i++) {
      if (text[i] === "\\") { i++; continue; }
      if (text[i] === open) depth++;
      if (text[i] === close && --depth === 0) return i;
    }
    return -1;
  }

  function inline(text, depth = 0) {
    if (depth > 12) return escapeHtml(text);
    let result = "";
    for (let i = 0; i < text.length;) {
      const rest = text.slice(i);
      if (text[i] === "\\" && /[\\`*{}\[\]()#+.!_>~|]/.test(text[i + 1] || "")) {
        result += escapeHtml(text[i + 1]); i += 2; continue;
      }
      if (text[i] === "`") {
        const marker = rest.match(/^`+/)[0];
        const end = text.indexOf(marker, i + marker.length);
        if (end !== -1) {
          let code = text.slice(i + marker.length, end).replace(/\n/g, " ");
          if (code.startsWith(" ") && code.endsWith(" ") && code.trim()) code = code.slice(1, -1);
          result += `<code>${escapeHtml(code)}</code>`;
          i = end + marker.length; continue;
        }
      }
      const isImage = rest.startsWith("![");
      if (text[i] === "[" || isImage) {
        const start = i + (isImage ? 1 : 0);
        const labelEnd = closing(text, start, "[", "]");
        const destinationEnd = labelEnd >= 0 && text[labelEnd + 1] === "("
          ? closing(text, labelEnd + 1, "(", ")") : -1;
        if (destinationEnd !== -1) {
          const label = text.slice(start + 1, labelEnd);
          const raw = text.slice(labelEnd + 2, destinationEnd).trim();
          const href = safeUrl(raw.replace(/^<(.+)>$/, "$1"), isImage);
          if (href) {
            if (isImage) result += `<img src="${escapeHtml(href)}" alt="${escapeHtml(label)}" loading="lazy" decoding="async">`;
            else result += `<a href="${escapeHtml(href)}"${/^https?:\/\//i.test(href) ? ' target="_blank" rel="noopener noreferrer"' : ""}>${inline(label, depth + 1)}</a>`;
          } else result += escapeHtml(label);
          i = destinationEnd + 1; continue;
        }
      }
      let matched = false;
      for (const [marker, tag] of [["**", "strong"], ["__", "strong"], ["~~", "del"], ["*", "em"], ["_", "em"]]) {
        if (!rest.startsWith(marker)) continue;
        // Underscores inside identifiers should remain literal.
        if (marker.includes("_") && /[\p{L}\p{N}]/u.test(text[i - 1] || "")) continue;
        const end = text.indexOf(marker, i + marker.length);
        const inner = end >= 0 ? text.slice(i + marker.length, end) : "";
        if (!inner || /^\s|\s$/.test(inner)) continue;
        result += `<${tag}>${inline(inner, depth + 1)}</${tag}>`;
        i = end + marker.length; matched = true; break;
      }
      if (matched) continue;
      result += escapeHtml(text[i]); i++;
    }
    return result;
  }

  const listMatch = line => line.match(/^( *)([-+*]|\d+[.)])\s+(.*)$/);
  const isRule = line => /^ {0,3}(?:(?:\*\s*){3,}|(?:-\s*){3,}|(?:_\s*){3,})$/.test(line);
  const isTableDivider = line => /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
  const cells = line => line.trim().replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/).map(cell => cell.trim());

  function blocks(lines, depth = 0) {
    if (depth > 24) return `<p>${escapeHtml(lines.join("\n"))}</p>`;
    const output = [];
    const startsBlock = line => /^ {0,3}(?:#{1,6}(?:\s|$)|`{3,}|~{3,}|>)/.test(line) || !!listMatch(line) || isRule(line);
    for (let i = 0; i < lines.length;) {
      const line = lines[i];
      if (!line.trim()) { i++; continue; }
      const fence = line.match(/^ {0,3}(`{3,}|~{3,})\s*([^\s]*)[^\n]*$/);
      if (fence) {
        const code = [];
        const close = new RegExp(`^ {0,3}${fence[1][0]}{${fence[1].length},}\\s*$`);
        for (i++; i < lines.length && !close.test(lines[i]); i++) code.push(lines[i]);
        if (i < lines.length) i++;
        output.push(`<pre><code${fence[2] ? ` data-language="${escapeHtml(fence[2])}"` : ""}>${escapeHtml(code.join("\n"))}</code></pre>`);
        continue;
      }
      const heading = line.match(/^ {0,3}(#{1,6})(?:\s+(.*?)\s*|\s*)$/);
      if (heading) {
        const level = heading[1].length;
        output.push(`<h${level}>${inline((heading[2] || "").replace(/\s+#+\s*$/, ""))}</h${level}>`); i++; continue;
      }
      if (isRule(line)) { output.push("<hr>"); i++; continue; }
      if (/^ {0,3}>/.test(line)) {
        const quote = [];
        while (i < lines.length && /^ {0,3}>/.test(lines[i])) quote.push(lines[i++].replace(/^ {0,3}> ?/, ""));
        output.push(`<blockquote>${blocks(quote, depth + 1)}</blockquote>`); continue;
      }
      const first = listMatch(line);
      if (first) {
        const indent = first[1].length;
        const ordered = /^\d/.test(first[2]);
        const type = ordered ? "ol" : "ul";
        const start = ordered ? parseInt(first[2], 10) : 1;
        const items = [];
        while (i < lines.length) {
          const current = listMatch(lines[i]);
          if (!current || current[1].length !== indent || /^\d/.test(current[2]) !== ordered) break;
          const contentIndent = lines[i].indexOf(current[3], indent + current[2].length);
          const item = [current[3]]; i++;
          while (i < lines.length) {
            const next = listMatch(lines[i]);
            if (next && next[1].length <= indent) break;
            if (!lines[i].trim()) {
              const following = lines[i + 1];
              if (following && following.match(/^ */)[0].length > indent) { item.push(""); i++; continue; }
              break;
            }
            const spaces = lines[i].match(/^ */)[0].length;
            if (spaces <= indent) break;
            item.push(lines[i].slice(Math.min(contentIndent, spaces))); i++;
          }
          items.push(`<li>${blocks(item, depth + 1)}</li>`);
          while (i < lines.length && !lines[i].trim() && listMatch(lines[i + 1] || "")?.[1].length === indent) i++;
        }
        output.push(`<${type}${ordered && start !== 1 ? ` start="${start}"` : ""}>${items.join("")}</${type}>`); continue;
      }
      if (i + 1 < lines.length && line.includes("|") && isTableDivider(lines[i + 1])) {
        const headings = cells(line);
        const divider = cells(lines[i + 1]);
        const align = divider.map(cell => cell.startsWith(":") ? (cell.endsWith(":") ? "center" : "left") : (cell.endsWith(":") ? "right" : "left"));
        i += 2;
        const rows = [];
        while (i < lines.length && lines[i].trim() && lines[i].includes("|")) rows.push(cells(lines[i++]));
        output.push(`<div class="table-scroll" tabindex="0" role="region" aria-label="表格"><table><thead><tr>${headings.map((cell, col) => `<th scope="col" style="text-align:${align[col] || "left"}">${inline(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${headings.map((_, col) => `<td style="text-align:${align[col] || "left"}">${inline(row[col] || "")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`); continue;
      }
      const paragraph = [line.trimStart()]; i++;
      while (i < lines.length && lines[i].trim() && !startsBlock(lines[i])) {
        if (i + 1 < lines.length && lines[i].includes("|") && isTableDivider(lines[i + 1])) break;
        paragraph.push(lines[i++].trimStart());
      }
      output.push(`<p>${paragraph.map((part, index) => inline(part.trimEnd()) + (index < paragraph.length - 1 ? (/ {2,}$/.test(part) ? "<br>\n" : " ") : "")).join("")}</p>`);
    }
    return output.join("\n");
  }

  window.renderMarkdown = source => blocks(String(source).replace(/\r\n?/g, "\n").replace(/\t/g, "    ").split("\n"));
})();
