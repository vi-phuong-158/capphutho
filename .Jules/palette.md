## 2024-10-24 - Chat Launcher Accessibility
**Learning:** Interactive elements implemented as `div`s with `onclick` handlers are invisible to screen readers and keyboard users, creating a significant barrier to entry for help features.
**Action:** Always use `<button>` for interactive elements. If a custom design is required, use CSS to reset button styles (`border: none`, `padding: 0`, `background: transparent`) while maintaining semantic structure and ARIA attributes (`aria-label`, `aria-expanded`).
