const fs = require('fs');
const vm = require('vm');

const window = {};
const document = {};
const MAIN_CATEGORIES = [
    { id: 'cat1', text: 'Category 1', keywords: ['test', 'cat'], icon: 'icon' }
];
for(let i=2; i<=50; i++) {
    MAIN_CATEGORIES.push({ id: 'cat'+i, text: 'Category '+i, keywords: ['test', 'cat', 'category'], icon: 'icon' });
}
const FAQ_DATA = {
    'cat1': [
        { text: 'How to test?', answer: 'Yes', keywords: ['test', 'how'] }
    ]
};
for(let i=2; i<=50; i++) {
    FAQ_DATA['cat'+i] = [];
    for(let j=1; j<=20; j++) {
        FAQ_DATA['cat'+i].push({ text: `Question ${j} for category ${i}?`, answer: 'Answer', keywords: ['question', 'test'] });
    }
}
window.MAIN_CATEGORIES = MAIN_CATEGORIES;
window.FAQ_DATA = FAQ_DATA;

const code = fs.readFileSync('js/utils/search_engine.js', 'utf8');
vm.runInNewContext(code, { window, console });

const engine = new window.FaqSearchEngine();

const queries = ['test', 'category', 'how to', 'question 10', 'nonexistent', 'test test'];
let start = performance.now();
for (let i = 0; i < 1000; i++) {
    queries.forEach(q => engine.search(q));
}
let end = performance.now();
console.log(`Original Time: ${(end - start).toFixed(2)} ms`);

// Now replace class
engine.cache = new Map();
engine.cacheLimit = 100;
engine.search = function(query) {
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

        results.sort((a, b) => b.score - a.score);
        const topResults = results.slice(0, 5);

        if (this.cache.size >= this.cacheLimit) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(normalizedQuery, topResults);

        return topResults;
}

start = performance.now();
for (let i = 0; i < 1000; i++) {
    queries.forEach(q => engine.search(q));
}
end = performance.now();
console.log(`Optimized Time: ${(end - start).toFixed(2)} ms`);
