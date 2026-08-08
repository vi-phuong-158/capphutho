const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Helper to evaluate production files into global context (matching existing test pattern)
function loadGlobalProductionContext() {
    const context = {
        window: {}
    };

    const cskvDataCode = fs.readFileSync(path.join(__dirname, '../js/data/cskv_data.js'), 'utf8');
    const cskvSearchCode = fs.readFileSync(path.join(__dirname, '../js/utils/cskv_search_engine.js'), 'utf8');
    const faqDbCode = fs.readFileSync(path.join(__dirname, '../js/data/faq_db.js'), 'utf8');
    const faqSearchCode = fs.readFileSync(path.join(__dirname, '../js/utils/search_engine.js'), 'utf8');

    // Run code in context
    const fn = new Function('window', `
        ${cskvDataCode}
        ${cskvSearchCode}
        ${faqDbCode}
        ${faqSearchCode}
    `);
    fn(context.window);

    return context.window;
}

test('TEST 1 — Dataset integrity: Exactly 9 TDPs', () => {
    const win = loadGlobalProductionContext();
    const data = win.CSKV_DATA;

    assert.ok(data, 'CSKV_DATA must be defined');
    assert.ok(Array.isArray(data.neighborhoods), 'neighborhoods must be an array');
    assert.equal(data.neighborhoods.length, 9, 'Must have exactly 9 neighborhoods');

    const expectedNames = [
        'Hùng Vương',
        'Long Xuyên',
        'Phú Liêm',
        'An Ninh',
        'Thống Nhất',
        'Xuân Thành',
        'Xuân Vân',
        'Ngọc Lậu',
        'Long Ân'
    ];

    const actualNames = data.neighborhoods.map(n => n.name);
    assert.deepEqual(actualNames, expectedNames);
});

test('TEST 2 — General contact: Điêu Thị Phương Hồng', () => {
    const win = loadGlobalProductionContext();
    const gc = win.CSKV_DATA.generalContact;

    assert.ok(gc, 'General contact must be defined');
    assert.equal(gc.name, 'Điêu Thị Phương Hồng');
    assert.equal(gc.phone, '0948562868');
});

test('TEST 3 — Duty phone: 02106268588', () => {
    const win = loadGlobalProductionContext();
    const dutyPhone = win.CSKV_DATA.dutyPhone;

    assert.equal(dutyPhone, '02106268588');
});

test('TEST 4 — Critical phone regression: Nguyễn Xuân Hòa phone numbers', () => {
    const win = loadGlobalProductionContext();
    const xuanVan = win.CSKV_DATA.neighborhoods.find(n => n.id === 'xuan-van');
    assert.ok(xuanVan, 'Xuân Vân neighborhood must exist');

    const officer = xuanVan.officers.find(o => o.name === 'Nguyễn Xuân Hòa');
    assert.ok(officer, 'Nguyễn Xuân Hòa officer must exist');

    assert.deepEqual(officer.phones, ['0974234795', '0932277626']);
    assert.ok(!officer.phones.includes('0932277628'), 'MUST NOT contain 0932277628');
});

test('TEST 5 — Long Ân mapping: Bùi Ngọc Sơn & Phạm Văn Sơn', () => {
    const win = loadGlobalProductionContext();
    const longAn = win.CSKV_DATA.neighborhoods.find(n => n.id === 'long-an');
    assert.ok(longAn, 'Long Ân neighborhood must exist');

    const buiSon = longAn.officers.find(o => o.name === 'Bùi Ngọc Sơn');
    const phamSon = longAn.officers.find(o => o.name === 'Phạm Văn Sơn');

    assert.ok(buiSon, 'Bùi Ngọc Sơn must exist');
    assert.ok(phamSon, 'Phạm Văn Sơn must exist');

    assert.deepEqual(buiSon.phones, ['0965295345']);
    assert.deepEqual(phamSon.phones, ['0985424768']);
});

test('TEST 6 — Search accents: "Tân Lập" & "tan lap"', () => {
    const win = loadGlobalProductionContext();
    const engine = new win.CskvSearchEngine();

    const resWithAccent = engine.search('Tân Lập');
    const resNoAccent = engine.search('tan lap');

    assert.ok(resWithAccent.length > 0);
    assert.ok(resNoAccent.length > 0);

    assert.equal(resWithAccent[0].id, 'hung-vuong');
    assert.equal(resNoAccent[0].id, 'hung-vuong');

    const officerName = resWithAccent[0].officers[0].name;
    assert.equal(officerName, 'Nguyễn Minh Đức');
});

test('TEST 7 — Search old area: "Sa Đéc"', () => {
    const win = loadGlobalProductionContext();
    const engine = new win.CskvSearchEngine();

    const results = engine.search('Sa Đéc');
    assert.ok(results.length > 0);
    assert.equal(results[0].id, 'long-xuyen');
});

test('TEST 8 — Search numbered area: "khu 7"', () => {
    const win = loadGlobalProductionContext();
    const engine = new win.CskvSearchEngine();

    const results = engine.search('khu 7');
    assert.ok(results.length > 0);
    assert.equal(results[0].id, 'long-an');
});

test('TEST 9 — Officer search: "nguyen xuan hoa"', () => {
    const win = loadGlobalProductionContext();
    const engine = new win.CskvSearchEngine();

    const results = engine.search('nguyen xuan hoa');
    assert.ok(results.length > 0);
    assert.equal(results[0].id, 'xuan-van');
});

test('TEST 10 — Phone search: "0932277626"', () => {
    const win = loadGlobalProductionContext();
    const engine = new win.CskvSearchEngine();

    const results = engine.search('0932277626');
    assert.ok(results.length > 0);
    assert.equal(results[0].id, 'xuan-van');
});

