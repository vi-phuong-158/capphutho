## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-05-21 - CSP in Legacy Apps
**Vulnerability:** Missing Content Security Policy (CSP) headers exposed the app to XSS and data injection.
**Learning:** For legacy apps with heavy inline styles/scripts, strict CSP breaks functionality.
**Prevention:** Use `unsafe-inline` for scripts/styles but restrict domains (e.g., `fonts.googleapis.com`) and frame sources (`frame-src`) to mitigate risks without full refactoring.
