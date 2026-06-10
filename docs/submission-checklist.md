# Submission Summary And Checklist

整理日期：2026-06-11

这份文档用于提交前汇总 `plan.md` 要求的交付内容，并记录从项目开始到当前版本遇到的问题、解决过程和可写入提交材料的内容。当前项目已经完成核心单页工具、价格来源说明、英文 README、测试、构建验证、公网部署、中英文切换、价格差异列、桌面表格适配、手机横屏布局修复，并采纳一轮外部 AI 优化审查中的低风险性能、可访问性、测试和类型安全建议；还需要补齐公开复盘博客链接，以及个人数字身份里无法从仓库确认的账号链接。

## 1. 数字身份链接

| 项目 | 当前填写 |
| --- | --- |
| GitHub 主页 | https://github.com/Torturedman |
| 个人博客 / 技术写作主页 | 待补充；如果没有，需要如实填写“没有”，或先发布本次复盘文章后填写链接 |
| X / Twitter 或其他活跃技术社区账号 | 待补充；如果没有，需要如实填写“没有” |
| 最拿得出手的作品链接 | https://github.com/Torturedman/AI-API-Cost-Calculator |

## 2. 项目交付链接

| 项目 | 当前状态 |
| --- | --- |
| GitHub 公开仓库 | https://github.com/Torturedman/AI-API-Cost-Calculator |
| 线上 URL | https://ai-api-cost-calculator-rouge.vercel.app/ |
| 复盘博客链接 | 待发布；下方已写好可发布草稿 |
| AI 协作记录 | 已有：[`docs/ai-collaboration-log.md`](ai-collaboration-log.md) |
| 官方价格来源 | 已有：[`docs/pricing-sources.md`](pricing-sources.md) |

本地运行命令：

```bash
npm install
npm run dev
npm run test -- --run
npm run build
```

部署建议配置：

```text
Build command: npm run build
Output directory: dist
Install command: npm install
```

## 3. 核心项目说明

本项目选择 `plan.md` 中的方向 A：AI 模型价格计算器。它是一个静态 Vite + React + TypeScript 单页应用，不需要后端、数据库、登录系统或 API key。

用户输入平均输入 token 数、平均输出 token 数、每天请求量、每月使用天数后，页面会按模型估算单次请求成本、每日成本和每月成本，并按月成本从低到高排序。

当前覆盖的供应商和模型：

| 供应商 | 模型 |
| --- | --- |
| OpenAI | GPT-5.5、GPT-5.4 mini、GPT-5.4 nano |
| Anthropic | Claude Opus 4.8、Claude Sonnet 4.6、Claude Haiku 4.5 |
| Google Gemini | Gemini 2.5 Pro、Gemini 2.5 Flash、Gemini 2.5 Flash-Lite |

价格数据按仓库当前记录于 2026-06-10 查询，来源是官方价格页。项目只计算标准文本 input/output token 价格，不覆盖缓存输入、batch、priority、regional、tool-use、grounding、媒体输入输出、企业折扣等分支价格。

## 4. `plan.md` 要求对照

| 要求 | 当前状态 | 说明 |
| --- | --- | --- |
| 公网可访问 | 已完成 | Vercel 生产 URL 已返回 HTTP 200：https://ai-api-cost-calculator-rouge.vercel.app/ |
| GitHub 公开仓库 | 已完成 | 仓库已推送到 GitHub，且有多次语义化 commit |
| 不要一次性提交 | 已完成 | 实现过程中按小步骤提交并 push，例如 source audit、scaffold、pricing data、cost engine、validation、UI、style、docs |
| 英文 README | 已完成 | README 包含项目说明、本地运行、技术栈、部署方式、已知限制 |
| 移动端不崩 | 已完成，建议最终真机复验 | CSS 已做响应式布局、窄屏表格横向滚动，并修复手机竖屏切横屏时的文字挤压问题 |
| 不提交 API key | 已完成 | 项目没有运行时 API 调用，也没有 `.env` 或 key 类配置 |
| 官方价格来源和查询日期 | 已完成 | 见 `docs/pricing-sources.md` |
| AI 协作记录 10 行以内 | 已完成 | 见 `docs/ai-collaboration-log.md`，下方也有扩展说明 |
| 500 字以上复盘博客 | 草稿已写，待公开发布 | 下方草稿可直接整理发布 |
| 5 行自评 | 已完成 | 见本文档第 8 节 |

## 5. AI 协作记录

