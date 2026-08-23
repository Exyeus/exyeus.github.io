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
    intro: "",
    status: "Open to learning & collaboration",
    tags: ["Database", "Agent Memory", "Computer System", "Vibe Coding", "羽毛球",
           "音乐", "昆虫", "观鸟", "阅读", "心理学", "经济学", "哲学", "商学", "传播学", "Research"
    ],
    facts: [
      { label: "School", value: "Renmin University of China" },
      { label: "Major", value: "Computer Science" },
      { label: "Focus", value: "Database · Agent Memory" },
      { label: "Location", value: "Beijing, China" }
    ],
    actions: [
      { label: "GitHub", url: "https://github.com/Exyeus", icon: "github", primary: true },
      { label: "Blogs", url: "#blogs", icon: "note" },
      { label: "Resources", url: "#resources", icon: "tool" }
    ]
  },

  about: [
    {
      kicker: "综合",
      title: "近期关注点",
      text: "通过学习西方哲学试着让自己的一些思考已久的问题得到一个锚点，并拥有解释一些现象的理论。\n用一些更有效的方式来提升对于快节奏生活的抗性。\n理解人之为人。\n在 AI Infra、Agent、Database、VLM/VLA等浅涉的科研领域确定发力方向。"
    }
  ],

  honors: [
    {
      year: "2026",
      title: "全国大学生计算机系统能力大赛 · 数据库管理系统设计赛全国总决赛",
      description: "作为队长参赛，参与完成了大部分功能的调优与正确实现，在决赛性能优化阶段做出了一些重要改进以在 TPC-C 类测试下提升每分钟处理事务数。优化方法包括测试 Buffer Pool 大小、\
      测试 Replacer、改用 pwrite、fdatasync 等轻量化/适于并发的系统调用、GC 的分批执行、WAL的策略更改等等。在线下决赛成功通过手写实现功能。",
      badge: "全国三等奖"
    },
    {
      year: "2026",
      title: "中国人民大学大学生创业训练",
      description: "作为技术方面负责人之一，研发一个 Agent Native 的 Paper 阅读器，参与结构设计，负责 Agent 框架构建与 UI 优化。对于数据可视化、Agent框架/上下文管理、PDF应用可视化开发经验（克服了 PDF.js 的一些选区问题）",
      badge: "国家级立项-推进中······"
    },
    {
      year: "2026",
      title: "ASC 世界大学生超级计算机竞赛",
      description: "几乎完全负责修复优化引力波计算模拟程序纯CPU版本（本年赛题第四题）。完成了本题在实验室提供服务器上面的部署运行，通过 MPI、循环优化等方式，将本题成功从异常终止中修复，并提速约20%。",
      badge: "二等奖"
    },
    {
      year: "2026",
      title: "中国人民大学第28届创新杯课外学术科技作品竞赛",
      description: "作为第二作者，与新闻传播的同学合作研究了AI生成内容的信息判断路径与干预节点。在项目中负责了思路设计、部分对家人的访谈、数据处理与结论导出",
      badge: "特等奖"
    },
    {
      year: "2026",
      title: "2025-2026 北京外国语大学大创-创业实践项目",
      description: "作为技术方面的总负责人，从 2024 年起尝试用AI赋能单词学习参与单词讲解模式的设计，负责基于Coze的Agent工作流设计与实现。同时基于自己的英语与美术学习经验，确定了单词讲解的内容、风格以及初代的排版方式",
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
      title: "WeRead Toolkit",
      description: "围绕微信读书选文、模板化提示词、Markdown 导出与 AI 阅读工作流的浏览器插件。",
      type: "Browser Extension",
      url: "https://github.com/Exyeus/weread-web-assistant",
      icon: "tool"
    },
    {
      title: "Theme Controller",
      description: "用于按时间规则自动切换 Obsidian 主题，并可视化编辑主题 CSS 属性、创建快照与回滚的社区插件。",
      type: "Obsidian Plugin",
      url: "https://github.com/Exyeus/obsidian-theme-controller",
      icon: "tool"
    }
  ]

};
