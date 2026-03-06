
## 2024-05-25 - [Redundant Images and Focus Indicators]
**Learning:** Decorative images inside buttons that already use `aria-label` must be hidden from screen readers using `aria-hidden="true"` and an empty `alt=""` attribute to prevent redundancy. Additionally, interactive elements must explicitly define `:focus-visible` CSS rules to ensure keyboard navigation focus is clear.
**Action:** Always verify `aria-label` redundancy when wrapping images, and check tab-navigation styles for missing `:focus-visible` indicators.
