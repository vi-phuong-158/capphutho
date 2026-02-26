const fs = require('fs');
const vm = require('vm');
const path = require('path');

// Mock window and other global objects
const window = {};
const context = vm.createContext({ window, console });

// Load data and search engine
try {
    const faqDbContent = fs.readFileSync(path.join(__dirname, '../js/data/faq_db.js'), 'utf8');
    vm.runInContext(faqDbContent, context);

    const searchEngineContent = fs.readFileSync(path.join(__dirname, '../js/utils/search_engine.js'), 'utf8');
    vm.runInContext(searchEngineContent, context);
} catch (e) {
    console.error("Error loading files:", e);
    process.exit(1);
}

// Instantiate Search Engine
const engine = new window.FaqSearchEngine();

// Test queries
const queries = [
    "thủ tục",
    "căn cước",
    "không dấu",
    "vneid",
    "xe máy",
    "đăng ký tạm trú",
    "hộ chiếu",
    "báo mất",
    "khiếu nại",
    "tố cáo"
];

// Verify correctness first
console.log("Verifying correctness for query: 'thủ tục'");
const initialResults = engine.search("thủ tục");
console.log(JSON.stringify(initialResults, null, 2));

// Benchmark
console.log("Starting benchmark...");
const iterations = 10000;
const start = performance.now();

for (let i = 0; i < iterations; i++) {
    for (const q of queries) {
        engine.search(q);
    }
}

const end = performance.now();
const totalTime = end - start;
const avgTime = totalTime / (iterations * queries.length);

console.log(`Total time for ${iterations * queries.length} searches: ${totalTime.toFixed(2)}ms`);
console.log(`Average time per search: ${avgTime.toFixed(4)}ms`);
