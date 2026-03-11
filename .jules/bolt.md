## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-05-26 - [Search Loop Optimization and Memoization]
**Learning:** Refactoring `FaqSearchEngine.search` to use a single `for...of` loop avoids intermediate array allocations and object spread overhead on non-matching items. Adding a bounded `Map`-based memoization cache reduces execution time for repeated queries significantly.
**Action:** Use a single loop and `for...of` for critical paths over `.map().filter()`, and use bounded memoization for repeating intensive calculations like search.