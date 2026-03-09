## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-05-25 - [Search Array Iteration Avoidance & Cache]
**Learning:** `Array.map` combined with `Array.filter` chains on large arrays can be significantly slower than a single `for` loop because of intermediate array allocations. Also, search functions without caching recompute the same scores repeatedly. Using an LRU bounded cache with `Map` provides near-instant results for repeated queries.
**Action:** When working with large arrays, especially in high-frequency functions like search engines, prefer a single `for` loop over chained array methods. Add an LRU bounded cache (`Map` is ordered by insertion and `.keys().next().value` yields the oldest) to memoize expensive function calls without unbounded memory growth.
