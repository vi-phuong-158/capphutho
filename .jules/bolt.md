## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-11-20 - [Search Engine Loop Optimization & Caching]
**Learning:** In `FaqSearchEngine.search`, using chained `.map()` and `.filter()` created unnecessary intermediate array allocations and object spread overhead for non-matching items. Furthermore, repeated queries were re-processed expensively. Combining these operations into a single `for...of` loop and adding a bounded (size 100) `Map`-based memoization cache reduced execution time for repeated queries from ~475ms down to < 1ms for 1000 searches.
**Action:** Prefer single-pass filtering loops over `.map().filter()` chains on hot paths, and always consider bounded memoization caches for pure functions handling repetitious input data, ensuring proper cache eviction to prevent memory leaks.
