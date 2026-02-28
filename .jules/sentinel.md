## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-02-23 - External iframe Sandboxing
**Vulnerability:** Missing `sandbox` attribute on external `iframe` embedded in `index.html` (Google Maps widget).
**Learning:** An external `iframe` without sandboxing can potentially execute harmful scripts outside its intended scope if compromised.
**Prevention:** Always apply the `sandbox` attribute to `iframe` elements, granting the principle of least privilege (e.g., `sandbox="allow-scripts allow-same-origin allow-popups allow-forms"`).
