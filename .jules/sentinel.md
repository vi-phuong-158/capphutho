## 2025-02-18 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `target="_blank"` links without `rel="noopener noreferrer"` attribute.
**Learning:** When using `target="_blank"`, the new page gets access to the `window.opener` object of the original page. This allows the new page to potentially redirect the original page to a malicious site (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to any anchor tag that uses `target="_blank"`.
