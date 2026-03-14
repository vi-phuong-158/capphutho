## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-06-03 - [FaqSearchEngine Optimization]
**Learning:** Replacing map/filter chains with a single loop and implementing a Map-based bounded cache significantly reduces execution time by avoiding memory allocation overhead for intermediate arrays and saving results.
**Action:** Apply single-loop reduction on large datasets and use bounded cache strategies for computationally expensive deterministic outputs.
