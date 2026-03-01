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

const optimizedCode = `
window.FaqSearchEngine = class FaqSearchEngine {
    constructor() {
        this.index = [];
        this.cache = new Map();
        this.buildIndex();
    }

    // 1. Xây dựng chỉ mục tìm kiếm (Flat Index)
    buildIndex() {
        // Access Global Variable directly
        const categories = window.MAIN_CATEGORIES || [];
        const faqData = window.FAQ_DATA || {};

        // Index Categories
        categories.forEach(cat => {
            this.index.push({
                type: 'category',
                id: cat.id,
                text: cat.text,
                answer: null, // Category không có câu trả lời trực tiếp
                keywords: this.normalize(cat.keywords.join(' ')),
                normalizedText: this.normalize(cat.text),
                original: cat
            });
        });

        // Index Questions
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

    // 2. Hàm chuẩn hóa chuỗi (Bỏ dấu, lowercase)
    normalize(str) {
        if (!str) return '';
        return str.toLowerCase()
            .normalize("NFD")
            .replace(/[\\u0300-\\u036f]/g, "")
            .replace(/đ/g, "d");
    }

    // 3. Hàm tìm kiếm chính
    search(query) {
        if (!query || query.trim().length < 2) return [];

        // Security: Truncate query to prevent DoS
        if (query.length > 200) query = query.substring(0, 200);

        const normalizedQuery = this.normalize(query);

        if (this.cache.has(normalizedQuery)) {
            // Memory: The FaqSearchEngine.search method returns a shallow copy of the top 5 results,
            // merging the item properties with the calculated score, to ensure the return value
            // includes the score without mutating the underlying index objects.
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
                // Return a shallow copy as mentioned in memory
                results.push({ ...item, score });
            }
        }

        results.sort((a, b) => b.score - a.score);
        const topResults = results.slice(0, 5);
        this.cache.set(normalizedQuery, topResults);

        return topResults;
    }
}
`;

vm.runInContext(optimizedCode, context);

for (let i = 0; i < 1000; i++) {
    context.window.FAQ_DATA.cat1.push({
        text: 'Question ' + i,
        answer: 'Answer ' + i,
        keywords: ['test', 'query', 'kw' + i]
    });
}

vm.runInContext(`
    window.engine = new window.FaqSearchEngine();
`, context);

console.time('Search (Optimized)');
let results;
for (let i = 0; i < 1000; i++) {
    results = context.window.engine.search('test query');
}
console.timeEnd('Search (Optimized)');
