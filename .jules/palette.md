## 2024-03-20 - Custom Modal Accessibility
**Learning:** Custom overlay widgets (like chatbots) often lack implicit dialog semantics, causing screen readers to misinterpret them, and lack focus management, trapping keyboard users or making navigation confusing.
**Action:** Always add `role="dialog"`, `aria-modal="true"`, and appropriate `aria-label` to custom dialog containers. Implement focus shifting to move focus into the dialog on open (with a slight delay if animating) and restore focus to the triggering element on close. Ensure triggering elements use `aria-expanded` correctly.
