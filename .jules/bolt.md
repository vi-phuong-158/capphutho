## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-05-25 - [Object Creation Overhead in Search Loop]
**Learning:** Chaining `.map()` and `.filter()` in search loops creates huge garbage collection pressure by instantiating intermediate objects and throwing them away. Replacing this with a single `for` loop that avoids the spread operator (`...`) and only creates wrapper objects (`{ item, score }`) when matches occur speeds up the worst-case queries by ~10% and significantly reduces memory usage.
**Action:** When filtering and transforming large arrays in hot paths (like search engines), use a single `for` loop and avoid object spreading.

## 2024-05-25 - [Search Query Memoization]
**Learning:** Implementing a bounded `Map` cache (memoization) in the search engine drops search time for repeated queries from ~2400ms to ~3ms (for 10k iterations). This is crucial for UI input responsiveness where debounced inputs often trigger repeated searches.
**Action:** Use a simple bounded `Map` to memoize expensive client-side search or calculation results, especially when tied to user input events.