test('TEST 11 — Multiple officers: Long Xuyên & Long Ân', () => {
    const win = loadGlobalProductionContext();
    const longXuyen = win.CSKV_DATA.neighborhoods.find(n => n.id === 'long-xuyen');
    const longAn = win.CSKV_DATA.neighborhoods.find(n => n.id === 'long-an');

    assert.equal(longXuyen.officers.length, 2);
    assert.equal(longAn.officers.length, 2);
});

test('TEST 12 — Homepage card semantic link & i18n keys', () => {
    const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const i18nJs = fs.readFileSync(path.join(__dirname, '../js/i18n.js'), 'utf8');

    // Semantic link check: exactly one <a href="modules/cskv.html"...>
    const matches = indexHtml.match(/<a\s+[^>]*href=["']modules\/cskv\.html["'][^>]*>/gi);
    assert.ok(matches, 'index.html must contain an <a href="modules/cskv.html"> tag');
    assert.equal(matches.length, 1, 'Must contain exactly 1 semantic CTA card link for CSKV');

    // Check i18n keys
    assert.ok(i18nJs.includes('card.cskv.title'), 'i18n.js must contain card.cskv.title');
    assert.ok(i18nJs.includes('card.cskv.desc'), 'i18n.js must contain card.cskv.desc');
});

test('TEST 13 — No unsafe navigation in cskv page and data', () => {
    const cskvHtml = fs.readFileSync(path.join(__dirname, '../modules/cskv.html'), 'utf8');
    const cskvData = fs.readFileSync(path.join(__dirname, '../js/data/cskv_data.js'), 'utf8');

    assert.ok(!cskvHtml.includes('javascript:'), 'cskv.html must not contain javascript: URLs');
    assert.ok(!cskvData.includes('javascript:'), 'cskv_data.js must not contain javascript: URLs');
});

test('TEST 14 — Script load order in index.html and modules/cskv.html', () => {
    const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const cskvHtml = fs.readFileSync(path.join(__dirname, '../modules/cskv.html'), 'utf8');

    // index.html order check
    const idxDataPos = indexHtml.indexOf('js/data/cskv_data.js');
    const idxSearchPos = indexHtml.indexOf('js/utils/cskv_search_engine.js');
    const idxChatbotPos = indexHtml.indexOf('js/chatbot.js');

    assert.ok(idxDataPos > -1 && idxSearchPos > -1 && idxChatbotPos > -1, 'All scripts must be present in index.html');
    assert.ok(idxDataPos < idxSearchPos, 'cskv_data.js must load before cskv_search_engine.js in index.html');
    assert.ok(idxSearchPos < idxChatbotPos, 'cskv_search_engine.js must load before chatbot.js in index.html');

    // modules/cskv.html order check
    const modDataPos = cskvHtml.indexOf('../js/data/cskv_data.js');
    const modSearchPos = cskvHtml.indexOf('../js/utils/cskv_search_engine.js');
    const modControllerPos = cskvHtml.indexOf('../js/cskv.js');

    assert.ok(modDataPos > -1 && modSearchPos > -1 && modControllerPos > -1, 'All scripts must be present in cskv.html');
    assert.ok(modDataPos < modSearchPos, 'cskv_data.js must load before cskv_search_engine.js in cskv.html');
    assert.ok(modSearchPos < modControllerPos, 'cskv_search_engine.js must load before cskv.js in cskv.html');
});

test('TEST 15 — Shared officer: Trương Tuấn Anh in Long Xuyên & An Ninh', () => {
    const win = loadGlobalProductionContext();
    const engine = new win.CskvSearchEngine();

    const nameResults = engine.search('Trương Tuấn Anh');
    const strongNameResults = nameResults.filter(r => r.score >= 80);
    assert.equal(strongNameResults.length, 2, 'Search "Trương Tuấn Anh" strong matches must return both neighborhoods');
    const idsByName = strongNameResults.map(r => r.id).sort();
    assert.deepEqual(idsByName, ['an-ninh', 'long-xuyen']);

    const phoneResults = engine.search('0984529894');
    assert.equal(phoneResults.length, 2, 'Search "0984529894" must return both neighborhoods');
    const idsByPhone = phoneResults.map(r => r.id).sort();
    assert.deepEqual(idsByPhone, ['an-ninh', 'long-xuyen']);
});

test('TEST 16 — Overlapping search & ranking: "An Ninh"', () => {
    const win = loadGlobalProductionContext();
    const faqEngine = new win.FaqSearchEngine();
    const cskvEngine = new win.CskvSearchEngine();

    const query = 'An Ninh';
    const faqResults = faqEngine.search(query);
    const cskvResults = cskvEngine.search(query);

    assert.ok(cskvResults.length > 0, 'CSKV should find TDP An Ninh');
    assert.equal(cskvResults[0].id, 'an-ninh');
    assert.ok(cskvResults[0].score >= 80, 'TDP An Ninh match should have high score');

    // Simulate merge algorithm from ChatbotController
    const strongCskv = cskvResults.filter(r => r.score >= 80);
    const partialCskv = cskvResults.filter(r => r.score < 80);
    const merged = [...strongCskv, ...faqResults, ...partialCskv];

    assert.equal(merged[0].type, 'cskv', 'CSKV TDP An Ninh must rank above FAQ items for query "An Ninh"');
});

test('TEST 17 — Formatted phone search: "0932.277.626"', () => {
    const win = loadGlobalProductionContext();
    const engine = new win.CskvSearchEngine();

    const resFormatted = engine.search('0932.277.626');
    const resRaw = engine.search('0932277626');

    assert.ok(resFormatted.length > 0);
    assert.ok(resRaw.length > 0);
    assert.equal(resFormatted[0].id, 'xuan-van');
    assert.equal(resRaw[0].id, 'xuan-van');
});
