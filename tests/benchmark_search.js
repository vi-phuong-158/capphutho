const vm = require('vm');
const fs = require('fs');

const dataCode = fs.readFileSync('js/data/faq_db.js', 'utf8');
const searchEngineCode = fs.readFileSync('js/utils/search_engine.js', 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(dataCode, sandbox);
vm.runInContext(searchEngineCode, sandbox);

const engine = new sandbox.window.FaqSearchEngine();

const query = "đăng ký thường trú online";
// Warm up
for (let i = 0; i < 1000; i++) {
    engine.search(query);
}

const start = process.hrtime.bigint();
const iterations = 10000;
for (let i = 0; i < iterations; i++) {
    engine.search(query);
}
const end = process.hrtime.bigint();
console.log(`Average time per search: ${(Number(end - start) / 1000000) / iterations} ms`);
