## 2026-03-08 - [Search Engine Loop Optimization & Bounded Cache]
**Learning:** In `FaqSearchEngine.search`, using `.map().filter()` causes intermediate array allocations and object spread overhead for non-matching items. Additionally, unbounded query caching can lead to memory leaks. Replacing array chains with a single `for` loop and using a bounded `Map` cache (e.g., max 100 items) significantly improves performance for both repeated and unique queries without sacrificing stability.
**Action:** When calculating scores over large static arrays, favor single `for` loops with conditional pushes over declarative array methods. Always implement bounds when memoizing results to prevent memory growth.

## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.
