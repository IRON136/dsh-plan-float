window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-plan",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		//#region \0dsh-css:/home/runner/work/deepseek-harness/deepseek-harness/packages/client/ui-plan/src/client/PlanModeControl.module.css.mjs
		const css = ".rS3zOq_wrap{align-items:center;gap:6px;display:inline-flex}.rS3zOq_chip{background:var(--dsw-alias-state-warn-tertiary);min-width:34px;color:var(--dsw-alias-state-warn-label);cursor:pointer;border:none;border-radius:999px;align-items:center;gap:4px;padding:2px 8px;font-size:13px;font-weight:500;line-height:20px;display:inline-flex}.rS3zOq_chip:hover:not(:disabled){color:var(--dsw-alias-state-warn-primary)}.rS3zOq_chip:focus-visible{outline:2px solid var(--dsw-alias-state-warn-label);outline-offset:2px}.rS3zOq_chip:disabled{opacity:.6;cursor:default}.rS3zOq_close{color:currentColor;align-items:center;display:inline-flex}.rS3zOq_error{color:var(--dsw-alias-state-error-primary);font-size:12px;line-height:18px}";
		const tagId = "@deepseek-ai/dsh-client-ui-plan/PlanModeControl.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-plan";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var PlanModeControl_module_css_default = {
			"chip": "rS3zOq_chip",
			"close": "rS3zOq_close",
			"error": "rS3zOq_error",
			"wrap": "rS3zOq_wrap"
		};
		//#endregion
		//#region lib/types/client/PlanModeControl.js
		/**
		* Plan-mode status over the host-computed `plan` projection. The chip renders
		* only while the effective target is plan mode (`pending ? !active : active`
		* — a folded host value, not client optimism) and executes /plan off.
		*/
		function PlanChip({ useProjection, locked, exitPlanMode, t }) {
			const plan = useProjection("plan");
			const [leaving, setLeaving] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)(null);
			const aliveRef = (0, react.useRef)(true);
			(0, react.useEffect)(() => {
				aliveRef.current = true;
				return () => {
					aliveRef.current = false;
				};
			}, []);
			if (plan === void 0) return null;
			if (!(plan.pending ? !plan.active : plan.active)) return null;
			const off = () => {
				setLeaving(true);
				setError(null);
				exitPlanMode().then((failure) => {
					if (!aliveRef.current) return;
					setLeaving(false);
					setError(failure);
				}, (reason) => {
					if (!aliveRef.current) return;
					setLeaving(false);
					setError(reason instanceof Error ? reason.message : String(reason));
				});
			};
			return (0, react_jsx_runtime.jsxs)("span", {
				className: PlanModeControl_module_css_default.wrap,
				children: [(0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: PlanModeControl_module_css_default.chip,
					"aria-label": t("chip.on.aria"),
					title: t("chip.on.title"),
					disabled: locked || leaving,
					onClick: off,
					children: ["Plan", (0, react_jsx_runtime.jsx)("span", {
						className: PlanModeControl_module_css_default.close,
						"aria-hidden": true,
						children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCloseFill14, { size: 12 })
					})]
				}), error !== null && (0, react_jsx_runtime.jsx)("span", {
					className: PlanModeControl_module_css_default.error,
					role: "status",
					title: error,
					children: "failed to exit plan mode"
				})]
			});
		}
		//#endregion
		//#region lib/types/client/locales.js
		/** `plan` namespace dictionaries (the composer plan chip's copy). */
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"chip.on.aria": "plan mode 已开启，按下关闭",
			"chip.on.title": "plan mode 已开启 — 点击关闭（/plan off）",
			"chip.off.aria": "plan mode 已关闭，按下开启",
			"chip.off.title": "plan mode 已关闭 — 点击开启（/plan）",
			"win.title": "计划窗口",
			"win.chip": "计划",
			"win.chip.aria": "打开计划窗口",
			"win.minimize": "收起计划窗口",
			"mode.title": "计划模式",
			"mode.on": "已开启",
			"mode.off": "已关闭",
			"mode.hint.on": "模型先规划，经你确认后才执行",
			"mode.hint.off": "开启后，模型先列出计划等你确认再执行",
			"mode.turnOn": "开启计划模式",
			"mode.turnOff": "关闭计划模式",
			"review.title": "计划待审",
			"review.planning": "计划模式进行中——模型正在调研并制定计划，完成后会提交审批",
			"review.pending.hint": "计划已提交审批——请在上方审批卡片确认",
			"todo.title": "任务计划",
			"todo.empty": "模型尚未列出任务计划",
			"todo.progress": "{done}/{total} 完成",
			"todo.edit": "编辑计划",
			"todo.cancel": "取消",
			"todo.apply": "应用修改并继续",
			"todo.add": "添加",
			"todo.add.placeholder": "添加新任务…",
			"todo.remove.aria": "删除该任务",
			"todo.up.aria": "上移",
			"todo.down.aria": "下移",
			"todo.confirm": "确认计划，开始执行",
			"todo.check.aria": "标记为已完成",
			"todo.uncheck.aria": "恢复为待开始"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"chip.on.aria": "Plan mode on, press to turn off",
			"chip.on.title": "Plan mode on — click to turn off (/plan off)",
			"chip.off.aria": "Plan mode off, press to turn on",
			"chip.off.title": "Plan mode off — click to turn on (/plan)",
			"win.title": "Plan Window",
			"win.chip": "Plan",
			"win.chip.aria": "Open plan window",
			"win.minimize": "Minimize plan window",
			"mode.title": "Plan mode",
			"mode.on": "On",
			"mode.off": "Off",
			"mode.hint.on": "The model plans first and only executes after your approval",
			"mode.hint.off": "Turn on to make the model list a plan and wait for your approval",
			"mode.turnOn": "Turn on plan mode",
			"mode.turnOff": "Turn off plan mode",
			"review.title": "Plan review",
			"review.planning": "Planning in progress — the model is researching and drafting the plan, then submits it for review",
			"review.pending.hint": "Plan submitted for review — please confirm in the review card above",
			"todo.title": "Task plan",
			"todo.empty": "The model has not listed a task plan yet",
			"todo.progress": "{done}/{total} done",
			"todo.edit": "Edit plan",
			"todo.cancel": "Cancel",
			"todo.apply": "Apply & continue",
			"todo.add": "Add",
			"todo.add.placeholder": "Add a task…",
			"todo.remove.aria": "Remove task",
			"todo.up.aria": "Move up",
			"todo.down.aria": "Move down",
			"todo.confirm": "Confirm plan & start",
			"todo.check.aria": "Mark as done",
			"todo.uncheck.aria": "Restore to pending"
		};
		//#endregion
		//#region plan-window: floating plan window (local extension)
		/** Plan window CSS injected once per page. */
		const pwzCss = ".pwz_root{position:fixed;z-index:2147483000;display:flex;flex-direction:column;width:340px;max-height:min(560px,calc(100vh - 150px));background:var(--dsw-specific-input-major);border:1px solid var(--dsw-alias-border-l2);border-radius:12px;box-shadow:var(--dsw-shadow-lv3);color:var(--dsw-alias-label-primary);font-family:var(--dsw-font-family);font-size:13px;line-height:20px;overflow:hidden;pointer-events:auto}" +
			".pwz_chip{position:fixed;z-index:2147483000;display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:var(--dsw-specific-input-major);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;box-shadow:var(--dsw-shadow-lv2);color:var(--dsw-alias-label-primary);cursor:pointer;font-family:var(--dsw-font-family);font-size:13px;line-height:20px;pointer-events:auto;user-select:none}" +
			".pwz_chip:hover{background:var(--dsw-alias-interactive-bg-hover)}.pwz_header{display:flex;align-items:center;gap:6px;padding:8px 10px;cursor:move;user-select:none;border-bottom:1px solid var(--dsw-alias-border-l1);touch-action:none}" +
			".pwz_title{flex:1;min-width:0;font-weight:600;display:flex;align-items:center;gap:6px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.pwz_body{overflow-y:auto;padding:10px 12px 12px;display:flex;flex-direction:column;gap:10px}" +
			".pwz_section{border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:8px 10px;background:var(--dsw-alias-bg-layer-1);display:flex;flex-direction:column;gap:6px}.pwz_sectionTitle{display:flex;align-items:center;gap:6px;font-weight:600;font-size:12px;color:var(--dsw-alias-label-secondary)}" +
			".pwz_hint{font-size:12px;color:var(--dsw-alias-label-tertiary)}.pwz_error{font-size:12px;color:var(--dsw-alias-state-error-primary)}.pwz_todoItem{display:flex;align-items:flex-start;gap:6px;padding:3px 0}.pwz_todoContent{flex:1;min-width:0;overflow-wrap:anywhere;white-space:pre-wrap;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}" +
			".pwz_status{flex:none;margin-top:7px;width:6px;height:6px;border-radius:999px}.pwz_statusPending{background:var(--dsw-alias-label-tertiary)}.pwz_statusInProgress{background:var(--dsw-alias-state-business-primary)}.pwz_statusCompleted{background:var(--dsw-alias-state-success-primary)}" +
			".pwz_todoPending{color:var(--dsw-alias-label-secondary)}.pwz_todoInProgress{color:var(--dsw-alias-label-primary);font-weight:500}.pwz_todoCompleted{color:var(--dsw-alias-state-success-primary);text-decoration:line-through;opacity:.6}" +
			".pwz_iconBtn{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border:none;border-radius:6px;background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer;padding:0}.pwz_iconBtn:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.pwz_iconBtn:disabled{opacity:.4;cursor:default}" +
			".pwz_input{flex:1;min-width:0;box-sizing:border-box;background:var(--dsw-specific-input-major);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;color:var(--dsw-alias-label-primary);padding:4px 8px;font-size:13px;font-family:var(--dsw-font-family);outline:none}.pwz_input:focus{border-color:var(--dsw-alias-state-business-primary)}" +
			".pwz_textarea{width:100%;box-sizing:border-box;background:var(--dsw-specific-input-major);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;color:var(--dsw-alias-label-primary);padding:6px 8px;font-size:13px;font-family:var(--dsw-font-family);outline:none;resize:vertical;min-height:52px}" +
			".pwz_actions{display:flex;justify-content:flex-end;gap:6px;flex-wrap:wrap;align-items:center}.pwz_reviewBody{max-height:220px;overflow-y:auto;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:8px;margin:2px 0;background:var(--dsw-alias-bg-base)}" +
			".pwz_badge{flex:none;min-width:16px;height:16px;padding:0 5px;border-radius:999px;background:var(--dsw-alias-state-warn-primary);color:var(--dsw-alias-label-primary-inverted);font-size:11px;line-height:16px;text-align:center;box-sizing:border-box}" +
			".pwz_modePill{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:999px;font-size:12px;line-height:18px;font-weight:500;flex:none}.pwz_modeOn{background:var(--dsw-alias-state-warn-tertiary);color:var(--dsw-alias-state-warn-label)}.pwz_modeOff{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-tertiary)}" +
			".pwz_editRow{display:flex;align-items:center;gap:4px}.pwz_editRow .pwz_input{flex:1}.pwz_addRow{display:flex;align-items:center;gap:4px}.pwz_crash{border:1px solid var(--dsw-alias-state-error-secondary);border-radius:10px;padding:8px 10px;background:var(--dsw-alias-bg-layer-1);display:flex;flex-direction:column;gap:4px}.pwz_crashText{font-size:12px;color:var(--dsw-alias-state-error-primary);overflow-wrap:anywhere;white-space:pre-wrap;max-height:160px;overflow-y:auto}";
		const pwzTagId = "@deepseek-ai/dsh-client-ui-plan/PlanWindow.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(pwzTagId) + "]") === null) {
			const pwzTag = document.createElement("style");
			pwzTag.dataset.plugin = "@deepseek-ai/dsh-client-ui-plan";
			pwzTag.dataset.pluginCss = pwzTagId;
			pwzTag.textContent = pwzCss;
			document.head.appendChild(pwzTag);
		}
		/** Persisted window position under localStorage. */
		const PWZ_LS_POS = "dsh.planWindow.pos";
		/** Persisted open state under localStorage. */
		const PWZ_LS_OPEN = "dsh.planWindow.open";
		function pwzLoadPos() {
			try {
				const raw = localStorage.getItem(PWZ_LS_POS);
				if (raw === null) return null;
				const parsed = JSON.parse(raw);
				if (typeof parsed.x === "number" && typeof parsed.y === "number") return { x: parsed.x, y: parsed.y };
			} catch (_e) {}
			return null;
		}
		function pwzSavePos(pos) {
			try { localStorage.setItem(PWZ_LS_POS, JSON.stringify(pos)); } catch (_e) {}
		}
		function pwzLoadOpen() {
			try { return localStorage.getItem(PWZ_LS_OPEN) === "1"; } catch (_e) { return false; }
		}
		function pwzSaveOpen(open) {
			try { localStorage.setItem(PWZ_LS_OPEN, open ? "1" : "0"); } catch (_e) {}
		}
		function pwzViewport() {
			return typeof window !== "undefined" && typeof window.innerWidth === "number" && typeof window.innerHeight === "number"
				? { vw: window.innerWidth, vh: window.innerHeight }
				: { vw: 1280, vh: 800 };
		}
		function pwzDefaultPos() {
			const { vw } = pwzViewport();
			return { x: Math.max(12, vw - 356), y: 96 };
		}
		/** Keep an anchor usable: fully off-screen positions reset to the default. */
		function pwzSanitizePos(p, w, h) {
			const { vw, vh } = pwzViewport();
			if (p.x + (w ?? 72) < 0 || p.x > vw || p.y + (h ?? 36) < 0 || p.y > vh) return pwzDefaultPos();
			return p;
		}
		function pwzClampPos(x, y, w, h) {
			const { vw, vh } = pwzViewport();
			const width = w === void 0 ? 340 : w;
			const height = h === void 0 ? 480 : h;
			return {
				x: Math.min(Math.max(x, 0), vw - width),
				y: Math.min(Math.max(y, 0), vh - height)
			};
		}
		/** Narrow the snapshot to the pending plan review (exit_plan_mode), or undefined. */
		function pwzReviewOf(snap) {
			if (snap === void 0 || snap === null) return void 0;
			const pending = snap.pending;
			if (!Array.isArray(pending)) return void 0;
			for (const wait of pending) {
				if (wait.kind !== "question") continue;
				const questions = wait.payload && wait.payload.questions;
				if (!Array.isArray(questions) || questions.length !== 1) continue;
				const question = questions[0];
				if (question === void 0 || question.intent === void 0 || question.intent.kind !== "plan-review") continue;
				const approve = (question.options ?? []).find((option) => option.label === question.intent.approve);
				if (approve === void 0) continue;
				const decline = (question.options ?? []).find((option) => option.label !== question.intent.approve);
				return {
					key: wait.key,
					wait,
					id: question.id,
					plan: question.detail,
					question: question.question,
					approve,
					decline
				};
			}
			return void 0;
		}
		/** Format a todo list into the numbered lines the steer prompt carries. */
		function pwzFormatTodos(todos) {
			return todos.map((item, index) => `${index + 1}. [${item.status}] ${item.content}`).join("\n");
		}
		/**
		* Floating plan window: plan-mode toggle, the exit_plan_mode review, and a
		* live todo list whose pending items the user may edit before sending the
		* updated plan back to the model.
		*/
		/** Error boundary: shows the failure instead of taking the whole plan plugin down, and reports it into the session so the model can see it. */
		class PlanWindowErrorBoundary extends react.Component {
			constructor(props) {
				super(props);
				this.state = { error: null };
			}
			static getDerivedStateFromError(error) {
				return { error };
			}
			componentDidCatch(error) {
				const detail = error instanceof Error ? (error.stack || error.message) : String(error);
				console.error("[plan-window] render error:", detail);
				try {
					const sessions = this.props.sessions;
					if (sessions !== void 0 && sessions.list !== void 0) {
						const current = sessions.list.getSnapshot().current;
						const binding = current === void 0 ? void 0 : sessions.binding(current);
						if (binding !== void 0) {
							binding.session.prompt([{ type: "text", text: "[计划窗口] 渲染错误，请修复计划窗口插件：\n" + detail }], "queue").catch(() => {});
						}
					}
				} catch (_e) {}
			}
			render() {
				if (this.state.error !== null) {
					const message = this.state.error instanceof Error ? this.state.error.message : String(this.state.error);
					return react_jsx_runtime.jsx("div", {
						className: "pwz_crash",
						"data-plan-window-error": true,
						children: [react_jsx_runtime.jsx("div", { className: "pwz_sectionTitle", children: "[计划窗口] 出错" }), react_jsx_runtime.jsx("div", { className: "pwz_crashText", children: message })]
					});
				}
				return this.props.children;
			}
		}
		/** Guards against missing runtime props (root-scope seats may vary) and wraps the window in the error boundary. */
		function PlanWindowGuarded(props) {
			if (typeof props.useSessions !== "function" || props.sessions === void 0 || typeof props.sessions.binding !== "function") {
				console.error("[plan-window] missing runtime props", { hasUseSessions: typeof props.useSessions, hasSessions: props.sessions !== void 0 });
				return null;
			}
			return react_jsx_runtime.jsx(PlanWindowErrorBoundary, {
				sessions: props.sessions,
				children: react_jsx_runtime.jsx(PlanWindow, props)
			});
		}
		function PlanWindow({ useSessions, sessions, t }) {
			const tr = typeof t === "function" ? t : (key) => key;
			const listState = useSessions((state) => state);
			const sessionId = listState.current;
			const binding = react.useMemo(() => sessionId === void 0 ? void 0 : sessions.binding(sessionId), [sessionId, sessions]);
			const [snap, setSnap] = react.useState(() => binding === void 0 ? null : binding.session.getSnapshot());
			const [todos, setTodos] = react.useState(null);
			const [plan, setPlan] = react.useState(null);
			const [open, setOpen] = react.useState(pwzLoadOpen());
			const [minimized, setMinimized] = react.useState(!pwzLoadOpen());
			const [pos, setPosState] = react.useState(pwzLoadPos() ?? pwzDefaultPos());
			const posRef = react.useRef(pos);
			const setPos = react.useCallback((next) => {
			  posRef.current = next;
			  setPosState(next);
			}, []);
			const [editing, setEditing] = react.useState(false);
			const [draft, setDraft] = react.useState([]);
			const [newItem, setNewItem] = react.useState("");
			const [busy, setBusy] = react.useState(false);
			const [error, setError] = react.useState(null);
			const rootRef = react.useRef(null);
			const [measuredH, setMeasuredH] = react.useState(null);
			react.useEffect(() => {
			  if (binding === void 0) {
			    setSnap(null);
			    setTodos(null);
			    setPlan(null);
			    return;
			  }
			  const face = binding.session;
			  const readSnap = () => setSnap(face.getSnapshot());
			  readSnap();
			  const unsubSnap = face.subscribe(readSnap);
			  const todosFace = face.projections.faceOf("todos");
			  const readTodos = () => setTodos(todosFace.getSnapshot());
			  readTodos();
			  const unsubTodos = todosFace.subscribe(readTodos);
			  const planFace = face.projections.faceOf("plan");
			  const readPlan = () => setPlan(planFace.getSnapshot());
			  readPlan();
			  const unsubPlan = planFace.subscribe(readPlan);
			  return () => {
			    unsubSnap();
			    unsubTodos();
			    unsubPlan();
			  };
			react.useLayoutEffect(() => {
			  if (minimized || !open) return;
			  const el = rootRef.current;
			  if (el === null) return;
			  setMeasuredH(el.offsetHeight);
			}, [open, minimized, todos, plan, reviewKey, editing, sessionId]);
			}, [binding]);
			react.useEffect(() => {
			  setEditing(false);
			  setError(null);
			}, [sessionId]);
			const review = pwzReviewOf(snap);
			
			if (binding === void 0) return null;
			const effectivePlan = plan === null || plan === void 0 ? false : plan.pending ? !plan.active : plan.active;
			const { vw: pwzVw, vh: pwzVh } = pwzViewport();
			const winH = measuredH === null ? 460 : measuredH;
			const expandLeft = pos.x + 340 > pwzVw - 8;
			const expandUp = pos.y + winH > pwzVh - 8;
			const windowX = expandLeft ? Math.max(8, pos.x - 340 + 72) : pos.x;
			const windowY = expandUp ? Math.min(Math.max(8, pos.y + 36 - winH), pwzVh - winH - 8) : pos.y;
			const todoList = Array.isArray(todos) ? todos : [];
			const counts = {
			  pending: todoList.filter((item) => item.status === "pending").length,
			  inProgress: todoList.filter((item) => item.status === "in_progress").length,
			  completed: todoList.filter((item) => item.status === "completed").length
			};
			const running = snap === null || snap === void 0 ? false : snap.running === true;
			const editablePending = todoList.some((item) => item.status === "pending");
			const allPending = todoList.length > 0 && counts.pending === todoList.length;
			const run = (action) => {
			  setBusy(true);
			  setError(null);
			  let promise;
			  try {
			    promise = action();
			  } catch (cause) {
			    setBusy(false);
			    setError(cause instanceof Error ? cause.message : String(cause));
			    return;
			  }
			  promise.then(() => {
			    setBusy(false);
			  }, (cause) => {
			    setBusy(false);
			    setError(cause instanceof Error ? cause.message : String(cause));
			  });
			};
			const togglePlanMode = () => {
			  if (binding === void 0) return;
			  run(() => binding.session.command(effectivePlan ? "/plan off" : "/plan").then((result) => {
			    if (!result.ok) throw new Error(result.error.message);
			    if (!result.value.matched) throw new Error("unknown command: /plan");
			    return void 0;
			  }));
			};
			const sendPrompt = (text, mode) => {
			  if (binding === void 0) return Promise.reject(new Error("no session"));
			  return binding.session.prompt([{ type: "text", text }], mode).then((result) => {
			    if (!result.ok) throw new Error(result.error.message);
			    return void 0;
			  });
			};
			const startEdit = () => {
			  setDraft(todoList.map((item) => ({ content: item.content, status: item.status })));
			  setNewItem("");
			  setEditing(true);
			};
			const updateDraft = (index, content) => {
			  setDraft((current) => current.map((item, i) => i === index ? { ...item, content } : item));
			};
			const moveDraft = (index, delta) => {
			  setDraft((current) => {
			    const target = index + delta;
			    if (target < 0 || target >= current.length) return current;
			    const next = current.slice();
			    const [item] = next.splice(index, 1);
			    next.splice(target, 0, item);
			    return next;
			  });
			};
			const removeDraft = (index) => {
			  setDraft((current) => current.filter((_item, i) => i !== index));
			};
const toggleDraftStatus = (index) => {
	setDraft((current) => current.map((item, i) => {
		if (i !== index || item.status === "in_progress") return item;
		return { ...item, status: item.status === "completed" ? "pending" : "completed" };
	}));
};
			const addDraft = () => {
			  const text = newItem.trim();
			  if (text === "") return;
			  setDraft((current) => [...current, { content: text, status: "pending" }]);
			  setNewItem("");
			};
			const applyDraft = () => {
			  const list = draft.map((item) => ({ content: item.content.trim(), status: item.status })).filter((item) => item.content !== "");
			  if (list.length === 0) return;
			  run(() => sendPrompt("用户通过计划窗口修改了任务计划。请用 todo_write 将任务列表整体更新为以下内容（内容、顺序与状态逐字采纳），然后按新计划继续执行；若当前正在进行的任务与新计划冲突，请先处理冲突再继续：\n\n" + pwzFormatTodos(list), running ? "steer" : "queue").then(() => setEditing(false)));
			};
			const confirmPlan = () => {
			  run(() => sendPrompt("用户已确认计划，请按计划开始执行。", "queue"));
			};
			const minimizedCount = todoList.length === 0 ? 0 : counts.pending;
			const chipBadge = review !== void 0 ? "审" : minimizedCount > 0 ? String(minimizedCount) : "";
			const openWindow = () => {
			  setMinimized(false);
			  setOpen(true);
			  pwzSaveOpen(true);
			};
			const closeWindow = () => {
			  setMinimized(true);
			  setOpen(false);
			  pwzSaveOpen(false);
			};
			const onHeaderPointerDown = (event) => {
			  if (event.button !== 0) return;
			  event.preventDefault();
			  const startX = event.clientX;
			  const startY = event.clientY;
			  const base = { ...posRef.current };
			  const onMove = (ev) => setPos(pwzClampPos(base.x + ev.clientX - startX, base.y + ev.clientY - startY, 340, 480));
			  const onUp = () => {
			    window.removeEventListener("pointermove", onMove);
			    window.removeEventListener("pointerup", onUp);
			    pwzSavePos(posRef.current);
			  };
			  window.addEventListener("pointermove", onMove);
			  window.addEventListener("pointerup", onUp);
			};
			const onChipPointerDown = (event) => {
			  if (event.button !== 0) return;
			  event.preventDefault();
			  const startX = event.clientX;
			  const startY = event.clientY;
			  let moved = false;
			  const base = { ...posRef.current };
			  const onMove = (ev) => {
			    const dx = ev.clientX - startX;
			    const dy = ev.clientY - startY;
			    if (!moved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) moved = true;
			    if (moved) setPos(pwzClampPos(base.x + dx, base.y + dy, 72, 36));
			  };
			  const onUp = () => {
			    window.removeEventListener("pointermove", onMove);
			    window.removeEventListener("pointerup", onUp);
			    pwzSavePos(pwzSanitizePos(posRef.current, 72, 36));
			    if (!moved) openWindow();
			  };
			  window.addEventListener("pointermove", onMove);
			  window.addEventListener("pointerup", onUp);
			};
			if (minimized || !open) {
			  return react_jsx_runtime.jsx("button", {
			    type: "button",
			    className: "pwz_chip",
			    style: { left: pos.x, top: pos.y },
			    onPointerDown: onChipPointerDown,
			    "aria-label": tr("win.chip.aria"),
			    title: tr("win.title"),
			    onClick: openWindow,
			    children: [react_jsx_runtime.jsx(_deepseek_ai_dsh_client_ui_primitives.IconChecklistOutline14, { size: 14 }), react_jsx_runtime.jsx("span", { children: tr("win.chip") }), chipBadge !== "" && react_jsx_runtime.jsx("span", { className: "pwz_badge", children: chipBadge })]
			  });
			}
			return react_jsx_runtime.jsx("div", {
			  ref: rootRef,
			  className: "pwz_root",
			  style: { left: windowX, top: windowY },
			  "data-plan-window": true,
			  children: [
			    react_jsx_runtime.jsx("div", {
			      className: "pwz_header",
			      onPointerDown: onHeaderPointerDown,
			      children: [
			        react_jsx_runtime.jsx("span", { className: "pwz_title", children: [react_jsx_runtime.jsx(_deepseek_ai_dsh_client_ui_primitives.IconChecklistOutline14, { size: 14 }), react_jsx_runtime.jsx("span", { children: tr("win.title") }), review !== void 0 && react_jsx_runtime.jsx("span", { className: "pwz_badge", children: "审" })] }),
			        react_jsx_runtime.jsx("button", { type: "button", className: "pwz_iconBtn", "aria-label": tr("win.minimize"), onClick: closeWindow, children: react_jsx_runtime.jsx(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { size: 14 }) })
			      ]
			    }),
			    react_jsx_runtime.jsx("div", {
			      className: "pwz_body",
			      children: [
			        react_jsx_runtime.jsxs("div", {
			          className: "pwz_section",
			          children: [
			            react_jsx_runtime.jsxs("div", {
			              className: "pwz_sectionTitle",
			              children: [react_jsx_runtime.jsx("span", { children: tr("mode.title") }), react_jsx_runtime.jsx("span", { className: "pwz_modePill " + (effectivePlan ? "pwz_modeOn" : "pwz_modeOff"), children: effectivePlan ? tr("mode.on") : tr("mode.off") })]
			            }),
			            react_jsx_runtime.jsx("div", { className: "pwz_hint", children: effectivePlan ? tr("mode.hint.on") : tr("mode.hint.off") }),
			            react_jsx_runtime.jsxs("div", {
			              className: "pwz_actions",
			              children: [react_jsx_runtime.jsx(_deepseek_ai_dsh_client_ui_primitives.Button, { variant: effectivePlan ? "outline" : "primary", disabled: busy, onClick: togglePlanMode, children: effectivePlan ? tr("mode.turnOff") : tr("mode.turnOn") })]
			            })
			          ]
			        }),
			        review !== void 0 && react_jsx_runtime.jsx("div", {
			  className: "pwz_section",
			  children: [react_jsx_runtime.jsx("div", { className: "pwz_sectionTitle", children: tr("review.title") }), react_jsx_runtime.jsx("div", { className: "pwz_hint", children: tr("review.pending.hint") })]
			}),
			        review === void 0 && effectivePlan && react_jsx_runtime.jsx("div", { className: "pwz_section", children: react_jsx_runtime.jsx("div", { className: "pwz_hint", children: tr("review.planning") }) }),
			        react_jsx_runtime.jsxs("div", {
			          className: "pwz_section",
			          children: [
			            react_jsx_runtime.jsxs("div", {
			              className: "pwz_sectionTitle",
			              children: [react_jsx_runtime.jsx("span", { children: tr("todo.title") }), todoList.length > 0 && react_jsx_runtime.jsx("span", { className: "pwz_hint", children: tr("todo.progress").replace("{done}", String(counts.completed)).replace("{total}", String(todoList.length)) }), editablePending && !editing && react_jsx_runtime.jsx("button", { type: "button", className: "pwz_iconBtn", "aria-label": tr("todo.edit"), title: tr("todo.edit"), onClick: startEdit, children: react_jsx_runtime.jsx(_deepseek_ai_dsh_client_ui_primitives.IconEditOutline16, { size: 14 }) })]
			            }),
			            todoList.length === 0 && react_jsx_runtime.jsx("div", { className: "pwz_hint", children: tr("todo.empty") }),
			            !editing && todoList.map((item, index) => react_jsx_runtime.jsxs("div", {
			              className: "pwz_todoItem",
			              key: index,
			              children: [react_jsx_runtime.jsx("span", { className: "pwz_status pwz_status" + (item.status === "completed" ? "Completed" : item.status === "in_progress" ? "InProgress" : "Pending") }), react_jsx_runtime.jsx("span", { className: "pwz_todoContent pwz_todo" + (item.status === "completed" ? "Completed" : item.status === "in_progress" ? "InProgress" : "Pending"), title: item.content, children: item.content })]
			            })),
			            editing && draft.map((item, index) => react_jsx_runtime.jsxs("div", {
			              className: "pwz_editRow",
			              key: index,
			              children: [react_jsx_runtime.jsx("button", { type: "button", className: "pwz_iconBtn", disabled: item.status === "in_progress", "aria-label": item.status === "completed" ? tr("todo.uncheck.aria") : tr("todo.check.aria"), title: item.status === "completed" ? tr("todo.uncheck.aria") : tr("todo.check.aria"), onClick: () => toggleDraftStatus(index), children: react_jsx_runtime.jsx(_deepseek_ai_dsh_client_ui_primitives.IconCheckOutline16, { size: 14 }) }), react_jsx_runtime.jsx("input", { className: "pwz_input", value: item.content, disabled: item.status !== "pending", onChange: (event) => updateDraft(index, event.target.value) }), react_jsx_runtime.jsx("button", { type: "button", className: "pwz_iconBtn", disabled: index === 0 || item.status !== "pending", "aria-label": tr("todo.up.aria"), onClick: () => moveDraft(index, -1), children: react_jsx_runtime.jsx(_deepseek_ai_dsh_client_ui_primitives.IconChevronUpOutline14, { size: 14 }) }), react_jsx_runtime.jsx("button", { type: "button", className: "pwz_iconBtn", disabled: index === draft.length - 1 || item.status !== "pending", "aria-label": tr("todo.down.aria"), onClick: () => moveDraft(index, 1), children: react_jsx_runtime.jsx(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { size: 14 }) }), react_jsx_runtime.jsx("button", { type: "button", className: "pwz_iconBtn", disabled: item.status !== "pending", "aria-label": tr("todo.remove.aria"), onClick: () => removeDraft(index), children: react_jsx_runtime.jsx(_deepseek_ai_dsh_client_ui_primitives.IconTrashOutline16, { size: 14 }) })]
			            })),
			            editing && react_jsx_runtime.jsxs("div", {
			              className: "pwz_addRow",
			              children: [react_jsx_runtime.jsx("input", { className: "pwz_input", value: newItem, placeholder: tr("todo.add.placeholder"), onChange: (event) => setNewItem(event.target.value), onKeyDown: (event) => { if (event.key === "Enter") addDraft(); } }), react_jsx_runtime.jsx("button", { type: "button", className: "pwz_iconBtn", "aria-label": tr("todo.add"), onClick: addDraft, children: react_jsx_runtime.jsx(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutline16, { size: 14 }) })]
			            }),
			            editing && react_jsx_runtime.jsxs("div", {
			              className: "pwz_actions",
			              children: [react_jsx_runtime.jsx(_deepseek_ai_dsh_client_ui_primitives.Button, { variant: "ghost", disabled: busy, onClick: () => setEditing(false), children: tr("todo.cancel") }), react_jsx_runtime.jsx(_deepseek_ai_dsh_client_ui_primitives.Button, { variant: "primary", disabled: busy || draft.filter((item) => item.content.trim() === "").length > 0, onClick: applyDraft, children: tr("todo.apply") })]
			            }),
			            !editing && allPending && !running && review === void 0 && react_jsx_runtime.jsxs("div", {
			              className: "pwz_actions",
			              children: [react_jsx_runtime.jsx(_deepseek_ai_dsh_client_ui_primitives.Button, { variant: "primary", disabled: busy, onClick: confirmPlan, children: tr("todo.confirm") })]
			            }),
			            error !== null && react_jsx_runtime.jsx("div", { className: "pwz_error", role: "status", children: error })
			          ]
			        })
			      ]
			    })
			  ]
			});
			}
					//#endregion
		//#region lib/types/client/index.js
		/** Dictionary namespace owned by this plugin. */
		const NS = "plan";
		/** Required services: the seat's slot registry, commands Remote, and locale registry. */
		const inject = [
			"slots",
			"remote",
			"remote.commands",
			"locale",
			"sessions"
		];
		/**
		* Client plugin body: register the plan chip over the command channel.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "ui-plan: dictionaries");
			ctx.slots.inject("conversation.input.plan", () => ctx.slots.register({
				name: "conversation.input.plan",
				locale: NS,
				inject: (sessionId) => ({ exitPlanMode: async () => {
					const result = await ctx.remote.commands.execute(sessionId, "/plan off", []);
					if (!result.ok) return `${result.error.message} (${result.error.code})`;
					if (result.value === void 0) return "unknown command: /plan off";
					return null;
				} })
			}, PlanChip));
			try {
				ctx.slots.inject("shell.overlay", () => ctx.slots.register({
					name: "shell.overlay",
					id: "plan-window",
					order: 100,
					locale: NS,
					inject: () => ({ sessions: ctx.sessions })
				}, PlanWindowGuarded));
			} catch (error) {
				console.error("[plan-window] registration failed", error);
			}
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map