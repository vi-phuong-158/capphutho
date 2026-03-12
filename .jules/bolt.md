## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-05-25 - [Search Engine Loop & Cache Optimization]
**Learning:** In `FaqSearchEngine.search`, chaining `.map()` and `.filter()` creates intermediate arrays and unnecessary object spreads (`{ ...item }`) for non-matching items, leading to high memory allocation and garbage collection overhead. Additionally, repeated exact queries are not cached.
**Action:** Replace `map`/`filter` chains with a single `for` loop that calculates scores and pushes only valid results. Add a bounded `Map`-based memoization cache (with FIFO eviction) for frequently repeated queries to achieve instant results and avoid unbounded memory growth.
