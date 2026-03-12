## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-02-19 - DOM-based XSS via innerHTML
**Vulnerability:** Found multiple uses of `.innerHTML` to render string content or clear containers. Even when input is escaped using `escapeHtml`, string interpolation for DOM elements is prone to DOM-based Cross-Site Scripting (XSS).
**Learning:** Using `.innerHTML = ''` to clear containers is unsafe and using string manipulation for DOM rendering is vulnerable. Safe alternatives include native DOM methods like `document.createElement`, `document.createTextNode`, and `.replaceChildren()`.
**Prevention:** Strictly utilize safe DOM APIs such as `document.createElement`, `document.createTextNode`, and `.replaceChildren()` when generating or managing HTML content dynamically.
