## 2024-05-23 - Interactive Elements Semantics
**Learning:** The application heavily relies on `div` elements with `onclick` handlers for key interactions (e.g., Chat Launcher), which completely excludes keyboard and screen reader users.
**Action:** Systematically audit and refactor interactive `div`s to `<button>` or `<a>` elements, or add `role="button"`, `tabindex="0"`, and keydown handlers if semantic elements cannot be used.

## 2024-05-23 - Interactive Element Refactoring Constraint
**Learning:** While native `<button>` tags are the semantic ideal, replacing existing interactive `div` elements with `<button>` in a project where you cannot add/modify CSS resets will break layout due to the browser's default button styling.
**Action:** When constrained from adding CSS, retain the `div` element but manually add semantic and interactive attributes: `role="button"`, `tabindex="0"`, `aria-expanded` (matching the current visual state), and an `onkeydown` handler for `Enter` and `Space` (with `event.preventDefault()` for Space to stop scrolling).
