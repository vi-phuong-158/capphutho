## 2026-02-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` but missing `rel="noopener noreferrer"`.
**Learning:** This allows the opened page to access `window.opener` and potentially redirect the original page (phishing).
**Prevention:** Always add `rel="noopener noreferrer"` to `target="_blank"` links.

## 2026-03-13 - Missing Subresource Integrity (SRI) on CDN Resources
**Vulnerability:** Found `https://cdnjs.cloudflare.com/.../font-awesome/6.4.0/css/all.min.css` loaded without SRI hash.
**Learning:** External CDNs can be compromised to deliver malicious payloads. Without SRI, the browser will blindly execute/apply any changes made to the hosted file, potentially leading to XSS or defacement.
**Prevention:** Always append Subresource Integrity (`integrity="..."`), `crossorigin="anonymous"`, and `referrerpolicy="no-referrer"` to `<link>` and `<script>` tags loading external third-party resources.
