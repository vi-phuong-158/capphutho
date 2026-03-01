## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-03-22 - [FaqSearchEngine Optimization]
**Learning:** The `FaqSearchEngine` execution was highly efficient due to a previous optimization replacing `map`/`filter` with a single `for` loop, which reduced memory allocations and improved speed by ~50%. Memoization (caching results in a Map) was identified as a huge performance win for repetitive queries, bringing search time down from ~800ms to ~1.6ms for 1000 identical iterations. However, `Map` caches need unbounded growth protection to prevent memory leaks if thousands of unique queries occur.
**Action:** When implementing memoization for search functions or computationally expensive operations, consider bounds on the cache size (e.g., using an LRU cache or simply clearing the Map when it gets too large) to prevent memory issues.
