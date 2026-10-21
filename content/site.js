/*
 * 个人主页主配置
 * 修改这里即可更新个人信息、项目经历、研究方向和资源工具。
 * 保持字段名不变；数组中的对象可自由增删、复制和排序。
 */
window.SITE_DATA = {
  profile: {
    name: "T_IM",
    displayName: "田家铭",
    romanName: "Jiaming Tian",
    shortName: "T",
    role: "Computer Science Undergraduate",
    eyebrow: "COMPUTER SCIENCE · RUC",
    intro: "在中国人民大学学习计算机科学，关注 Data Infra、数据库与计算机系统。从真实的数据问题出发，探索更可靠、高效的系统，也做一些让阅读与学习更顺手的小工具。",
    status: "Open to learning & collaboration",
    tags: ["Data Infra", "Database", "Computer Systems", "Agent Memory", "阅读工具", "浏览器扩展", "Obsidian", "AI 辅助开发", "羽毛球", "音乐", "阅读", "观鸟", "昆虫", "哲学"],
    tagGroups: [
      { label: "研究兴趣", tags: ["Data Infra", "Database", "Computer Systems", "Agent Memory"] },
      { label: "工具与实践", tags: ["阅读工具", "浏览器扩展", "Obsidian", "AI 辅助开发"] },
      { label: "生活与爱好", tags: ["羽毛球", "音乐", "阅读", "观鸟", "昆虫", "哲学"] }
    ],
    facts: [
      { label: "学校", value: "中国人民大学" },
      { label: "专业", value: "计算机科学" },
      { label: "关注", value: "Data Infra · Database" },
      { label: "所在", value: "北京，中国" }
    ],
    actions: [
      { label: "GitHub", url: "https://github.com/Exyeus", icon: "github", primary: true },
      { label: "阅读笔记", url: "blogs.html", icon: "note" },
      { label: "我的工具", url: "resources.html", icon: "tool" }
    ]
  },

  about: [
    {
      kicker: "DATA INFRA",
      title: "让数据更好地服务计算",
      text: "关注面向机器学习与 Physical AI 的数据基础设施：数据如何存储、组织、加载，以及如何降低访问开销。希望把数据库与计算机系统的知识放进真实工作负载中，通过可复现的实验理解性能瓶颈。"
    },
    {
      kicker: "AGENT MEMORY",
      title: "让记忆可追溯、可使用",
      text: "持续关注 Agent Memory 中的信息持久化、检索与时效性，思考怎样把历史信息组织成可验证、可使用的上下文。这是正在探索的研究兴趣，也连接着我对数据库和知识管理工具的好奇。"
    },
    {
      kicker: "TOOLS FOR LEARNING",
      title: "从日常的不顺手开始",
      text: "围绕论文阅读、网页批注和知识整理制作小工具。用 Obsidian 的段旁评论承接阅读时的想法，用 ChatGPT 的阅读进度与批注工具接续长对话，也在 Liteasy 中探索更连贯的论文阅读与研究工作流。"
    }
  ],

  featured: [
    {
      title: "数据库系统实践",
      kicker: "DATABASE SYSTEMS",
      description: "从功能正确性到事务处理性能，在数据库竞赛中探索缓冲池、I/O、并发与日志策略。把每一次优化放回完整工作负载中检验。",
      url: "projects.html#database-systems",
      tags: ["C++", "Database", "Performance"]
    },
    {
      title: "阅读与批注工具",
      kicker: "READING TOOLS",
      description: "Obsidian Margin Comment 与 ChatGPT Reading Progress，让原文、阅读进度和自己的思考留在一起，减少中断后重新寻找上下文的成本。",
      url: "resources.html",
      tags: ["Obsidian", "浏览器扩展", "知识管理"]
    },
    {
      title: "Liteasy",
      kicker: "RESEARCH WORKFLOW",
      description: "参与构建面向论文阅读的 Agent Native 工具，探索 PDF 阅读、上下文管理、Agent 交互与研究材料组织的衔接。",
      url: "projects.html#liteasy",
      tags: ["论文阅读", "Agent", "国家级大创"]
    }
  ],

  projects: [
    {
      id: "mdlk-internship",
      year: "2026",
      title: "实习 · ModaLink 研发团队 Physical AI Data Infra 学习与开发",
      description: "深入实践 Design Data-Intensive Applications 一书思想，探索数据工程，参与 Review 与开发。",
      badge: "进行中"
    },
    {
      id: "school-badminton-competition",
      year: "2026",
      title: "信息学院新生羽毛球赛暨院羽毛球队招新筹办",
      description: "作为院羽毛球队队长，在从先前队长提供的咨询下，高度独立地对接学院、体育场馆、参赛选手、学生部门、物资购置、信息管理等多方，并主持比赛现场负责规则讲解、参赛引导，设计了比赛生效的自动更新赛程 Excel 表格，沉淀可复用经验指南。",
      badge: "活动经验"
    },
    {
      id: "student-award",
      year: "2025-2026",
      title: "优秀文体骨干奖学金 优秀学生骨干奖学金",
      description: "在2025-2026学年任班级宣传委员、院羽毛球队队长、人大创客协会部长，在一年历程中积极服务同学，提升自我，推动了一系列活动圆满成功。",
      badge: "三等奖"
    },
    {
      id: "hackathon-co-organizer",
      year: "2026",
      title: "中国人民大学创客协会 · 首届黑客松与通州黑客松筹办",
      description: "参与首届黑客松最后一天开发及路演日的统筹工作，深度参与了对接服务、作品收集、预约入校、演示规划、现场操作、信息管理等关键业务。并在通州黑客松负责技术选型&支持&开发、对接信息服务型赞助、参与统筹整体推进。",
      badge: "活动经验 · 圆满完成 · 持续推进"
    },
    {
      id: "database-systems",
      year: "2026",
      title: "全国大学生计算机系统能力大赛 · 数据库管理系统设计赛全国总决赛",
      description: "作为队长，参与主要功能的实现、正确性修复与性能调优。围绕 TPC-C 类测试，探索缓冲池大小与替换策略、pwrite / fdatasync 系统调用、分批 GC 和 WAL 策略，提升事务处理性能；在线下决赛通过现场手写功能实现。",
      badge: "全国三等奖"
    },
    {
      id: "liteasy",
      year: "2026",
      title: "Liteasy · 中国人民大学大学生创业训练",
      description: "作为技术负责人之一，参与 Agent Native 论文阅读器的架构设计，负责 Agent 框架构建与界面优化。围绕上下文管理、数据可视化和 PDF 阅读体验持续迭代，并处理 PDF.js 的选区问题。",
      badge: "国家级立项 · 人大高瓴全球人工智能创新·治理·安全大赛决赛入围 · 推进中"
    },
    {
      year: "2026",
      title: "ASC 世界大学生超级计算机竞赛",
      description: "主要负责引力波计算模拟程序纯 CPU 版本的修复与优化，完成实验室服务器上的部署运行。通过 MPI、循环优化等方式修复异常终止问题，并使程序提速约 20%。",
      badge: "二等奖"
    },
    {
      year: "2026",
      title: "中国人民大学第28届创新杯课外学术科技作品竞赛",
      description: "作为第二作者，与新闻传播专业同学合作研究 AI 生成内容的信息判断路径与干预节点，参与研究思路设计、部分访谈、数据处理与结论归纳。",
      badge: "特等奖"
    },
    {
      year: "2026",
      title: "2025-2026 北京外国语大学大创-创业实践项目",
      description: "作为技术总负责人，自 2024 年起探索 AI 辅助单词学习，参与讲解模式设计，负责基于 Coze 的 Agent 工作流设计与实现。结合英语与美术学习经验，设计讲解内容、视觉风格和初版排版。",
      badge: "国家级立项 & 良好结项"
    },
    {
      year: "2024-2025",
      title: "本科生学习优秀奖学金 社会工作与志愿服务骨干奖学金",
      description: "",
      badge: "三等奖学金"
    }, 
    {
      year: "2025",
      title: "CET-6 · 621",
      description: "",
      badge: "Language"
    }
  ],

  resources: [
    {
      id: "obsidian-margin-comments",
      title: "Obsidian Margin Comment",
      description: "把想法留在原文旁边：选中文本添加段旁批注，支持评论回复与解决、Markdown 编辑和导出，让阅读与讨论保持在同一处。",
      type: "Obsidian Plugin",
      category: "Obsidian",
      url: "",
      status: "持续迭代",
      note: "项目展示 · 发布入口待补充",
      tags: ["文本划线", "段旁批注", "Markdown", "导出"],
      icon: "note"
    },
    {
      id: "chatgpt-reading-progress",
      title: "ChatGPT Reading Progress",
      alias: "ChatGPT Reading Process",
      description: "为 ChatGPT 长对话记录分段阅读进度，接续上次阅读的位置；结合 Markdown 批注与白板整理思考，并导出为 Obsidian Canvas。",
      type: "Browser Extension",
      category: "浏览器扩展",
      url: "https://github.com/Exyeus/chatgpt-reading-progress",
      status: "持续迭代",
      tags: ["阅读进度", "Markdown 批注", "白板", "Obsidian Canvas"],
      icon: "note"
    },
    {
      id: "weread-toolkit",
      title: "WeRead Toolkit",
      description: "围绕微信读书选文、模板化提示词、Markdown 导出与 AI 阅读工作流的浏览器插件。",
      type: "Browser Extension",
      category: "浏览器扩展",
      url: "https://github.com/Exyeus/weread-web-assistant",
      tags: ["微信读书", "选文", "Markdown", "AI 阅读"],
      icon: "tool"
    },
    {
      id: "theme-controller",
      title: "Theme Controller",
      description: "用于按时间规则自动切换 Obsidian 主题，并可视化编辑主题 CSS 属性、创建快照与回滚的社区插件。",
      type: "Obsidian Plugin",
      category: "Obsidian",
      url: "https://github.com/Exyeus/obsidian-theme-controller",
      tags: ["主题切换", "CSS 编辑", "快照", "回滚"],
      icon: "tool"
    }
  ]

};
