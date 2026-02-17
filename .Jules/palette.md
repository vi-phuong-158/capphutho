## 2024-05-22 - Interactive Elements Semantics
**Learning:** The application frequently implements interactive controls (like the Chat Launcher) as `div` elements with `onclick` handlers, completely bypassing keyboard accessibility and screen reader support.
**Action:** systematically audit interactive elements. Replace `div`s with semantic `<button>` tags, add `aria-label` where text is missing, and ensure focus styles are preserved or enhanced.
