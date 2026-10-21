# T_IM · Personal Homepage

田家铭（T_IM）的个人主页。暖白与灰绿色主题，以个人介绍、研究兴趣、实践与文章为主，支持手机布局与手动深色主题。

## 本地预览

在仓库根目录运行 `python3 -m http.server 8000`，浏览器打开 `http://localhost:8000`。使用 VS Code Live Server 也可以。文章正文通过 `fetch` 读取，完整预览请使用 HTTP 服务，不要直接双击文章页。

本站继续使用 HTML、CSS 与原生 JavaScript，不需要 npm、构建器、第三方 CDN 或新增 GitHub Actions。保留 `.nojekyll`，现有 GitHub Pages 的分支发布方式可以继续使用。

## 页面与内容

| 路径 | 用途 |
| --- | --- |
| `index.html` | 个人介绍、分组兴趣、关注方向、精选实践、近期文章 |
| `blogs.html` | 文章列表、分类与搜索 |
| `article.html?post=<slug>` | 独立文章页、目录、章节锚点、永久链接、原始 Markdown |
| `resources.html` | 工具列表与平台筛选 |
| `projects.html` | 项目与经历 |
| `content/site.js` | 个人信息、兴趣、项目与工具数据 |
| `content/blogs.js` | 文章元数据与稳定 slug |
| `content/blogs/*.md` | Markdown 文章正文 |
| `assets/styles.css` | 颜色、字体、布局与响应式规则 |
| `assets/app.js` | 页面内容、搜索、筛选与主题 |
| `assets/article.js` | 文章加载、目录、定位、链接复制与错误处理 |
| `assets/markdown.js` | 本地轻量 Markdown 渲染器 |

### 更新个人信息

编辑 `content/site.js`：

- `profile.displayName` / `romanName` / `intro`：姓名与介绍。
- `profile.tagGroups`：研究兴趣、工具实践与生活兴趣；旧的 `tags` 字段仍兼容。
- `about`：关注方向的标题、简述。
- `featured`：首页精选实践，`url` 指向真实项目入口或本站经历锚点。
- `projects`：保留项目、竞赛与荣誉；可用 `id` 建立稳定的经历锚点。
- `resources`：工具名称、简介、平台、状态、能力标签与公开链接。

工具的 `url` 留空时显示普通项目介绍和 `note`，不会生成假的下载按钮。Obsidian Margin Comment 当前尚无经核验的公开发布地址；发布后填写该条目的 `url` 即可。ChatGPT 工具采用已存在的公开仓库名称 **Reading Progress**，以 `alias` 保留此前使用的 **Reading Process** 称呼。界面不声称任何工具已经通过商店审核。

### 新增文章

1. 在 `content/blogs/` 新建 Markdown。
2. 在 `content/blogs.js` 登记以下字段：

```js
{
  slug: "my-new-post",
  title: "文章标题",
  date: "2026-10-21",
  category: "技术",
  tags: ["Database", "Data Infra"],
  summary: "一句准确的文章摘要。",
  file: "content/blogs/my-new-post.md"
}
```

文章地址是 `article.html?post=my-new-post`。已发布的 `slug` 请保持稳定，修改标题不需要修改 slug。渲染器根据目录中登记的路径读取正文，不允许 URL 参数直接指定任意文件。

博客按照日期降序排列。搜索覆盖标题、摘要、分类和标签；`q` 与 `category` 保存在 URL 中，从文章返回时能恢复。分类在 `BLOG_SECTIONS` 中维护，文章中出现的其他分类也会自动加入。原来的“新建分区”只会修改访问者自己的浏览器、不会更新仓库，因此已从公开页面移除。

### 文章阅读

每篇文章有独立地址，可以直接访问、刷新、前进后退；文章标题只显示一次。目录为重复标题生成唯一 ID，支持中文章节链接。复制链接遇到剪贴板权限或非安全上下文限制时，会显示可手动复制的真实链接，不会假报成功。网络错误提供重试和返回入口，未知 slug 显示明确提示。

轻量渲染器支持标题 h1–h6、段落、强调、行内代码、围栏代码、嵌套列表、引用、链接、图片与基础表格；它是 Markdown 子集，不宣称完整 CommonMark，也不运行 Mermaid 或 LaTeX。原始 HTML 被转义，危险 URL 被拒绝。代码采用柔和底色并保留内容，不依赖在线语法高亮。

## 视觉与无障碍

- 默认浅色；右上角按钮切换深色并记住偏好。本地存储不可用时，本次页面仍可切换。
- 颜色集中在 `:root` 与 `:root[data-theme="dark"]`。正文、选中状态与 `mark` 分别指定前景和背景，修复旧版选中时同色的问题。
- 常规正文 17px，文章正文 18px，项目描述 17px；日期与标签使用较小的辅助字号，正文不再使用等宽字体。
- 最大内容宽度 1080px，文章主要阅读列约 760px。平板和手机使用单栏；手机导航直接展示四个入口，无需展开侧栏。
- 提供跳到正文、可见键盘焦点、真实链接、筛选按钮 `aria-pressed`、结果状态、reduced-motion 和打印样式。
- 不使用渐变文字、透明填充、强混合模式或大面积高饱和色。浏览器第三方扩展仍可能覆盖站点样式，无法保证兼容所有强制配色或高亮插件。

## 设计参考

参考以下个人主页的内容组织方法，未复制其代码或素材：

- [Shu Ding](https://shud.in/)：简短个人叙事与少量清晰入口。
- [Anthony Fu](https://antfu.me/)：以实际工具与创作为线索介绍自己。
- [Andrej Karpathy](https://karpathy.ai/)：经历与项目分层组织。

具体颜色、留白、字体和中文排版为本站设计。开发说明留在 README，公开页面展示个人内容。

## 部署

保留现有 GitHub Pages 配置：`Settings → Pages → Deploy from a branch → main / (root)`。页面内资源使用相对路径，适用于用户主页或子目录部署。若复制到其他域名，请同步修改 HTML 中的 canonical、Open Graph URL 和个人信息。

## License

沿用仓库原有 LICENSE。个人资料、项目状态和链接以本人持续维护的内容为准。
