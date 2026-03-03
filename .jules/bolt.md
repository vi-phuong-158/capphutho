## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-05-25 - [Search Engine Single Loop and Cache]
**Learning:** `map().filter()` chains create unnecessary intermediate arrays, causing memory allocation and garbage collection overhead. Adding an LRU-like map cache for the `FaqSearchEngine` search results significantly improves repeated searches. A simulated benchmark of 1000 identical queries dropped execution time from ~740ms to ~2ms.
**Action:** Replace `map().filter()` with a single `for` loop that only pushes matches to the results array, and use a bounded `Map` to cache repeated expensive function results.
