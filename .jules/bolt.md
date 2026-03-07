## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2025-03-07 - [Memoization and Single Loop Optimization]
**Learning:** `FaqSearchEngine.search` was iterating through the entire index and applying a heavy string-matching algorithm. Replacing `.map(...).filter(...)` with a single `for` loop avoids temporary object allocations and spreading (`{...item, score}`), significantly lowering execution time (from ~3.3s to ~2.9s for 10K iterations). Additionally, repeated searches execute instantly when a bounded `Map`-based memoization cache is used, further reducing the overall search time to ~10ms for 10K repeated queries.
**Action:** Always favor a single `for` loop over `.map().filter()` chains when doing heavy array processing, and use a `Map` to memoize the results of repeated, expensive operations. Ensure the `Map` has a size limit to avoid memory leaks.
