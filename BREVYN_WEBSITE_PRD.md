# Brevyn Website PRD and Product Brief

更新时间：2026-06-18

## 1. 文档目的

这份文档用于指导 Brevyn 官网的第一版重新设计、文案和信息架构。它不是完整商业计划书，也不是代码实现方案，而是给官网建设使用的产品基础材料。

本次方向：围绕当前 Electron 桌面应用做宣传页，视觉参考 Codex 官网和 ZCode 官网一类的高级桌面 AI 产品发布页：深色、克制、真实产品界面占主视觉、背景有轻量动态特效，但不能变成抽象 AI 炫技页。

当前最贴近的结构参考是 ZCode：它也是 Electron 桌面产品，官网第一屏用极简导航、大标题、下载 CTA、真实/拟真产品窗口和深色蓝调背景建立可信度。Brevyn 可以采用同一类“桌面产品发布页骨架”，但内容必须换成学习工作台：semester、course、task、files、RAG、agent session。

官网要回答三个问题：

1. Brevyn 是什么。
2. 为什么学生或知识工作者需要它。
3. 用户看完后下一步应该做什么。

官网第一屏必须回答一个额外问题：

4. 这是不是一个已经存在、可以认真使用的桌面产品。

## 2. 一句话定位

Brevyn 是一款本地优先的桌面学习工作台，把课程、任务、资料、RAG 检索和 AI Agent 放在同一个学业上下文里。

备选英文定位：

- Brevyn is a local-first desktop workspace for courses, files, RAG, and task-focused AI agents.
- Brevyn turns your semester, course files, assignments, and AI assistant into one grounded study workspace.
- A desktop AI workspace for students who need answers grounded in their own course material.

备选中文定位：

- Brevyn 是面向学生的本地优先 AI 学习工作台。
- 把课程资料、作业任务、文件检索和 AI Agent 放回同一个学业上下文。
- 不只是聊天，而是围绕课程和任务组织的桌面 AI 工作区。

## 3. 产品基础信息

### 产品名称

Brevyn

### 产品类型

桌面端应用。当前主线是 Electron 版，本地优先，面向课程、资料、任务和 AI Agent 工作流。

### 当前产品形态

Brevyn 当前不是通用聊天应用，也不是单纯的课程管理工具。它更接近：

- 学期和课程工作台
- 课程文件管理器
- 本地 RAG 检索层
- 面向作业、复习、阅读、项目的 Agent session
- 可接入 Cloud 账号、套餐、官方模型能力的桌面客户端

### 核心用户

第一目标用户：

- 大学生、研究生、法学生、商科学生、跨专业学生
- 需要长期管理课程资料、reading、assignment spec、rubric、past paper、draft 的学生
- 会频繁向 AI 提问，但希望答案基于自己的文件和课程上下文

第二目标用户：

- 独立研究者
- 需要把本地资料、笔记、PDF、项目文件和 AI Agent 放在同一工作区的人
- 需要本地文件可控、可回放、可审计的 AI 工作流用户

### 用户主要痛点

1. 课程资料分散在 LMS、PDF、截图、文件夹、聊天记录里。
2. 普通 AI 聊天不知道当前课程、任务、deadline、rubric 和已有资料。
3. 作业、阅读、复习、项目规划往往需要跨多个文件找证据。
4. 用户不想每次从零解释背景，也不想把所有文件随便上传到云端。
5. AI 给出的回答如果没有来源和文件依据，很难用于真实学习和写作。
6. 学期、课程、任务之间的结构很重要，但普通聊天产品没有这个结构。

## 4. 官网目标

### 第一版目标

官网第一版应该完成这些目标：

1. 清楚解释 Brevyn 是什么。
2. 让用户看到它和普通 AI Chat 的区别。
3. 展示真实产品截图，建立可信度。
4. 引导用户下载、加入 waitlist、购买套餐或联系团队。
5. 为后续 SEO、产品更新、定价页、下载页留下结构。
6. 形成一个有记忆点的深色桌面产品官网视觉，而不是通用 SaaS landing page。
7. 通过背景动效、产品截图和短句文案，传达“桌面工作台 + AI Agent + 本地上下文”的感觉。
8. 让用户像看 ZCode/Codex 一样，先相信这是一个成熟 app，再理解它解决什么问题。

### 第一版不追求

