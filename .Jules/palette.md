## 2024-05-23 - Interactive Elements Semantics
**Learning:** The application heavily relies on `div` elements with `onclick` handlers for key interactions (e.g., Chat Launcher), which completely excludes keyboard and screen reader users.
**Action:** Systematically audit and refactor interactive `div`s to `<button>` or `<a>` elements, or add `role="button"`, `tabindex="0"`, and keydown handlers if semantic elements cannot be used.

## 2024-10-24 - Overlay Widget Focus Management and ARIA State
**Learning:** Custom overlay widgets like the Chatbot require manual focus trap/restore and synchronization of `aria-expanded` attributes. Programmatically opening the widget must utilize the same central toggle method (`window.toggleChat()`) rather than directly manipulating CSS to avoid state desyncs. Redundant image tags inside ARIA-labeled buttons must be hidden with `aria-hidden="true"` and `alt=""`.
**Action:** Consolidate UI opening/closing logic to central toggle methods that handle both visual state (CSS) and accessibility state (ARIA attributes and focus shifting). Add `:focus-visible` styles to interactive elements.
