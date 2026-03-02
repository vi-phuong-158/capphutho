const fs = require('fs');
const vm = require('vm');

const context = { window: {} };
vm.createContext(context);

const dataCode = fs.readFileSync('js/data/faq_db.js', 'utf8');
vm.runInContext(dataCode, context);

const code = fs.readFileSync('js/utils/search_engine.js', 'utf8');
vm.runInContext(code, context);

const engine = new context.window.FaqSearchEngine();

const startMapFilter = Date.now();
for (let i = 0; i < 1000; i++) {
    engine.search('can cuoc cong dan');
    engine.search('thu tuc dang ky xe');
    engine.search('vneid loi');
}
const endMapFilter = Date.now();

console.log(`Original Execution time: ${endMapFilter - startMapFilter}ms`);
