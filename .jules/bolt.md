## 2024-05-22 - FaqSearchEngine Input Handling
**Learning:** The `FaqSearchEngine.search` method performs full index iteration and string normalization on every call. Coupled with direct `input` event binding, this caused significant main thread work on every keystroke.
**Action:** Always debounce search inputs when the search logic involves heavy client-side processing or full-text search over a dataset.
