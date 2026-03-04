## 2024-05-24 - Chatbot Accessibility and Focus Trapping
**Learning:** Manual display style modifications combined with focus changes can easily lead to desynced accessibility states (`aria-expanded`) and lost screen-reader context if state modifications are scattered.
**Action:** Centralize state changes and focus trapping in a single reusable function (like `toggleChat`), ensuring attributes like `aria-expanded` and programmatic focus always resolve deterministically. Add timeouts to `.focus()` to allow display reflows.
