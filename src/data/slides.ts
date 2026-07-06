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
      name: "经验分享者",
      meta: "第一届天融信班",
    },
    points: ["工具", "拓展学习", "实训", "就业准备"],
  },
  {
    id: "why-ai",
    layout: "tagCloud",
    eyebrow: "先认识 Agent",
    title: "先别急着背概念，先知道它能帮你干活",
    subtitle: "后面需要深入时再学术语。现在先建立一个直觉：Agent 可以帮你处理学习和实训里的很多具体任务。",
    tags: [
      "Agent",
      "LLM",
      "Prompt",
      "查资料",
      "读文档",
      "排错",
      "写脚本",
      "做笔记",
      "搭环境",
      "AI Coding",
    ],
    points: [
      "你不用一开始就懂 MCP、RAG、Tools 这些词",
      "先把 Agent 当成一个会查资料、会写代码、会帮你排错的学习助手",
      "真正重要的是拿自己的作业和问题试一次",
    ],
  },
  {
    id: "agent-capability",
    layout: "capabilities",
    eyebrow: "AI Agent",
    title: "Agent 可以帮你把学习里的杂活先跑起来",
    subtitle: "它适合处理“我想做但不知道从哪下手”的任务：查、拆、写、跑、改、总结。",
    cards: [
      { title: "看不懂文档", body: "让它先翻译、概括，再列出你需要照着做的步骤。", icon: "BookOpen" },
      { title: "环境起不来", body: "把系统、报错、配置和目标告诉它，让 Agent 自己去排错。", icon: "Terminal" },
      { title: "作业不会拓展", body: "让它根据当天所学继续拓展，并部署考试或练习环境。", icon: "FileText" },
      { title: "代码不知道怎么写", body: "让它先写最小可运行版本，再一步步补功能。", icon: "Code2" },
      { title: "靶场不会部署", body: "让它拆解依赖、端口、账号、初始化和验证方式。", icon: "ShieldCheck" },
      { title: "问题反复出现", body: "让它把排错过程整理成检查清单和复用脚本。", icon: "ListChecks" },
      { title: "笔记太散", body: "让它把截图、命令、现象整理成复盘文档。", icon: "Presentation" },
      { title: "想做小项目", body: "让它帮你拆需求、搭框架、写 README 和部署步骤。", icon: "Rocket" },
    ],
  },
  {
    id: "agent-cases",
    layout: "taskBoard",
    eyebrow: "现场演示",
    title: "直接看 Agent 能帮你把什么活干起来",
    subtitle: "我会让 Agent 在阿里云服务器上完成部署，再展示一些我之前实际用 Agent 做过的事。",
    tasks: [
      { title: "部署 DVWA 靶场", detail: "让 Agent 连接阿里云服务器，处理依赖、容器、端口和访问验证。" },
      { title: "部署 Pikachu 靶场", detail: "让 Agent 根据环境自己排错，并给出可复现的部署过程。" },
      { title: "部署《赵云与阿斗》", detail: "使用 ghcr.io/panda-995/douyin-game，完成拉取、运行和访问检查。" },
      { title: "展示过往案例", detail: "看看我之前用 Agent 做过哪些学习、部署、排错和自动化任务。" },
    ],
  },
  {
    id: "core-mindset",
    layout: "quote",
    eyebrow: "核心认知",
    title: "会用 Agent，不等于可以不学基础",
    quote: "Agent 帮你把事情往前推，你负责判断它推得对不对。",
    points: [
      "它可以帮你查、写、改、总结，但可能给出错误命令",
      "你要说清楚目标、环境、报错和期望结果",
      "最后一定要自己验证：服务是否启动、页面是否能访问、漏洞是否能复现",
    ],
  },
  {
    id: "investment",
    layout: "compare",
    eyebrow: "模型体验",
    title: "用强模型，才能摸清前沿 AI 的能力边界",
    subtitle: "不是一定要长期付费，而是建议大家亲自试试目前最先进的模型。只有用过，才知道它能做到哪里、哪里还需要你自己判断。",
    compare: {
      leftTitle: "只听别人说",
      leftItems: ["不知道模型真实能力", "容易高估或低估 AI", "遇到任务时不知道怎么提需求"],
      rightTitle: "自己实际试过",
      rightItems: ["知道它适合查资料、写代码还是排错", "能感受到强模型和普通模型的差距", "更能摸清前沿 AI 的能力边界", "更容易判断什么时候该用 AI"],
    },
  },
  {
    id: "ai-coding-git",
    layout: "flow",
    eyebrow: "AI Coding + Git",
    title: "先把想法做出来，再让每次修改都有记录",
    subtitle: "AI Coding 放大想象力，Git 负责保存过程。两者放在一起，才容易把折腾变成作品。",
    flow: ["一个想法", "让 AI 实现", "本地运行", "Git 提交", "继续改进", "发布到 GitHub"],
    points: [
      "改坏了可以对比、回滚、重来",
      "小脚本、小工具、小网站都可以形成版本记录",
      "GitHub 链接比一句“熟悉某技术”更有说服力",
    ],
  },
  {
    id: "tools-network",
    layout: "focus",
    eyebrow: "工欲善其事",
    title: "要具备稳定访问外网的能力",
    subtitle: "很多先进工具、英文文档、开源项目、AI 服务和社区讨论，都需要访问外网才能顺畅使用。",
    points: [
      "GitHub、官方文档、英文教程和模型工具经常需要外网",
      "访问不稳定，会直接影响查资料、装工具、拉镜像和用 AI",
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
    title: "优先考虑 ChatGPT Plus，预算有限就做组合",
    subtitle: "工具选择不用一步到位。先保证有一个强模型主力，再补一个能查最新资料的模型。",
    points: [
      "预算允许时，建议优先购买 ChatGPT Plus，Plus 里的 Codex 额度还可以",
      "ChatGPT Plus 适合综合问答、代码协作、资料整理和多模态任务",
      "预算不太充足时，可以用 Claude Code 再搭配 DeepSeek / GLM 这类能 Web Search 的模型",
      "Web Search 模型主要用来查最新文档、版本变化和资料来源",
    ],
  },
  {
    id: "learning-loop",
    layout: "flow",
    eyebrow: "学习闭环",
    title: "作业、项目和简历其实是一条线",
    subtitle: "每天的任务不是孤立截图。多走一步，就可能变成复盘、脚本、项目，最后变成面试时能讲清楚的证据。",
    flow: ["完成作业", "多问为什么", "换环境复现", "写成记录", "沉淀项目", "放进简历"],
    points: [
      "不要只交结果截图，要留下操作过程和排错记录",
      "能复现、能解释、能展示，才算真正变成自己的能力",
      "后面面试被追问时，你讲的是经历，不是临时背答案",
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
    id: "skill-map",
    layout: "skillMap",
    eyebrow: "补充技能",
    title: "基地可能不会系统教，但你最好提前补",
    subtitle: "这些能力会在靶场、云安全、运维安全、DevSecOps 和实际工作里反复出现。",
    skillGroups: [
      { name: "容器", skills: ["Docker", "Dockerfile", "Compose", "端口映射", "数据卷", "容器网络"] },
      { name: "编排", skills: ["Kubernetes / K8s", "Pod", "Deployment", "Service", "Ingress", "Namespace"] },
      { name: "云设施", skills: ["VPC", "ECS", "EIP", "SLB", "OSS", "SLS", "安全组", "IAM"] },
      { name: "系统", skills: ["Linux", "Shell", "权限", "日志", "排错"] },
      { name: "Web 服务", skills: ["Nginx", "LAMP", "HTTPS", "反向代理"] },
      { name: "工程化", skills: ["GitHub", "自动化脚本", "文档", "可复现部署"] },
    ],
  },
  {
    id: "basics",
    layout: "focus",
    eyebrow: "给基础不太好的同学",
    title: "听不懂时，先把重心放回基础",
    subtitle: "如果代码审计阶段已经云里雾里，不要急着硬冲。基础补起来，后面的内容才会真正连上。",
    points: [
      "优先补 Linux、基础网络、Web、HTTP、HTML、CSS、JavaScript",
      "补 PHP 或 Python、MySQL、常见 Web 漏洞原理和靶场部署",
      "先把系统、服务部署、日志排错和 Docker 基础练扎实",
      "不要只盯进度，能解释清楚基础流程，比硬背后面的内容更重要",
    ],
  },
  {
    id: "resume-interview",
    layout: "interview",
    eyebrow: "简历和面试",
    title: "简历要提前准备，面试要持续复盘",
    subtitle: "从 8 月开始，很多人会陆续投递。简历上的每个技术点，都要能被追问、被解释、被验证。",
    stages: [
      {
        title: "面试前",
        items: ["排版简洁，突出技术栈、项目和实训经历", "把 GitHub、博客、复现记录等产物贴出来", "让 AI 根据简历生成追问清单", "提前准备项目职责、问题、方案和取舍"],
      },
      {
        title: "面试中",
        items: ["紧张是正常的，先把结论说清楚", "不会的问题不要硬编，可以说明思路和边界", "围绕真实经历展开，不写完全不懂的内容", "留意面试官反复追问的重点"],
      },
      {
        title: "面试后",
        items: ["记录没答上来和答得不流畅的问题", "补基础知识、项目细节和复现过程", "更新简历、答案库和项目文档", "不要因为几场失败就否定自己"],
      },
    ],
  },
  {
    id: "daily-life",
    layout: "capabilities",
    eyebrow: "吃住穿行",
    title: "生活问题处理顺，学习状态会好很多",
    subtitle: "这些不是技术重点，但能减少实训期间的摩擦。具体情况到了现场再验证。",
    cards: [
      { title: "外卖地址", body: "国家网安基地培训中心（西门），下课前 40 分钟左右点更稳。", icon: "MapPin" },
      { title: "小吃街", body: "可导航到茶颜悦色（武汉仟那广场茶叶子店）附近。", icon: "Coffee" },
      { title: "食堂", body: "去年远一点的食堂体验更好，今年可以自己多试几次。", icon: "Utensils" },
      { title: "饮水", body: "隔壁一楼有直饮水机，可以提前带杯子接水。", icon: "Droplets" },
      { title: "寝室网络", body: "墙上网口一般能用，通常比无线更快，适合下载镜像。", icon: "Wifi" },
      { title: "住宿节奏", body: "把充电器、网线、插排、常用药和换洗衣物提前准备好。", icon: "Home" },
    ],
  },
  {
    id: "resources",
    layout: "resources",
    eyebrow: "推荐资源",
    title: "资源不是收藏夹，最好变成一次行动",
    subtitle: "围绕这些链接做实验、写记录、产出作品，比单纯保存链接更有价值。",
    resources,
  },
  {
    id: "closing",
    layout: "closing",
    eyebrow: "结尾",
    title: "把每天学到的东西，真正变成自己的能力",
    subtitle: "保持好奇，用 AI 提升效率，但别盲信 AI。把作业拓展成项目，把项目沉淀成作品，把作品放进简历。",
    closing: {
      headline: "Thank You",
      subline: "Q&A",
      footer: ["示例项目：现场展示", "交流方式：现场沟通"],
    },
  },
];
