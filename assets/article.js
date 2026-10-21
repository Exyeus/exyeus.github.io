/* A real, refreshable article URL; no dialog and no arbitrary file fetches. */
(function () {
  "use strict";
  if (document.body.dataset.page !== "article") return;

  const $ = selector => document.querySelector(selector);
  const params = new URLSearchParams(location.search);
  const catalogue = Array.isArray(window.BLOG_DATA) ? window.BLOG_DATA : [];
  const slugFor = post => post.slug || post.file.split("/").pop().replace(/\.md$/i, "");
  const selected = params.get("post") || "";
  const post = catalogue.find(item => slugFor(item) === selected);
  const state = $("#articleState");
  const body = $("#articleBody");
  const copyButton = $("#copyArticleLink");
  const sourceLink = $("#articleSource");
  let canonicalUrl = "";
  let tocObserver;

  const backUrl = new URL("blogs.html", location.href);
  for (const key of ["category", "q"]) {
    if (params.has(key)) backUrl.searchParams.set(key, params.get(key));
  }
  $("#articleBack").href = backUrl.pathname + backUrl.search;

  function setMeta(key, value, property = false) {
    const attribute = property ? "property" : "name";
    let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attribute, key);
      document.head.append(element);
    }
    element.content = value;
  }

  function setStatus(text, kind) {
    state.hidden = false;
    state.dataset.state = kind;
    state.textContent = text;
  }

  function dateLabel(date) {
    const parsed = new Date(`${date}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? date
      : new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric" }).format(parsed);
  }

  function readingMinutes(text) {
    const chinese = (text.match(/[\u3400-\u9fff]/g) || []).length;
    const words = text.replace(/[\u3400-\u9fff]/g, " ").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(chinese / 450 + words / 220));
  }

  function updateMetadata() {
    const name = window.SITE_DATA?.profile?.name || "T_IM";
    document.title = `${post.title} · ${name}`;
    setMeta("description", post.summary || post.title);
    setMeta("og:title", document.title, true);
    setMeta("og:description", post.summary || post.title, true);
    setMeta("og:type", "article", true);
    setMeta("article:published_time", post.date, true);
    const url = new URL("article.html", location.href);
    url.searchParams.set("post", slugFor(post));
    canonicalUrl = url.href;
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;
    setMeta("og:url", canonicalUrl, true);
  }

  function jumpToHash() {
    if (!location.hash) return;
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target || !body.contains(target)) return;
    // Fetch and rendering are async; wait for layout before locating the section.
    requestAnimationFrame(() => target.scrollIntoView({ block: "start", behavior: "instant" }));
  }

  function createToc() {
    const headings = [...body.querySelectorAll("h1,h2,h3,h4,h5,h6")];
    const used = new Set();
    const toc = $("#articleToc");
    toc.replaceChildren();
    tocObserver?.disconnect();
    // The catalogue title is the page's single h1. Body h1s become sections.
    for (let i = 0; i < headings.length; i++) {
      if (headings[i].tagName === "H1") {
        const section = document.createElement("h2");
        section.replaceChildren(...headings[i].childNodes);
        headings[i].replaceWith(section);
        headings[i] = section;
      }
    }
    const minimumLevel = Math.min(...headings.map(heading => Number(heading.tagName.slice(1))), 6);
    const links = [];
    for (const heading of headings) {
      const text = heading.textContent.trim();
      const base = "section-" + (text.normalize("NFKC").toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s+/g, "-").slice(0, 80) || "heading");
      let id = base;
      let suffix = 2;
      while (used.has(id) || document.getElementById(id)) id = `${base}-${suffix++}`;
      used.add(id);
      heading.id = id;
      const link = document.createElement("a");
      link.href = `#${encodeURIComponent(id)}`;
      link.textContent = text;
      link.dataset.level = String(Number(heading.tagName.slice(1)) - minimumLevel);
      toc.append(link);
      links.push(link);
      const anchor = document.createElement("a");
      anchor.className = "heading-anchor";
      anchor.href = link.href;
      anchor.setAttribute("aria-label", `链接到：${text}`);
      anchor.textContent = "#";
      heading.append(anchor);
    }
    // The side panel also holds article actions, so an empty TOC must not
    // hide the permanent-link and source controls.
    $("#tocPanel").hidden = false;
    toc.closest("nav").hidden = headings.length === 0;
    if (headings.length && "IntersectionObserver" in window) {
      const positions = new Map();
      tocObserver = new IntersectionObserver(entries => {
        for (const entry of entries) positions.set(entry.target, entry.isIntersecting);
        const active = headings.find(heading => positions.get(heading));
        if (!active) return;
        for (let i = 0; i < links.length; i++) {
          const current = headings[i] === active;
          links[i].classList.toggle("active", current);
          if (current) links[i].setAttribute("aria-current", "location");
          else links[i].removeAttribute("aria-current");
        }
      }, { rootMargin: "-90px 0px -60% 0px" });
      headings.forEach(heading => tocObserver.observe(heading));
    }
  }

  async function loadArticle() {
    setStatus("正在读取文章…", "loading");
    $("#articleHeader").hidden = true;
    $("#tocPanel").hidden = true;
    sourceLink.hidden = true;
    copyButton.hidden = true;
    copyButton.disabled = true;
    body.replaceChildren();
    try {
      // Only a path already present in BLOG_DATA is eligible for a request.
      const response = await fetch(post.file);
      if (!response.ok) throw new Error("article-unavailable");
      const markdown = await response.text();
      if (typeof window.renderMarkdown !== "function") throw new Error("renderer-unavailable");
      body.innerHTML = window.renderMarkdown(markdown);
      const first = body.firstElementChild;
      if (first?.tagName === "H1" && first.textContent.trim() === post.title.trim()) first.remove();
      $("#articleTitle").textContent = post.title;
      $("#articleCategory").textContent = post.category || "文章";
      $("#articleDate").textContent = dateLabel(post.date);
      $("#articleDate").setAttribute("datetime", post.date);
      $("#articleReadingTime").textContent = `约 ${readingMinutes(markdown)} 分钟`;
      $("#articleSummary").textContent = post.summary || "";
      $("#articleSummary").hidden = !post.summary;
      $("#articleTags").replaceChildren(...(post.tags || []).map(tag => {
        const element = document.createElement("span");
        element.className = "tag";
        element.textContent = tag;
        return element;
      }));
      sourceLink.href = post.file;
      sourceLink.hidden = false;
      copyButton.hidden = false;
      copyButton.disabled = false;
      $("#articleHeader").hidden = false;
      state.hidden = true;
      updateMetadata();
      createToc();
      jumpToHash();
    } catch {
      setStatus("文章暂时无法读取，请稍后重试，或返回文章列表。", "error");
      const retry = document.createElement("button");
      retry.type = "button";
      retry.className = "text-link retry-button";
      retry.textContent = "重新加载";
      retry.addEventListener("click", loadArticle);
      state.append(document.createTextNode(" "), retry);
    }
  }

  copyButton.addEventListener("click", async () => {
    if (!canonicalUrl) return;
    const text = canonicalUrl + location.hash;
    const status = $("#copyStatus");
    $("#copyLinkFallback")?.remove();
    try {
      if (!navigator.clipboard?.writeText) throw new Error("clipboard-unavailable");
      await navigator.clipboard.writeText(text);
      status.textContent = "文章链接已复制";
    } catch {
      status.textContent = "无法自动复制，请复制下方链接：";
      const input = document.createElement("input");
      input.id = "copyLinkFallback";
      input.className = "copy-link-fallback";
      input.type = "url";
      input.readOnly = true;
      input.value = text;
      input.setAttribute("aria-label", "文章永久链接");
      status.insertAdjacentElement("afterend", input);
      input.focus();
      input.select();
    }
  });

  window.addEventListener("hashchange", jumpToHash);
  window.addEventListener("pagehide", () => tocObserver?.disconnect());
  if (post) loadArticle();
  else {
    document.title = "未找到文章 · T_IM";
    setStatus(selected ? "没有找到这篇文章，请返回文章列表选择。" : "请选择一篇文章，或返回文章列表继续浏览。", "not-found");
    $("#articleHeader").hidden = true;
    $("#tocPanel").hidden = true;
    sourceLink.hidden = true;
    copyButton.disabled = true;
  }
})();
