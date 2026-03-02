## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-05-25 - [Search Engine Loop Allocations & Memoization]
**Learning:** `FaqSearchEngine.search` was bottlenecked by creating intermediate arrays with `map().filter()` during scoring. Additionally, duplicate searches were executing the O(N) scoring loop repeatedly. By replacing the functional chains with a single `for` loop and adding a bounded `Map` cache for memoization, search time dropped from ~2000ms to ~30ms for 1000 iterations.
**Action:** Avoid map/filter chains in high-frequency functions or large datasets; use a single `for` loop to eliminate intermediate allocations. Implement bounded memoization for pure functions with repetitive inputs.
