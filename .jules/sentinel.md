## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2024-03-07 - XSS Vulnerability in innerHTML
**Vulnerability:** Used `.innerHTML` to render user input in `renderGlobalSearchResults`, even when wrapped with `escapeHtml()`.
**Learning:** `escapeHtml` is not foolproof and using `.innerHTML` directly on DOM elements with user data poses an XSS risk. It's safer to use native, secure DOM APIs.
**Prevention:** Strictly use `document.createElement`, `document.createTextNode`, and `.replaceChildren()` or `textContent` for rendering user inputs rather than `.innerHTML`.
