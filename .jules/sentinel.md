## 2026-02-18 - Reverse Tabnabbing Vulnerability
**Vulnerability:** External links with `target="_blank"` were missing `rel="noopener noreferrer"`.
**Learning:** This vulnerability allows the opened page to access `window.opener` and potentially redirect the original page to a malicious site (phishing), even in static HTML files.
**Prevention:** Always add `rel="noopener noreferrer"` when using `target="_blank"`. Use a linter or a pre-commit hook to enforce this check.
