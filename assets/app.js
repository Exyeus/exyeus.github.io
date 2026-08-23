(function () {
  "use strict";

  const site = window.SITE_DATA;
  const blogs = window.BLOG_DATA || [];
  if (!site) throw new Error("SITE_DATA 未加载，请检查 content/site.js。 ");

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const icon = (name) => `<svg aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
  const safeIcon = (name) => ["home", "award", "note", "tool", "github", "mail", "link", "arrow", "search", "external", "calendar", "tag"].includes(name) ? name : "link";
  const isExternal = (url) => /^https?:\/\//i.test(url);

  function renderProfile() {
    const profile = site.profile;
    document.title = `${profile.name} · Personal Homepage`;
    $("#brandName").textContent = profile.name;
    $("#brandRole").textContent = profile.role;
    $("#heroEyebrow").textContent = profile.eyebrow;
    $("#heroName").textContent = profile.name;
    $("#heroIntro").textContent = profile.intro;
    $("#statusText").textContent = profile.status;

    $("#heroTags").innerHTML = profile.tags.map(tag => `<span class="hero-tag">${tag}</span>`).join("");
    $("#profileFacts").innerHTML = profile.facts.map(item => `<div><dt>${item.label}</dt><dd>${item.value}</dd></div>`).join("");
    $("#heroActions").innerHTML = profile.actions.map(action => {
      const attrs = isExternal(action.url) ? ' target="_blank" rel="noreferrer"' : "";
      return `<a class="action-button${action.primary ? " primary" : ""}" href="${action.url}"${attrs}>${icon(safeIcon(action.icon))}<span>${action.label}</span></a>`;
    }).join("");
  }

  function renderAbout() {
    $("#aboutGrid").innerHTML = site.about.map((item, index) => `
      <article class="about-card">
        <div class="card-kicker"><span>${item.kicker}</span><span>0${index + 1}</span></div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  function renderHonors() {
    $("#honorsList").innerHTML = site.honors.map(item => `
      <article class="timeline-item">
        <div class="timeline-year">${item.year}</div>
        <div class="timeline-body"><h3>${item.title}</h3><p>${item.description}</p></div>
        <span class="timeline-badge">${item.badge}</span>
      </article>
    `).join("");
  }

  function renderResources() {
    $("#resourceList").innerHTML = site.resources.map(item => {
      const attrs = isExternal(item.url) ? ' target="_blank" rel="noreferrer"' : "";
      return `<a class="resource-card" href="${item.url}"${attrs}>
        <span class="resource-icon">${icon(safeIcon(item.icon))}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="resource-bottom"><span>${item.type}</span><span>Open ${icon(isExternal(item.url) ? "external" : "arrow")}</span></div>
      </a>`;
    }).join("");
  }

  let currentCategory = "全部";
  let searchText = "";

  function blogCategories() {
    return ["全部", ...new Set(blogs.map(blog => blog.category))];
  }

  function renderBlogFilters() {
    $("#blogFilters").innerHTML = blogCategories().map(category => `
      <button class="filter-pill${category === currentCategory ? " active" : ""}" type="button" data-category="${category}">${category}</button>
    `).join("");
    $$(".filter-pill", $("#blogFilters")).forEach(button => {
      button.addEventListener("click", () => {
        currentCategory = button.dataset.category;
        renderBlogFilters();
        renderBlogs();
      });
    });
  }

  function formatDate(date) {
    const value = new Date(`${date}T00:00:00`);
    if (Number.isNaN(value.getTime())) return date;
    return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "short", day: "numeric" }).format(value);
  }

  function filteredBlogs() {
    const query = searchText.trim().toLowerCase();
    return blogs.filter(blog => {
      const matchesCategory = currentCategory === "全部" || blog.category === currentCategory;
      const haystack = [blog.title, blog.summary, blog.category, ...(blog.tags || [])].join(" ").toLowerCase();
      return matchesCategory && (!query || haystack.includes(query));
    }).sort((a, b) => b.date.localeCompare(a.date));
  }

  function renderBlogs() {
    const items = filteredBlogs();
    $("#blogList").innerHTML = items.map(blog => `
      <article class="blog-card" tabindex="0" role="button" data-file="${blog.file}" data-title="${blog.title}" data-date="${blog.date}" aria-label="阅读文章：${blog.title}">
        <div class="blog-meta"><span>${icon("calendar")}${formatDate(blog.date)}</span><span>${blog.category}</span></div>
        <h3>${blog.title}</h3>
        <p>${blog.summary}</p>
        <div class="blog-footer"><div class="blog-tags">${(blog.tags || []).map(tag => `<span>#${tag}</span>`).join("")}</div><span class="blog-open">${icon("arrow")}</span></div>
      </article>
    `).join("");
    $("#blogEmpty").hidden = items.length !== 0;

    $$(".blog-card", $("#blogList")).forEach(card => {
      const open = () => openArticle(card.dataset.file, card.dataset.title, card.dataset.date);
      card.addEventListener("click", open);
      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      });
    });
  }

  async function openArticle(file, title, date) {
    const dialog = $("#articleDialog");
    const content = $("#articleContent");
    content.innerHTML = `<h1>${title}</h1><p class="markdown-byline">${formatDate(date)}</p><p>正在读取文章…</p>`;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    try {
      const response = await fetch(file, { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const markdown = await response.text();
      content.innerHTML = window.renderMarkdown(markdown);
      const firstHeading = $("h1", content);
      if (firstHeading) firstHeading.insertAdjacentHTML("afterend", `<p class="markdown-byline">${formatDate(date)}</p>`);
      content.scrollTop = 0;
    } catch (error) {
      const localHint = location.protocol === "file:"
        ? "你正在直接双击 index.html。浏览器会阻止读取 Markdown 文件，请在目录中运行 python -m http.server 8000，再访问 http://localhost:8000。"
        : "请检查文章文件路径以及文件是否已经提交到仓库。";
      content.innerHTML = `<h1>${title}</h1><p class="markdown-byline">${formatDate(date)}</p><p>文章读取失败。</p><blockquote><p>${localHint}</p></blockquote><p><code>${String(error.message)}</code></p>`;
    }
  }

  function closeArticle() {
    const dialog = $("#articleDialog");
    if (dialog.open) dialog.close();
    document.body.style.overflow = "";
  }

  function setupDialog() {
    $("#dialogClose").addEventListener("click", closeArticle);
    $("#articleDialog").addEventListener("click", event => {
      if (event.target === $("#articleDialog")) closeArticle();
    });
    $("#articleDialog").addEventListener("close", () => { document.body.style.overflow = ""; });
  }

  function setupSearch() {
    $("#blogSearch").addEventListener("input", event => {
      searchText = event.target.value;
      renderBlogs();
    });
  }

  function setupNavigation() {
    const sidebar = $("#sidebar");
    const backdrop = $("#sidebarBackdrop");
    const menuButton = $("#mobileMenuButton");

    const setMenu = (open) => {
      sidebar.classList.toggle("open", open);
      backdrop.classList.toggle("show", open);
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.innerHTML = icon(open ? "close" : "menu");
    };

    menuButton.addEventListener("click", () => setMenu(!sidebar.classList.contains("open")));
    backdrop.addEventListener("click", () => setMenu(false));
    $$(".nav-link").forEach(link => link.addEventListener("click", () => setMenu(false)));

    const sections = ["home", "honors", "blogs", "resources"].map(id => document.getElementById(id));
    const links = $$(".nav-link");
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
    }, { rootMargin: "-20% 0px -60%", threshold: [0.05, 0.2, 0.5] });
    sections.forEach(section => observer.observe(section));
  }

  function init() {
    renderProfile();
    renderAbout();
    renderHonors();
    renderResources();
    renderBlogFilters();
    renderBlogs();
    setupSearch();
    setupDialog();
    setupNavigation();
    $("#footerText").textContent = site.footer;
  }

  init();
})();