1. 不做过度宏大的 AI 愿景页。
2. 不把 Brevyn 包装成“万能工作流模板平台”。
3. 不过度承诺自动完成作业、保证成绩、替代学习。
4. 不把 Cloud 套餐、计费、模型能力讲得比产品本身更重。
5. 不让首页看起来像又一个通用 AI 聊天工具。
6. 不做浅色教育模板、卡片堆叠模板、渐变球背景模板。
7. 不照抄 Codex 或 ZCode 官网的布局、素材、文案或品牌元素，只借鉴它们的产品发布气质和桌面 app 展示方式。

## 5. 推荐首页信息架构

### 5.1 Hero

目标：第一屏让用户马上知道这是一个真实桌面产品，并看到产品本身。Hero 要像一个桌面 AI 产品发布页，而不是教育 SaaS 模板页。

建议内容：

- H1：Brevyn
- 副标题：A local-first AI workspace for courses, files, and task-focused study sessions.
- 中文备用：面向课程、资料和作业任务的本地优先 AI 学习工作台。
- 主按钮：Download for Mac / Join Waitlist / Get Brevyn
- 次按钮：View Product Tour / See How It Works
- 主视觉：使用真实 Electron app 截图，建议展示完整窗口，能看见 sidebar、course/task context、agent thread、file rail 或 preview。
- 背景：深色动态背景，带轻量特效，但 app 截图必须仍然是视觉中心。

Hero 需要表达的重点：

- Desktop app
- Course workspace
- Local files
- AI Agent with context
- Not generic chat

Hero 视觉结构建议：

1. 顶部导航极简：Brevyn 标识、Product、Download、Pricing/Waitlist、Sign in 或 Cloud。
2. 中央大标题，不要放在卡片里。
3. 副标题短，不超过 2 行。
4. CTA 在标题下方，最多两个。
5. 产品截图占据首屏下半部，并露出下一屏一点内容。
6. 背景特效存在于标题和截图后方，不能遮挡文字和 UI。

Hero 背景特效方向：

- 类 Codex / ZCode 官网的暗色空间感：near-black base、深蓝渐变、柔和冷色光、细微网格或点阵、慢速漂移动效。
- 可以使用 canvas / CSS radial-gradient / WebGL / Three.js 中任一种实现。
- 效果应像“本地知识工作区的上下文场”，不是烟花、粒子爆炸、赛博朋克霓虹。
- 动效速度要慢，滚动时可以有轻微 parallax。
- 必须支持 `prefers-reduced-motion`，用户关闭动效时保留静态背景。

### 5.2 Problem Section

标题备选：

- Your AI does not know your semester.
- Course work is context work.
- 学习任务不是孤立的一次聊天。

要讲的事实：

- 学生不是只需要“问 AI 一个问题”。
- 他们需要围绕课程、资料、deadline、rubric、草稿和历史对话持续工作。
- 普通聊天没有课程结构，也不会自动知道哪些文件属于哪个任务。

### 5.3 Product Explanation

标题备选：

- One workspace for every course.
- Course context, file evidence, and AI help in one place.
- 每门课都有自己的资料、任务和 AI 上下文。

建议拆成三栏，但不要做成普通三张大卡片。更好的做法是：左侧短句解释，右侧使用真实 UI 局部截图或浮层标注。

1. Courses and Tasks
   - 管理 semester、course、task、deadline 和 session。
   - 不把所有对话混在一个聊天列表里。

2. Local Files and RAG
   - 导入 reading、lecture、rubric、draft、past paper。
   - 对课程资料做本地索引和语义检索。
   - 回答可以回到文件和引用。

3. Agent Sessions
   - 针对具体 task 打开 AI session。
   - 支持资料理解、作业规划、复习、文件整理和本地修改。
   - 敏感操作需要权限确认。

### 5.4 Feature Blocks

官网第一版建议展示 6 个功能块：

1. Semester Dashboard
   - 学期入口，查看课程、任务、最近活动。

2. Course Dashboard
   - 每门课独立聚合文件、任务、会话和进展。

3. Task Workspace
   - 每个 assignment、exam、project 都可以有独立 session。

4. File Rail and Preview
   - 文件树、资料预览、inline file reference。

5. Grounded RAG Search
   - 从已索引课程资料里检索证据，而不是凭空回答。

6. Cloud Account and Official Capabilities
   - 登录后同步套餐、余额、模型配置、Embedding/OCR/Vision 等官方能力。

展示方式要求：