1. 使用 Codex 阅读需求、拆分计划，并做目录结构、数据边界、测试边界和部署风险审查。
2. 使用 Codex 查询并整理 OpenAI、Anthropic、Google Gemini 的官方价格来源，形成 `docs/pricing-sources.md`。
3. 使用 Codex 按 TDD 小步实现：模型数据、成本计算、输入校验、React UI、响应式样式、README 和文档。
4. AI 一开始给出的 Vite 7 / 较新 jsdom 组合与本地 Node 20.14.0 不完全匹配，构建时出现 engine warning，后来改为 Vite 6、Vitest 3、jsdom 26 等兼容版本。
5. Vitest 默认 worker 在当前环境里出现内存不稳定，最后通过 `vite.config.ts` 的 `singleThread: true` 固定单线程测试。
6. 有一个 UI 测试最初写了过于精确的文本匹配，React 渲染拆分文本后断言失败，后来改成更贴近用户可见结果的断言。
7. 使用 Claude Code 接入的 DeepSeek v4 模型审查代码，重点检查性能、代码质量、可访问性、测试边界和开发体验。
8. 根据 DeepSeek v4 审查结果完成本轮修复：缓存 USD formatter、静态化价格来源、提取差价格式化 helper、补差价单测、清理验证错误和启用更严格索引检查。
9. 公网部署阶段先做 Vercel 方案和风险清单，后续用 AI 辅助补了中英文切换、`Vs cheapest` 差价列、桌面表格列宽优化和手机横屏断点修复。

## 6. 遇到的问题和处理

| 问题 | 怎么发现 | 怎么处理 |
| --- | --- | --- |
| 需求范围容易发散 | `plan.md` 同时要求公网、文档、AI 记录、博客、自评和工程实现 | 先写详细计划，把功能边界锁定为静态 AI API 成本计算器，不做后端、登录、数据库和实时账单接入 |
| 价格数据边界不清 | 不同供应商有缓存、batch、长上下文、媒体、企业折扣等多种计费分支 | 只纳入标准文本 input/output token 价格，并在 `docs/pricing-sources.md` 和 README 明确排除项 |
| 依赖版本和 Node 版本不匹配 | `npm install` / `npm run build` 出现 engine warning | 固定到 Vite 6.4.3、`@vitejs/plugin-react` 4、Vitest 3、jsdom 26 |
| 测试 worker 内存不稳定 | Vitest 默认运行方式出现不稳定 / OOM 风险 | 配置 Vitest threads pool 为单线程 |
| UI 测试断言过脆 | 测试失败，文本没有按预期单一节点出现 | 改为检查可见结果、行顺序、链接 href 等更稳定的行为 |
| GitHub push 连接重置 | 普通 HTTPS push 偶发失败 | 使用 HTTP/1.1 参数完成 push |
| 后台 dev server 不常驻 | 前台 `npm run dev` 可用，但后台进程退出 | 不把本地 server 状态写成已运行，只保留可复现启动命令 |
| Vercel 访问验证受环境限制 | 普通网络请求曾出现超时或受限 | 使用明确的生产 URL，并通过 HTTP 200 结果确认公网匿名访问可用 |
| 桌面端 Monthly 列需要横向滑动 | 查看月成本列时用户需要轻微横向滚动 | 调整表格列宽、容器和桌面断点，让电脑宽度下能直接看到关键月成本列 |
| 最便宜差价不够直观 | 只看每月价格时不能立即知道比最低价贵多少 | 新增 `Vs cheapest` / `与最低价差` 列，最低价显示 Included，其他模型显示与最低价的月度差额 |
| 手机竖屏切横屏文字挤压 | 用户在手机测试中发现横屏后文本挤在一起 | 提高响应式布局断点到 `960px`，让中等宽度和手机横屏继续使用更稳的单列布局 |
| PowerShell 中文显示可能乱码 | 直接读取中文 Markdown 时终端出现 mojibake | 读取文档时使用 `-Encoding UTF8`，文档本身保持 UTF-8 Markdown |
| 外部 AI 优化建议需要筛选 | 另一份 AI 审查同时给出性能、代码质量、DX 和功能增强建议 | 按项目约束只采纳低风险项：缓存 `Intl.NumberFormat`、静态化价格来源、显式空表处理、输入 `id/htmlFor`、差价 helper 单测、验证错误去重、`noUncheckedIndexedAccess`；暂缓 debounce、暗色模式、localStorage 和 ESLint 配置 |
| 差价列逻辑只有集成覆盖 | `formatMonthlyDifference` 原来写在 `ModelTable` 内部，只能通过 DOM 间接测试 | 提取到 `src/lib/format.ts`，新增 `src/__tests__/format.test.ts` 覆盖最低价、正差价和乱序输入 |
| 索引访问可能隐藏 undefined | 启用 `noUncheckedIndexedAccess` 后，测试里的 `rows[0]` / `rows[1]` 暴露潜在 undefined | 增加 `requireRow` 测试 helper，让数组访问先显式校验存在性 |

## 7. 复盘博客草稿

标题：用 AI 做一个 AI API 价格计算器：真正麻烦的不是写 UI

这次项目我选的是 AI 模型价格计算器。原因很简单：AI API 的价格页信息很多，而且不同供应商的计价口径不完全一致。只看单个模型价格时还好，一旦想估算“每天多少请求、每次多少输入输出 token、一个月大概多少钱”，手算就很容易出错。这个小工具的目标是把 OpenAI、Anthropic 和 Google Gemini 的标准文本 token 价格整理成统一口径，让用户输入一个使用场景后，直接看到各模型的单次、每日、每月成本对比，并且能看到每个模型比当前最低价每月贵多少。

