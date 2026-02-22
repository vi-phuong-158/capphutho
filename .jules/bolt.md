## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [Layout Thrashing]
**Learning:** Appending DOM elements sequentially with interleaved layout reads (like `scrollTop` or `scrollHeight`) causes O(N) forced reflows, significantly degrading performance on low-end devices.
**Action:** Always use `DocumentFragment` to batch multiple DOM insertions into a single operation, ensuring only one reflow occurs per render cycle.
