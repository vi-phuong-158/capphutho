const fs = require('fs');
const vm = require('vm');

// Mock DOM
const window = {};
const document = {};
const MAIN_CATEGORIES = [
    { id: 'cat1', text: 'Category 1', keywords: ['test', 'cat'], icon: 'icon' }
];
for(let i=2; i<=50; i++) {
    MAIN_CATEGORIES.push({ id: 'cat'+i, text: 'Category '+i, keywords: ['test', 'cat', 'category'], icon: 'icon' });
}
const FAQ_DATA = {
    'cat1': [
        { text: 'How to test?', answer: 'Yes', keywords: ['test', 'how'] }
    ]
};
for(let i=2; i<=50; i++) {
    FAQ_DATA['cat'+i] = [];
    for(let j=1; j<=20; j++) {
        FAQ_DATA['cat'+i].push({ text: `Question ${j} for category ${i}?`, answer: 'Answer', keywords: ['question', 'test'] });
    }
}
window.MAIN_CATEGORIES = MAIN_CATEGORIES;
window.FAQ_DATA = FAQ_DATA;

const code = fs.readFileSync('js/utils/search_engine.js', 'utf8');
vm.runInNewContext(code, { window, console });

const engine = new window.FaqSearchEngine();

const queries = ['test', 'category', 'how to', 'question 10', 'nonexistent', 'test test'];
let start = performance.now();
for (let i = 0; i < 1000; i++) {
    queries.forEach(q => engine.search(q));
}
let end = performance.now();
console.log(`Execution time for 1000 iterations: ${(end - start).toFixed(2)} ms`);
