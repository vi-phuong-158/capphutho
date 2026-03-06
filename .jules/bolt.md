## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-05-25 - [Object Spreading and Chaining in Hot Loops]
**Learning:** Using `.map()`, `.filter()`, and object spread (`...item`) inside a hot search loop allocates excessive temporary arrays and objects, increasing garbage collection pressure and CPU time. Refactoring to a single `for` loop with manual property mapping significantly reduces execution time.
**Action:** When optimizing tight loops or search ranking algorithms, prefer traditional `for` loops and explicit property assignments over functional array methods and object spreading.

## 2024-05-25 - [Bounded Memoization for Search]
**Learning:** A simple `Map`-based memoization cache can drastically drop execution time (from ~3ms to ~0.01ms in this benchmark) for repeated identical search queries. Bounding the cache (e.g., size >= 100) prevents unbounded memory growth.
**Action:** Implement bounded memoization for pure client-side functions like search, especially if users frequently type/delete the same terms.
