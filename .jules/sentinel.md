## 2025-05-15 - Reflected XSS in Chatbot
**Vulnerability:** The ChatbotController used `innerHTML` to render user messages and dynamic button labels, allowing potential XSS if data sources were tainted.
**Learning:** Even with static data sources, UI components that render text using `innerHTML` without escaping are vulnerable to future data changes or reflected input.
**Prevention:** Always use `textContent` for untrusted text, or escape HTML entities before inserting into `innerHTML`.
