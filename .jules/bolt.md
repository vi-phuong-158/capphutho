## 2024-05-23 - [Unused Library Removal]
**Learning:** `pdf.js` was included in `index.html` but never used. The application relies on native browser PDF handling (via anchor tags).
**Action:** Always check for unused libraries in `index.html` before assuming they are critical. Use `grep` to verify usage.

## 2024-05-24 - [DOM Layout Thrashing]
**Learning:** Repetitive `appendChild` and `scrollToBottom` calls inside loops in `ChatbotController` caused significant layout thrashing. Simple DOM batching with `DocumentFragment` reduced reflow triggers from N to 1 per render.
**Action:** When rendering lists of elements, always use `DocumentFragment` or build a single HTML string to minimize DOM interactions. Use a mocked DOM environment (Node.js `vm`) to count reflow triggers for verification.
