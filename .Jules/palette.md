## 2024-05-23 - Interactive Elements Semantics
**Learning:** The application heavily relies on `div` elements with `onclick` handlers for key interactions (e.g., Chat Launcher), which completely excludes keyboard and screen reader users.
**Action:** Systematically audit and refactor interactive `div`s to `<button>` or `<a>` elements, or add `role="button"`, `tabindex="0"`, and keydown handlers if semantic elements cannot be used.

## 2024-05-23 - Chatbot Overlay Accessibility
**Learning:** Custom overlays like the Chatbot require explicit state synchronization (`aria-expanded`) and focus management. Without shifting focus to the overlay input on open and returning it to the launcher on close, keyboard and screen reader users lose context.
**Action:** When implementing custom toggles for overlays, always synchronize `aria-expanded` and actively manage `focus()` with appropriate timing delays.
