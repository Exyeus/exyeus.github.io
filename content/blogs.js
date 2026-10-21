/*
 * 博客目录
 * 新增文章只需两步：
 * 1. 在 content/blogs/ 新建一个 .md 文件；
 * 2. 在下面数组新增一项，并填写 file 路径和 category。
 *
 * 分区只需维护 BLOG_SECTIONS：增加一个字符串即可新建，删除该字符串即可移除。
 */
window.BLOG_SECTIONS = ["技术", "想法", "书摘"];

window.BLOG_DATA = [
  {
    slug: "zero-build-homepage",
    title: "这个主页为什么坚持零构建",
    date: "2026-08-05",
    category: "Project",
    tags: ["GitHub Pages", "HTML", "Design"],
    summary: "减少依赖、降低部署失败面，并让内容修改退化成最简单的文本编辑。",
    file: "content/blogs/zero-build-homepage.md"
  },
  {
    slug: "dbms-competition-2026",
    title: "系统能力大赛2026-DBMS赛道参赛总结",
    date: "2026-08-23",
    category: "技术",
    tags: ["DBMS", "Concurrency Control", "Optimization"],
    summary: "一些之后应当践行的原则以及配套理论",
    file: "content/blogs/2026-数据库赛后总结.md"
  }
];
