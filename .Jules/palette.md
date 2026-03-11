## 2024-05-23 - Interactive Elements Semantics
**Learning:** The application heavily relies on `div` elements with `onclick` handlers for key interactions (e.g., Chat Launcher), which completely excludes keyboard and screen reader users.
**Action:** Systematically audit and refactor interactive `div`s to `<button>` or `<a>` elements, or add `role="button"`, `tabindex="0"`, and keydown handlers if semantic elements cannot be used.

## 2024-05-23 - Focus Management on Custom Shapes
**Learning:** Circular or pill-shaped interactive elements (e.g., `.chat-launcher`, `.elder-mode-toggle`, `.float-btn`) require explicit `border-radius` redeclaration inside their `:focus-visible` pseudoclass because focus outlines otherwise default to a rectangular shape, breaking the visual immersion and potentially making the focus state less clear.
**Action:** Always include an explicit `border-radius: var(--radius-full)` (or relevant variable) under the `:focus-visible` rule when designing non-rectangular interactive elements to ensure the focus outline correctly hugs the custom shape.
