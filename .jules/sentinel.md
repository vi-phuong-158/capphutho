## 2026-02-16 - Unsanitized innerHTML in ChatbotController
**Vulnerability:** The `ChatbotController.addMessage` and `renderButton` methods were directly assigning user input to `innerHTML`, enabling potential Cross-Site Scripting (XSS).
**Learning:** While the current data source (`FAQ_DATA`) is trusted and static, the codebase did not enforce separation between trusted HTML (bot answers) and untrusted text (user input), creating a dormant vulnerability if data sources change.
**Prevention:** Always distinguish between content types. Use `textContent` for plain text, or sanitize HTML using an escape function (like the newly added `escapeHtml`) before inserting into `innerHTML`.
