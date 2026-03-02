## 2024-03-02 - [Overlay Focus Management]
**Learning:** This codebase lacks automatic focus trapping and restoring for overlay widgets like the Chatbot window. This forces manual DOM focus management when toggling states to avoid breaking the keyboard navigation order.
**Action:** When implementing or modifying dialog-like overlay components, always manually implement a focus-shift to an interactive element upon opening and a focus-return to the triggering element upon closing.
