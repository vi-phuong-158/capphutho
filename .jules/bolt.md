## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-05-25 - [Search Engine Loop Optimization & Memoization]
**Learning:** `FaqSearchEngine.search` was iterating through the entire search index multiple times using chained `.map()`, `.filter()`, and `.sort().slice()`. Additionally, it was re-calculating the exact same search query strings repeatedly.
**Action:** Replace chained array methods with a single `for...of` loop to minimize iterations. Add a `Map`-based bounded cache to `FaqSearchEngine` to store the results of recent queries, reducing execution time significantly.
