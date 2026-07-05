export type Resource = {
  name: string;
  description: string;
  url: string;
  tag: string;
};

export type SkillGroup = {
  name: string;
  skills: string[];
};

export type Slide = {
  id: string;
  layout:
    | "cover"
    | "tagCloud"
    | "capabilities"
    | "taskBoard"
    | "quote"
    | "compare"
    | "flow"
    | "focus"
    | "expansion"
    | "interview"
    | "skillMap"
    | "resources"
    | "closing";
  eyebrow?: string;
  title: string;
  titleLines?: string[];
  subtitle?: string;
  speaker?: {
    name: string;
    meta: string;
  };
  tags?: string[];
  points?: string[];
  cards?: Array<{
    title: string;
    body: string;
    icon?: string;
  }>;
  tasks?: Array<{
    title: string;
    detail: string;
  }>;
  quote?: string;
  compare?: {
    leftTitle: string;
    leftItems: string[];
    rightTitle: string;
    rightItems: string[];
  };
  flow?: string[];
  expansions?: Array<{
    topic: string;
    classTask: string;
    explore: string[];
  }>;
  stages?: Array<{
    title: string;
    items: string[];
  }>;
  skillGroups?: SkillGroup[];
  resources?: Resource[];
  closing?: {
    headline: string;
    subline: string;
    footer: string[];
  };
};

export const resources: Resource[] = [
  {
    name: "服务器评测",
    description: "查看 VPS、云服务器和线路相关评测，辅助理解服务器选择。",
    url: "https://digvps.com/",
    tag: "VPS",
  },
  {
    name: "Namesilo 域名购买",
    description: "常见海外域名注册平台，可用于学习域名解析和证书申请流程。",
    url: "https://www.namesilo.com/",
    tag: "Domain",
  },
  {
    name: "阿里云学生权益",
    description: "关注学生优惠和云服务器免费额度，适合做云上实验环境。",
    url: "https://www.aliyun.com/activity/ecs/campus-deal",
    tag: "Cloud",
  },
  {
    name: "Linux.do",
    description: "技术社区，可以观察工具、模型、开发和运维相关讨论。",
    url: "https://linux.do/",
    tag: "Community",
  },
  {
    name: "Vulhub 靶场",
    description: "漏洞环境集合，适合漏洞复现、Docker 部署和安全实验练习。",
    url: "https://vulhub.org/zh",
    tag: "Lab",
  },
  {
    name: "长亭雷池 WAF",
    description: "开源社区 WAF，可用于学习防护、流量分析和安全产品部署。",
    url: "https://waf-ce.chaitin.cn/",
    tag: "WAF",
  },
  {
    name: "简历相关教程",
    description: "用于参考简历导出、排版和信息组织，内容需要结合自身真实经历判断。",
    url: "https://www.dslt.tech/article-4941-1.html",
    tag: "Resume",
  },
];

