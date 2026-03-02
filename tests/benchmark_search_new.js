const fs = require('fs');
const vm = require('vm');

const context = { window: {} };
vm.createContext(context);

const dataCode = fs.readFileSync('js/data/faq_db.js', 'utf8');
vm.runInContext(dataCode, context);

const code = `
window.FaqSearchEngine = class FaqSearchEngine {
    constructor() {
        this.index = [];
        this.cache = new Map();
        this.buildIndex();
    }

    buildIndex() {
        const categories = window.MAIN_CATEGORIES || [];
        const faqData = window.FAQ_DATA || {};

        categories.forEach(cat => {
            this.index.push({
                type: 'category',
                id: cat.id,
                text: cat.text,
                answer: null,
                keywords: this.normalize(cat.keywords.join(' ')),
                normalizedText: this.normalize(cat.text),
                original: cat
            });
        });

        Object.keys(faqData).forEach(catId => {
            faqData[catId].forEach(q => {
                this.index.push({
                    type: 'question',
                    id: null,
                    catId: catId,
                    text: q.text,
                    answer: q.answer,
                    keywords: this.normalize(q.keywords ? q.keywords.join(' ') : ''),
                    normalizedText: this.normalize(q.text),
                    original: q
                });
            });
        });
    }

    normalize(str) {
        if (!str) return '';
        return str.toLowerCase()
            .normalize("NFD")
            .replace(/[\\u0300-\\u036f]/g, "")
            .replace(/đ/g, "d");
    }

    search(query) {
        if (!query || query.trim().length < 2) return [];

        if (query.length > 200) query = query.substring(0, 200);

        const normalizedQuery = this.normalize(query);

        if (this.cache.has(normalizedQuery)) {
            return this.cache.get(normalizedQuery);
        }

        const queryTokens = normalizedQuery.split(' ');

        const results = [];

        for (let i = 0; i < this.index.length; i++) {
            const item = this.index[i];
            let score = 0;

            if (item.normalizedText.includes(normalizedQuery)) score += 10;
            if (item.keywords.includes(normalizedQuery)) score += 8;

            for (let j = 0; j < queryTokens.length; j++) {
                const token = queryTokens[j];
                if (item.normalizedText.includes(token)) score += 2;
                if (item.keywords.includes(token)) score += 1;
            }

            if (score > 0) {
                // Return a shallow copy merging original item with score to prevent mutations of index
                results.push({ ...item, score });
            }
        }

        results.sort((a, b) => b.score - a.score);

        const finalResults = results.slice(0, 5);

        // bounded cache to prevent memory leak
        if (this.cache.size >= 100) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(normalizedQuery, finalResults);

        return finalResults;
    }
}
`;
vm.runInContext(code, context);

const engine = new context.window.FaqSearchEngine();

const startMapFilter = Date.now();
for (let i = 0; i < 1000; i++) {
    engine.search('can cuoc cong dan');
    engine.search('thu tuc dang ky xe');
    engine.search('vneid loi');
}
const endMapFilter = Date.now();

console.log(`Optimized Execution time: ${endMapFilter - startMapFilter}ms`);
