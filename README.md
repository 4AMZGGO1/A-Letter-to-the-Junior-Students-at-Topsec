# AI 时代，别只把作业当作作业

面向“第二届天融信班学弟学妹”的演讲型 Web 课件。内容来自项目根目录中的 Markdown 原稿，并重新整理为适合现场投屏的幻灯片结构。

## 技术栈

- React + Vite
- TypeScript
- Tailwind CSS
- lucide-react 图标

## 安装与运行

```bash
npm install
npm run dev
```

启动后访问终端中显示的本地地址，通常是：

```txt
http://localhost:5173/
```

## 常用命令

```bash
npm run typecheck
npm run build
npm run preview
```

- `npm run typecheck`：运行 TypeScript 类型检查。
- `npm run build`：类型检查并生成生产构建，输出目录为 `dist/`。
- `npm run preview`：本地预览生产构建。

## 课件交互

- 左 / 右方向键切换上一页和下一页。
- 空格键进入下一页。
- 页面两侧按钮支持鼠标切换。
- 右上角按钮支持全屏展示。
- 右上角概览按钮可查看所有页面缩略图。
- 底部显示进度条和当前页码。
- 移动端可正常浏览，侧边翻页按钮会隐藏。

## 内容结构

主要页面包括：

- 开场页
- 为什么要聊 AI
- AI Agent 能力卡片
- Agent 实战任务清单
- AI 时代核心认知
- 工具投入
- AI Coding + Git
- 外部技术资源、Unix-like 环境、模型组合
- 作业拓展学习
- 简历和面试
- 技能地图
- 推荐资源导航
- 给基础不太好的同学
- 结尾 Q&A

课件内容集中在：

```txt
src/data/slides.ts
```

需要修改文案、资源链接、技能点时，优先编辑这个文件。

## 部署

### GitHub Pages

项目已在 `vite.config.ts` 中使用 `base: "./"`，适合部署到 GitHub Pages 的子路径。

```bash
npm run build
```

然后将 `dist/` 目录发布到 GitHub Pages。也可以使用 GitHub Actions 自动部署。

### Vercel

在 Vercel 导入仓库后，保持默认配置即可：

- Build Command：`npm run build`
- Output Directory：`dist`

### Netlify

在 Netlify 导入仓库后使用：

- Build command：`npm run build`
- Publish directory：`dist`

## 说明

原 Markdown 中较口语化或不适合公开演讲直接展示的表达，已改写为更稳妥的版本。例如：工具投入不写成单纯“买会员”，而是表达为对学习效率和作品产出的适当投入；系统选择不否定 Windows，只说明不同环境对工具链效率的影响；简历和面试部分强调真实经历、可解释、可复盘。
