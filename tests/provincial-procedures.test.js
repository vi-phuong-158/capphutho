const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');

// Load data and logic
const faqDbCode = fs.readFileSync('js/data/faq_db.js', 'utf8');
const searchEngineCode = fs.readFileSync('js/utils/search_engine.js', 'utf8');

test('Search Engine - Provincial Procedures Test with Production Data', async (t) => {
    // Mock global window
    global.window = {};
    
    // Evaluate the database to populate window.MAIN_CATEGORIES and window.FAQ_DATA
    eval(faqDbCode);
    
    // Evaluate the search engine
    eval(searchEngineCode);
    
    const searchEngine = new window.FaqSearchEngine();
    
    await t.test('Should find provincial category by keywords (gplx)', () => {
        const results = searchEngine.search('gplx');
        assert.ok(results.length > 0, 'Should find results for gplx');
        
        const categoryResult = results.find(r => r.type === 'category' && r.id === 'cap_tinh');
        assert.ok(categoryResult, 'Should find the provincial category');
        assert.equal(categoryResult.original.url, 'modules/thu-tuc-cap-tinh.html', 'URL should be correct');
    });

    await t.test('Should find specific FAQ about passport', () => {
        const results = searchEngine.search('hộ chiếu');
        assert.ok(results.length > 0, 'Should find results for hộ chiếu');
        
        const hasQuestion = results.some(r => r.type === 'question' && r.original.text.toLowerCase().includes('hộ chiếu'));
        assert.ok(hasQuestion, 'Should include the specific FAQ about passport');
    });

    await t.test('Should verify provincial category exists in production data', () => {
        const capTinhCategory = window.MAIN_CATEGORIES.find(c => c.id === 'cap_tinh');
        assert.ok(capTinhCategory, 'Category cap_tinh must exist');
        assert.equal(capTinhCategory.url, 'modules/thu-tuc-cap-tinh.html', 'URL must be set correctly on the category');
    });
});
