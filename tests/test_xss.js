const fs = require('fs');
const path = require('path');
const vm = require('vm');

// --- MOCK ENVIRONMENT ---

class MockElement {
    constructor(tagName) {
        this.tagName = tagName;
        this.className = '';
        this._innerHTML = '';
        this._textContent = '';
        this.children = [];
        this.listeners = {};
        this.style = {};
        this.value = '';
        this.scrollTop = 0;
        this.scrollHeight = 100;
        this.id = '';
    }

    get innerHTML() {
        return this._innerHTML;
    }

    set innerHTML(html) {
        this._innerHTML = html;
        // Basic approximation of textContent from HTML
        this._textContent = html.replace(/<[^>]*>/g, '');
    }

    get textContent() {
        return this._textContent;
    }

    set textContent(text) {
        this._textContent = text;
        // Escaping for innerHTML
        this._innerHTML = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    appendChild(child) {
        if (!child) return;
        this.children.push(child);
        if (typeof child === 'string') {
             this._textContent += child;
             this._innerHTML += child;
        } else {
             // Basic structure representation
             if (child.tagName === 'i') {
                 // Icon
             }
             this._textContent += child.textContent;
             // Simplified innerHTML reconstruction is hard, but we can check properties on children
        }
        return child;
    }

    insertBefore(newNode, referenceNode) {
        const index = this.children.indexOf(referenceNode);
        if (index > -1) {
            this.children.splice(index, 0, newNode);
        } else {
            this.children.push(newNode);
        }
        return newNode;
    }

    addEventListener(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    get classList() {
        return {
            add: (cls) => {
                if (!this.className.includes(cls)) {
                    this.className += ' ' + cls;
                    this.className = this.className.trim();
                }
            },
            remove: (cls) => {
                this.className = this.className.replace(cls, '').trim();
            }
        };
    }

    remove() {
        // no-op
    }

    createTextNode(text) {
        // This is document method, but if called on element... no.
        return text;
    }
}

const document = {
    createElement: (tagName) => new MockElement(tagName),
    getElementById: (id) => {
        const el = new MockElement('div');
        el.id = id;
        return el;
    },
    querySelector: (selector) => new MockElement('div'),
    addEventListener: (event, callback) => {
        if (event === 'DOMContentLoaded') {
            setTimeout(callback, 10);
        }
    },
    createTextNode: (text) => {
        const el = new MockElement('#text');
        el.textContent = text;
        return el;
    }
};

const window = {
    document: document,
    MAIN_CATEGORIES: [],
    FAQ_DATA: {},
    FaqSearchEngine: class MockSearchEngine {
        search() { return []; }
    }
};

global.document = document;
global.window = window;

// --- LOAD CODE ---

const chatbotCode = fs.readFileSync(path.join(__dirname, 'js/chatbot.js'), 'utf8');
vm.runInThisContext(chatbotCode);

// --- TEST LOGIC ---

setTimeout(() => {
    if (!window.chatbot) {
        console.error('FAILED: Chatbot controller not initialized.');
        process.exit(1);
    }

    const chatbot = window.chatbot;
    console.log('Chatbot initialized.');

    // TEST 1: addMessage XSS prevention (User)
    console.log('TEST 1: addMessage XSS prevention (User)');
    const maliciousInput = '<img src=x onerror=alert(1)>';
    chatbot.addMessage(maliciousInput, 'user');

    // Find the message element
    const userMsg = chatbot.elements.body.children.find(child => child.className.includes('user-message'));

    if (!userMsg) {
        console.error('FAILED: User message element not found.');
        process.exit(1);
    }

    // Check innerHTML - should be escaped
    if (userMsg.innerHTML.includes('<img')) {
        console.error('FAILED: XSS detected in addMessage! innerHTML contains unescaped HTML:', userMsg.innerHTML);
        process.exit(1);
    } else if (userMsg.innerHTML.includes('&lt;img')) {
        console.log('PASSED: HTML tags escaped in addMessage.');
    } else {
        console.log('WARNING: Unexpected innerHTML:', userMsg.innerHTML);
    }

    // TEST 2: renderButton XSS prevention
    console.log('TEST 2: renderButton XSS prevention');
    chatbot.renderButton(maliciousInput, 'fa-icon', () => {});

    // Find the button
    const btn = chatbot.elements.optionContainer.children.find(child => child.tagName === 'button');

    if (!btn) {
        console.error('FAILED: Button element not found.');
        process.exit(1);
    }

    // Check if button text content has the raw string (which means it was added as text)
    // And verify that no child is an <img> tag
    // Since my mock appendChild for textNode just appends textContent...

    // Let's check textContent of the button
    if (btn.textContent.includes(maliciousInput)) {
        console.log('PASSED: Button contains raw text content.');
    } else {
        console.error('FAILED: Button text content does not match input.');
    }

    // But we want to ensure it wasn't interpreted as HTML.
    // In my mock, if I did btn.innerHTML = text, then textContent would not have the tags if stripped, OR mock would behave differently.
    // But since I used createTextNode and appendChild, the mock logic for appendChild should handle it.

    // Real browser check: if I appendTextNode('<img...'), innerHTML becomes '&lt;img...'

    // In my mock:
    // btn.appendChild(icon) -> children.push(icon)
    // btn.appendChild(textNode) -> children.push(textNode)

    // So if I check btn.children, I should see textNode, not an img element.
    const hasImgChild = btn.children.some(child => child.tagName === 'img' || (child.innerHTML && child.innerHTML.includes('<img')));

    if (hasImgChild) {
        console.error('FAILED: Button has an image child! XSS possible.');
        process.exit(1);
    } else {
        console.log('PASSED: Button does not contain image element.');
    }

    // TEST 3: escapeHtml utility
    console.log('TEST 3: escapeHtml utility');
    const escaped = chatbot.escapeHtml(maliciousInput);
    if (escaped.includes('&lt;img')) {
        console.log('PASSED: escapeHtml works correctly.');
    } else {
        console.error('FAILED: escapeHtml failed:', escaped);
        process.exit(1);
    }

    console.log('ALL TESTS PASSED');

}, 100);
