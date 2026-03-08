## 2024-05-24 - Redundant Alt Text in Labeled Buttons
**Learning:** Decorative or informative images placed inside buttons that already have an accessible name (like via `aria-label`) cause redundant and confusing announcements for screen reader users. The screen reader will read the button's label, and then additionally read the image's alt text.
**Action:** When an image is inside a button that already has an `aria-label`, give the `<img>` an empty `alt=""` attribute and explicitly hide it with `aria-hidden="true"` to prevent duplicate announcements.
