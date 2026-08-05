/*
 * 博客目录
 * 新增文章只需两步：
 * 1. 在 content/blogs/ 新建一个 .md 文件；
 * 2. 在下面数组新增一项，并填写 file 路径。
 */
window.BLOG_DATA = [
  {
    title: "Agent Memory 为什么不只是 RAG",
    date: "2026-08-03",
    category: "Research",
    tags: ["Agent Memory", "Database", "RAG"],
    summary: "从状态、时间、版本、依赖与决策效用出发，重新审视 Agent Memory 的系统边界。",
    file: "content/blogs/agent-memory-not-rag.md"
  },
  {
    title: "从 TPC-C 失败报告反推数据库瓶颈",
    date: "2026-08-02",
    category: "Database",
    tags: ["TPC-C", "Profiling", "RMDB"],
    summary: "如何把超时、语义错误、Peak RSS 和磁盘占用转化为可以验证的优化假设。",
    file: "content/blogs/tpcc-profiling.md"
  },
  {
    title: "我希望怎样长期学习计算机系统",
    date: "2026-08-01",
    category: "Learning",
    tags: ["Learning", "Systems", "Method"],
    summary: "从课程驱动转向问题驱动：构建可复用的概念模型、实验习惯和工程资产。",
    file: "content/blogs/learning-systems.md"
  },
  {
    title: "这个主页为什么坚持零构建",
    date: "2026-08-05",
    category: "Project",
    tags: ["GitHub Pages", "HTML", "Design"],
    summary: "减少依赖、降低部署失败面，并让内容修改退化成最简单的文本编辑。",
    file: "content/blogs/zero-build-homepage.md"
  }
];
