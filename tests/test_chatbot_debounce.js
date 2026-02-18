const fs = require('fs');
const vm = require('vm');
const path = require('path');

// Read the chatbot code
let code = fs.readFileSync(path.join(__dirname, '../js/chatbot.js'), 'utf8');

// Append assignment to window so we can access it
code += '\nwindow.ChatbotController = ChatbotController;';

// Mock DOM
const mockDocument = {
    getElementById: (id) => {
        return {
            id,
            addEventListener: function(event, handler) {
                if (event === 'input') {
                    this._inputHandler = handler;
                }
            },
            value: '',
            style: { display: 'none' },
            innerHTML: '',
            appendChild: () => {},
            insertBefore: () => {},
            remove: () => {},
            scrollTop: 0,
            scrollHeight: 0,
            classList: {
                add: () => {},
                remove: () => {}
            }
        };
    },
    createElement: (tag) => {
        return {
            className: '',
            id: '',
            innerHTML: '',
            remove: () => {},
            onclick: null
        };
    },
    querySelector: () => ({ classList: { add: () => {}, remove: () => {} } }),
    addEventListener: () => {}
};

// Mock Window
const mockWindow = {
    document: mockDocument,
    FaqSearchEngine: class {
        search() { return []; }
    },
    toggleChat: () => {},
    MAIN_CATEGORIES: [],
    FAQ_DATA: {},
    console: console,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    Date: Date,
    toggleChat: () => {}
};
// Add circular reference
mockWindow.window = mockWindow;

const sandbox = {
    document: mockDocument,
    window: mockWindow,
    console: console,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    Date: Date
};

vm.createContext(sandbox);
vm.runInContext(code, sandbox);

// Verify ChatbotController exists
if (!sandbox.window.ChatbotController) {
    console.error('ChatbotController not found');
    process.exit(1);
}

// Instantiate
const chatbot = new sandbox.window.ChatbotController();
const inputElement = chatbot.elements.input;

// Spy on handleSearch
let callCount = 0;
// We need to overwrite the method on the instance
chatbot.handleSearch = function(query) {
    callCount++;
    // console.log(`handleSearch called with: ${query}`);
};

// Simulate rapid input
console.log('Simulating 5 rapid inputs...');
if (inputElement._inputHandler) {
    inputElement._inputHandler({ target: { value: 'a' } });
    inputElement._inputHandler({ target: { value: 'ab' } });
    inputElement._inputHandler({ target: { value: 'abc' } });
    inputElement._inputHandler({ target: { value: 'abcd' } });
    inputElement._inputHandler({ target: { value: 'abcde' } });
} else {
    console.error('Input handler not found on input element');
    process.exit(1);
}

// Check immediately (should be 5 calls without debounce)
console.log(`Initial call count: ${callCount}`);

// Check after delay (should remain 5 without debounce, or 1 with debounce)
setTimeout(() => {
    console.log(`Final call count: ${callCount}`);
    if (callCount > 1) {
        console.log('FAIL: Debounce not working (expected behavior before fix)');
        process.exit(1);
    } else {
        console.log('PASS: Debounce working');
        process.exit(0);
    }
}, 500);
