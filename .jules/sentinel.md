## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-02-19 - Content Security Policy Implementation
**Vulnerability:** Missing CSP headers allowed potential XSS and loading of unauthorized external resources.
**Learning:** In a static site without server headers, `<meta http-equiv="Content-Security-Policy">` is the primary defense. Inline scripts and styles require 'unsafe-inline', which weakens protection but is often necessary for legacy/static architectures without a build step.
**Prevention:** Always include a strict CSP meta tag in all HTML files. Ensure consistency across pages to prevent regressions when components are reused.
