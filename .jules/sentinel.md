## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-02-19 - XSS Vulnerability in DOM Manipulation
**Vulnerability:** The application used `innerHTML` and template literals containing user input (`query`) to render the "no results" state in the global search dropdown, leading to a Cross-Site Scripting (XSS) vulnerability, even with some custom escape functions.
**Learning:** Avoid using `.innerHTML` to render user input. Template literals are convenient but dangerous when they mix markup and untrusted variables directly.
**Prevention:** Strictly utilize safe DOM APIs such as `document.createElement`, `document.createTextNode`, and `.replaceChildren()` when constructing DOM elements that include user data. Use `.replaceChildren()` instead of `innerHTML = ''` to clear containers.
