## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-05-25 - [Array Loop Optimization]
**Learning:** `map().filter()` chains in tight loops (like search engines) cause significant performance degradation due to unnecessary intermediate array allocations. Refactoring a search scoring function to use a single `for` loop with conditional `push` reduced execution time by roughly ~50% (~0.072ms to ~0.038ms per search).
**Action:** In performance-critical paths or tight loops, avoid chaining array methods (`map`, `filter`, `reduce`) and prefer single `for` loops to minimize memory allocation overhead.