- 每个功能块必须配真实截图、真实 UI 裁切或真实 UI 重构，不要只放图标和营销句。
- 每块文案控制在标题 + 1 句说明 + 1 个具体 UI 细节。
- 功能块之间使用全宽深色 section、产品截图、细线、轨迹线或轻量动效串联，不要堆独立卡片墙。
- 如果使用图标，只作为辅助，不要让图标成为主要视觉。

### 5.5 Trust and Local-First Section

标题备选：

- Local-first by design.
- Your course workspace stays yours.
- 本地优先，不把学习资料变成一次性聊天附件。

建议表达：

- 课程业务数据存放在本地工作区。
- Agent session 有本地记录，便于回放和审计。
- 文件、课程、任务上下文由桌面端主进程统一管理。
- 云端主要用于账号、套餐、模型能力和权益同步。

注意：不要在没有最终隐私政策前写“所有数据永不上传”这类绝对承诺。更稳妥的说法是：

- Brevyn is designed around local workspaces.
- Cloud features are used for account, plan, and provider access.
- Model requests may use the provider selected by the user or Brevyn Cloud plan.

### 5.6 Use Cases

建议展示 4 个场景：

1. Understand readings
   - 把 reading、lecture note、case brief 放进课程资料，让 AI 基于这些材料解释概念。

2. Plan assignments
   - 围绕 assignment spec、rubric、draft 开一个 task session，拆要求、列证据、安排下一步。

3. Prepare for exams
   - 按课程资料、周次和重点复习，而不是重新复制粘贴文件。

4. Organize course files
   - 把课程共享资料、lecture、task materials、drafts、submitted 文件分清楚。

### 5.7 Pricing / Account Entry

第一版可以先放简单入口，不需要复杂定价表。

可表达：

- Brevyn supports local provider configuration.
- Brevyn Cloud can sync official model access and plan entitlements.
- Plans may include conversation models and official capabilities such as Embedding, OCR, and Vision.

待确认后再公开：

- 是否直接展示购买链接。
- 是否展示积分包、订阅、兑换码。
- 是否展示具体模型名称。
- 是否展示 `cloud.brevyn.org` 和支付链接。

### 5.8 Final CTA

按钮备选：

- Download Brevyn
- Join the Waitlist
- Get Early Access
- Contact Us

一句收束：

- Start with one course. Let Brevyn keep the context with you.
- Bring your course files, tasks, and AI assistant into one desktop workspace.

## 6. 页面清单

第一版建议只做这些页面：

1. Home
   - 主要产品解释和 CTA。

2. Download / Early Access
   - 下载入口、系统要求、版本状态、安装说明。

3. Pricing / Plans
   - 如果 Cloud 套餐已准备好，再展示。
   - 如果未准备好，先做 waitlist 或 contact。

4. Privacy
   - 必须说明 local-first、云能力、模型请求、文件处理边界。

5. Changelog / Release Notes
   - 可选，但适合桌面产品建立信任。

第一版可以暂不做：

- Blog
- Template marketplace
- Large docs center
- Team collaboration page
- Enterprise sales page

## 7. 官网文案素材

### Hero 文案备选

Option A:

> Brevyn is a local-first AI workspace for courses, files, and task-focused study sessions.

Option B:

> Study with an AI assistant that understands your course structure, files, and assignments.

Option C:

> Your semester, course materials, tasks, and AI agent in one desktop workspace.

中文备用：

> Brevyn 把学期、课程资料、作业任务和 AI Agent 放进一个本地优先的桌面工作台。

### 功能短句

- Organize every course by semester, task, and session.
- Search your own course materials with grounded RAG.
- Open task-specific AI sessions for assignments, exams, readings, and projects.
- Keep files, previews, sources, and conversation side by side.
- Use Cloud plans to sync official model access when needed.
- Work locally first, then choose the model access that fits your workflow.

### 反差表达

普通 AI Chat：

- 每次都要重新解释背景。
- 文件只是一次性附件。
- 对课程、任务、deadline 没有结构化理解。
- 回答经常没有可追溯来源。

Brevyn：

- 课程、任务、文件和 session 是同一个工作区。
- Agent 在当前 course/task 上下文里工作。
- RAG 检索优先使用已索引课程资料。
- 文件和对话都留在本地工作流中。

### 安全表达

可以说：

- Local-first desktop workspace.
- Sensitive local actions go through the desktop runtime.
- File access and tool use are mediated by Brevyn.
- User approval is required for risky actions.

暂时不要说：

- 100% private.
- Never uploads anything.
- Guaranteed secure.
- Fully offline AI.

除非后续政策和实现完全支持。

