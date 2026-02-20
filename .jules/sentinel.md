## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-02-19 - Content Security Policy (CSP) Constraints
**Vulnerability:** Application uses extensive inline scripts and styles, preventing strict CSP implementation.
**Learning:** Legacy codebases often require `unsafe-inline` in `script-src` and `style-src` initially. This weakens XSS protection but still blocks unauthorized external resources.
**Prevention:** Future refactoring should move inline handlers to external JS files to enable stricter CSP.
