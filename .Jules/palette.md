## 2026-02-14 - Chat Widget Accessibility
**Learning:** Found a common anti-pattern where a `div` was used as a button (`onclick` handler) for the chat launcher. This breaks keyboard accessibility and screen reader support.
**Action:** Always use `<button>` for interactive elements. If a `div` is necessary, it must have `role="button"`, `tabindex="0"`, and keyboard event handlers. But `<button>` is almost always better. Also, icon-only buttons need `aria-label`.
