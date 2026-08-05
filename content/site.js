/*
 * 个人主页主配置
 * 修改这里即可更新个人信息、荣誉条目、研究方向和资源工具。
 * 保持字段名不变；数组中的对象可自由增删、复制和排序。
 */
window.SITE_DATA = {
  profile: {
    name: "T_IM",
    shortName: "T",
    role: "Computer Science Undergraduate",
    eyebrow: "HELLO, I AM",
    intro: "计算机科学本科生，关注数据库系统、Agent Memory 与系统软件。我喜欢把模糊问题压缩成可验证的模型，再把模型落实为真正可运行的工程。",
    status: "Open to learning & collaboration",
    tags: ["Database Systems", "Agent Memory", "Systems", "Research", "Open Source"],
    facts: [
      { label: "School", value: "Renmin University of China" },
      { label: "Major", value: "Computer Science" },
      { label: "Focus", value: "Database · Agent Memory" },
      { label: "Location", value: "Beijing, China" }
    ],
    actions: [
      { label: "GitHub", url: "https://github.com/Exyeus", icon: "github", primary: true },
      { label: "阅读我的文章", url: "#blogs", icon: "note" },
      { label: "查看资源工具", url: "#resources", icon: "tool" }
    ]
  },

  about: [
    {
      kicker: "RESEARCH",
      title: "Agent Memory",
      text: "从数据库、事务、时间语义和依赖闭包的角度研究 Agent Memory，尝试让记忆系统从经验性组件变为可解释、可验证的基础设施。"
    },
    {
      kicker: "SYSTEMS",
      title: "Database Internals",
      text: "持续学习查询处理、事务、恢复、存储与并发控制，并通过 RMDB、TPC-C 和 CMU 15-445 等项目训练系统实现能力。"
    },
    {
      kicker: "ENGINEERING",
      title: "Build Useful Tools",
      text: "偏好零负担、可维护、真正改善工作流的小工具：浏览器插件、论文阅读工具、可视化与个人知识基础设施。"
    },
    {
      kicker: "METHOD",
      title: "Think, Test, Refine",
      text: "先建立直觉模型，再写出严格定义；先找可观测证据，再做优化。对研究与工程都坚持可复现和可证伪。"
    }
  ],

  honors: [
    {
      year: "2026",
      title: "全国大学生计算机系统能力大赛 · 数据库管理系统设计赛全国总决赛",
      description: "参与手写关系数据库系统的功能、恢复与 TPC-C 性能优化，完成千万级数据加载与完整功能门禁。",
      badge: "Finalist"
    },
    {
      year: "2026",
      title: "CET-6 · 620",
      description: "英语六级成绩，用于英文技术资料、论文阅读与跨语言技术交流。",
      badge: "Language"
    },
    {
      year: "2026",
      title: "CET-4 · 625",
      description: "英语四级成绩。该条目可替换为奖学金、竞赛奖项、论文、专利或其他正式成果。",
      badge: "Language"
    }
  ],

  resources: [
    {
      title: "ClosureDB",
      description: "面向 Agent Context 的事务化依赖闭包视图设想，关注版本、证据、时间语义与正确性契约。",
      type: "Research Project",
      url: "#blogs",
      icon: "link"
    },
    {
      title: "RMDB Notes",
      description: "关系数据库实现、TPC-C 调优、并发控制、恢复机制与系统 profiling 的学习记录。",
      type: "Knowledge Base",
      url: "#blogs",
      icon: "note"
    },
    {
      title: "WeRead Toolkit",
      description: "围绕微信读书选文、模板化提示词、Markdown 导出与 AI 阅读工作流的浏览器插件。",
      type: "Browser Extension",
      url: "#",
      icon: "tool"
    },
    {
      title: "Personal Homepage",
      description: "你正在浏览的零构建个人主页。只有 HTML、CSS、JavaScript，可直接部署到 GitHub Pages。",
      type: "Open Source",
      url: "https://github.com/Exyeus",
      icon: "github"
    },
    {
      title: "CS Learning Map",
      description: "数据库、操作系统、编译原理、CSAPP 与机器学习的结构化学习地图。",
      type: "Study Resource",
      url: "#blogs",
      icon: "calendar"
    },
    {
      title: "Reading & Thinking",
      description: "哲学、复杂系统与个人成长的阅读摘录和长期问题清单。",
      type: "Reading Notes",
      url: "#blogs",
      icon: "tag"
    }
  ],

  footer: "Built with plain HTML, CSS and JavaScript · No build step required."
};
