## 2025-05-23 - DOM Batching in Chatbot
**Learning:** The `ChatbotController.renderButton` method caused significant layout thrashing by appending elements individually and forcing a reflow (`scrollToBottom`) inside a loop. This pattern resulted in O(N) layout calculations for N menu items.
**Action:** Use `DocumentFragment` to batch DOM insertions and perform a single `scrollToBottom` call after appending the fragment, reducing layout thrashing by ~8x for typical menu renders.
