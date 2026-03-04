## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-11-20 - [Array Method Overhead & Caching]
**Learning:** Chaining `.map()` and `.filter()` creates heavy overhead (multiple passes and excessive temporary objects like `{...item, score}`). Refactoring to a single `for` loop that avoids spreading the original item (e.g. `Object.assign({score}, item)`) and only allocates for actual matches significantly improves speed. Implementing a bounded `Map` cache avoids repeating computations and keeps memory growth controlled.
**Action:** Use a single loop and avoid object spreading in hot loops. Add a bounded cache for search results.