实现上我没有做后端，也没有接任何供应商 API。整个应用是 Vite + React + TypeScript 的静态单页应用。价格数据放在本地 typed data 文件里，计算逻辑放在纯函数里，输入校验和格式化也单独拆出来。这样做的好处是边界清楚：数据从官方页面人工核对，计算逻辑可以用单元测试验证，UI 只负责展示和交互，不需要 API key，也没有泄露密钥的风险。

AI 帮我最快的地方是拆计划和补样板代码。比如一开始它把任务拆成价格来源审计、Vite 脚手架、数据模块、计算函数、校验函数、UI、样式、文档和部署几个阶段，这让我可以每完成一小步就 commit 并 push，而不是最后一次性上传。成本计算和校验规则也适合让 AI 先给测试，再根据测试写实现，因为公式和边界都很明确。

AI 也确实坑了我几次。第一次是依赖版本，它默认给了较新的 Vite / jsdom 组合，但本地 Node 是 20.14.0，安装和构建时出现 engine warning。这个问题不是看代码能看出来的，是跑命令才发现的。最后我把依赖固定到和当前 Node 兼容的版本。第二次是测试运行稳定性，Vitest 默认 worker 在当前环境下有内存不稳定风险，最后改成单线程。第三次是 UI 测试写得太死，断言假设某段文字会作为完整节点出现，但 React 实际渲染后并不稳定，于是改成检查用户真正关心的行为，比如表格是否按月成本排序、source link 是否存在、修改输入后月成本是否变化。第四次是部署和网络操作，GitHub HTTPS push 偶发连接重置，Vercel URL 检查也受当前环境网络限制，最后通过 HTTP/1.1 push 和 HTTP 200 验证把结果确认下来。

这次最重要的经验是：AI 可以很快把项目推起来，但每一步都要有验证点。价格数据要写明来源和查询日期，计算公式要有测试，输入边界要测，构建要跑，推送要确认远程 HEAD。项目后半段也说明了一个问题：可用性不是“页面能显示”就结束。中英文切换让评审和中文用户都能直接使用；差价列让用户更快判断省钱空间；桌面端要避免关键 Monthly 列被藏起来；手机从竖屏切横屏时不能因为断点设计不合理而挤压文本。下次如果再做类似任务，我会更早把部署、真实设备 QA 和提交文档并行推进，因为“本地能跑”和“别人点开能访问、看得懂、用得顺”是两回事。对这类筛选项目来说，一个朴素但能打开、能复现、有 commit 历史、有问题记录的工具，比一个看起来漂亮但没有验证的页面更可信。

## 8. 5 行自评

1. 最满意的一点：从价格来源、计算逻辑、输入校验、UI 到部署都按小步提交，并且测试覆盖了核心行为。
2. 最心虚的一点：供应商价格变化很快，非标准计费分支很多，当前只覆盖标准文本 token 场景。
3. 再给 8 小时：优先发布复盘博客，再加导出 CSV、分享当前估算场景、模型筛选和截图级 E2E 视觉验收。
4. 卡得最久的地方：本地依赖版本、Vitest worker、GitHub push 和部署访问验证，累计大约 1 到 1.5 小时。
5. 入职第一周希望提供：部署平台权限、推荐的供应商/模型范围、以及价格口径是否要覆盖缓存和 batch 的明确边界。

## 9. 最终提交前待补

1. 生产 URL 已用 HTTP 200 验证；最终提交前仍建议本人用匿名窗口再打开一次，确认不需要登录。
2. 手机横屏挤压已修复；最终提交前仍建议用真实手机或 360px / 横屏视口再走一次核心流程。
3. 把第 7 节复盘草稿公开发布，填入博客链接。
4. 补齐个人博客、X/Twitter 或其他技术社区账号；没有就如实填写“没有”。

## 10. 可写入提交说明的项目总结

- 已实现：AI API 成本计算器、官方价格来源说明、输入校验、模型成本排序、中英文切换、最低价差异列、响应式桌面和移动布局、Vercel 公网部署。
- 已优化：缓存 USD formatter、减少 render 时重复 sources 计算、提取差价格式化 helper、补充差价单元测试、显式处理空表、补充输入 `id/htmlFor`、清理验证错误重复文案、启用更严格索引访问检查。
- 已验证：核心单元测试和 UI 测试通过，生产构建通过，公网 URL 返回 HTTP 200。
- 主要工程取舍：使用静态数据和纯前端部署，避免 API key、后端、数据库和账号系统带来的额外风险。
- 主要风险说明：价格数据会随供应商变化，需要定期人工复核；当前不覆盖缓存、batch、媒体、长上下文、企业折扣等非标准价格。
- AI 使用方式：AI 负责拆计划、生成代码草案、补测试和文档；所有关键结论通过测试、构建、HTTP 访问和 Git 远程状态验证。

## 11. 本地验证记录

提交本文档前已运行：

```bash
npm run test -- --run
npm run build
```

验证结果：

- `npm run test -- --run` 通过：5 个测试文件、21 个测试全部通过。
- `npm run build` 通过：TypeScript 编译和 Vite production build 均成功。
- `plan.md` 保持未跟踪状态，除非明确需要提交原始题目文档。
