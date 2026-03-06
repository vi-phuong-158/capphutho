## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-03-06 - Missing SRI attributes on third-party links
**Vulnerability:** Found `link` tags for FontAwesome loaded from a CDN without Subresource Integrity (SRI) attributes.
**Learning:** This is a supply chain vulnerability. If the CDN is compromised, malicious CSS could be injected to deface the site or launch side-channel attacks (like reading input text using CSS attribute selectors).
**Prevention:** Always add `integrity` attributes along with `crossorigin="anonymous"` and `referrerpolicy="no-referrer"` to `link` and `script` tags pointing to third-party CDNs.
