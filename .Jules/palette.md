## 2024-05-21 - Interaction Elements Accessibility
**Learning:** Found critical interaction elements (Chat Launcher) implemented as `div` with `onclick`, making them inaccessible to keyboard users.
**Action:** Always check interactive elements for semantic HTML (`<button>`, `<a>`) and `tabindex`/keyboard handlers when refactoring.
