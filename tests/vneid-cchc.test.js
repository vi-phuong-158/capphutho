const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const guide = read('modules/vneid-danh-gia-cchc.html');
const residence = read('modules/cu-tru.html');
const homepage = read('index.html');
const faqData = read('js/data/faq_db.js');
const launcher = read('js/vneid-app-launch.js');
const searchEngineCode = read('js/utils/search_engine.js');

test('guide page and residence CTA exist without a new homepage card', () => {
    assert.ok(fs.existsSync(path.join(root, 'modules/vneid-danh-gia-cchc.html')));
    assert.match(residence, /href="vneid-danh-gia-cchc\.html"/);
    assert.ok(!homepage.includes('vneid-danh-gia-cchc.html'));
});

test('guide contains the required 2026 instructions', () => {
    [
        'VNeID', '2.2.9', 'mức độ 2', 'G01.xxx.xxx-xxxxxx-xxxx',
        'Thủ tục hành chính', 'Khác', 'Đánh giá cải cách hành chính trong CAND',
        'Passcode', 'Tạo mới đánh giá', 'Gửi đánh giá'
    ].forEach((content) => assert.ok(guide.includes(content), `Missing: ${content}`));
});

test('launcher uses verified official stores and does not invent a VNeID scheme', () => {
    assert.match(launcher, /https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.vnid/);
    assert.match(launcher, /https:\/\/apps\.apple\.com\/vn\/app\/vneid\/id1582750372/);
    assert.match(launcher, /package=com\.vnid/);
    assert.ok(!/\bvneid:\/\//i.test(launcher));
    assert.ok(!/\bvnid:\/\//i.test(launcher));
    assert.ok(!/\bvneidapp:\/\//i.test(launcher));
    assert.match(launcher, /Vui lòng mở trang này bằng điện thoại/);
});

test('search index returns the guide for VNeID and CCHC', () => {
    global.window = {};
    eval(faqData);
    eval(searchEngineCode);
    const engine = new global.window.FaqSearchEngine();
    ['VNeID', 'CCHC', 'đánh giá hài lòng'].forEach((term) => {
        const results = engine.search(term);
        assert.ok(results.some((result) => result.type === 'link' && result.original.url === 'modules/vneid-danh-gia-cchc.html'), `Guide not found for ${term}`);
    });
});