## 8. 产品能力边界

### 当前可信能力

根据当前 Electron 项目，官网可以稳妥表达这些能力：

- Desktop app built with Electron.
- Semester, course, task, and thread structure.
- Course dashboard and semester dashboard.
- Local workspace files and file preview.
- RAG indexing and course material search.
- Agent sessions powered by provider-configurable models.
- Claude Agent SDK-compatible workflow.
- Local skills and tool permissions.
- Provider settings for agent, embedding, vision, and OCR purposes.
- Cloud account login/register/refresh.
- Cloud entitlement display for balance and subscription groups.
- Cloud provider sync for conversation models and official capabilities.
- Redemption code flow exists in the app UI.

### 谨慎表达的能力

这些能力可以作为“支持方向”或“正在完善”，不建议第一版强承诺：

- 完整云同步。
- 多人协作。
- 自动完成作业。
- 准确学习时长统计。
- 所有文档格式都完美解析。
- 所有模型供应商都稳定可用。
- 所有平台安装包都已经公开发布。

## 9. 截图素材使用建议

当前 `brevyn-website` 目录保留的截图素材：

- `assets/generated/brevyn-window.png`：macOS 窗口截图，3104x2064，带 alpha 透明通道和原生窗口圆角。
- `assets/generated/brevyn-app-icon.png`：应用图标。

建议用法：

1. Hero 使用最完整、最能看到主工作区结构的窗口截图。
2. Feature section 后续可以补充不同窗口截图，但不要使用矩形区域截图硬裁圆角。
3. 截图外可以加轻微发光、玻璃反射、窗口阴影和暗色背景层，但不能影响用户看清 UI。
4. 每张截图需要配一句功能说明，不要用大段解释。
5. 截图里如果出现真实课程名、邮箱、token、个人文件名，必须先脱敏。
6. macOS 截图建议使用 `Command + Shift + 4` 后按空格选择窗口，或 `Command + Shift + 5` 选择“捕捉所选窗口”，保留原生圆角和透明角。

待补充：

- 继续补充不同页面的窗口截图，例如 `course-dashboard.png`、`agent-thread.png`、`cloud-account.png`。
- 为官网生成压缩版本时保留透明角，避免转成普通 JPG。
- 为截图补 alt text。

## 10. 设计方向建议

### 10.1 总体视觉感觉

- Codex / ZCode 官网式的高级桌面产品发布感：深色、克制、空间感强、真实界面主导。
- 安静、清晰、可信、桌面工具感。
- 带一点未来感，但不要做太强的 AI 炫技风。
- 不要做“模板市场”或“效率神器集合”的感觉。
- 页面应该像一个成熟的桌面产品，而不是一次性营销页。

关键词：

- Dark product launch
- Desktop AI workspace
- Real interface first
- Ambient intelligence
- Local context
- Course graph / file evidence / agent session

### 10.2 视觉参考拆解

参考 Codex 官网时，只借鉴这些原则：

- 大标题极简，品牌名本身就是主角。
- 首屏尽早露出真实产品界面。
- 背景用暗色、柔光、细节纹理和缓慢动效制造空间。
- 页面文案短，功能解释依赖产品截图和具体场景。
- 功能段落像产品演示，不像销售 PPT。

参考 ZCode 官网时，优先借鉴这些结构：

- 顶部导航轻：Logo、文档/更新日志/社区或资源、语言、登录/下载。
- Hero 直接给下载 CTA，不绕太多营销话术。
- 首屏中央放大标题和一句定位，下面立即展示一个大尺寸桌面窗口。
- App 窗口可以使用真实截图，也可以用真实 UI 重构成“可控演示窗口”。
- 页面要保留 Download / Changelog / Docs / Privacy / Terms 这类桌面产品必备入口。
- 下载区可明确 macOS Apple Silicon、macOS Intel、Windows、Linux 的状态。

不要借鉴或复制：

- OpenAI / Codex 的品牌字形、标志、文案、组件样式。
- ZCode 的品牌字形、标志、中文标题、按钮样式、产品 UI 或 coding agent 场景。
- 完全相同的排版比例。
- 官方截图、图标或视觉资产。
- 和 coding agent 强绑定的表达。

最推荐的融合方向：

- Codex 提供“高级、克制、少废话”的发布感。
- ZCode 提供“Electron 桌面 app 首页怎么落地”的页面骨架。
- Brevyn 自己的记忆点必须来自课程结构：Semester -> Course -> Task -> Files -> Agent session。

