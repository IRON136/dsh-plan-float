# dsh-plan-float — dsh 悬浮计划窗口

为 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的 Web GUI 添加一个**可悬浮拖动、实时同步、运行中可改计划**的计划窗口。

> 这是对已安装插件 `@deepseek-ai/dsh-client-ui-plan` 的**本地扩展**（不修改 dsh 核心、不新增系统级组件），通过 dsh 的 client 插件热更新机制生效。

## 特性

- **先计划后执行（可选）**：一键开启「计划模式」（等价 `/plan`）。模型先调研规划，通过 `exit_plan_mode` 提交计划后在**主页面官方审批卡片**确认；审批期间浮窗只显示精简提示，通过后浮窗展示精简任务列表。
- **可悬浮、可拖动、方向自适应**：窗口与收起后的小圆点均可拖动（位置记忆于 localStorage）；展开方向四向自适应——向右/向下放不下时自动向左/向上展开，窗口始终完整显示在浏览器页面范围内；层级置顶，不被任何弹层遮挡。
- **实时任务列表**：模型每次 `todo_write` 后列表实时刷新（状态点 + 进度计数）。条目超长自动两行截断（悬停看全文）；已完成项绿色删除线划掉；进行中蓝色加粗。
- **运行中修改计划**：编辑模式支持改文本、排序、增删、勾选完成/恢复；「应用修改并继续」会通过 `session.prompt(steer)` **打断模型当前回合**，模型逐字采纳新列表并按新计划继续——与在输入框直接打字打断是同一条通道。
- **自动诊断**：渲染出错时浮窗显示错误面板，并把错误自动作为一条消息发回会话，便于快速定位。

## 工作原理

纯客户端插件，复用 dsh 的四个既有机制：

| 机制 | 用途 |
| --- | --- |
| `shell.overlay` 槽位 | 官方预留的帧级浮层，浮窗注册于此 |
| 会话投影（`todos` / `plan`） | 实时读取模型 todo 列表与计划模式状态 |
| PendingInteraction（`question/requested`） | 检测 plan-review 审批状态（审批操作在主页面官方卡片完成） |
| SessionFace API（`command` / `prompt`） | 切换计划模式、以 steer/queue 方式把新计划发给模型 |

部署方式是改写已挂载插件 `@deepseek-ai/dsh-client-ui-plan` 的 `lib/client.js`（profile 中该包为 junction，指向全局安装副本），**无需编译、无需重启服务**；刷新页面即生效。

## 安装 / 部署

前置：本机已通过 `dsh web` 运行 DeepSeek Harness Web GUI（默认 `http://127.0.0.1:3080`）。

**方式一：一键脚本（推荐）**

```bash
node apply.mjs
```

脚本幂等：已应用则跳过；dsh 升级覆盖后可重跑。

**方式二：手动复制**

将 `client.js` 复制到：

```
%USERPROFILE%\.dsh\profiles\node_modules\@deepseek-ai\dsh-client-ui-plan\lib\client.js
```

然后刷新浏览器页面（`Ctrl + Shift + R`）。页面右侧出现「计划」小圆点即部署成功。

## 回滚

把 `client.orig.js`（官方原版备份）复制回上述路径即可。

## 文件结构

| 文件 | 说明 |
| --- | --- |
| `client.js` | 合并后的完整 client bundle（部署产物） |
| `client.orig.js` | 官方原版备份（回滚用） |
| `window-block.js.txt` | 悬浮窗口源码块（单独维护的源） |
| `apply.mjs` | 一键应用/重装脚本（幂等） |
| `package.json` / `LICENSE` / `README.md` | 工程元数据 |

## 已知边界（dsh 原生行为）

- **todo 列表按回合重置**：`turn/start` 事件清空投影，模型每轮开始会重写列表。
- **计划模式切换延迟一个回合生效**：开关状态在下一个 step 被 host 采纳。
- **dsh 升级会覆盖本扩展**：升级后重跑 `node apply.mjs` 即可。

## 兼容性

- 测试环境：dsh 0.1.0-rc.8 / Windows / 现代 Chromium 系浏览器
- 依赖 dsh 的 client 插件体系（`dsh.client`、`shell.overlay`、会话投影、PendingInteraction），需对应版本及以上。

## License

[MIT](./LICENSE)
