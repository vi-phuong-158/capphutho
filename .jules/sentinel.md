## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-02-19 - Unsandboxed External iframe
**Vulnerability:** Found an external `iframe` (Google Maps widget) without a `sandbox` attribute.
**Learning:** External iframes can potentially execute malicious scripts or redirect the parent page. Not using a sandbox attribute gives the embedded content too much permission.
**Prevention:** Always add a `sandbox` attribute to external iframes with strict permissions (e.g., `allow-scripts allow-same-origin allow-popups allow-forms`) to mitigate potential security risks.
