## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-02-19 - Missing Sandbox Attribute on External Iframe
**Vulnerability:** External iframes (like the Google Maps widget) did not have a `sandbox` attribute. This could allow malicious third-party scripts to have broader access to the parent context.
**Learning:** Even trusted third-party widgets can potentially be compromised or abused to run unwanted scripts or popups that might affect the host page.
**Prevention:** Always add a `sandbox` attribute with strict permissions (e.g., `allow-scripts allow-same-origin allow-popups allow-forms`) to external iframes to enforce a strict security policy.
