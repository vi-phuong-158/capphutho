const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync('js/chatbot-embed-client.js', 'utf8');
const EMBED_URL = 'https://bandocapt.vercel.app/chat-embed.html?client=capphutho';

class Element {
    constructor(id) {
        this.id = id;
        this.hidden = false;
        this.disabled = false;
        this.style = {};
        this.attributes = {};
        this.listeners = {};
        this.textContent = '';
        this.src = '';
        this.contentWindow = {};
        this.classList = { values: new Set(), add: value => this.classList.values.add(value), remove: value => this.classList.values.delete(value) };
    }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    addEventListener(type, handler) { (this.listeners[type] ||= []).push(handler); }
    dispatch(type, event = {}) { (this.listeners[type] || []).forEach(handler => handler({ preventDefault() {}, ...event })); }
    focus() { this.focused = true; }
}

function createEnvironment(config = { mode: 'ai-embed', embedUrl: EMBED_URL, allowedOrigin: 'https://bandocapt.vercel.app', loadTimeoutMs: 15000, fallbackMode: 'faq' }) {
    const ids = ['chatWindow', 'chatLauncher', 'chatStatusText', 'chatModeSwitch', 'chatModeAiBtn', 'chatModeFaqBtn', 'chatFaqShell', 'chatEmbedShell', 'chatEmbedLoading', 'bandocaptChatFrame', 'chatEmbedError', 'chatEmbedErrorText', 'chatEmbedRetry', 'chatEmbedUseFaq'];
    const elements = Object.fromEntries(ids.map(id => [id, new Element(id)]));
    elements.chatWindow.style.display = 'none';
    const document = { readyState: 'complete', getElementById: id => elements[id] || null, addEventListener() {} };
    const timers = [];
    const listeners = {};
    let categoryCalls = 0;
    let questionCalls = 0;
    const window = {
        document, URL, console: { warn() {} }, CAPP_CHAT_CONFIG: config,
        chatbot: {
            openChatAndSelectCategory() { categoryCalls += 1; return 'category'; },
            openChatAndSelectQuestion() { questionCalls += 1; return 'question'; }
        },
        toggleChat() { window.legacyCalled = true; },
        addEventListener(type, handler) { (listeners[type] ||= []).push(handler); },
        setTimeout(handler, delay) { const item = { handler, delay, cleared: false }; timers.push(item); if (delay === 0) handler(); return item; },
        clearTimeout(item) { if (item) item.cleared = true; }
    };
    vm.runInNewContext(source, { window, document, URL, console: window.console });
    return { window, elements, timers, message(event) { (listeners.message || []).forEach(handler => handler(event)); }, calls: () => ({ categoryCalls, questionCalls, listeners: (listeners.message || []).length }) };
}

