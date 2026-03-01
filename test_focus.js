const vm = require('vm');
const fs = require('fs');

let inputFocusCalled = false;
let launcherFocusCalled = false;

const domScope = {
  document: {
    getElementById: (id) => {
      return {
        id: id,
        style: { display: 'none' },
        innerHTML: '',
        appendChild: () => {},
        insertBefore: () => {},
        addEventListener: () => {},
        focus: () => {
          if(id === 'chatSearchInput') inputFocusCalled = true;
          console.log(`[TEST] Focus shifted to #${id}`)
        },
        blur: () => {
          console.log(`[TEST] Blur called on #${id}`)
        },
        classList: { add: () => {}, remove: () => {} }
      };
    },
    querySelector: (selector) => {
      if (selector === '.chat-launcher') {
        return {
          classList: {
            add: () => console.log(`[TEST] .chat-launcher added 'active'`),
            remove: () => console.log(`[TEST] .chat-launcher removed 'active'`)
          },
          setAttribute: (attr, val) => console.log(`[TEST] .chat-launcher set ${attr}="${val}"`),
          focus: () => {
            launcherFocusCalled = true;
            console.log(`[TEST] Focus shifted to .chat-launcher`)
          }
        }
      }
      return null;
    },
    createElement: () => ({ style: {}, classList: {add: ()=>{}, remove:()=>{}}, appendChild: () => {}, onclick: null }),
    createTextNode: () => ({}),
    createDocumentFragment: () => ({ appendChild: () => {} }),
    addEventListener: (event, handler) => {
      if (event === 'keydown') {
        domScope.mockKeydownListeners.push(handler);
      }
      if (event === 'DOMContentLoaded') {
        domScope.mockInit = handler;
      }
    }
  },
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  console: console,
  window: {
    FaqSearchEngine: class { search() { return []; } },
    MAIN_CATEGORIES: [],
    FAQ_DATA: {}
  }
};
domScope.mockKeydownListeners = [];

const context = vm.createContext(domScope);

const scriptCode = fs.readFileSync('./js/chatbot.js', 'utf8');

vm.runInContext(scriptCode, context);

// Manually trigger DOMContentLoaded to initialize chatbot
domScope.mockInit();


// Test 1: toggleChat to open
console.log('--- Test 1: Open Chat ---');
context.window.toggleChat();

// Wait for setTimeout to finish focusing
setTimeout(() => {
  if (!inputFocusCalled) {
    console.error('FAILED: Input focus was not called on open.');
  } else {
    console.log('PASS: Input focus was called on open.');
  }

  // Test 2: toggleChat to close
  console.log('--- Test 2: Close Chat ---');
  context.window.toggleChat();

  if (!launcherFocusCalled) {
    console.error('FAILED: Launcher focus was not called on close.');
  } else {
    console.log('PASS: Launcher focus was called on close.');
  }

  // Test 3: Open again, then close with Escape
  console.log('--- Test 3: Open again ---');
  context.window.toggleChat();

  setTimeout(() => {
    console.log('--- Test 4: Close with Escape ---');
    console.log('PASS: Keydown listeners registered:', domScope.mockKeydownListeners.length);
    domScope.mockKeydownListeners.forEach(h => h({ key: 'Escape' }));
  }, 100);
}, 100);