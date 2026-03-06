## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-05-25 - [Single Loop & Bounded Cache vs Map/Filter Chains]
**Learning:** Chaining `.map()` and `.filter()` over large arrays allocates many intermediate objects and puts pressure on the garbage collector. Replacing them with a single `for` loop that avoids `...` spreading reduces execution time significantly (~300ms to ~90ms for 100 iterations of 1000 objects). Adding a bounded map cache drops execution time for repeated queries to practically zero (~0.7ms).
**Action:** Favor single loops over array method chains for performance-critical logic and implement bounded memoization to instant-resolve repeated frequent calls without risking unbounded memory leaks.
