## 2024-05-22 - [Client-Side Search Iteration]
**Learning:** `FaqSearchEngine.search` iterates the entire `FAQ_DATA` and performs string normalization on every call. Using it directly on `input` events causes significant main-thread blocking on low-end devices.
**Action:** Always debounce search inputs when using client-side full-scan search engines like `FaqSearchEngine`.
