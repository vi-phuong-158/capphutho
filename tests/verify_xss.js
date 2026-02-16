const fs = require('fs');
const vm = require('vm');
const path = require('path');

// Mock DOM Element
class Element {
    constructor(tagName) {
        this.tagName = tagName;
        this.className = '';
        this.innerHTML = '';
        this.children = [];
        this.style = {};
        this._listeners = {};
        this.scrollHeight = 100;
        this.scrollTop = 0;
    }

    appendChild(child) {
        this.children.push(child);
    }

    insertBefore(newNode, referenceNode) {
        this.children.push(newNode);
    }

    addEventListener(event, handler) {
        this._listeners[event] = handler;
    }

    click() {
        if (this.onclick) this.onclick();
    }

    remove() {}
}

const documentMock = {
    getElementById: (id) => new Element('div'),
    querySelector: (sel) => new Element('div'),
    createElement: (tag) => new Element(tag),
    addEventListener: (event, cb) => {
        if (event === 'DOMContentLoaded') {
            // Execute callback immediately
            cb();
        }
    }
};

const windowMock = {
    document: documentMock,
    MAIN_CATEGORIES: [],
    FAQ_DATA: {},
    FaqSearchEngine: class { search() { return []; } },
    toggleChat: () => {},
    chatbot: null // Placeholder
};

// Read chatbot.js
const code = fs.readFileSync(path.join(__dirname, '../js/chatbot.js'), 'utf8');

// Create context
const context = vm.createContext({
    window: windowMock,
    document: documentMock,
    console: console,
    setTimeout: (cb, delay) => cb(), // Immediate execution for mock
    Date: Date
});

try {
    vm.runInContext(code, context);
} catch (e) {
    console.error("Error running script:", e);
    process.exit(1);
}

const chatbot = context.window.chatbot;

if (!chatbot) {
    console.error("Chatbot instance not found on window.");
    process.exit(1);
}

const maliciousInput = '<img src=x onerror=alert(1)>';

// Test 1: User message
console.log('--- Test 1: User Message ---');
chatbot.addMessage(maliciousInput, 'user');
// addMessage inserts before optionContainer. body children: [msg1, optionContainer]
// Wait, constructor adds nothing.
// addMessage adds msgDiv.
// Mock insertBefore simply pushes to children.

const lastMsg = chatbot.elements.body.children[chatbot.elements.body.children.length - 1];

console.log('User Message innerHTML:', lastMsg.innerHTML);

if (lastMsg.innerHTML === maliciousInput) {
    console.log('VULNERABILITY CONFIRMED: User message allows HTML injection.');
} else {
    console.log('SAFE: User message escaped.');
}

// Test 2: Button rendering
console.log('\n--- Test 2: Button Rendering ---');
chatbot.renderButton(maliciousInput, 'icon-class', () => {});
const lastBtn = chatbot.elements.optionContainer.children[chatbot.elements.optionContainer.children.length - 1];

console.log('Button innerHTML:', lastBtn.innerHTML);

if (lastBtn.innerHTML.includes(maliciousInput)) {
    console.log('VULNERABILITY CONFIRMED: Button text allows HTML injection.');
} else {
    console.log('SAFE: Button text escaped.');
}
