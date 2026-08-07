const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');

// Load search engine logic
const searchEngineCode = fs.readFileSync('js/utils/search_engine.js', 'utf8');

test('Search Engine - Provincial Procedures Test', async (t) => {
    // Mock global data
    global.window = {};
    
    // We only mock the necessary parts to test search engine
    window.MAIN_CATEGORIES = [
        { id: 'cu_tru', text: 'Cư trú', keywords: ['thuong tru', 'tam tru'] },
        { id: 'cap_tinh', text: 'Thủ tục Công an tỉnh', url: 'modules/thu-tuc-cap-tinh.html', keywords: ['ho chieu', 'passport', 'gplx', 'ly lich tu phap'] }
    ];
    
    window.FAQ_DATA = {
        'cu_tru': [
            { text: "Thủ tục thường trú", answer: "Làm ở phường", keywords: ["thuong tru"] }
        ],
        'cap_tinh': [
            { text: "Hộ chiếu làm ở đâu?", answer: "Làm ở tỉnh", keywords: ["ho chieu", "passport"] }
        ]
    };
    
    // Evaluate the search engine code in this context
    eval(searchEngineCode);
    
    const searchEngine = new window.FaqSearchEngine();
    
    await t.test('Should find provincial category by keywords', () => {
        const results = searchEngine.search('gplx');
        assert.ok(results.length > 0, 'Should find results for gplx');
        assert.equal(results[0].type, 'category');
        assert.equal(results[0].id, 'cap_tinh');
        assert.equal(results[0].original.url, 'modules/thu-tuc-cap-tinh.html', 'URL should be present');
    });

    await t.test('Should find provincial FAQ by question keywords', () => {
        const results = searchEngine.search('ho chieu');
        assert.ok(results.length > 0, 'Should find results for ho chieu');
        
        // It could match the category or the question. Both should be in results.
        const hasQuestion = results.some(r => r.type === 'question' && r.original.text === 'Hộ chiếu làm ở đâu?');
        assert.ok(hasQuestion, 'Should include the specific FAQ about passport');
    });
});
