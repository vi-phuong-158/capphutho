## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-02-21 - Input Length Limits
**Vulnerability:** Missing `maxlength` on search inputs allows potentially infinite strings, posing a Denial of Service (DoS) risk.
**Learning:** Even static sites with client-side logic can be vulnerable to client-side DoS if inputs are processed intensively (e.g., regex, search loops).
**Prevention:** Always set reasonable `maxlength` on `<input>` and `<textarea>` elements.
