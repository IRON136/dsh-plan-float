# dsh-plan-float — Floating Plan Window for dsh

> [中文](README.zh.md) | **English**

A **floating, draggable plan window** for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web GUI: approve plans before execution, track progress live, and rewrite the roadmap mid-run to steer the agent instantly.

> This is a **local extension** of the installed `@deepseek-ai/dsh-client-ui-plan` plugin — it does not modify dsh core or add system-level components, and it activates through dsh's client-plugin hot-reload mechanism.

## Features

- **Plan first, execute after approval (optional)**: one-click "plan mode" (equivalent to `/plan`). The model researches and drafts a plan, submits it via `exit_plan_mode`, and you approve it in the **official review card on the main page**. While pending, the floating window only shows a compact hint; after approval it shows the compact task list.
- **Floating, draggable, direction-adaptive**: both the window and the collapsed dot are draggable (position persisted in localStorage). The window expands in four adaptive directions — if it does not fit to the right/down, it expands left/up — and always stays fully inside the browser viewport. Topmost z-index, never covered by other layers.
- **Live task list**: refreshes in real time on every model `todo_write` (status dots + progress counts). Long items truncate to two lines (hover for full text); completed items are struck through in green; in-progress items are bold blue.
- **Edit the plan mid-run**: edit mode supports text changes, reordering, adding/removing, and toggling done/pending. "Apply & continue" sends the updated plan through `session.prompt(steer)`, **interrupting the model's current turn** — the model adopts the new list verbatim and continues. This is the exact same channel as typing in the input box to interrupt.
- **Self-diagnosis**: on a render error the window shows an error panel and automatically posts the error back into the session as a message for fast debugging.

## How it works

Pure client-side plugin built on four existing dsh mechanisms:

| Mechanism | Purpose |
| --- | --- |
| `shell.overlay` slot | The official frame-level overlay seat the window registers into |
| Session projections (`todos` / `plan`) | Live reads of the model's todo list and plan-mode state |
| PendingInteraction (`question/requested`) | Detects plan-review status (approval happens in the official main-page card) |
| SessionFace API (`command` / `prompt`) | Toggles plan mode; sends the new plan to the model via steer/queue |

Deployment rewrites `lib/client.js` of the already-mounted `@deepseek-ai/dsh-client-ui-plan` package (in the profile the package is a junction to the global install), so **no compilation and no server restart are needed** — a page refresh is enough.

## Installation

Prerequisite: DeepSeek Harness Web GUI running via `dsh web` (default `http://127.0.0.1:3080`).

**Option 1: one-click script (recommended)**

```bash
node apply.mjs
```

Idempotent: skips if already applied; re-run after a dsh upgrade overwrites the package.

**Option 2: manual copy**

Copy `client.js` to:

```
%USERPROFILE%\.dsh\profiles\node_modules\@deepseek-ai\dsh-client-ui-plan\lib\client.js
```

Then hard-refresh the browser page (`Ctrl + Shift + R`). The floating "Plan" dot on the right side of the page means deployment succeeded.

## Rollback

Copy `client.orig.js` (pristine official backup) back to the same path.

## File layout

| File | Description |
| --- | --- |
| `client.js` | Merged client bundle (deployment artifact) |
| `client.orig.js` | Pristine official backup (rollback) |
| `window-block.js.txt` | Source block of the floating window (single maintained source) |
| `apply.mjs` | One-click apply/reinstall script (idempotent) |
| `package.json` / `LICENSE` / `README.md` / `README.en.md` | Project metadata & docs |

## Known limitations (dsh native behavior)

- **The todo list resets per turn**: the `turn/start` event clears the projection; the model rewrites the list at the start of each turn.
- **Plan-mode toggle takes effect one turn later**: the switch is adopted by the host at the next accepted step.
- **dsh upgrades overwrite this extension**: re-run `node apply.mjs` after upgrading.

## Compatibility

- Tested on: dsh 0.1.0-rc.8 / Windows / modern Chromium-based browsers
- Depends on dsh's client plugin system (`dsh.client`, `shell.overlay`, session projections, PendingInteraction) — requires that version or newer.

## License

[MIT](./LICENSE)
