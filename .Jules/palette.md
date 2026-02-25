## 2024-05-23 - Interactive Elements Semantics
**Learning:** The application heavily relies on `div` elements with `onclick` handlers for key interactions (e.g., Chat Launcher), which completely excludes keyboard and screen reader users.
**Action:** Systematically audit and refactor interactive `div`s to `<button>` or `<a>` elements, or add `role="button"`, `tabindex="0"`, and keydown handlers if semantic elements cannot be used.

## 2024-05-24 - Modal Focus Management
**Learning:** Simple `display: none` toggles for modals/popovers fail accessibility requirements as focus is lost or trapped incorrectly.
**Action:** Always implement explicit focus management (focus to input on open, focus back to trigger on close) and Escape key support for any custom overlay.
