## 2024-05-23 - Interactive Elements Semantics
**Learning:** The application heavily relies on `div` elements with `onclick` handlers for key interactions (e.g., Chat Launcher), which completely excludes keyboard and screen reader users.
**Action:** Systematically audit and refactor interactive `div`s to `<button>` or `<a>` elements, or add `role="button"`, `tabindex="0"`, and keydown handlers if semantic elements cannot be used.

## 2024-05-24 - Modal Focus Management
**Learning:** Custom overlay widgets (like the chatbot) disrupt the natural tab order and require manual focus management to be usable. Without moving focus to the input on open and restoring it to the trigger on close, keyboard users lose context.
**Action:** Always implement explicit focus management (focus input on open, focus trigger on close) and Escape key support for any custom modal/overlay.
