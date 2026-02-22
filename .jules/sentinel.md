## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-05-24 - Client-Side Denial of Service (DoS) Risk
**Vulnerability:** Found input fields without `maxlength` attributes, allowing potentially unlimited string input.
**Learning:** Extremely long strings can cause excessive processing time in client-side search algorithms (looping, normalization), freezing the browser UI.
**Prevention:** Added `maxlength` attributes (100-200 chars) to all search inputs to enforce reasonable limits.
