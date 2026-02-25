const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

// Mock window
const window = {};
const context = vm.createContext({ window, console });

// Load data
const dataCode = fs.readFileSync('js/data/faq_db.js', 'utf8');
vm.runInContext(dataCode, context);

// Load engine
const engineCode = fs.readFileSync('js/utils/search_engine.js', 'utf8');
vm.runInContext(engineCode, context);

// Get engine class
const FaqSearchEngine = window.FaqSearchEngine;

// Initialize
const engine = new FaqSearchEngine();
console.log(`Index size: ${engine.index.length}`);

// Correctness Check
const testQuery = 'hộ chiếu';
const results = engine.search(testQuery);
console.log(`Results for '${testQuery}': ${results.length}`);
assert(results.length > 0, 'Should find results for "hộ chiếu"');
assert(results[0].score > 0, 'Score should be positive');
// Check if result is relevant (contains "hộ chiếu" or "ho chieu")
const firstRes = results[0];
const relevant = firstRes.normalizedText.includes('ho chieu') || firstRes.keywords.includes('ho chieu');
assert(relevant, 'First result should be relevant');

console.log('Correctness assertions passed.');

// Benchmark
const queries = ['hộ chiếu', 'đăng ký xe', 'vneid', 'tạm trú', 'khiếu nại', 'không dấu', 'sai chính tả', 'a', 'b', 'c'];
const iterations = 100000;

console.time('Search Benchmark');
for (let i = 0; i < iterations; i++) {
    for (const q of queries) {
        engine.search(q);
    }
}
console.timeEnd('Search Benchmark');

// Memory usage (approximate)
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`Memory used: ${Math.round(used * 100) / 100} MB`);
