## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-03-14 - Missing Subresource Integrity (SRI) for External CSS
**Vulnerability:** External FontAwesome CSS was loaded from `cdnjs` without Subresource Integrity (SRI) hashes or a restrictive referrer policy.
**Learning:** An attacker compromising `cdnjs` could serve malicious CSS that alters content, steals sensitive tokens (via CSS keyloggers), or defaces the site.
**Prevention:** Always verify external library integrity with valid SRI hashes (`integrity="..."`), restrict tracking (`referrerpolicy="no-referrer"`), and ensure proper resource sharing constraints (`crossorigin="anonymous"`).
