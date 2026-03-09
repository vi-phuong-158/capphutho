## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-03-09 - DOM-based XSS via innerHTML
**Vulnerability:** User input was being rendered into the DOM using `.innerHTML` combined with template literals (e.g., `innerHTML = \`...${query}...\``). While an `escapeHtml` function was used, `.innerHTML` remains a risky pattern prone to XSS if escaping is missed or improperly implemented, and violates secure coding practices.
**Learning:** Using `.innerHTML` to insert dynamic content, especially user-controlled input, creates potential DOM-based XSS vectors. It is also less efficient for simply clearing elements compared to modern DOM APIs.
**Prevention:** Always use safe DOM APIs like `document.createElement`, `document.createTextNode`, and `.replaceChildren()` or `.appendChild()` instead of `.innerHTML` when handling user input or dynamically creating elements.
