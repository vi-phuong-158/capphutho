const fs = require('fs');
const vm = require('vm');

// Mock data
const window = {
    MAIN_CATEGORIES: Array.from({length: 10}, (_, i) => ({
        id: `cat_${i}`,
        text: `Category ${i}`,
        keywords: [`keyword${i}`],
        icon: 'icon'
    })),
    FAQ_DATA: {}
};

for (let i = 0; i < 10; i++) {
    window.FAQ_DATA[`cat_${i}`] = Array.from({length: 50}, (_, j) => ({
        text: `Question ${j} in Category ${i} with some long text to search`,
        answer: `Answer ${j}`,
        keywords: [`keyword${i}`, `q${j}`]
    }));
}

const origCode = fs.readFileSync('js/utils/search_engine.js', 'utf8');

const context1 = { window: { ...window } };
vm.runInNewContext(origCode, context1);
const engine1 = new context1.window.FaqSearchEngine();

const optimizedCode = `
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
                results.push({ ...item, score });
            }
        }

        const finalResults = results
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);

        if (this.cache.size >= 100) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }

        this.cache.set(normalizedQuery, finalResults);

        return finalResults;
    }
}
`;

const context2 = { window: { ...window } };
vm.runInNewContext(optimizedCode, context2);
const engine2 = new context2.window.FaqSearchEngine();

// Pre-warm
engine1.search("question 10 keyword1");
engine2.search("question 10 keyword1");

const start1 = performance.now();
for (let i = 0; i < 1000; i++) {
    engine1.search("question 10 keyword1");
}
const end1 = performance.now();

const start2 = performance.now();
for (let i = 0; i < 1000; i++) {
    engine2.search("question 10 keyword1");
}
const end2 = performance.now();

console.log(`Original Time: ${(end1 - start1).toFixed(2)} ms`);
console.log(`Optimized Time: ${(end2 - start2).toFixed(2)} ms`);