export const slides: Slide[] = [
  {
    id: "opening",
    layout: "cover",
    eyebrow: "经验分享",
    title: "AI 时代，别只把作业当作作业",
    titleLines: ["AI 时代，", "别只把作业当作作业"],
    subtitle: "给第二届天融信班学弟学妹的一次经验分享",
    speaker: {
      name: "张恒峰",
      meta: "南大共青第一届天融信班",
    },
    points: ["工具", "拓展学习", "实训", "就业准备"],
  },
  {
    id: "why-ai",
    layout: "tagCloud",
    eyebrow: "为什么要聊 AI",
    title: "你听过这些词吗？",
    subtitle: "更关键的问题：你真正玩过几个？",
    tags: [
      "MCP",
      "Prompt",
      "Tools",
      "Skills",
      "RAG",
      "Agent",
      "AI Coding",
      "Web Search",
      "Workflow",
    ],
    points: [
      "不是每个概念都要立刻精通",
      "至少知道它们大概能做什么",
      "真正重要的是亲手用过，并把它变成自己的能力",
    ],
  },
  {
    id: "agent-capability",
    layout: "capabilities",
    eyebrow: "AI Agent",
    title: "它不是替你完成成长，而是放大你的动手能力",
    subtitle: "把明确目标拆成任务，让工具参与执行、验证和迭代。",
    cards: [
      { title: "写代码", body: "搭框架、补功能、改 bug、写脚本。", icon: "Code2" },
      { title: "做课件", body: "整理结构、生成页面、优化表达。", icon: "Presentation" },
      { title: "辅助作业", body: "把步骤转成理解，把截图转成复盘。", icon: "FileText" },
      { title: "搭建靶场", body: "部署 Pikachu、DVWA、Vulhub 等环境。", icon: "ShieldCheck" },
      { title: "扩容磁盘", body: "分析分区、文件系统和云服务器限制。", icon: "HardDrive" },
      { title: "部署服务", body: "起 Web、数据库、Nginx、容器服务。", icon: "Server" },
      { title: "安全辅助", body: "辅助渗透测试记录、Payload 梳理和排错。", icon: "Bug" },
      { title: "复杂环境", body: "安装依赖、补文档、自动化重复流程。", icon: "Wrench" },
    ],
  },
  {
    id: "agent-cases",
    layout: "taskBoard",
    eyebrow: "现场例子",
    title: "Agent 实战任务清单",
    subtitle: "演示时不要只看结果，更要观察：目标如何拆、错误如何查、结果如何验证。",
    tasks: [
      { title: "起一个 Pikachu 靶场", detail: "环境、依赖、端口、访问路径全部说清楚。" },
      { title: "起一个 DVWA 靶场", detail: "记录数据库初始化、账号、风险配置。" },
      { title: "给虚拟机或云服务器扩容磁盘", detail: "确认磁盘、分区、文件系统，再执行变更。" },
      { title: "部署一个热门开源项目或游戏服务", detail: "从 README 到运行日志，形成可复现记录。" },
      { title: "让 AI 分析报错、写脚本、补文档", detail: "把一次折腾沉淀成下次能复用的流程。" },
    ],
  },
  {
    id: "core-mindset",
    layout: "quote",
    eyebrow: "核心认知",
    title: "有概念，才有把事情做出来的入口",
    quote: "现在的 AI 时代，只要你有概念，很多东西就能做出来。",
    points: [
      "AI 不是万能的，也会写错命令、误解环境",
      "你需要知道目标是什么，并把任务拆小",
      "你需要能判断结果对不对，理解 Agent 的能力边界",
    ],
  },
  {
    id: "investment",
    layout: "compare",
    eyebrow: "要舍得投入",
    title: "投入不是为了“买会员”，而是为了更高效地学习",
    subtitle: "预算有限时按需选择；关键是持续体验新模型、新工具、新工作流。",
    compare: {
      leftTitle: "看起来贵",
      leftItems: ["一个月一百多", "还不确定能用多久", "担心只是新鲜感"],
      rightTitle: "真正买到的可能是",
      rightItems: ["节省试错时间", "提高学习密度", "打开技术视野", "形成可以展示的作品"],
    },
  },
  {
    id: "ai-coding-git",
    layout: "flow",
    eyebrow: "AI Coding + Git",
    title: "让想法变成项目，也让修改可以反悔",
    subtitle: "AI Coding 负责放大想象力，Git 负责记录每一次可回溯的迭代。",
    flow: ["想法", "让 AI 实现", "本地运行", "Git 提交", "继续改进", "发布到 GitHub"],
    points: [
      "每一次修改都应该留下记录",
      "不怕 AI 改坏，因为可以对比、回滚、重来",
      "实训期间的小作品，可以成为简历中的真实佐证",
    ],
  },
  {
    id: "tools-network",
    layout: "focus",
    eyebrow: "工欲善其事",
    title: "能稳定获取外部技术资源，会直接影响学习效率",
    subtitle: "很多先进工具、英文文档、论文、开源项目和社区讨论，往往先出现在外部技术生态里。",
    points: [
      "及时读到官方文档，比二手教程更可靠",
      "GitHub、技术社区和模型工具会形成明显信息差",
      "前提是遵守所在环境和平台规则，关注安全与合规",
    ],
  },
  {
    id: "tools-unix",
    layout: "focus",
    eyebrow: "环境选择",
    title: "Unix-like 环境通常更贴近新工具链",
    subtitle: "macOS / Linux 在开发、安全、AI Coding 和自动化脚本场景里，常常更顺手。",
    points: [
      "很多工具优先适配 macOS / Linux 的命令行环境",
      "Windows 也能完成任务，但路径、引号和环境差异会增加辅助成本",
      "重点不是迷信某个系统，而是选择能降低摩擦的工作环境",
    ],
  },
  {
    id: "tools-models",
    layout: "focus",
    eyebrow: "模型组合",
    title: "根据预算和任务，组合你的 AI 工具箱",
    subtitle: "不要追求“一个工具解决所有事”，而是让不同模型覆盖不同场景。",
    points: [
      "ChatGPT Plus：适合综合问答、资料整理、代码与多模态任务",
      "Claude Code：适合项目级代码理解、修改和长上下文协作",
      "搭配一个能 Web Search 的模型，用来查最新文档、版本和资料",
      "预算有限时，优先选择自己最常用、最能产生作品的工具",
    ],
  },
  {
    id: "homework-expand",
    layout: "expansion",
    eyebrow: "拓展学习",
    title: "别把作业只当成作业",
    subtitle: "把课堂任务当成探索未知事物的锚点，多问几个“为什么”和“能不能换一种方式”。",
    quote: "作业是入口，不是终点。",
    expansions: [
      {
        topic: "DNS / DHCP / Web 中间件",
        classTask: "在 Windows Server 上完成部署与截图。",
        explore: ["Linux 上怎么部署", "配置文件在哪里", "服务如何启动、停止、排错"],
      },
      {
        topic: "证书",
        classTask: "在 Windows Server 中完成自签证书。",
        explore: ["公网域名如何申请证书", "Let's Encrypt 怎么用", "Nginx / Apache 如何配置 HTTPS"],
      },
      {
        topic: "靶场部署",
        classTask: "使用 phpStudy 快速起环境。",
        explore: ["手动安装 LAMP", "尝试 Nginx", "用 Docker 起靶场", "理解容器网络和端口映射"],
      },
    ],
  },
  {
    id: "resume-interview",
    layout: "interview",
    eyebrow: "简历和面试",
    title: "真实、可解释、可复盘",
    subtitle: "不要鼓励虚构经历。简历上的每个技术点，都要准备好被追问。",
    stages: [
      {
        title: "面试前",
        items: ["打磨简历，简洁大气", "梳理项目，准备复盘", "让 AI 生成追问清单", "模拟问答，补齐漏洞点"],
      },
      {
        title: "面试中",
        items: ["表达清晰，先说结论", "不会的问题不要硬编", "围绕真实经历展开", "记录被问到的重点"],
      },
      {
        title: "面试后",
        items: ["复盘没答好的问题", "补技术点和项目细节", "更新简历与答案库", "准备下一场迭代"],
      },
    ],
  },
  {
    id: "skill-map",
    layout: "skillMap",
    eyebrow: "补充技能",
    title: "基地可能不会系统教，但你最好会",
    subtitle: "这些能力会在靶场、云安全、运维安全、DevSecOps 和实际工作里反复出现。",
    skillGroups: [
      { name: "容器", skills: ["Docker", "Dockerfile", "Compose", "容器网络"] },
      { name: "编排", skills: ["Kubernetes / K8s", "Pod", "Deployment", "Service", "Ingress"] },
      { name: "云设施", skills: ["VPC", "ECS", "EIP", "SLB", "OSS", "SLS"] },
      { name: "系统", skills: ["Linux", "Shell", "权限", "日志", "排错"] },
      { name: "Web 服务", skills: ["Nginx", "LAMP", "HTTPS", "反向代理"] },
      { name: "工程化", skills: ["GitHub", "自动化脚本", "文档", "可复现部署"] },
    ],
  },
  {
    id: "resources",
    layout: "resources",
    eyebrow: "推荐资源",
    title: "把资源变成行动入口",
    subtitle: "这些链接只做静态导航；真正有价值的是围绕它们做实验、写记录、产出作品。",
    resources,
  },
  {
    id: "basics",
    layout: "focus",
    eyebrow: "给基础不太好的同学",
    title: "听不懂时，先把重心放回基础",
    subtitle: "如果代码审计阶段已经觉得云里雾里，不要慌。基础不是拖后腿，而是后面所有能力的地基。",
    points: [
      "优先补 Linux、网络、Web、HTTP、数据库和常见漏洞原理",
      "先把系统、服务部署、日志排错和 Docker 基础练扎实",
      "不要只盯进度，能解释清楚基础流程，比硬冲后面的内容更重要",
    ],
  },
  {
    id: "closing",
    layout: "closing",
    eyebrow: "结尾",
    title: "保持好奇，别把作业只当成作业",
    subtitle: "AI 不会直接替你成长，但会放大你愿意探索的能力。",
    closing: {
      headline: "Thank You",
      subline: "Q&A",
      footer: ["GitHub：your-github-here", "联系方式：your-contact-here"],
    },
  },
];
