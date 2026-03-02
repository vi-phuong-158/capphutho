const fs = require('fs');
const vm = require('vm');

const context = { window: {} };
vm.createContext(context);

// Mock data
context.window.MAIN_CATEGORIES = [
    { id: 'cat1', icon: 'icon1', text: 'Category 1', keywords: ['key1', 'key2'] }
];
context.window.FAQ_DATA = {
    'cat1': [
        { text: 'Question 1', answer: 'Answer 1', keywords: ['q1'] }
    ]
};

const code = fs.readFileSync('js/utils/search_engine.js', 'utf8');
vm.runInContext(code, context);

const engine = new context.window.FaqSearchEngine();

const startMapFilter = Date.now();
for (let i = 0; i < 1000; i++) {
    engine.search('category 1');
}
const endMapFilter = Date.now();

console.log(`Execution time: ${endMapFilter - startMapFilter}ms`);

console.log(engine.search('category 1'));