### 10.3 背景特效要求

背景要有特效，但只做一套主特效，不要每个 section 都换风格。

推荐方案 A：上下文星图

- 深黑到墨蓝背景。
- 细微点阵节点缓慢漂移，节点之间偶尔连成很淡的线。
- 在 Hero 截图背后形成一片弱光场，像 course files、tasks、sources 被组织成上下文网络。
- 适合用 canvas 或 Three.js 实现。

推荐方案 B：扫描式知识网格

- 深色背景上有低透明度网格、横向扫描光、很淡的噪声纹理。
- 滚动时网格有轻微 parallax。
- 更偏桌面工具和技术产品，工程实现更简单，也最接近 ZCode 这种蓝黑发布页的落地方式。

推荐方案 C：流体光带

- 用 CSS radial-gradient 或 WebGL 做慢速流动的蓝绿/青色光带。
- 光带只在 Hero 和过渡段出现，不能满屏抢戏。
- 更接近发布页氛围，但要避免变成普通渐变球。

必须满足：

- 文字对比度足够，背景不能影响阅读。
- 产品截图上方不能覆盖高亮粒子。
- 移动端可以降级为静态背景。
- `prefers-reduced-motion` 下关闭粒子移动、扫描线和 parallax。
- 不要使用大量随机闪烁点、强噪声、强霓虹或快速动画。

### 10.4 色彩建议

基础色：

- Background: `#05070A` 或 `#07090D`
- Surface: `#0E1117`
- Surface elevated: `#151922`
- Text primary: `#F5F7FA`
- Text secondary: `#A7B0C0`

强调色：

- Brevyn cyan: `#7DD3FC`
- Study green: `#8FE3B0`
- Soft violet: `#B9A7FF`
- Warm paper: `#EADFCB` 仅用于小面积资料/引用感，不要主导页面。

注意：

- 不要让页面变成单一蓝紫渐变主题。
- 深色背景必须配真实截图、细线、留白和层级，不能只靠颜色撑质感。
- CTA 可以用浅色实心按钮或低饱和青色按钮，不要用大面积高饱和霓虹。

### 10.5 字体与排版

- H1 要大、短、克制，建议只写 `Brevyn` 或 `Brevyn for course work`。
- 副标题用自然语言解释产品，不要塞满 buzzword。
- 英文官网优先；中文可作为后续本地化版本。
- 页面整体字距保持正常，不要用过度压缩或负字距。
- 功能区标题不要过大，避免每个 section 都像 Hero。
- 文案每屏最多讲一个核心概念。

### 10.6 布局建议

- 第一屏展示产品截图。
- 文案短，功能解释靠真实 UI。
- 使用真实 app 里的面板、文件树、课程结构作为视觉语言。
- CTA 不要过多，第一版最多两个主动作。
- 不要做大量圆角大卡片堆叠。
- 不要做“左文案右插画”的普通 split hero；Hero 要以产品界面为中心。
- 页面 section 可以采用深色全宽 band + constrained inner content。
- 截图可以突破内容宽度，形成沉浸式产品演示。
- Hero 下方可以像 ZCode 一样放一个超宽 app 窗口，窗口高度在桌面端约占 520-720px，移动端改为可横向裁切或重点局部图。
- 首屏 CTA 可以偏“Download for Mac”，如果下载未准备好则改成“Join Waitlist”，但按钮视觉仍要像真实产品入口。

### 10.7 语气

- Practical
- Grounded
- Calm
- Student-friendly
- 不浮夸，不承诺替代学习。

## 11. 首页首版线框

建议首版首页按这个顺序：

1. Hero
   - `Brevyn`
   - A local-first AI workspace for courses, files, and task-focused study sessions.
   - CTA: Download for Mac / Join Waitlist
   - 主视觉：完整 Electron app 截图。
   - 背景：暗色上下文星图或扫描式知识网格。
   - 结构参考：ZCode 式中央大标题 + 下载按钮 + 超宽桌面窗口。

2. Problem
   - 标题：Your AI does not know your semester.
   - 用 3 个短句说明普通聊天缺少 course/task/file context。

3. Product Demo Strip
   - 横向或纵向滚动展示 3 个真实 UI 片段：
     - Course dashboard
     - Task agent session
     - File rail and preview

4. Context Model
   - 解释 Brevyn 的结构：Semester -> Course -> Task -> Files -> Agent session。
   - 可以用细线动态图或真实 UI 标注，不要画抽象流程图。

