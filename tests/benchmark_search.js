const fs = require('fs');
const vm = require('vm');

// Mock DOM/Global
const context = vm.createContext({
    window: {
        MAIN_CATEGORIES: [
            { id: 'cat1', text: 'Category 1', keywords: ['cat', 'one'], icon: 'icon' }
        ],
        FAQ_DATA: {
            cat1: [
                { text: 'Question 1', answer: 'Answer 1', keywords: ['q', 'one'] },
                { text: 'Question 2', answer: 'Answer 2', keywords: ['q', 'two'] },
                { text: 'Question 3', answer: 'Answer 3', keywords: ['q', 'three'] },
                { text: 'Question 4', answer: 'Answer 4', keywords: ['q', 'four'] },
                { text: 'Question 5', answer: 'Answer 5', keywords: ['q', 'five'] },
                { text: 'Question 6', answer: 'Answer 6', keywords: ['q', 'six'] },
            ]
        }
    }
});

// Load the search engine
const code = fs.readFileSync('js/utils/search_engine.js', 'utf8');
vm.runInContext(code, context);

// Build a larger index for testing
for (let i = 0; i < 1000; i++) {
    context.window.FAQ_DATA.cat1.push({
        text: `Question ${i}`,
        answer: `Answer ${i}`,
        keywords: ['test', 'query', `kw${i}`]
    });
}

// Re-init the search engine
vm.runInContext(`
    window.engine = new window.FaqSearchEngine();
`, context);

// Benchmark
console.time('Search (map/filter)');
let results;
for (let i = 0; i < 1000; i++) {
    results = context.window.engine.search('test query');
}
console.timeEnd('Search (map/filter)');
// console.log(results);
