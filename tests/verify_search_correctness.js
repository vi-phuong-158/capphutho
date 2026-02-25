const fs = require('fs');
const vm = require('vm');

// Mock window
const window = {};
const context = vm.createContext({ window, console });

// Load data
const dataCode = fs.readFileSync('js/data/faq_db.js', 'utf8');
vm.runInContext(dataCode, context);

// Load engine
const engineCode = fs.readFileSync('js/utils/search_engine.js', 'utf8');
vm.runInContext(engineCode, context);

// Initialize engine
const FaqSearchEngine = window.FaqSearchEngine;
const engine = new FaqSearchEngine();

// Define queries to test various scenarios
const queries = [
    'hộ chiếu',
    'đăng ký xe',
    'vneid',
    'tạm trú',
    'khiếu nại',
    'xuat nhap canh', // No accents
    'a', // Short query
    'khong co ket qua nao', // No results
    'cccd'
];

// Run queries and print results
queries.forEach(q => {
    console.log(`\nQuery: "${q}"`);
    const results = engine.search(q);
    console.log(`Found: ${results.length}`);
    results.forEach(r => {
        console.log(` - [Score: ${r.score}] [Type: ${r.type}] ${r.text.substring(0, 50)}...`);
    });
});
