# T_IM Personal Homepage

一个完全静态、零构建的 GitHub 个人主页。它只使用 HTML、CSS 和原生 JavaScript，不需要 Node.js、npm、pnpm、打包器或 GitHub Actions。

## 目录结构

```text
.
├── index.html                 # 页面结构与图标
├── .nojekyll                  # 让 GitHub Pages 原样发布静态文件
├── assets/
│   ├── styles.css             # 全部视觉样式
│   ├── app.js                 # 页面渲染、搜索、导航和文章弹窗
│   ├── markdown.js            # 内置的轻量 Markdown 渲染器
│   └── favicon.svg
└── content/
    ├── site.js                # 个人信息、荣誉、关于我、资源工具
    ├── blogs.js               # 博客元数据目录
    └── blogs/*.md             # 博客正文
```

## 本地预览

Markdown 文件通过浏览器 `fetch` 读取，因此不要直接双击 `index.html`。在项目目录执行：

```bash
python -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

Python 3 通常已经预装在 Linux 与多数开发环境中。也可以使用 VS Code 的 Live Server 扩展。

## 修改个人信息

打开 `content/site.js`。其中所有内容均为普通 JavaScript 对象：

- `profile`：姓名、介绍、标签、按钮和基本信息；
- `about`：关于我的主题卡片；
- `honors`：荣誉、竞赛、证书和阶段性成果；
- `resources`：项目、工具和资源链接；
- `footer`：页脚文字。

复制数组中的一个 `{ ... }` 对象即可增加条目，删除对象即可移除条目。注意相邻对象之间要保留英文逗号。

## 新增博客

### 第一步：创建 Markdown 文件

在 `content/blogs/` 中创建文件，例如：

```text
content/blogs/my-new-post.md
```

正文可以使用标题、段落、粗体、斜体、链接、引用、列表、行内代码和代码块。

### 第二步：登记文章

在 `content/blogs.js` 的数组中增加：

```js
{
  title: "文章标题",
  date: "2026-08-05",
  category: "Database",
  tags: ["Tag A", "Tag B"],
  summary: "显示在首页卡片中的摘要。",
  file: "content/blogs/my-new-post.md"
}
```

页面会自动按日期倒序排列，并自动生成分类筛选按钮与搜索索引。

## 部署到 GitHub Pages

### 用户主页仓库

1. 创建名为 `你的用户名.github.io` 的公开仓库。
2. 把本目录内的全部文件放在仓库根目录并推送到 `main` 分支。
3. 打开仓库 `Settings → Pages`。
4. 在 `Build and deployment` 中选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/ (root)`，然后保存。

访问地址通常为：

```text
https://你的用户名.github.io/
```

### 普通项目仓库

同样选择 `Deploy from a branch`。访问地址通常为：

```text
https://你的用户名.github.io/仓库名/
```

代码中全部使用相对路径，因此两种部署方式都可正常工作。

## 图标与设计

图标使用内嵌 SVG，采用 Fluent 2 风格的圆角、轻量线框视觉语言，不依赖外部 CDN。这样可以避免网络、版本和构建工具导致的图标加载失败。

主题颜色集中定义在 `assets/styles.css` 顶部的 `:root` 中。修改 `--accent`、`--bg`、`--text` 等变量即可整体换色。

## 常见问题

### 页面能打开，但博客点击后读取失败

不要使用 `file://` 直接打开；请启动本地 HTTP 服务。部署到 GitHub Pages 后不会有这个问题。

### 修改后 GitHub Pages 没更新

确认 Pages 的发布分支为当前提交所在的分支，并等待 GitHub 完成静态发布。这个项目没有 workflow 文件，不需要 OAuth `workflow` scope。

### 想删除某个模块

可以先删除 `content/site.js` 中对应数组的全部条目。需要彻底删除模块时，再从 `index.html` 删除对应 `<section>` 和导航链接。

## License

你可以自由修改并作为自己的个人主页使用。示例个人信息、文章与链接请在公开部署前按实际情况检查和替换。