5. Grounded Work
   - 展示 RAG / citations / file evidence。
   - 文案重点：answers grounded in your own course materials。

6. Local-First Trust
   - 讲本地工作区、桌面 runtime、权限确认、Cloud 只负责账号/套餐/官方能力。

7. Cloud / Provider Entry
   - 轻量说明 Cloud plan、official capabilities、provider configuration。
   - 不要让计费盖过产品本身。

8. Downloads / Early Access
   - 如果安装包可用，展示 macOS Apple Silicon、macOS Intel、Windows、Linux 状态。
   - 如果安装包未准备好，展示 waitlist、contact、early access。
   - 这个 section 可以参考 ZCode 的 all downloads，但不要列不存在的安装包。

9. Final CTA
   - Start with one course. Let Brevyn keep the context with you.
   - Download / Join Waitlist。

## 12. MVP 验收标准

官网第一版完成后，应该能通过这些问题：

1. 一个陌生学生 10 秒内能否知道 Brevyn 是桌面学习工作台？
2. 用户能否看出它不是普通 AI chat？
3. 用户能否理解 course、task、file、agent 的关系？
4. 页面是否用了真实产品截图？
5. CTA 是否明确？
6. 是否避免了“保证成绩”“自动代写”等高风险表达？
7. 是否给下载、waitlist 或购买留下清晰入口？
8. 隐私和本地优先表达是否谨慎、真实？
9. 视觉上是否有 Codex / ZCode 官网式的深色桌面产品发布质感，但没有复制 OpenAI 或 ZCode 品牌？
10. 背景特效是否增强空间感，而不是抢走产品截图注意力？
11. 页面在移动端是否仍能看清标题、CTA 和产品截图？
12. `prefers-reduced-motion` 是否能关闭主要动效？
13. 截图是否完成脱敏、压缩和 alt text？

## 13. 待确认问题

上线官网前需要确认：

1. 第一版 CTA 是下载、waitlist、购买套餐，还是联系团队？
2. Mac 安装包是否已经可公开分发？
3. Windows 是否第一版展示？
4. 是否公开 Brevyn Cloud？
5. 是否公开套餐价格和支付链接？
6. 官网主语言用英文、中文，还是双语？
7. 是否需要面向学校/机构的版本？
8. 是否需要展示具体模型供应商名称？
9. 隐私政策和服务条款是否已经准备？
10. 截图里是否有真实个人信息、课程名、邮箱、token 或敏感文件名需要处理？
11. 背景特效采用 canvas、CSS 还是 Three.js？
12. Hero CTA 最终是 Download for Mac 还是 Join Waitlist？
13. 视觉主语言是否确认采用英文？
14. 是否需要同时做一版给中文用户看的本地化首页？
15. 是否要像 ZCode 一样公开 Docs、Changelog、Terms、Privacy、Support 入口？
16. 是否需要提前准备全平台下载状态，还是第一版只写 Mac / Early Access？

## 14. 给设计/实现方的简短指令

可以直接把下面这段作为给设计师或 AI 建站工具的 brief：

> Build a dark, Codex/ZCode-inspired desktop product launch page for Brevyn, a local-first Electron app for students. The page should feel like a serious AI workspace release, not an education SaaS template. Use the ZCode-style structure of a minimal nav, centered hero headline, direct download or waitlist CTA, and a large desktop app window, while keeping the visual tone closer to Codex: quiet, premium, and product-led. Use real Brevyn screenshots as the main visual evidence. Add one restrained ambient background effect: a slow context-node field, scan-grid, or soft fluid light behind the hero. Keep all motion subtle, support reduced motion, and never let the effect cover the product UI. Explain the product through the structure Semester -> Course -> Task -> Files -> Agent session, with feature sections built around real UI slices. Avoid template marketplaces, generic AI chat language, grade-improvement promises, coding-agent language, and copied OpenAI/Codex/ZCode branding.

最低验收：首屏一眼能看出这是 Brevyn Electron app，不是抽象 AI 网页；背景有可感知但克制的动态特效；真实截图、CTA、产品定位三者都在首屏内成立。

## 15. 建议下一步

1. 从现有截图里选 1 张 Hero，3-5 张功能图。
2. 对截图脱敏、压缩、重命名。
3. 确认 CTA 和语言。
4. 选定背景特效方案：上下文星图、扫描式知识网格、流体光带三选一。
5. 写首页 wireframe。
6. 基于本文档提取最终英文/中文文案。
7. 再开始实现官网页面。
