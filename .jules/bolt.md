## 2024-05-22 - Chatbot Search Performance
**Learning:** The `FaqSearchEngine` iterates over the entire dataset and normalizes strings on every search call. Without debouncing, this runs on every keystroke, causing potential main-thread blocking on low-end devices.
**Action:** Always debounce search inputs that trigger expensive synchronous operations or DOM updates, especially in mobile-first applications.
