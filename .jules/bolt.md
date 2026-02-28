## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.
## 2026-02-28 - [Search Caching]
**Learning:** The static FAQ index in `FaqSearchEngine` enables high-efficiency caching using a simple `Map` object, as the search logic itself recalculates rankings on every keystroke.
**Action:** Always implement a `Map`-based cache (memoization) for search engines querying static data, but remember to consider memory bounds if query volume is high.
