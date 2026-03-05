## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2025-03-05 - XSS Vulnerability via innerHTML
**Vulnerability:** User input embedded into innerHTML, even when partially escaped.
**Learning:** Relying on custom escape functions with innerHTML is risky and an anti-pattern. It can still lead to XSS if the escaping logic is flawed or bypassed.
**Prevention:** Always use safe DOM APIs like document.createElement, document.createTextNode, and textContent when inserting user input into the DOM.