test('normalizeConfig accepts only the fixed HTTPS host configuration', () => {
    const { window } = createEnvironment();
    assert.deepEqual({ ...window.CapphuthoChatEmbedClient.normalizeConfig(window.CAPP_CHAT_CONFIG) }, {
        mode: 'ai-embed', embedUrl: EMBED_URL, allowedOrigin: 'https://bandocapt.vercel.app', loadTimeoutMs: 15000, fallbackMode: 'faq'
    });
    assert.equal(window.CapphuthoChatEmbedClient.normalizeConfig({ ...window.CAPP_CHAT_CONFIG, allowedOrigin: '*' }), null);
    assert.equal(window.CapphuthoChatEmbedClient.normalizeConfig({ ...window.CAPP_CHAT_CONFIG, embedUrl: 'http://bandocapt.vercel.app/chat-embed.html' }), null);
    assert.equal(window.CapphuthoChatEmbedClient.normalizeConfig({ ...window.CAPP_CHAT_CONFIG, embedUrl: 'https://example.test/chat-embed.html' }), null);
    assert.equal(window.CapphuthoChatEmbedClient.normalizeConfig({ ...window.CAPP_CHAT_CONFIG, fallbackMode: 'other' }), null);
    assert.equal(window.CapphuthoChatEmbedClient.normalizeConfig({ ...window.CAPP_CHAT_CONFIG, allowedOrigin: 'https://bandocapt.vercel.app/path' }), null);
    assert.equal(window.CapphuthoChatEmbedClient.normalizeConfig({ ...window.CAPP_CHAT_CONFIG, embedUrl: 'https://bandocapt.vercel.app/other.html?client=capphutho' }), null);
    assert.equal(window.CapphuthoChatEmbedClient.normalizeConfig({ ...window.CAPP_CHAT_CONFIG, embedUrl: 'https://bandocapt.vercel.app/chat-embed.html' }), null);
    assert.equal(window.CapphuthoChatEmbedClient.normalizeConfig({ ...window.CAPP_CHAT_CONFIG, embedUrl: 'https://bandocapt.vercel.app/chat-embed.html?client=other' }), null);
    assert.equal(window.CapphuthoChatEmbedClient.normalizeConfig({ ...window.CAPP_CHAT_CONFIG, embedUrl: `${EMBED_URL}&extra=1` }), null);
    assert.equal(window.CapphuthoChatEmbedClient.normalizeConfig({ ...window.CAPP_CHAT_CONFIG, embedUrl: `${EMBED_URL}#test` }), null);
    assert.equal(window.CapphuthoChatEmbedClient.normalizeConfig({ ...window.CAPP_CHAT_CONFIG, embedUrl: 'https://user@bandocapt.vercel.app/chat-embed.html?client=capphutho' }), null);
    assert.equal(window.CapphuthoChatEmbedClient.normalizeConfig({ ...window.CAPP_CHAT_CONFIG, embedUrl: 'https://user:pass@bandocapt.vercel.app/chat-embed.html?client=capphutho' }), null);
    assert.equal(window.CapphuthoChatEmbedClient.normalizeConfig({ ...window.CAPP_CHAT_CONFIG, loadTimeoutMs: 1000 }), null);
});

test('FAQ feature flag leaves the legacy launcher intact and hides the switch', () => {
    const env = createEnvironment({ mode: 'faq' });
    assert.equal(env.window.legacyCalled, undefined);
    env.window.toggleChat();
    assert.equal(env.window.legacyCalled, true);
    assert.equal(env.elements.chatModeSwitch.hidden, true);
    assert.equal(env.elements.chatFaqShell.hidden, false);
});

test('launcher lazily mounts once and close/reopen preserves the iframe URL', () => {
    const env = createEnvironment();
    env.window.toggleChat();
    assert.equal(env.elements.chatWindow.style.display, 'flex');
    assert.equal(env.elements.bandocaptChatFrame.src, EMBED_URL);
    env.window.toggleChat();
    assert.equal(env.elements.chatWindow.style.display, 'none');
    env.window.toggleChat();
    assert.equal(env.elements.bandocaptChatFrame.src, EMBED_URL);
    assert.equal(env.window.CapphuthoChatEmbedClient.getState().mounted, true);
});

test('global search wrappers activate FAQ and preserve original calls', () => {
    const env = createEnvironment();
    env.window.CapphuthoChatEmbedClient.activateAiMode();
    assert.equal(env.elements.chatEmbedShell.hidden, false);
    assert.equal(env.window.chatbot.openChatAndSelectCategory({}), 'category');
    assert.equal(env.elements.chatFaqShell.hidden, false);
    assert.equal(env.elements.chatLauncher.attributes['aria-expanded'], 'true');
    assert.equal(env.calls().categoryCalls, 1);
    assert.equal(env.window.chatbot.openChatAndSelectQuestion({}, 'x'), 'question');
    assert.equal(env.calls().questionCalls, 1);
});

