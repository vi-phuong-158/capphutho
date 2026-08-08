const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');

// Read PRODUCTION files directly (no fakes / mirrors).
const indexHtml = fs.readFileSync('index.html', 'utf8');
const moduleHtml = fs.readFileSync('modules/thu-tuc-cap-tinh.html', 'utf8');
const faqDbCode = fs.readFileSync('js/data/faq_db.js', 'utf8');
const faqI18nCode = fs.readFileSync('js/data/faq_i18n.js', 'utf8');
const searchEngineCode = fs.readFileSync('js/utils/search_engine.js', 'utf8');
const i18nCode = fs.readFileSync('js/i18n.js', 'utf8');

// Build a fresh search engine over production data.
function buildSearchEngine() {
    global.window = {};
    eval(faqDbCode);          // populates window.MAIN_CATEGORIES, window.FAQ_DATA (vi)
    eval(searchEngineCode);   // populates window.FaqSearchEngine
    return new global.window.FaqSearchEngine();
}

// ---------------------------------------------------------------------------
// Test A — Homepage card
// ---------------------------------------------------------------------------
test('A. Homepage exposes exactly one provincial card', () => {
    const linkMatches = indexHtml.match(/modules\/thu-tuc-cap-tinh\.html/g) || [];
    assert.equal(linkMatches.length, 1, 'Homepage must link the module exactly once (no duplicate card)');
    assert.ok(indexHtml.includes('card.provincial.title'), 'Homepage card must use card.provincial.title');
    assert.ok(indexHtml.includes('card.provincial.desc'), 'Homepage card must use card.provincial.desc');
});

// ---------------------------------------------------------------------------
// Test B — Module structure (6 groups)
// ---------------------------------------------------------------------------
test('B. Module contains all six procedure groups', () => {
    const cards = moduleHtml.match(/class="proc-card/g) || [];
    assert.equal(cards.length, 6, 'Module must contain exactly 6 procedure cards');

    const requiredGroups = [
        /1\.\s*Hộ chiếu/,
        /2\.\s*Giấy Phép Lái Xe/,
        /3\.\s*Phiếu Lý Lịch Tư Pháp/,
        /4\.\s*Dành Cho Người Nước Ngoài/,
        /5\.\s*Chứng Nhận Đủ Điều Kiện Về ANTT/,
        /6\.\s*Đăng Ký Xe/
    ];
    requiredGroups.forEach((re) => {
        assert.match(moduleHtml, re, `Missing module group heading: ${re}`);
    });
});

// ---------------------------------------------------------------------------
// Test C — Official (external) links are safe
// ---------------------------------------------------------------------------
test('C. External DVC links use HTTPS + target=_blank + rel=noopener noreferrer', () => {
    const anchors = moduleHtml.match(/<a\b[^>]*href="http[^>]*>/g) || [];
    assert.ok(anchors.length > 0, 'Module should contain at least one external DVC link');
    anchors.forEach((tag) => {
        assert.match(tag, /href="https:\/\//, `External link must use HTTPS: ${tag}`);
        assert.match(tag, /target="_blank"/, `External link must open in new tab: ${tag}`);
        assert.match(tag, /rel="noopener noreferrer"/, `External link must set rel=noopener noreferrer: ${tag}`);
    });
});

// ---------------------------------------------------------------------------
// Test D — Search over production data
// ---------------------------------------------------------------------------
test('D. Search finds provincial category/FAQ for key terms', () => {
    const engine = buildSearchEngine();
    const terms = ['gplx', 'hộ chiếu', 'lý lịch tư pháp', 'visa', 'antt', 'phòng csgt'];
    terms.forEach((term) => {
        const results = engine.search(term);
        assert.ok(results.length > 0, `No results for "${term}"`);
        const hit = results.some((r) => r.id === 'cap_tinh' || r.catId === 'cap_tinh');
        assert.ok(hit, `"${term}" should surface a cap_tinh category or FAQ`);
    });
});

// ---------------------------------------------------------------------------
// Test E — i18n: cap_tinh across vi/en/zh-CN + homepage card keys
// ---------------------------------------------------------------------------
test('E. cap_tinh dataset exists for vi/en/zh-CN with correct url', () => {
    global.window = {};
    eval(faqDbCode);
    eval(faqI18nCode); // exposes window.FAQ_I18N.datasets
    const datasets = global.window.FAQ_I18N.datasets;
    ['vi', 'en', 'zh-CN'].forEach((lang) => {
        const ds = datasets[lang];
        assert.ok(ds, `Dataset missing for ${lang}`);
        const cat = ds.categories.find((c) => c.id === 'cap_tinh');
        assert.ok(cat, `cap_tinh category missing for ${lang}`);
        assert.equal(cat.url, 'modules/thu-tuc-cap-tinh.html', `cap_tinh url wrong for ${lang}`);
        assert.ok(Array.isArray(ds.faq.cap_tinh) && ds.faq.cap_tinh.length > 0, `cap_tinh FAQ missing for ${lang}`);
    });
});

test('E. card.provincial.title/desc defined (non-empty) for all languages', () => {
    ['card.provincial.title', 'card.provincial.desc'].forEach((key) => {
        const re = new RegExp(`'${key.replace('.', '\\.')}':\\s*'([^']*)'`, 'g');
        const values = [];
        let m;
        while ((m = re.exec(i18nCode)) !== null) values.push(m[1]);
        assert.ok(values.length >= 3, `${key} should be defined in at least 3 languages (found ${values.length})`);
        values.forEach((v) => assert.ok(v.trim().length > 0, `${key} must not be empty`));
    });
});

// ---------------------------------------------------------------------------
// Test F — CTA regression
// ---------------------------------------------------------------------------
test('F. Module does not embed the chatbot client and uses openChat navigation', () => {
    assert.ok(!moduleHtml.includes('chatbot-embed-client.js'),
        'Module must NOT load chatbot-embed-client.js directly');
    assert.ok(!moduleHtml.includes('DVC_AI_Chat'),
        'Module must NOT reference the undefined DVC_AI_Chat global');
    assert.ok(moduleHtml.includes('index.html?openChat=1'),
        'Module CTA must navigate to index.html?openChat=1');
    assert.ok(moduleHtml.includes('goToAssistant'),
        'Module CTA must use the goToAssistant navigation helper');
});

test('F. Homepage handles openChat=1 and cleans the URL', () => {
    assert.ok(indexHtml.includes("get('openChat')") || indexHtml.includes('openChat'),
        'Homepage must read the openChat query parameter');
    assert.ok(indexHtml.includes('replaceState'),
        'Homepage must clean up the openChat query with history.replaceState');
});
