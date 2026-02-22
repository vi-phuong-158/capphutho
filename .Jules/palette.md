## 2024-05-23 - Interactive Elements Semantics
**Learning:** The application heavily relies on `div` elements with `onclick` handlers for key interactions (e.g., Chat Launcher), which completely excludes keyboard and screen reader users.
**Action:** Systematically audit and refactor interactive `div`s to `<button>` or `<a>` elements, or add `role="button"`, `tabindex="0"`, and keydown handlers if semantic elements cannot be used.

## 2026-02-23 - Modal Focus Management
**Learning:** Simple toggles for modals (like the Chatbot) fail accessibility checks because they don't manage focus or 'aria-expanded' states, leaving keyboard users lost.
**Action:** Always implement 'aria-expanded' on the trigger, move focus to the modal input/first element on open, return focus to the trigger on close, and support 'Escape' to close.
