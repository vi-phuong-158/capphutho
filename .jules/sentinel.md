## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-02-23 - Unsandboxed External Iframe
**Vulnerability:** The Google Maps widget iframe in `index.html` was missing the `sandbox` attribute.
**Learning:** External iframes without strict `sandbox` permissions can execute potentially malicious scripts or unintended navigations on the parent site, increasing risk of XSS or clickjacking.
**Prevention:** Always append `sandbox="allow-scripts allow-same-origin allow-popups allow-forms"` or similar stricter policies when embedding external resources via iframes.
