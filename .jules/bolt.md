## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `ChatbotController` was causing layout thrashing by appending buttons and scrolling in a loop.
**Action:** Used `DocumentFragment` to batch DOM insertions and called `scrollToBottom` once per render cycle. This reduces reflows and improves rendering performance, especially for list rendering.
