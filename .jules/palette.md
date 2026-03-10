
## 2025-03-10 - Global :focus-visible rules and circular elements
**Learning:** Found that this design system lacked explicit `:focus-visible` styling, causing default browser focus rings to be inconsistently visible or clipped, especially on uniquely shaped components. Moreover, when generic `outline` based focus rings are applied, they don't natively hug circular buttons (like `.chat-launcher` or `.close-chat`) without explicitly matching the focus state's `border-radius: 50%` or `100px`.
**Action:** When establishing focus visible patterns in this app, ensure a global `:focus-visible` style is implemented and always explicitly append shape-matching rules (like `border-radius: 50%`) for custom circular controls to prevent square focus rings around round elements.
