## 2025-02-19 - Avoiding Array.map in Hot Paths
**Learning:** In frequently executed code (like search on keystroke), replacing `Array.map` + `filter` with a simple `for` loop and conditional push significantly reduces memory allocation and execution time.
**Action:** For search algorithms or high-frequency loops, prefer imperative `for` loops over functional methods if they involve creating intermediate objects or closures for every item.