test('only a valid message from the configured iframe can change state', () => {
    const env = createEnvironment();
    env.window.CapphuthoChatEmbedClient.activateAiMode();
    env.message({ origin: 'https://attacker.test', source: env.elements.bandocaptChatFrame.contentWindow, data: { version: 1, type: 'READY' } });
    env.message({ origin: 'https://bandocapt.vercel.app', source: {}, data: { version: 1, type: 'BANDOCAPT_CHAT_READY' } });
    env.message({ origin: 'https://bandocapt.vercel.app', source: env.elements.bandocaptChatFrame.contentWindow, data: { version: 1, type: 'READY' } });
    env.message({ origin: 'https://bandocapt.vercel.app', source: env.elements.bandocaptChatFrame.contentWindow, data: { version: 1, type: 'CAPTCHA_READY' } });
    env.message({ origin: 'https://bandocapt.vercel.app', source: env.elements.bandocaptChatFrame.contentWindow, data: { version: 1, type: 'ERROR', payload: { code: 'ignored' } } });
    env.message({ origin: 'https://bandocapt.vercel.app', source: env.elements.bandocaptChatFrame.contentWindow, data: { version: 2, type: 'BANDOCAPT_CHAT_READY' } });
    assert.equal(env.window.CapphuthoChatEmbedClient.getState().state, 'loading');
    env.message({ origin: 'https://bandocapt.vercel.app', source: env.elements.bandocaptChatFrame.contentWindow, data: { version: 1, type: 'BANDOCAPT_CHAT_READY' } });
    assert.equal(env.window.CapphuthoChatEmbedClient.getState().state, 'ui-ready');
    env.message({ origin: 'https://bandocapt.vercel.app', source: env.elements.bandocaptChatFrame.contentWindow, data: { version: 1, type: 'BANDOCAPT_CHAT_CAPTCHA_READY' } });
    assert.equal(env.window.CapphuthoChatEmbedClient.getState().state, 'captcha-ready');
});

test('error content is rendered as text and retry is capped at two attempts', () => {
    const env = createEnvironment();
    env.window.CapphuthoChatEmbedClient.activateAiMode();
    env.message({ origin: 'https://bandocapt.vercel.app', source: env.elements.bandocaptChatFrame.contentWindow, data: { version: 1, type: 'BANDOCAPT_CHAT_ERROR', payload: { code: '<img src=x>' } } });
    assert.equal(env.window.CapphuthoChatEmbedClient.getState().state, 'error');
    assert.equal(Object.hasOwn(env.elements.chatEmbedErrorText, 'innerHTML'), false);
    env.elements.chatEmbedRetry.dispatch('click');
    env.message({ origin: 'https://bandocapt.vercel.app', source: env.elements.bandocaptChatFrame.contentWindow, data: { version: 1, type: 'BANDOCAPT_CHAT_ERROR', payload: { code: 'E1' } } });
    env.elements.chatEmbedRetry.dispatch('click');
    env.message({ origin: 'https://bandocapt.vercel.app', source: env.elements.bandocaptChatFrame.contentWindow, data: { version: 1, type: 'BANDOCAPT_CHAT_ERROR', payload: { code: 'E2' } } });
    assert.equal(env.window.CapphuthoChatEmbedClient.getState().retryCount, 2);
    assert.equal(env.elements.chatEmbedRetry.disabled, true);
    assert.match(env.elements.chatEmbedErrorText.textContent, /Retry limit/);
});

test('tabs update aria and tabindex without reloading the iframe', () => {
    const env = createEnvironment();
    env.window.CapphuthoChatEmbedClient.activateAiMode();
    const src = env.elements.bandocaptChatFrame.src;
    env.elements.chatModeAiBtn.dispatch('keydown', { key: 'ArrowRight' });
    assert.equal(env.elements.chatModeFaqBtn.attributes.tabindex, '0');
    assert.equal(env.elements.chatModeAiBtn.attributes.tabindex, '-1');
    env.elements.chatModeFaqBtn.dispatch('keydown', { key: 'Home' });
    assert.equal(env.elements.chatModeAiBtn.attributes['aria-selected'], 'true');
    assert.equal(env.elements.bandocaptChatFrame.src, src);
    env.elements.chatModeAiBtn.dispatch('keydown', { key: 'End' });
    assert.equal(env.elements.chatModeFaqBtn.attributes['aria-selected'], 'true');
});

test('init is idempotent and the adapter contains no outbound sensitive messaging', () => {
    const env = createEnvironment();
    env.window.CapphuthoChatEmbedClient.init();
    env.window.CapphuthoChatEmbedClient.init();
    assert.equal(env.calls().listeners, 1);
    assert.equal(/postMessage\s*\(/.test(source), false);
    assert.equal(/\/api\/chat/.test(source), false);
    assert.equal(/api[_-]?key|token/i.test(source), false);
    assert.match(source, /BANDOCAPT_CHAT_READY/);
    assert.match(source, /BANDOCAPT_CHAT_CAPTCHA_READY/);
    assert.match(source, /BANDOCAPT_CHAT_ERROR/);
    assert.equal(source.includes("['READY', 'CAPTCHA_READY', 'ERROR']"), false);
});
