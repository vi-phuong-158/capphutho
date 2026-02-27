const fs = require('fs');
const vm = require('vm');
const path = require('path');

function loadCode() {
    const sandbox = { window: {}, console: console };
    vm.createContext(sandbox);

    const dataCode = fs.readFileSync(path.join(__dirname, '../js/data/faq_db.js'), 'utf8');
    const engineCode = fs.readFileSync(path.join(__dirname, '../js/utils/search_engine.js'), 'utf8');

    vm.runInContext(dataCode, sandbox);
    vm.runInContext(engineCode, sandbox);

    return sandbox;
}

const sandbox = loadCode();
const engine = new sandbox.window.FaqSearchEngine();

const queries = ['thủ tục', 'căn cước', 'đăng ký xe', 'không dấu', 'hộ chiếu', 'vneid', 'người nước ngoài', 'z', 'abc', 'công an'];

// Verify correctness
console.log('Verifying correctness for query "thủ tục":');
const initialResults = engine.search('thủ tục');
if (initialResults.length > 0) {
    console.log(`Top result: ${initialResults[0].text}`);
    console.log(`Score: ${initialResults[0].score}`);
} else {
    console.log('No results found.');
}

console.log('Starting benchmark...');
const start = process.hrtime();

const ITERATIONS = 10000;
for (let i = 0; i < ITERATIONS; i++) {
    for (const q of queries) {
        engine.search(q);
    }
}

const diff = process.hrtime(start);
const timeInMs = (diff[0] * 1000 + diff[1] / 1e6);

console.log(`Total time for ${ITERATIONS * queries.length} searches: ${timeInMs.toFixed(3)}ms`);
console.log(`Average time per search: ${(timeInMs / (ITERATIONS * queries.length)).toFixed(5)}ms`);
