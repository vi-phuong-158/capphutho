## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-05-21 - Client-Side Search DoS Protection
**Vulnerability:** The client-side FAQ search engine iterates over the entire database and processes NFD normalization and token matching for every item. An extremely large input string (e.g., > 5000 chars) could cause the browser's main thread to freeze due to the `O(N*M)` complexity of the search algorithm.
**Learning:** Client-side search logic in static sites is vulnerable to Availability attacks (DoS) just like server-side endpoints. Relying solely on HTML `maxlength` attributes is insufficient as they can be bypassed or the function can be called programmatically.
**Prevention:** Implement input length validation at both the UI layer (`maxlength` attribute) and the controller layer (truncating or rejecting input in JS) to ensure defense-in-depth.
