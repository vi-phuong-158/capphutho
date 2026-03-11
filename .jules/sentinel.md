## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-02-19 - DOM-based XSS via innerHTML
**Vulnerability:** The application used `.innerHTML` with string interpolation to render user input (search queries, category names) into the DOM, creating a Cross-Site Scripting (XSS) vector.
**Learning:** Relying on custom `escapeHtml` functions combined with `.innerHTML` is error-prone and can be bypassed.
**Prevention:** Always use safe native DOM APIs like `document.createElement`, `document.createTextNode`, and `.replaceChildren()` to handle and render user input as pure data rather than executable markup.
