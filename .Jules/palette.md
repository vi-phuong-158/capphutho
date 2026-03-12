## 2024-05-23 - Interactive Elements Semantics
**Learning:** The application heavily relies on `div` elements with `onclick` handlers for key interactions (e.g., Chat Launcher), which completely excludes keyboard and screen reader users.
**Action:** Systematically audit and refactor interactive `div`s to `<button>` or `<a>` elements, or add `role="button"`, `tabindex="0"`, and keydown handlers if semantic elements cannot be used.

## 2026-03-12 - Focus Indicators and Element Shapes
**Learning:** Adding standard `:focus-visible` outlines around rounded or circular interactive elements (like the chat launcher or toggle buttons) breaks the design by producing a rigid rectangle outline.
**Action:** When adding focus outlines, explicitly set `border-radius: var(--radius-full, 50%)` or similar on pill/circular shaped components to maintain their visual semantics.
