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
    const brandName = $("#brandName");
    const brandRole = $("#brandRole");
    if (brandName) brandName.textContent = profile.name;
    if (brandRole) brandRole.textContent = profile.role;

    const heroName = $("#heroName");
    if (!heroName) return;
    document.title = `${profile.name} · Personal Homepage`;
    $("#heroEyebrow").textContent = profile.eyebrow;
    heroName.textContent = profile.name;
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
    if (!$("#aboutGrid")) return;
    const items = Array.isArray(site.about) ? site.about : [];
    $("#aboutGrid").innerHTML = items.map((item, index) => `
      <article class="about-card">
        <div class="card-kicker"><span>${item.kicker}</span><span>0${index + 1}</span></div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  function renderProjects() {
    if (!$("#projectsList")) return;
    const items = Array.isArray(site.projects) ? site.projects : (site.honors || []);
    $("#projectsList").innerHTML = items.map(item => `
      <article class="timeline-item">
        <div class="timeline-year">${item.year}</div>
        <div class="timeline-body"><h3>${item.title}</h3><p>${item.description}</p></div>
        <span class="timeline-badge">${item.badge}</span>
      </article>
    `).join("");
  }

  function renderResources() {
    if (!$("#resourceList")) return;
    const items = Array.isArray(site.resources) ? site.resources : [];
    $("#resourceList").innerHTML = items.map(item => {
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
  const customCategoryStorageKey = "tim-homepage-blog-custom-categories";

  function escapeHtml(value) {
    return String(value).replace(/[&<>"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);
  }

  function loadCustomCategories() {
    try {
      const value = JSON.parse(window.localStorage.getItem(customCategoryStorageKey) || "[]");
      return Array.isArray(value) ? value.filter(item => typeof item === "string" && item.trim()) : [];
    } catch {
      return [];
    }
  }

  let customCategories = loadCustomCategories();

  function saveCustomCategories() {
    try {
      window.localStorage.setItem(customCategoryStorageKey, JSON.stringify(customCategories));
    } catch {
      // 本地存储不可用时，当前页面内仍可使用新建的分区。
    }
  }

  function blogCategories() {
    const configured = Array.isArray(window.BLOG_SECTIONS) ? window.BLOG_SECTIONS : [];
    return ["全部", ...new Set([...configured, ...customCategories, ...blogs.map(blog => blog.category)].filter(Boolean))];
  }

  function renderBlogFilters() {
    if (!$("#blogFilters")) return;
    $("#blogFilters").innerHTML = blogCategories().map(category => {
      const custom = customCategories.includes(category);
      return `<span class="filter-pill-group"><button class="filter-pill${category === currentCategory ? " active" : ""}" type="button" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>${custom ? `<button class="filter-delete" type="button" data-delete-category="${escapeHtml(category)}" aria-label="删除分区 ${escapeHtml(category)}">×</button>` : ""}</span>`;
    }).join("");
    $$(".filter-pill", $("#blogFilters")).forEach(button => {
      button.addEventListener("click", () => {
        currentCategory = button.dataset.category;
        renderBlogFilters();
        renderBlogs();
      });
    });
    $$(".filter-delete", $("#blogFilters")).forEach(button => {
      button.addEventListener("click", () => {
        const category = button.dataset.deleteCategory;
        customCategories = customCategories.filter(item => item !== category);
        saveCustomCategories();
        if (currentCategory === category) currentCategory = "全部";
        renderBlogFilters();
        renderBlogs();
      });
    });
  }

  function setupCategoryManagement() {
    const createButton = $("#categoryCreate");
    if (!createButton) return;
    createButton.addEventListener("click", () => {
      const category = window.prompt("新分区名称（例如：技术、想法、书摘）");
      const name = category && category.trim();
      if (!name || blogCategories().includes(name)) return;
      customCategories = [...customCategories, name];
      saveCustomCategories();
      currentCategory = name;
      renderBlogFilters();
      renderBlogs();
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
    if (!$("#blogList")) return;
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
      if (firstHeading) {
        firstHeading.insertAdjacentHTML("afterend", `<p class="markdown-byline">${formatDate(date)}</p>`);
      } else {
        content.insertAdjacentHTML("afterbegin", `<h1>${title}</h1><p class="markdown-byline">${formatDate(date)}</p>`);
      }
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
    if (!$("#dialogClose")) return;
    $("#dialogClose").addEventListener("click", closeArticle);
    $("#articleDialog").addEventListener("click", event => {
      if (event.target === $("#articleDialog")) closeArticle();
    });
    $("#articleDialog").addEventListener("close", () => { document.body.style.overflow = ""; });
  }

  function setupSearch() {
    if (!$("#blogSearch")) return;
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

  }

  function init() {
    renderProfile();
    const page = document.body.dataset.page
      || ($("#aboutGrid") ? "home" : "")
      || ($("#projectsList") ? "projects" : "")
      || ($("#resourceList") ? "resources" : "")
      || ($("#blogList") ? "blogs" : "");
    if (page === "home") {
      renderAbout();
    } else if (page === "projects") {
      renderProjects();
    } else if (page === "resources") {
      renderResources();
    } else if (page === "blogs") {
      renderBlogFilters();
      renderBlogs();
      setupCategoryManagement();
      setupSearch();
      setupDialog();
    }
    setupNavigation();
    const footerText = $("#footerText");
    if (footerText && site.footer) footerText.textContent = site.footer;
  }

  init();
})();
