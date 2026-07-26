/* Cross-origin AI chatbot host adapter. The local FAQ controller remains authoritative. */
(function (global, document) {
    'use strict';

    var initialized = false;
    var state = 'idle';
    var config = null;
    var elements = {};
    var timeoutId = null;
    var retryCount = 0;
    var iframeMounted = false;
    var legacyToggleChat = null;
    var MESSAGE_TYPES = Object.freeze({
        READY: 'BANDOCAPT_CHAT_READY',
        CAPTCHA_READY: 'BANDOCAPT_CHAT_CAPTCHA_READY',
        ERROR: 'BANDOCAPT_CHAT_ERROR'
    });

    function normalizeConfig(raw) {
        if (!raw || raw.mode !== 'ai-embed' || raw.fallbackMode !== 'faq' || typeof raw.embedUrl !== 'string' || typeof raw.allowedOrigin !== 'string') return null;
        try {
            var url = new URL(raw.embedUrl);
            var origin = new URL(raw.allowedOrigin);
            var timeout = Number(raw.loadTimeoutMs);
            if (url.protocol !== 'https:' || origin.protocol !== 'https:' || origin.origin !== 'https://bandocapt.vercel.app' || url.origin !== origin.origin || raw.allowedOrigin !== origin.origin || raw.allowedOrigin.indexOf('*') !== -1 || origin.pathname !== '/' || origin.search || origin.hash || url.pathname !== '/chat-embed.html' || url.hash || url.username || url.password || url.searchParams.get('client') !== 'capphutho' || Array.from(url.searchParams.keys()).length !== 1 || !Number.isFinite(timeout) || timeout < 3000 || timeout > 30000) return null;
            return { mode: 'ai-embed', embedUrl: url.href, allowedOrigin: origin.origin, loadTimeoutMs: timeout, fallbackMode: raw.fallbackMode };
        } catch (error) {
            return null;
        }
    }

    function text(key, fallback) {
        return global.I18N && typeof global.I18N.t === 'function' ? global.I18N.t(key) : fallback;
    }

    function setStatus(key, fallback) {
        if (elements.status) elements.status.textContent = text(key, fallback);
    }

    function setState(next) {
        state = next;
    }

    function clearLoadTimeout() {
        if (timeoutId !== null) {
            global.clearTimeout(timeoutId);
            timeoutId = null;
        }
    }

    function setPanel(mode) {
        var ai = mode === 'ai';
        elements.aiTab.setAttribute('aria-selected', String(ai));
        elements.faqTab.setAttribute('aria-selected', String(!ai));
        elements.aiTab.setAttribute('tabindex', ai ? '0' : '-1');
        elements.faqTab.setAttribute('tabindex', ai ? '-1' : '0');
        elements.embedShell.hidden = !ai;
        elements.faqShell.hidden = ai;
    }

    function showError(messageKey, fallback) {
        clearLoadTimeout();
        setState('error');
        elements.loading.hidden = true;
        elements.frame.hidden = true;
        elements.errorText.textContent = retryCount >= 2 ? text('chat.retryLimit', 'Retry limit reached. Please use the FAQ.') : text(messageKey, fallback);
        elements.error.hidden = false;
        elements.retry.disabled = retryCount >= 2;
        setStatus('chat.aiError', 'AI assistant is unavailable');
    }

    function startLoadTimeout() {
        clearLoadTimeout();
        timeoutId = global.setTimeout(function () {
            showError('chat.aiError', 'Unable to connect to the AI assistant.');
        }, config.loadTimeoutMs);
    }

    function mountIframe() {
        if (iframeMounted) {
            if (state === 'loading' && timeoutId === null) startLoadTimeout();
            return;
        }
        iframeMounted = true;
        setState('loading');
        elements.loading.hidden = false;
        elements.error.hidden = true;
        elements.frame.src = config.embedUrl;
        startLoadTimeout();
    }

    function activateAiMode() {
        if (!config) return false;
        setPanel('ai');
        mountIframe();
        return true;
    }

    function activateFaqMode() {
        if (!config) return false;
        clearLoadTimeout();
        setPanel('faq');
        setStatus('chat.faqStatus', 'Using frequently asked questions');
        return true;
    }

    function isOpen() {
        return elements.window.style.display === 'flex';
    }

    function overrideLauncher() {
        legacyToggleChat = global.toggleChat;
        global.toggleChat = function () {
            if (isOpen()) {
                elements.window.style.display = 'none';
                elements.launcher.classList.remove('active');
                elements.launcher.setAttribute('aria-expanded', 'false');
                if (typeof elements.launcher.focus === 'function') elements.launcher.focus();
                return;
            }
            elements.window.style.display = 'flex';
            elements.launcher.classList.add('active');
            elements.launcher.setAttribute('aria-expanded', 'true');
            activateAiMode();
        };
    }

    function wrapGlobalSearch() {
        ['openChatAndSelectCategory', 'openChatAndSelectQuestion'].forEach(function (name) {
            var original = global.chatbot && global.chatbot[name];
            if (typeof original !== 'function' || original.__cappEmbedWrapped) return;
            function wrapped() {
                activateFaqMode();
                var result = original.apply(this, arguments);
                elements.window.style.display = 'flex';
                elements.launcher.classList.add('active');
                elements.launcher.setAttribute('aria-expanded', 'true');
                return result;
            }
            wrapped.__cappEmbedWrapped = true;
            global.chatbot[name] = wrapped;
        });
    }

    function handleMessage(event) {
        if (!config || event.origin !== config.allowedOrigin || event.source !== elements.frame.contentWindow) return;
        var data = event.data;
        if (!data || typeof data !== 'object' || data.version !== 1 || [MESSAGE_TYPES.READY, MESSAGE_TYPES.CAPTCHA_READY, MESSAGE_TYPES.ERROR].indexOf(data.type) === -1) return;
        if (data.type === MESSAGE_TYPES.READY) {
            clearLoadTimeout();
            setState('ui-ready');
            elements.loading.hidden = true;
            elements.error.hidden = true;
            elements.frame.hidden = false;
            setStatus('chat.aiUiReady', 'AI assistant is verifying security...');
        } else if (data.type === MESSAGE_TYPES.CAPTCHA_READY) {
            clearLoadTimeout();
            setState('captcha-ready');
            elements.loading.hidden = true;
            elements.error.hidden = true;
            elements.frame.hidden = false;
            setStatus('chat.aiReady', 'AI assistant is ready');
        } else if (data.payload && typeof data.payload.code === 'string' && data.payload.code.length <= 80) {
            showError('chat.aiError', 'Unable to connect to the AI assistant.');
        }
    }

    function retry() {
        if (state !== 'error' || retryCount >= 2) return;
        retryCount += 1;
        clearLoadTimeout();
        elements.retry.disabled = false;
        elements.error.hidden = true;
        elements.loading.hidden = false;
        elements.frame.hidden = true;
        setState('loading');
        elements.frame.src = 'about:blank';
        global.setTimeout(function () {
            elements.frame.src = config.embedUrl;
            startLoadTimeout();
        }, 0);
    }

    function bindEvents() {
        function activateAndFocus(tab) {
            if (tab === elements.aiTab) activateAiMode(); else activateFaqMode();
            tab.focus();
        }
        elements.aiTab.addEventListener('click', activateAiMode);
        elements.faqTab.addEventListener('click', activateFaqMode);
        [elements.aiTab, elements.faqTab].forEach(function (tab) {
            tab.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    activateAndFocus(tab);
                } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                    event.preventDefault();
                    activateAndFocus(tab === elements.aiTab ? elements.faqTab : elements.aiTab);
                } else if (event.key === 'Home') {
                    event.preventDefault();
                    activateAndFocus(elements.aiTab);
                } else if (event.key === 'End') {
                    event.preventDefault();
                    activateAndFocus(elements.faqTab);
                }
            });
        });
        elements.retry.addEventListener('click', retry);
        elements.useFaq.addEventListener('click', activateFaqMode);
        global.addEventListener('message', handleMessage);
    }

    function init() {
        if (initialized) return getState();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init, { once: true });
            return getState();
        }
        if (!global.chatbot) {
            global.setTimeout(init, 0);
            return getState();
        }
        config = normalizeConfig(global.CAPP_CHAT_CONFIG);
        if (!config) {
            var disabledSwitch = document.getElementById('chatModeSwitch');
            var disabledFaqShell = document.getElementById('chatFaqShell');
            if (disabledSwitch) disabledSwitch.hidden = true;
            if (disabledFaqShell) disabledFaqShell.hidden = false;
            if (global.console && typeof global.console.warn === 'function') global.console.warn('Chat embed disabled: invalid configuration.');
            return getState();
        }
        elements = {
            window: document.getElementById('chatWindow'), launcher: document.getElementById('chatLauncher'), status: document.getElementById('chatStatusText'),
            aiTab: document.getElementById('chatModeAiBtn'), faqTab: document.getElementById('chatModeFaqBtn'), faqShell: document.getElementById('chatFaqShell'), embedShell: document.getElementById('chatEmbedShell'),
            loading: document.getElementById('chatEmbedLoading'), frame: document.getElementById('bandocaptChatFrame'), error: document.getElementById('chatEmbedError'), errorText: document.getElementById('chatEmbedErrorText'), retry: document.getElementById('chatEmbedRetry'), useFaq: document.getElementById('chatEmbedUseFaq')
        };
        if (Object.keys(elements).some(function (key) { return !elements[key]; })) return getState();
        initialized = true;
        elements.switch = document.getElementById('chatModeSwitch');
        elements.switch.hidden = false;
        overrideLauncher();
        wrapGlobalSearch();
        bindEvents();
        activateFaqMode();
        return getState();
    }

    function getState() { return { state: state, retryCount: retryCount, mounted: iframeMounted, enabled: Boolean(config) }; }

    global.CapphuthoChatEmbedClient = { init: init, normalizeConfig: normalizeConfig, getState: getState, activateAiMode: activateAiMode, activateFaqMode: activateFaqMode };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
}(window, document));
