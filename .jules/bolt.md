## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-05-25 - [Single-Pass Search Optimization]
**Learning:** `map` followed by `filter` on large static arrays created substantial memory overhead and slow execution in `FaqSearchEngine`. Refactoring to a single `for` loop with conditional pushing and adding a bounded `Map` cache significantly reduced main-thread blocking time from ~2000ms to ~10ms for benchmark iterations.
**Action:** Always prefer a single `for` loop over chained array methods for large datasets and employ bounded memoization to optimize redundant calculations.
