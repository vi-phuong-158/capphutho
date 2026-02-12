const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Mock DOM Environment
class Element {
    constructor(tagName) {
        this.tagName = tagName;
        this._innerHTML = '';
        this._textContent = '';
        this.className = '';
        this.children = [];
        this.style = {};
        this.events = {};
        this.nodeType = 1; // Element node
    }

    get innerHTML() {
        return this._innerHTML;
    }

    set innerHTML(val) {
        this._innerHTML = val;
        // In a real browser, parsing HTML would happen here.
        // For our test, we just store the string.
        // And clear children if any (simplified)
        this.children = [];
    }

    get textContent() {
        return this._textContent;
    }

    set textContent(val) {
        this._textContent = val;
        this._innerHTML = ''; // Clearing innerHTML effectively
        this.children = [];
    }

    appendChild(child) {
        this.children.push(child);
        // We don't automatically update innerHTML in this simple mock
        // because we are testing HOW the element was constructed.
    }

    insertBefore(newNode, referenceNode) {
        // Simplified: just push to children for verification
        this.children.push(newNode);
    }

    addEventListener(event, callback) {
        this.events[event] = callback;
    }

    click() {
        if (this.events['click']) this.events['click']();
    }
}

class TextNode {
    constructor(text) {
        this.textContent = text;
        this.nodeType = 3; // Text node
    }
}

const document = {
    getElementById: (id) => new Element('div'),
    querySelector: (selector) => new Element('div'),
    createElement: (tagName) => new Element(tagName),
    createTextNode: (text) => new TextNode(text),
    addEventListener: () => {}
};

// Mock Window
const window = {
    document: document,
    // Minimal mock for SearchEngine
    FaqSearchEngine: class MockSearchEngine {
        search() { return []; }
    },
    MAIN_CATEGORIES: [],
    FAQ_DATA: {},
    toggleChat: () => {},
    scrollToBottom: () => {}
};

global.window = window;
global.document = document;

// Load chatbot.js code
const chatbotPath = path.join(__dirname, '../js/chatbot.js');
let chatbotCode = fs.readFileSync(chatbotPath, 'utf8');

// Expose the class for testing
chatbotCode += '\nwindow.ChatbotController = ChatbotController;';

// Execute code
const context = vm.createContext({
    window,
    document,
    console,
    setTimeout: setTimeout
});

vm.runInContext(chatbotCode, context);

// Test Runner
async function runTests() {
    console.log("=== Running Chatbot Security Tests ===");
    let passed = 0;
    let failed = 0;

    function assert(condition, message) {
        if (condition) {
            console.log(`✅ PASS: ${message}`);
            passed++;
        } else {
            console.error(`❌ FAIL: ${message}`);
            failed++;
        }
    }

    // Instantiate Controller
    // Since ChatbotController is not exported, we need to access it from window.chatbot if initialized,
    // or instantiate it if exposed in context.
    // The code does: window.chatbot = new ChatbotController(); on DOMContentLoaded.
    // We can simulate that or just instantiate.
    // But ChatbotController class is local to the script scope unless attached to window.

    // In js/chatbot.js: class ChatbotController { ... } ... window.chatbot = new ChatbotController();
    // But since it's inside 'DOMContentLoaded', it might not have run yet.
    // Actually, the class definition is top-level in the file.

    // Wait, the file structure is:
    // class ChatbotController { ... }
    // document.addEventListener(...)

    // So ChatbotController IS available in the context scope.

    // Let's create an instance manually to be sure.
    // Note: The constructor tries to getElementById. Our mock handles that.

    let chatbot;
    try {
        chatbot = new context.window.ChatbotController();
    } catch (e) {
        console.error("Failed to instantiate ChatbotController:", e);
        process.exit(1);
    }

    // --- Test 1: User XSS Prevention ---
    console.log("\n--- Test 1: User XSS Prevention (addMessage) ---");
    const maliciousInput = '<img src=x onerror=alert(1)>';

    // 1. Add User Message
    chatbot.addMessage(maliciousInput, 'user');

    // Get the last added message.
    // addMessage does: this.elements.body.insertBefore(msgDiv, this.elements.optionContainer);
    // Our mock insertBefore pushes to children.
    const lastMsg = chatbot.elements.body.children[chatbot.elements.body.children.length - 1];

    if (lastMsg.innerHTML === maliciousInput) {
        assert(false, "User message set via innerHTML (Vulnerable to XSS)");
    } else if (lastMsg.textContent === maliciousInput && lastMsg.innerHTML === '') {
        assert(true, "User message set via textContent (Safe)");
    } else {
        assert(false, `Unknown state: innerHTML='${lastMsg.innerHTML}', textContent='${lastMsg.textContent}'`);
    }

    // --- Test 2: Bot HTML Support ---
    console.log("\n--- Test 2: Bot HTML Support (addMessage) ---");
    const safeHtml = '<b>Hello</b>';
    chatbot.addMessage(safeHtml, 'bot');
    const botMsg = chatbot.elements.body.children[chatbot.elements.body.children.length - 1];

    if (botMsg.innerHTML === safeHtml) {
        assert(true, "Bot message correctly uses innerHTML");
    } else {
        assert(false, "Bot message innerHTML mismatch");
    }

    // --- Test 3: Render Button Safety ---
    console.log("\n--- Test 3: Button Rendering Safety (renderButton) ---");
    const maliciousLabel = '<script>alert(1)</script>';

    chatbot.renderButton(maliciousLabel, 'fa-icon', () => {});

    // renderButton appends to optionContainer
    const btn = chatbot.elements.optionContainer.children[chatbot.elements.optionContainer.children.length - 1];

    // Check implementation
    // Vulnerable: btn.innerHTML = `<i class="..."></i> ${maliciousLabel}`
    // Safe: btn has children (i element, text node)

    if (btn.innerHTML.includes(maliciousLabel)) {
        assert(false, "Button rendered via innerHTML with user input (Vulnerable)");
    } else {
        // Check if constructed safely
        const hasTextNode = btn.children.some(child => child.nodeType === 3 && child.textContent.includes(maliciousLabel));
        const hasIcon = btn.children.some(child => child.tagName === 'i');

        if (hasTextNode) {
            assert(true, "Button label rendered as TextNode (Safe)");
        } else {
            // It might be that the fix isn't applied yet, so we expect failure or different behavior.
            // If innerHTML is empty and no children, something is wrong.
            assert(false, "Button not rendered correctly or logic changed.");
        }
    }

    console.log(`\nSummary: ${passed} Passed, ${failed} Failed`);
    if (failed > 0) process.exit(1);
}

runTests();
