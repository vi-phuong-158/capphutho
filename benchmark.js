
const vm = require('vm');
const fs = require('fs');

// Mock DOM Classes
class MockElement {
    constructor(tagName) {
        this.tagName = tagName;
        this.children = [];
        this.style = {};
        this._scrollTop = 0;
        this._scrollHeight = 100;
        this.innerHTML = '';
        this.onclick = null;
        this.classList = {
            add: () => {},
            remove: () => {},
            toggle: () => {}
        };
    }

    appendChild(child) {
        // console.log(`Appending child to ${this.tagName}`);
        this.children.push(child);
    }

    get scrollHeight() {
        // Accessing scrollHeight forces reflow in a real browser
        global.layoutCount++;
        return this._scrollHeight;
    }

    set scrollTop(val) {
        this._scrollTop = val;
    }

    insertBefore(newNode, referenceNode) {
        this.children.push(newNode);
    }

    addEventListener(event, callback) {}
}

class MockDocumentFragment extends MockElement {
    constructor() {
        super('#document-fragment');
    }

    // In a real DOM, appending a fragment empties it and appends its children.
    // For counting reflows, we just care that appendChild on the container is called once with the fragment.
    // But technically, the container's appendChild handles the fragment.
    // Our MockElement.appendChild just pushes the child.
    // So if we push the fragment, it's one operation.
}

class MockDocument {
    constructor() {
        this.body = new MockElement('BODY');
    }
    getElementById(id) {
        return new MockElement('DIV'); // Simplified
    }
    querySelector(selector) {
        return new MockElement('DIV'); // Simplified
    }
    createElement(tagName) {
        return new MockElement(tagName.toUpperCase());
    }
    createDocumentFragment() {
        return new MockDocumentFragment();
    }
    createTextNode(text) {
        return { text, nodeType: 3 }; // Text node
    }
    addEventListener(event, callback) {
        if (event === 'DOMContentLoaded') {
            this.onDOMContentLoaded = callback;
        }
    }
}

// Setup Global Environment
global.window = {
    MAIN_CATEGORIES: [
        { id: '1', text: 'Cat 1', icon: 'icon' },
        { id: '2', text: 'Cat 2', icon: 'icon' },
        { id: '3', text: 'Cat 3', icon: 'icon' },
        { id: '4', text: 'Cat 4', icon: 'icon' },
        { id: '5', text: 'Cat 5', icon: 'icon' },
        { id: '6', text: 'Cat 6', icon: 'icon' },
        { id: '7', text: 'Cat 7', icon: 'icon' },
        { id: '8', text: 'Cat 8', icon: 'icon' }
    ],
    FAQ_DATA: {},
    FaqSearchEngine: class {
        search() { return []; }
    }
};

global.document = new MockDocument();
global.layoutCount = 0;

// Prepare Context
const context = vm.createContext(global);

// Read and Run Code
const code = fs.readFileSync('js/chatbot.js', 'utf8');
vm.runInContext(code, context);

// Manually trigger DOMContentLoaded
if (global.document.onDOMContentLoaded) {
    global.document.onDOMContentLoaded();
}

// Access the chatbot instance
const chatbot = global.window.chatbot;

if (!chatbot) {
    console.error("Chatbot instance not found!");
    process.exit(1);
}

// Reset layout count (initial render calls renderMainMenu)
console.log("Initial layout count (setup):", global.layoutCount);
global.layoutCount = 0;

// Benchmark renderMainMenu
console.log("Benchmarking renderMainMenu with 8 items...");
chatbot.renderMainMenu();

console.log("Final layout count:", global.layoutCount);
console.log("Forced reflows:", global.layoutCount);

if (global.layoutCount === 1) {
    console.log("SUCCESS: Forced reflows reduced to 1!");
} else if (global.layoutCount > 1) {
    console.log(`WARNING: Still detected ${global.layoutCount} reflows. Optimization might not be complete.`);
} else {
    console.log("Result looks optimized? (0 reflows?)");
}
