/* A deliberately small Markdown renderer for local, trusted article files. */
(function () {
  "use strict";

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function inline(text) {
    let value = escapeHtml(text);
    value = value.replace(/`([^`]+)`/g, "<code>$1</code>");
    value = value.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    value = value.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    value = value.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
    return value;
  }

  function renderMarkdown(source) {
    const codeBlocks = [];
    let markdown = String(source).replace(/```([^\n]*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const index = codeBlocks.length;
      codeBlocks.push(`<pre><code data-language="${escapeHtml(lang.trim())}">${escapeHtml(code.replace(/\n$/, ""))}</code></pre>`);
      return `\n@@CODEBLOCK_${index}@@\n`;
    });

    const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
    const output = [];
    let paragraph = [];
    let listType = null;
    let listItems = [];
    let quoteLines = [];

    const flushParagraph = () => {
      if (!paragraph.length) return;
      output.push(`<p>${inline(paragraph.join(" "))}</p>`);
      paragraph = [];
    };

    const flushList = () => {
      if (!listType) return;
      output.push(`<${listType}>${listItems.map(item => `<li>${inline(item)}</li>`).join("")}</${listType}>`);
      listType = null;
      listItems = [];
    };

    const flushQuote = () => {
      if (!quoteLines.length) return;
      output.push(`<blockquote><p>${inline(quoteLines.join(" "))}</p></blockquote>`);
      quoteLines = [];
    };

    const flushAll = () => {
      flushParagraph();
      flushList();
      flushQuote();
    };

    for (const rawLine of lines) {
      const line = rawLine.trimEnd();
      const trimmed = line.trim();

      if (/^@@CODEBLOCK_\d+@@$/.test(trimmed)) {
        flushAll();
        const index = Number(trimmed.match(/\d+/)[0]);
        output.push(codeBlocks[index]);
        continue;
      }

      if (!trimmed) {
        flushAll();
        continue;
      }

      const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
      if (heading) {
        flushAll();
        const level = heading[1].length;
        output.push(`<h${level}>${inline(heading[2])}</h${level}>`);
        continue;
      }

      if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
        flushAll();
        output.push("<hr>");
        continue;
      }

      const unordered = trimmed.match(/^[-*+]\s+(.+)$/);
      const ordered = trimmed.match(/^\d+[.)]\s+(.+)$/);
      if (unordered || ordered) {
        flushParagraph();
        flushQuote();
        const nextType = unordered ? "ul" : "ol";
        if (listType && listType !== nextType) flushList();
        listType = nextType;
        listItems.push((unordered || ordered)[1]);
        continue;
      }

      const quote = trimmed.match(/^>\s?(.*)$/);
      if (quote) {
        flushParagraph();
        flushList();
        quoteLines.push(quote[1]);
        continue;
      }

      if (listType) flushList();
      if (quoteLines.length) flushQuote();
      paragraph.push(trimmed);
    }

    flushAll();
    return output.join("\n");
  }

  window.renderMarkdown = renderMarkdown;
})();
