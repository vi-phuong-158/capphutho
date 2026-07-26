# Chatbot embed client implementation log

## Scope and baseline

- Repository: `D:\04. Github\capphutho`
- Branch: `main`
- Baseline HEAD: `79c96ee59a2382783d1bdd131c7a82a55974e360`
- Pre-existing untracked files preserved: `INTEGRATION_ANALYSIS.md` and `KE_HOACH_THI_CONG_TICH_HOP_CHATBOT_BANDOCAPT_CAPPHUTHO.md`.
- No commit, push, deployment, or changes to the `bandocapt` repository were made.

## Files changed

- `index.html`: retained the legacy launcher, modal, FAQ body, footer, and script order; added accessible AI/FAQ tabs, lazy iframe markup, the fixed host configuration, and narrowly scoped inline styles.
- `js/i18n.js`: added the ten embed-client UI keys for Vietnamese, English, and Simplified Chinese.
- `package.json`: added `test:chat-embed` only.

## Files created

- `js/chatbot-embed-client.js`: standalone host adapter.
- `tests/chatbot-embed-client.test.js`: dependency-free Node tests.
- `CLIENT_IMPLEMENTATION_LOG.md`: this record.

## Architecture and hardening

- The existing `js/chatbot.js`, FAQ datasets, search engine, and page scripts are unchanged. The adapter saves the legacy launcher function and replaces it only when `CAPP_CHAT_CONFIG.mode` is `ai-embed`.
- The iframe is lazy: it has only `data-src` in HTML and receives `src` on the first AI open. Closing and reopening preserve the iframe and its conversation.
- The adapter validates an HTTPS URL, exact origin equality, no wildcard origin, a 3–30 second timeout, and FAQ fallback.
- `message` events are accepted only when the origin equals `https://bandocapt.vercel.app`, the source is the iframe window, the payload is an object with version `1`, and the type is `BANDOCAPT_CHAT_READY`, `BANDOCAPT_CHAT_CAPTCHA_READY`, or `BANDOCAPT_CHAT_ERROR`. Error UI uses `textContent` only.
- No parent-to-iframe messaging is used; no secret, token, API key, or chatbot API request is present.
- Global FAQ search wrappers explicitly activate FAQ before calling the unchanged legacy methods with their original `this` value and arguments.
- Retry is manual, creates no iframe, resets via `about:blank`, and is capped at two attempts. FAQ remains available after any failure.

## Verification

- `node --check js/chatbot-embed-client.js`: pass.
- `node --test tests/chatbot-embed-client.test.js`: pass after the cross-realm assertion is normalized.
- `npm run test:chat-embed`: pass after the cross-realm assertion is normalized.
- `node --check js/chatbot.js`: pass; `git diff -- js/chatbot.js` is empty.
- `node --check js/i18n.js`: pass.
- `git diff --check`: pass.
- `python tests/verify_security.py`: blocked in this environment because Python cannot import `playwright` (`ModuleNotFoundError`); no dependency was installed and no browser-based security result is claimed.

## Known limitation

Bandocapt is deployed and the live cross-origin handshake is verified. CAPTCHA completion cannot be concluded in browser automation, and the new Capphutho source has not yet been deployed.

## Protocol compatibility review fixes

- The initial client used shortened event names that did not match the deployed host. It now accepts only `BANDOCAPT_CHAT_READY`, `BANDOCAPT_CHAT_CAPTCHA_READY`, and `BANDOCAPT_CHAT_ERROR`; shortened names are ignored.
- `normalizeConfig` now requires the exact HTTPS Bandocapt origin, `/chat-embed.html`, exactly one `client=capphutho` query parameter, no extra query parameters, no path/query/fragment in `allowedOrigin`, `fallbackMode: 'faq'`, and a 3000–30000 ms timeout.
- Tabs now maintain `aria-selected` and roving `tabindex`, with Enter, Space, ArrowLeft, ArrowRight, Home, and End support. Keyboard tab changes focus the selected tab and preserve the mounted iframe URL.
- Global-search wrappers first select FAQ, call the original method with its original receiver and arguments, then ensure the local window is open and the launcher exposes `aria-expanded=true`.
- The second post-retry failure disables retry and replaces the generic error with `chat.retryLimit`; FAQ remains available and the existing iframe is retained.
- Mobile CSS constrains width and height with `100vh` fallback and `100dvh` when supported, while keeping the header and input in the viewport and preventing parent iframe overflow.

