## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-02-19 - XSS in innerHTML
**Vulnerability:** String interpolation of user input (search query) into `innerHTML` causes an XSS vulnerability, even when escaping is used, as it can be bypassed or implemented incorrectly.
**Learning:** `document.createElement` and `document.createTextNode` are safer alternatives for dynamically injecting user inputs into the DOM, as they inherently prevent script execution. Using `.replaceChildren()` to clear containers is also more secure and performant than `.innerHTML = ''`.
**Prevention:** Always use safe DOM APIs like `.textContent`, `document.createElement`, and `document.createTextNode` instead of `.innerHTML` when handling user input.
