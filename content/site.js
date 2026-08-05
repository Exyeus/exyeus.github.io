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
    tags: ["Interested In:", "Database", "Agent Memory", "Computer System", "Vibe Coding", "羽毛球",
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
      kicker: "RESEARCH",
      title: "Agent Memory",
      text: "从数据库、事务、时间语义和依赖闭包的角度研究 Agent Memory，尝试让记忆系统从经验性组件变为可解释、可验证的基础设施。"
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
      title: "中国人民大学大学生创业训练",
      description: "研发一个 Agent Native 的 Paper 阅读器 配备相关，参与结构设计，负责 Agent 框架构建与 UI 优化",
      badge: "国家级立项"
    },
    {
      year: "2026",
      title: "ASC 世界大学生超级计算机竞赛",
      description: "优化引力波计算模拟程序",
      badge: "Second Prize"
    },
    {
      year: "2026",
      title: "中国人民大学第28届创新杯课外学术科技作品竞赛",
      description: "研究了AI生成内容的信息判断路径与干预节点",
      badge: "特等奖"
    },
    {
      year: "2026",
      title: "2025-2026 北京外国语大学大创-创业实践项目",
      description: "从 2024 年起尝试用 AI 赋能单词学习 参与单词讲解模式的设计，负责基于 Coze 的 Agent 工作流设计与实现",
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
    }
  ]

};
