## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Batching]
**Learning:** `DocumentFragment` significantly reduces layout thrashing in loops. A simulated benchmark showed ~1000x reduction in reflows for 1000 items.
**Action:** Always batch DOM insertions in loops using `DocumentFragment` or similar techniques.

## 2024-05-25 - [Search Engine Single Loop Optimization]
**Learning:** In \`FaqSearchEngine.search\`, chaining \`.map()\` and \`.filter()\` caused severe memory allocation and garbage collection overhead because it created a new object copy (\`{ ...item, score }\`) for *every* item in the index, regardless of whether it matched the query.
**Action:** Replace array method chains with a single \`for\` loop and only create object copies (or allocate memory) when a positive match is found (\`score > 0\`). This pattern significantly reduces execution time and GC pressure for large datasets.
