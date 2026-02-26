const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Mock DOM classes
class MockElement {
    constructor(tagName) {
        this.tagName = tagName;
        this.classList = {
            _classes: new Set(),
            add: (cls) => this.classList._classes.add(cls),
            remove: (cls) => this.classList._classes.delete(cls),
            contains: (cls) => this.classList._classes.has(cls)
        };
        this.style = { display: 'none' };
        this.attributes = {};
        this.children = [];
        this.listeners = {};
    }

    setAttribute(name, value) {
        this.attributes[name] = value;
    }

    getAttribute(name) {
        return this.attributes[name];
    }

    focus() {
        global.lastFocused = this;
    }

    blur() {}

    addEventListener(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    appendChild(child) {
        this.children.push(child);
    }

    insertBefore(child, ref) {
        this.children.push(child);
    }
}

class MockDocument {
    constructor() {
        this.elements = {};
        this.listeners = {};
    }

    getElementById(id) {
        if (!this.elements[id]) {
            this.elements[id] = new MockElement('div');
            this.elements[id].attributes['id'] = id;
            if (id === 'chatSearchInput') {
                this.elements[id].tagName = 'INPUT';
            }
        }
        return this.elements[id];
    }

    querySelector(selector) {
        if (selector === '.chat-launcher') {
            if (!this.elements['chat-launcher']) {
                this.elements['chat-launcher'] = new MockElement('button');
                this.elements['chat-launcher'].attributes['class'] = 'chat-launcher';
            }
            return this.elements['chat-launcher'];
        }
        return null;
    }

    createElement(tagName) {
        return new MockElement(tagName);
    }

    createDocumentFragment() {
        return { appendChild: () => {} };
    }

    createTextNode(text) {
        return { text };
    }

    addEventListener(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    trigger(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }
}

const mockDocument = new MockDocument();
global.lastFocused = null;

const mockWindow = {
    document: mockDocument,
    HTMLElement: MockElement,
    MAIN_CATEGORIES: [],
    FAQ_DATA: {},
    FaqSearchEngine: class { search() { return []; } },
    setTimeout: (cb, delay) => {
        cb(); // Run immediately for test
        return 123;
    },
    clearTimeout: () => {},
    toggleChat: null,
    console: console
};
mockWindow.window = mockWindow; // Self-reference for window.chatbot

// Read source code
const chatbotCode = fs.readFileSync(path.join(__dirname, '../js/chatbot.js'), 'utf8');

// Run code in VM context
const context = vm.createContext(mockWindow);
vm.runInContext(chatbotCode, context);

// Manually trigger DOMContentLoaded
if (mockDocument.listeners['DOMContentLoaded']) {
    mockDocument.listeners['DOMContentLoaded'].forEach(cb => cb());
}

// TEST CASES
console.log('Running Chatbot UX Tests...');
let passed = true;

// Test 1: Open Chat
console.log('Test 1: Opening Chat...');
mockWindow.toggleChat();

const chatWindow = mockDocument.getElementById('chatWindow');
if (chatWindow.style.display !== 'flex') {
    console.error('FAIL: Chat window display should be flex');
    passed = false;
}

const launcher = mockDocument.querySelector('.chat-launcher');
if (launcher.getAttribute('aria-expanded') !== 'true') {
    console.error(`FAIL: Launcher aria-expanded should be 'true', got '${launcher.getAttribute('aria-expanded')}'`);
    passed = false;
}

const input = mockDocument.getElementById('chatSearchInput');
if (global.lastFocused !== input) {
    console.error('FAIL: Focus should be on chat input after opening');
    passed = false;
} else {
    console.log('PASS: Focus on input');
}

// Test 2: Close Chat
console.log('Test 2: Closing Chat...');
mockWindow.toggleChat();

if (chatWindow.style.display !== 'none') {
    console.error('FAIL: Chat window display should be none');
    passed = false;
}

if (launcher.getAttribute('aria-expanded') !== 'false') {
    console.error(`FAIL: Launcher aria-expanded should be 'false', got '${launcher.getAttribute('aria-expanded')}'`);
    passed = false;
}

if (global.lastFocused !== launcher) {
    console.error('FAIL: Focus should be returned to launcher after closing');
    passed = false;
} else {
    console.log('PASS: Focus on launcher');
}

// Test 3: Escape Key
console.log('Test 3: Escape Key...');
mockWindow.toggleChat(); // Open it
if (chatWindow.style.display !== 'flex') {
    console.error('FAIL: Setup for Test 3 failed');
    passed = false;
}

mockDocument.trigger('keydown', { key: 'Escape' });

if (chatWindow.style.display !== 'none') {
    console.error('FAIL: Chat window should close on Escape key');
    passed = false;
} else {
    console.log('PASS: Escape key closed chat');
}

if (passed) {
    console.log('ALL TESTS PASSED');
    process.exit(0);
} else {
    console.error('SOME TESTS FAILED');
    process.exit(1);
}
