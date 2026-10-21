(function () {
  "use strict";
  const site = window.SITE_DATA || {};
  const blogs = window.BLOG_DATA || [];
  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const external = url => /^https?:\/\//i.test(url);
  const safeUrl = value => {
    if (typeof value !== "string" || !value.trim()) return "";
    try {
      const url = new URL(value, location.href);
      if (["https:", "http:", "mailto:"].includes(url.protocol)) return value;
      // Relative links remain usable when previewing the static pages locally.
      if (url.protocol === "file:" && !/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value)) return value;
      return "";
    } catch { return ""; }
  };
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
  const outward = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>';
  const tags = items => (items || []).map(tag => '<span class="tag">' + esc(tag) + '</span>').join("");
  const linkAttrs = url => external(url) ? ' target="_blank" rel="noopener noreferrer"' : "";
  const sortedBlogs = () => [...blogs].sort((a, b) => b.date.localeCompare(a.date));
  const slugOf = blog => blog.slug || blog.file.split("/").pop().replace(/\.md$/i, "");
  const dateLabel = date => {
    const d = new Date(date + "T00:00:00");
    return Number.isNaN(d.getTime()) ? date : new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric" }).format(d);
  };
  function articleUrl(blog, filters) {
    const params = new URLSearchParams({ post: slugOf(blog) });
    if (filters?.category && filters.category !== "全部") params.set("category", filters.category);
    if (filters?.q) params.set("q", filters.q);
    return "article.html?" + params;
  }
  function renderProfile() {
    const p = site.profile;
    if (!p || !$("#heroName")) return;
    $("#heroName").textContent = p.displayName || p.name;
    $("#heroRomanName").textContent = (p.romanName || "") + " / " + p.name;
    $("#heroEyebrow").textContent = p.eyebrow;
    $("#heroIntro").textContent = p.intro;
    $("#profileFacts").innerHTML = (p.facts || []).map(x => '<div><dt>' + esc(x.label) + '</dt><dd>' + esc(x.value) + '</dd></div>').join("");
    $("#heroActions").innerHTML = (p.actions || []).map(x => {
      const url = safeUrl(x.url);
      return url ? '<a class="button ' + (x.primary ? 'button-primary' : 'button-quiet') + '" href="' + esc(url) + '"' + linkAttrs(url) + '>' + esc(x.label) + (external(url) ? outward : arrow) + '</a>' : "";
    }).join("");
    const groups = p.tagGroups || [{ label: "兴趣", tags: p.tags || [] }];
    $("#interestGroups").innerHTML = groups.map(x => '<div class="interest-group"><h3>' + esc(x.label) + '</h3><div class="tags">' + tags(x.tags) + '</div></div>').join("");
  }
  function renderAbout() {
    if (!$("#aboutGrid")) return;
    $("#aboutGrid").innerHTML = (site.about || []).map((x, i) => '<article class="focus-item"><div class="item-kicker"><span class="item-number">0' + (i + 1) + '</span>' + esc(x.kicker) + '</div><h3>' + esc(x.title) + '</h3><p>' + esc(x.text) + '</p></article>').join("");
  }
  function renderFeatured() {
    if (!$("#featuredList")) return;
    $("#featuredList").innerHTML = (site.featured || []).map((x, i) => {
      const url = safeUrl(x.url);
      return '<article class="work-item"><div class="work-index">0' + (i + 1) + '</div><div class="work-body"><p class="item-kicker">' + esc(x.kicker) + '</p><h3>' + (url ? '<a href="' + esc(url) + '"' + linkAttrs(url) + '>' + esc(x.title) + arrow + '</a>' : esc(x.title)) + '</h3><p>' + esc(x.description) + '</p></div><div class="tags work-tags">' + tags(x.tags) + '</div></article>';
    }).join("");
  }
  function renderProjects() {
    if (!$("#projectsList")) return;
    $("#projectsList").innerHTML = (site.projects || []).map((x, i) => '<article class="timeline-item" id="' + esc(x.id || 'experience-' + (i + 1)) + '"><div class="timeline-year">' + esc(x.year) + '</div><div class="timeline-body"><h2>' + esc(x.title) + '</h2>' + (x.description ? '<p>' + esc(x.description) + '</p>' : '') + '<span class="badge">' + esc(x.badge) + '</span></div></article>').join("");
  }
  function renderResources() {
    const list = $("#resourceList");
    if (!list) return;
    const items = site.resources || [];
    let category = "全部";
    const filters = $("#resourceFilters");
    const categories = ["全部", ...new Set(items.map(x => x.category || x.type).filter(Boolean))];
    filters.innerHTML = categories.map(name => '<button type="button" class="filter-pill" data-category="' + esc(name) + '" aria-pressed="' + (name === category) + '">' + esc(name) + '</button>').join("");
    const render = () => {
      list.innerHTML = items.filter(x => category === "全部" || (x.category || x.type) === category).map((x, i) => {
        const url = safeUrl(x.url);
        return '<article class="resource-card" id="' + esc(x.id || 'tool-' + (i + 1)) + '"><div class="resource-top"><span class="resource-monogram" aria-hidden="true">' + (x.category === "Obsidian" ? "O" : x.id === "chatgpt-reading-progress" ? "C" : "W") + '<span>·</span></span><span class="resource-type">' + esc(x.category || x.type) + '</span>' + (x.status ? '<span class="resource-status"><i aria-hidden="true"></i>' + esc(x.status) + '</span>' : '') + '</div><h2>' + esc(x.title) + '</h2><p class="resource-description">' + esc(x.description) + '</p><div class="tags">' + tags(x.tags) + '</div><div class="resource-bottom">' + (url ? '<a class="text-link" href="' + esc(url) + '"' + linkAttrs(url) + '>查看项目' + outward + '</a>' : '<span class="release-note">' + esc(x.note || "发布入口待补充") + '</span>') + '<span class="resource-platform">' + esc(x.type) + '</span></div></article>';
      }).join("");
      filters.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.category === category)));
      $("#resourceCount").textContent = list.children.length + " 个工具";
    };
    filters.addEventListener("click", e => {
      const b = e.target.closest("button[data-category]");
      if (b) { category = b.dataset.category; render(); }
    });
    render();
  }
  function blogRow(blog, compact = false, filters) {
    const h = compact ? "3" : "2";
    return '<article class="blog-row' + (compact ? ' compact' : '') + '"><div class="blog-date"><time datetime="' + esc(blog.date) + '">' + esc(dateLabel(blog.date)) + '</time><span>' + esc(blog.category) + '</span></div><div class="blog-body"><h' + h + '><a href="' + esc(articleUrl(blog, filters)) + '">' + esc(blog.title) + arrow + '</a></h' + h + '>' + (!compact ? '<p>' + esc(blog.summary) + '</p><div class="tags">' + tags(blog.tags) + '</div>' : '') + '</div></article>';
  }
  function renderLatest() {
    if ($("#latestPosts")) $("#latestPosts").innerHTML = sortedBlogs().slice(0, 3).map(x => blogRow(x, true)).join("");
  }
  function setupBlogIndex() {
    if (!$("#blogList")) return;
    const params = new URLSearchParams(location.search);
    const categories = ["全部", ...new Set([...(window.BLOG_SECTIONS || []), ...blogs.map(x => x.category)].filter(Boolean))];
    let category = params.get("category") || "全部";
    if (!categories.includes(category)) category = "全部";
    let q = params.get("q") || "";
    $("#blogSearch").value = q;
    $("#blogFilters").innerHTML = categories.map(name => '<button type="button" class="filter-pill" data-category="' + esc(name) + '" aria-pressed="' + (name === category) + '">' + esc(name) + '</button>').join("");
    const render = (updateUrl = true) => {
      const term = q.trim().toLocaleLowerCase();
      const items = sortedBlogs().filter(x => (category === "全部" || x.category === category) && [x.title, x.summary, x.category, ...(x.tags || [])].join(" ").toLocaleLowerCase().includes(term));
      $("#blogList").innerHTML = items.map(x => blogRow(x, false, { category, q })).join("");
      $("#blogEmpty").hidden = items.length > 0;
      $("#blogCount").textContent = items.length + " 篇文章";
      $("#blogFilters").querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.category === category)));
      if (updateUrl) {
        const url = new URL(location.href);
        if (category !== "全部") url.searchParams.set("category", category); else url.searchParams.delete("category");
        if (q) url.searchParams.set("q", q); else url.searchParams.delete("q");
        history.replaceState(null, "", url);
      }
    };
    $("#blogSearch").addEventListener("input", e => { q = e.target.value; render(); });
    $("#blogFilters").addEventListener("click", e => {
      const b = e.target.closest("button[data-category]");
      if (b) { category = b.dataset.category; render(); }
    });
    $("#clearBlogFilters").addEventListener("click", () => { q = ""; category = "全部"; $("#blogSearch").value = ""; render(); $("#blogSearch").focus(); });
    window.addEventListener("pageshow", () => {
      const p = new URLSearchParams(location.search);
      q = p.get("q") || "";
      category = categories.includes(p.get("category")) ? p.get("category") : "全部";
      $("#blogSearch").value = q;
      render(false);
    });
    render(false);
  }
  function setupTheme() {
    const button = $("#themeToggle");
    if (!button) return;
    const update = () => {
      const dark = document.documentElement.dataset.theme === "dark";
      button.setAttribute("aria-pressed", String(dark));
      button.setAttribute("aria-label", dark ? "切换为浅色主题" : "切换为深色主题");
      button.title = dark ? "切换为浅色主题" : "切换为深色主题";
      const meta = $('meta[name="theme-color"]');
      if (meta) meta.content = dark ? "#19211e" : "#fafbf8";
    };
    button.addEventListener("click", () => {
      const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = theme;
      try { localStorage.setItem("tim-homepage-theme", theme); } catch { /* Works without storage. */ }
      update();
    });
    update();
  }
  renderProfile();
  renderAbout();
  renderFeatured();
  renderProjects();
  renderResources();
  renderLatest();
  setupBlogIndex();
  setupTheme();
})();
