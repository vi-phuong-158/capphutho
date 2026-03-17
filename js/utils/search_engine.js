/**
 * CLIENT-SIDE SEARCH ENGINE
 * -------------------------
 * Bộ máy tìm kiếm cục bộ đơn giản nhưng hiệu quả.
 * Hỗ trợ:
 * - Tìm kiếm không dấu (tiếng Việt).
 * - Tìm kiếm theo từ khóa (keywords).
 * - Fuzzy search (tìm gần đúng).
 */

// import { FAQ_DATA, MAIN_CATEGORIES } from '../data/faq_db.js'; // REMOVED FOR LOCAL FILE SUPPORT

// Export to Global Scope
window.FaqSearchEngine = class FaqSearchEngine {
    constructor() {
        this.index = [];
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
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d");
    }

    // 3. Hàm tìm kiếm chính
    search(query) {
        if (!query || query.trim().length < 2) return [];

        // Security: Truncate query to prevent DoS
        if (query.length > 200) query = query.substring(0, 200);

        // Performance: 100-item FIFO Memoization Cache
        if (!this.cache) this.cache = new Map();
        if (this.cache.has(query)) return this.cache.get(query);

        const normalizedQuery = this.normalize(query);
        const queryTokens = normalizedQuery.split(' ');

        // Chấm điểm độ phù hợp (Simple Scoring)
        const results = [];

        // Performance: Single loop instead of map().filter() chain
        for (const item of this.index) {
            let score = 0;

            // a. Khớp chính xác cụm từ (High priority)
            if (item.normalizedText.includes(normalizedQuery)) score += 10;
            if (item.keywords.includes(normalizedQuery)) score += 8;

            // b. Khớp từng từ (Token matching)
            // Performance: for...of avoids function call overhead of forEach
            for (const token of queryTokens) {
                if (item.normalizedText.includes(token)) score += 2;
                if (item.keywords.includes(token)) score += 1;
            }

            if (score > 0) {
                results.push({ ...item, score });
            }
        }

        // Lọc và sắp xếp
        const finalResults = results
            .sort((a, b) => b.score - a.score)
            .slice(0, 5); // Lấy top 5 kết quả

        this.cache.set(query, finalResults);
        if (this.cache.size > 100) {
            this.cache.delete(this.cache.keys().next().value); // Evict oldest
        }

        return finalResults;
    }
}
