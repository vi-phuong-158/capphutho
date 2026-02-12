## 2025-05-23 - Chatbot XSS Vulnerability
**Vulnerability:** The ChatbotController used `innerHTML` to render user messages and button labels, which could lead to Stored XSS if the data source (FAQ database) or Reflected XSS if user input was echoed.
**Learning:** Even in static sites, client-side XSS is a risk when DOM manipulation methods like `innerHTML` are used with dynamic content or user input.
**Prevention:** Always use `textContent` for untrusted text, and use `document.createElement()` + `appendChild()` to construct DOM elements safely instead of concatenating HTML strings.
