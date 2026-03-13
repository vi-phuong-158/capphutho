## 2024-05-23 - Interactive Elements Semantics
**Learning:** The application heavily relies on `div` elements with `onclick` handlers for key interactions (e.g., Chat Launcher), which completely excludes keyboard and screen reader users.
**Action:** Systematically audit and refactor interactive `div`s to `<button>` or `<a>` elements, or add `role="button"`, `tabindex="0"`, and keydown handlers if semantic elements cannot be used.

## 2024-05-23 - Keyboard Navigation & Focus Management for Modals/Overlays
**Learning:** Modal overlays like the chat window must proactively manage focus (shift to input on open, return to launcher on close) and use `aria-expanded` to communicate state changes to screen readers. Relying solely on visual `display: flex/none` is insufficient and breaks keyboard accessibility.
**Action:** Always synchronize `aria-expanded` with the visual state of toggleable overlays and implement explicit programmatic focus (trap/return) to maintain keyboard accessibility and screen reader context.
