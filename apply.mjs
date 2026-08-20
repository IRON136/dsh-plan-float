// Re-applies the floating plan window extension to the shipped
// @deepseek-ai/dsh-client-ui-plan client bundle. Safe to run repeatedly:
// it skips when the marker is already present. Use after a dsh npm update
// overwrites the package, or to roll forward from the shipped original.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const PROFILE = join(process.env.USERPROFILE, ".dsh", "profiles", "node_modules", "@deepseek-ai", "dsh-client-ui-plan", "lib", "client.js");
const BLOCK = join(here, "window-block.js.txt");
const MARKER = "//#region plan-window: floating plan window (local extension)";

const current = readFileSync(PROFILE, "utf8");
if (current.includes(MARKER)) {
  console.log("already applied — nothing to do");
  process.exit(0);
}
const block = readFileSync(BLOCK, "utf8");
let out = current;
const anchorBlock = "\t\t//#region lib/types/client/index.js";
if (!out.includes(anchorBlock)) throw new Error("block anchor not found — is this the shipped dsh-client-ui-plan client.js?");
out = out.replace(anchorBlock, block + "\n" + anchorBlock);

const zhAdd = [
  '"win.title": "计划窗口"',
  '"win.chip": "计划"',
  '"win.chip.aria": "打开计划窗口"',
  '"win.minimize": "收起计划窗口"',
  '"mode.title": "计划模式"',
  '"mode.on": "已开启"',
  '"mode.off": "已关闭"',
  '"mode.hint.on": "模型先规划，经你确认后才执行"',
  '"mode.hint.off": "开启后，模型先列出计划等你确认再执行"',
  '"mode.turnOn": "开启计划模式"',
  '"mode.turnOff": "关闭计划模式"',
  '"review.title": "计划待审"',
  '"review.planning": "计划模式进行中——模型正在调研并制定计划，完成后会提交审批"',
  '"review.pending.hint": "计划已提交审批——请在上方审批卡片确认"',
  '"todo.title": "任务计划"',
  '"todo.empty": "模型尚未列出任务计划"',
  '"todo.progress": "{done}/{total} 完成"',
  '"todo.edit": "编辑计划"',
  '"todo.cancel": "取消"',
  '"todo.apply": "应用修改并继续"',
  '"todo.add": "添加"',
  '"todo.add.placeholder": "添加新任务…"',
  '"todo.remove.aria": "删除该任务"',
  '"todo.up.aria": "上移"',
  '"todo.down.aria": "下移"',
  '"todo.confirm": "确认计划，开始执行"',
  '"todo.check.aria": "标记为已完成"',
  '"todo.uncheck.aria": "恢复为待开始"'
].join(",\n\t\t\t");
const enAdd = [
  '"win.title": "Plan Window"',
  '"win.chip": "Plan"',
  '"win.chip.aria": "Open plan window"',
  '"win.minimize": "Minimize plan window"',
  '"mode.title": "Plan mode"',
  '"mode.on": "On"',
  '"mode.off": "Off"',
  '"mode.hint.on": "The model plans first and only executes after your approval"',
  '"mode.hint.off": "Turn on to make the model list a plan and wait for your approval"',
  '"mode.turnOn": "Turn on plan mode"',
  '"mode.turnOff": "Turn off plan mode"',
  '"review.title": "Plan review"',
  '"review.planning": "Planning in progress — the model is researching and drafting the plan, then submits it for review"',
  '"review.pending.hint": "Plan submitted for review — please confirm in the review card above"',
  '"todo.title": "Task plan"',
  '"todo.empty": "The model has not listed a task plan yet"',
  '"todo.progress": "{done}/{total} done"',
  '"todo.edit": "Edit plan"',
  '"todo.cancel": "Cancel"',
  '"todo.apply": "Apply & continue"',
  '"todo.add": "Add"',
  '"todo.add.placeholder": "Add a task…"',
  '"todo.remove.aria": "Remove task"',
  '"todo.up.aria": "Move up"',
  '"todo.down.aria": "Move down"',
  '"todo.confirm": "Confirm plan & start"',
  '"todo.check.aria": "Mark as done"',
  '"todo.uncheck.aria": "Restore to pending"'
].join(",\n\t\t\t");
const dictRe = /(\t\t"chip\.off\.title": "[^"]*"\n\t\t\};)/;
if (!dictRe.test(out)) throw new Error("locale anchor not found");
out = out.replace(dictRe, (m, g1) => g1.replace("\n\t\t};", ",\n\t\t\t" + zhAdd + "\n\t\t};"));
out = out.replace(dictRe, (m, g1) => g1.replace("\n\t\t};", ",\n\t\t\t" + enAdd + "\n\t\t};"));

const injectAnchor = '"locale"\n\t\t];';
if (!out.includes(injectAnchor)) throw new Error("inject anchor not found");
out = out.replace(injectAnchor, '"locale",\n\t\t\t"sessions"\n\t\t];');

const applyAnchor = "}, PlanChip));";
if (!out.includes(applyAnchor)) throw new Error("apply anchor not found");
out = out.replace(applyAnchor, "}, PlanChip));\\n\\t\\t\\t\\ttry {\\n\\t\\t\\t\\t\\tctx.slots.inject(\\\"shell.overlay\\\", () => ctx.slots.register({\\n\\t\\t\\t\\t\\t\\tname: \\\"shell.overlay\\\",\\n\\t\\t\\t\\t\\t\\tid: \\\"plan-window\\\",\\n\\t\\t\\t\\t\\t\\torder: 100,\\n\\t\\t\\t\\t\\t\\tlocale: NS,\\n\\t\\t\\t\\t\\t\\tinject: () => ({ sessions: ctx.sessions })\\n\\t\\t\\t\\t\\t}, PlanWindowGuarded));\\n\\t\\t\\t\\t} catch (error) {\\n\\t\\t\\t\\t\\tconsole.error(\\\"[plan-window] registration failed\\\", error);\\n\\t\\t\\t\\t}");

writeFileSync(PROFILE, out, "utf8");
console.log("applied to", PROFILE);
