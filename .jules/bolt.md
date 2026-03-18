## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-05-25 - [FaqSearchEngine Optimization]
**Learning:** `FaqSearchEngine.search` was bottlenecked by creating intermediate arrays using `.map()` and `.filter()`, and nested `.forEach()` loops. Combining them into a single `for...of` loop and adding a bounded `Map`-based memoization cache (FIFO 100 entries) reduced execution time from ~181ms to ~8ms for 1000 searches.
**Action:** Replace multiple array operations (`.map`, `.filter`) with a single loop to avoid intermediate array allocation and overhead in hot paths, and use a `Map` cache for expensive operations.
