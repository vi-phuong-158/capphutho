
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Mock window
const window = {};
global.window = window;

// Load files
const faqDbContent = fs.readFileSync(path.join(__dirname, '../js/data/faq_db.js'), 'utf8');
const searchEngineContent = fs.readFileSync(path.join(__dirname, '../js/utils/search_engine.js'), 'utf8');

// Execute files in context
vm.runInNewContext(faqDbContent, { window });
vm.runInNewContext(searchEngineContent, { window });

const FaqSearchEngine = window.FaqSearchEngine;
const engine = new FaqSearchEngine();

// Benchmark
const iterations = 10000;
const query = "đăng ký thường trú";

console.log(`Running benchmark: ${iterations} iterations for query "${query}"...`);

const start = process.hrtime();

for (let i = 0; i < iterations; i++) {
    engine.search(query);
}

const end = process.hrtime(start);
const durationInMs = (end[0] * 1000 + end[1] / 1e6).toFixed(2);

console.log(`Total time: ${durationInMs}ms`);
console.log(`Average time per search: ${(durationInMs / iterations).toFixed(4)}ms`);

// Verify correctness
const results = engine.search(query);
console.log(`Top result: ${results[0]?.text || 'None'}`);
console.log(`Score: ${results[0]?.score}`);
