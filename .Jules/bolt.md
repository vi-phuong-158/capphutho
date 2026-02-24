## 2024-05-23 - Chatbot Menu Rendering Performance
**Learning:** Batching DOM insertions with `DocumentFragment` for chatbot options (categories, questions, search results) reduces layout thrashing by consolidating multiple `appendChild` and `scrollTop` calls into a single operation per render cycle.
**Action:** Always prefer `DocumentFragment` when appending multiple elements to the DOM, especially if layout properties (like `scrollHeight`) are read immediately after.