### Tests run

- `node --check js/chatbot-embed-client.js`: pass.
- `node --check js/i18n.js`: pass.
- `node --test tests/chatbot-embed-client.test.js`: 8/8 pass.
- `npm run test:chat-embed`: 8/8 pass.
- `git diff --check`: pass.
- `git diff -- js/chatbot.js js/data/faq_db.js js/utils/search_engine.js`: empty.

### Final working tree

- `git diff --stat` (tracked files): `index.html | 51`, `js/i18n.js | 30`, `package.json | 3`; 81 insertions and 3 deletions. New client, tests, and log are intentionally untracked at this checkpoint.
- Modified: `index.html`, `js/i18n.js`, `package.json`.
- New: `CLIENT_IMPLEMENTATION_LOG.md`, `js/chatbot-embed-client.js`, `tests/chatbot-embed-client.test.js`.
- Preserved pre-existing untracked files: `INTEGRATION_ANALYSIS.md`, `KE_HOACH_THI_CONG_TICH_HOP_CHATBOT_BANDOCAPT_CAPPHUTHO.md`.
- No commit, push, deployment, or Bandocapt repository change was made.

## Live host and cross-origin preflight

- Run: 2026-07-26 (Asia/Saigon), direct Node `fetch` from this workspace.
- Embed URL: `https://bandocapt.vercel.app/chat-embed.html?client=capphutho` returned **404**, final URL unchanged, `Content-Type: text/plain; charset=utf-8`, `Cache-Control: public, max-age=0, must-revalidate`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin`.
- Embed CSP was `frame-ancestors 'none'`, not the required explicit `https://capphutho.vercel.app`; its body did not contain `chat-embed-root` or `ai-chat-window`.
- Main host URL returned 200 HTML with `Cache-Control: no-cache` and retained `frame-ancestors 'none'`, as expected for the non-embed page.
- Result: **FAIL / BLOCKED**. The mandatory live cross-origin browser preflight was not run because the real embed endpoint cannot load or be framed. Consequently READY/CAPTCHA status, iframe request count, close/reopen, global search, responsive screenshots, and CAPTCHA automation are not claimed.
- No temporary browser script or screenshot was created. No token, cookie, or sensitive response data is recorded.
- 3C hardening completed locally: `normalizeConfig` now also rejects URL fragments and URL userinfo. The unit suite passes 8/8; legacy chatbot, FAQ data, and search engine have no diff. No checkpoint commit was created because the live host conditions failed.

## Live cross-origin Puppeteer preflight

- Parent origin: `https://capphutho.vercel.app`; production embed URL: `https://bandocapt.vercel.app/chat-embed.html?client=capphutho`.
- The local Capphutho files were served only for the parent origin; Bandocapt, its iframe response, `postMessage`, and Turnstile were not mocked.
- Embed HTTP status: 200; request count: 1; initial state: `idle`; final handshake state: `ui-ready`; real accepted event: `BANDOCAPT_CHAT_READY`.
- Iframe visible: true; loading hidden: true; error hidden: true; page errors: none; relevant failed requests: none.
- CAPTCHA: `AUTOMATION_INCONCLUSIVE`. Two `net::ERR_FAILED` console entries were caused by the harness deliberately aborting same-origin analytics/video resources and were unrelated to Bandocapt.
- Reopen/tab-switch, global-search, and complete responsive production checks remain for the future Capphutho deployment; they are not claimed as live-verified here.
