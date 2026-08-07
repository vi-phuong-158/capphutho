# KẾ HOẠCH THI CÔNG TÍCH HỢP CHATBOT `bandocapt` SANG `capphutho`
## Mô hình dùng chung, phân tầng mức độ thông minh và tối ưu token

**Phiên bản:** 1.0  
**Ngày lập:** 26/7/2026  
**Phạm vi:** Hai mã nguồn `bandocapt-main` và `capphutho-main` do chủ dự án cung cấp.

---

## 1. Quyết định kiến trúc

### 1.1. Phương án được chọn

Xây dựng `bandocapt` thành **Chatbot Host dùng chung**, còn `capphutho` là **Client nhúng chatbot**.

```text
┌──────────────────────────────────────────────────────────────┐
│                         capphutho                            │
│  - Trang dịch vụ công Công an phường                        │
│  - Giữ nút mở/đóng chatbot, nhận diện thương hiệu           │
│  - Giữ dữ liệu FAQ cục bộ để tìm kiếm và fallback           │
│  - Lazy-load iframe khi người dùng mở chatbot               │
│                                                              │
│        iframe + postMessage                                  │
│                 │                                            │
└─────────────────┼────────────────────────────────────────────┘
                  ▼
┌──────────────────────────────────────────────────────────────┐
│                         bandocapt                            │
│  chat-embed.html                                             │
│  - UI hội thoại dùng chung                                   │
│  - Turnstile                                                 │
│  - Streaming SSE                                             │
│  - Nguồn trích dẫn, địa điểm xác minh                        │
│                 │                                            │
│                 ▼                                            │
│  /api/chat                                                   │
│  - Router mức độ thông minh                                  │
│  - FAQ/preset không dùng LLM                                 │
│  - RAG Pinecone                                              │
│  - Gemini/DeepSeek                                           │
│  - Output validator                                          │
│  - Telemetry, feedback, rate limit                           │
└──────────────────────────────────────────────────────────────┘
```

### 1.2. Nguyên tắc bắt buộc

1. Chỉ có **một backend AI**, một kho RAG và một nơi quản lý API key.
2. Không sao chép `api/chat.js`, Pinecone, Firebase hoặc biến môi trường sang `capphutho`.
3. Không thay đổi kiến trúc tích hợp và mô hình AI trong cùng một lần phát hành.
4. Mọi thay đổi đều có feature flag và đường rollback về FAQ cũ.
5. Câu trả lời pháp lý phải ưu tiên dữ liệu đã duyệt; thiếu căn cứ thì từ chối suy đoán.
6. Tối ưu token bằng **không gọi model khi không cần**, trước khi nghĩ đến đổi model rẻ hơn.

### 1.3. Vì sao đây là phương án tối ưu

- `capphutho` hiện là web tĩnh, chatbot FAQ chạy hoàn toàn tại trình duyệt.
- `bandocapt` đã có backend AI lớn, gồm RAG, bảo mật, chống bịa dữ liệu, streaming và telemetry.
- Nhúng cùng-origin ở phía iframe giúp `js/gemini.js` vẫn gọi `/api/chat` của `bandocapt`; không phải mở CORS hoặc đưa API key sang dự án phường.
- CSS và JavaScript của hai dự án được cô lập trong hai document khác nhau, giảm xung đột.
- Khi nâng cấp chatbot ở `bandocapt`, các client dùng chung nhận bản mới mà không phải đồng bộ nhiều repository.

---

## 2. Hiện trạng mã nguồn và tác động

### 2.1. `capphutho`

Hiện có:

- 01 trang chính `index.html` khoảng 2.000 dòng, chứa phần lớn CSS và HTML.
- `js/chatbot.js` vừa điều khiển chatbot FAQ, vừa điều khiển tìm kiếm thủ tục ở trang chủ.
- `js/data/faq_db.js` có 9 danh mục, 92 câu hỏi/đáp án tiếng Việt.
- `js/data/faq_i18n.js` có dữ liệu tiếng Anh và Trung.
- `js/utils/search_engine.js` thực hiện tìm kiếm cục bộ, không dấu, keyword và cache.
- Nút chatbot, cửa sổ chat, header, body, footer đều đã có giao diện ổn định.

**Điểm cần lưu ý:** không được xóa ngay `faq_db.js`, `faq_i18n.js`, `search_engine.js` hoặc toàn bộ `js/chatbot.js`, vì logic tìm kiếm toàn trang đang phụ thuộc vào chúng.

### 2.2. `bandocapt`

Hiện có:

- `api/chat.js` hơn 3.100 dòng, là backend RAG chính.
- `js/chatbot.js`, `js/gemini.js`, `js/lazy-features.js` phụ trách UI, SSE và lazy loading.
- Gemini 2.5 Flash dùng cho sinh câu trả lời.
- Gemini Embedding 001 dùng truy hồi Pinecone.
- Model tiện ích cho rerank, viết lại câu hỏi, dịch truy hồi, tóm tắt lịch sử và groundedness.
- 4 tài liệu tối đa được đưa vào prompt sau truy hồi.
- System prompt hiện khoảng 15.763 ký tự, ước khoảng 3.900–4.500 token tùy tokenizer.
- `tthc-catalog.json` có 92 mục; nội dung trung bình gần 4.800 ký tự/mục.
- History giữ tối đa 6 item; câu trả lời cũ bị cắt còn 500 ký tự.
- `maxOutputTokens` của generation chính đang đặt 3.072.
- Cache FAQ hiện chỉ là `Map` trong memory của từng serverless instance, TTL 1 giờ.
- Groundedness AI chạy hậu kiểm với những câu có số liệu.

### 2.3. Nút thắt token hiện tại

Một yêu cầu thông thường có thể gồm:

1. System prompt khoảng 4.000 token.
2. 1–4 tài liệu RAG, có thể khoảng 2.000–6.000 token.
3. History khoảng 0–1.000 token.
4. Câu hỏi và khóa ngôn ngữ.
5. Output thường vài trăm token.
6. Có thể phát sinh thêm model call cho rewrite, translation, rerank, summary và groundedness.

Do đó, tối ưu hiệu quả nhất là:

- rút prompt theo module;
- chỉ đưa đúng trường dữ liệu được hỏi;
- trả lời tất định khi đã có dữ liệu cấu trúc;
- giảm số model call phụ;
- chỉ dùng model mạnh cho tỷ lệ nhỏ câu khó.

---

## 3. Phạm vi thi công

### 3.1. Trong phạm vi

- Tạo trang chatbot độc lập trên `bandocapt`.
- Nhúng vào modal hiện có của `capphutho`.
- Giữ FAQ cũ làm tìm kiếm cục bộ và fallback.
- Tạo giao thức trao đổi giữa trang cha và iframe.
- Cá nhân hóa tên đơn vị, lời chào, locale và câu hỏi gợi ý.
- Tạo router phân tầng mức độ thông minh.
- Tối ưu prompt, retrieval, history, output và cache.
- Bổ sung đo token, route, model, cache hit và chi phí ước tính.
- Bổ sung test, feature flag, deploy và rollback.

### 3.2. Chưa thực hiện trong đợt đầu

- Không hợp nhất hai repository thành monorepo.
- Không chuyển toàn bộ UI `capphutho` sang framework mới.
- Không đổi Pinecone hoặc Firebase.
- Không nhập tự động 92 FAQ cũ vào kho chính thức khi chưa kiểm chứng nội dung.
- Không đổi model generation chính trong cùng đợt nhúng iframe.
- Không cho AI tự quyết thẩm quyền hoặc địa chỉ ngoài dữ liệu đã xác minh.

---

## 4. Kiến trúc đích chi tiết

### 4.1. Lớp giao diện tại `capphutho`

`capphutho` giữ:

- launcher icon;
- nhãn “Trợ lý ảo 24/7”;
- header đỏ của Công an phường;
- nút đóng;
- kích thước và animation cửa sổ;
- hệ thống i18n của trang cha.

Phần body/footer FAQ được thay bằng `ChatEmbedHost`:

```text
.chat-window
├── .chat-header                 giữ nguyên
└── .chat-embed-shell
    ├── loading state
    ├── iframe                   tạo khi mở lần đầu
    ├── error state
    └── fallback button          dùng FAQ cũ
```

### 4.2. Lớp iframe tại `bandocapt`

`chat-embed.html` chỉ chứa:

- history;
- typing state;
- nguồn trích dẫn;
- verified locations;
- Turnstile;
- input và nút gửi;
- starter chips;
- thông báo lỗi.

Không chứa:

- bản đồ;
- launcher riêng;
- mobile bottom navigation;
- panel tìm kiếm bản đồ;
- catalog TTHC đầy đủ trong giai đoạn 1.

### 4.3. Lớp API

`/api/chat` vẫn ở `bandocapt` và nhận thêm metadata không nhạy cảm:

```json
{
  "userMessage": "...",
  "history": [],
  "captchaToken": "...",
  "clientContext": {
    "appId": "capphutho",
    "unitId": "cap-phu-tho",
    "uiLocale": "vi",
    "presetId": null,
    "procedureId": null,
    "requestedMode": "auto"
  }
}
```

Quy tắc:

- `clientContext` chỉ là gợi ý giao diện/định tuyến.
- Server phải allowlist `appId`, `unitId`, `requestedMode`.
- Không dùng dữ liệu client để khẳng định thẩm quyền, địa chỉ hoặc nội dung pháp lý.
- `presetId` và `procedureId` phải được resolve lại trên server.

---

## 5. Giao thức `postMessage`

### 5.1. Nguyên tắc bảo mật

- Parent chỉ gửi đến đúng origin `https://bandocapt.vercel.app`.
- Iframe chỉ chấp nhận message từ origin `https://capphutho.vercel.app` và local origin được cấu hình.
- Parent chỉ chấp nhận response từ đúng origin của `bandocapt`.
- Không dùng `targetOrigin="*"`.
- Không truyền API key, token Firebase hoặc dữ liệu nghiệp vụ nhạy cảm.

### 5.2. Parent gửi cho iframe

#### `CAPP_CHAT_INIT`

```json
{
  "type": "CAPP_CHAT_INIT",
  "version": 1,
  "payload": {
    "appId": "capphutho",
    "unitId": "cap-phu-tho",
    "locale": "vi",
    "theme": "capphutho",
    "initialQuestion": null
  }
}
```

#### `CAPP_CHAT_ASK`

```json
{
  "type": "CAPP_CHAT_ASK",
  "version": 1,
  "payload": {
    "text": "Thủ tục cấp lại căn cước bị mất như thế nào?",
    "presetId": "capphutho_cccd_cap_lai"
  }
}
```

#### `CAPP_CHAT_SET_LOCALE`

```json
{
  "type": "CAPP_CHAT_SET_LOCALE",
  "version": 1,
  "payload": { "locale": "en" }
}
```

#### `CAPP_CHAT_FOCUS`

Yêu cầu iframe focus vào ô nhập khi modal đã mở.

#### `CAPP_CHAT_RESET`

Xóa hội thoại tại phía iframe khi người dùng chủ động yêu cầu; không tự reset khi đóng/mở modal.

### 5.3. Iframe gửi cho parent

- `BANDOCAPT_CHAT_READY`: đã tải xong JS, UI và sẵn sàng nhận message.
- `BANDOCAPT_CHAT_CAPTCHA_READY`: đã có Turnstile token.
- `BANDOCAPT_CHAT_BUSY`: bắt đầu/dừng sinh câu trả lời.
- `BANDOCAPT_CHAT_ERROR`: lỗi load/API/Turnstile.
- `BANDOCAPT_CHAT_CLOSE`: người dùng bấm đóng trong iframe nếu nút này được bật.
- `BANDOCAPT_CHAT_ROUTE`: telemetry không nhạy cảm về route L0/L1/L2/L3.
- `BANDOCAPT_CHAT_NAVIGATE`: đề nghị mở một module hoặc URL đã allowlist tại trang cha.

---

## 6. Mô hình phân tầng mức độ thông minh

## 6.1. Tầng L0 — Tất định, không dùng AI

**Mục tiêu:** trả lời ngay, 0 token LLM.

Áp dụng khi:

- Người dùng bấm một câu hỏi FAQ đã duyệt.
- Câu hỏi khớp chính xác preset.
- Chỉ hỏi tên, địa chỉ, điện thoại của một đơn vị đã xác minh.
- Chỉ hỏi một fact đã có cấu trúc: phí, thời hạn, mẫu đơn, nơi nộp.
- Câu hỏi điều hướng giao diện.
- Thông báo ngoài phạm vi hoặc lỗi hệ thống có thể xác định bằng rule.

Nguồn trả lời:

- `approved-faq-presets.json`;
- `tthc-catalog.json` đã parse;
- `Published_Locations`;
- static verified blocks.

Đầu ra được dựng bằng template, không gọi generation model.

**Mục tiêu tỷ lệ:** 35–50% tổng lượt hỏi sau khi hệ thống ổn định.

## 6.2. Tầng L1 — Truy xuất và dựng câu trả lời có cấu trúc

**Mục tiêu:** không dùng generation model; có thể dùng embedding nếu lexical search không đủ.

Áp dụng khi:

- Xác định được đúng một `procedure_id`.
- Người dùng hỏi một trường cụ thể của thủ tục.
- Top-1 đủ cao, có khoảng cách rõ với top-2.
- Dữ liệu `current_procedure` đã duyệt có đủ trường cần thiết.

Ví dụ:

- “Lệ phí cấp hộ chiếu là bao nhiêu?”
- “Mẫu đơn nào dùng để khai báo tạm trú người nước ngoài?”
- “Thời hạn giải quyết cấp lại đăng ký xe?”

Server lấy đúng trường và dựng:

```text
[Câu trả lời trực tiếp]

📚 Căn cứ: [nguồn đã duyệt]
```

**Mục tiêu tỷ lệ:** 20–30%.

## 6.3. Tầng L2 — AI Lite, tổng hợp đơn giản

**Mục tiêu:** dùng model rẻ/nhanh cho câu hỏi cần diễn đạt tự nhiên nhưng không đòi hỏi suy luận pháp lý phức tạp.

Áp dụng khi:

- Câu hỏi một chủ đề nhưng cách diễn đạt tự do.
- Cần ghép 1–2 nguồn cùng thẩm quyền.
- Cần chuyển ngôn ngữ.
- Cần giải thích ngắn cho người dân.
- Follow-up đơn giản đã có `procedure_id` hoặc state rõ.

Model đề xuất trước mắt:

- `gemini-2.5-flash-lite` cho generation lite và utility.

Lý do:

- tương thích gần với API hiện tại;
- chi phí thấp;
- đủ cho tổng hợp RAG hẹp;
- không thay đổi đồng thời sang API/model 3.x trong đợt tích hợp.

**Mục tiêu tỷ lệ:** 20–35%.

## 6.4. Tầng L3 — AI Smart, câu khó

Áp dụng khi:

- Câu hỏi đa ý định.
- Cần so sánh hai thủ tục.
- Tình huống cá nhân có nhiều điều kiện.
- Có mâu thuẫn/độ mơ hồ trong retrieval.
- Hội thoại nhiều lượt, tham chiếu ngữ cảnh phức tạp.
- Cần giải thích lý do áp dụng quy định.

Model đề xuất giai đoạn đầu:

- giữ `gemini-2.5-flash` hiện tại.

Sau khi regression ổn định, A/B test:

- `gemini-3.6-flash` cho một phần câu L3;
- chỉ chuyển khi chất lượng và token thực tế tốt hơn đủ lớn so với chi phí.

**Mục tiêu tỷ lệ:** không quá 5–10%.

## 6.5. Tầng L4 — Không đủ căn cứ, chuyển hướng con người

Không cố tăng “độ thông minh” để trả lời khi thiếu dữ liệu.

Áp dụng khi:

- không có tài liệu đủ ngưỡng;
- nguồn hiện hành mâu thuẫn;
- không xác định được thẩm quyền;
- câu hỏi yêu cầu quyết định hành chính cụ thể;
- cần kiểm tra hồ sơ cá nhân thực tế.

Trả lời ngắn:

- nói rõ chưa đủ căn cứ;
- chỉ đúng kênh liên hệ đã xác minh;
- không bịa số liệu hoặc thủ tục gần giống.

---

## 7. Router mức độ thông minh

### 7.1. Không dùng LLM để route ở bước đầu

Router ưu tiên rule và metadata. Việc gọi một model chỉ để quyết định có gọi model khác sẽ tăng chi phí và độ trễ.

### 7.2. Thứ tự định tuyến

```text
1. Validate + security
2. Normalize query + detect language
3. Có presetId đã duyệt?
   └─ Có → L0
4. Có procedureId hợp lệ + intent trường đơn?
   └─ Có → L1
5. Location-only và match xác minh duy nhất?
   └─ Có → L0
6. Local lexical/exact-token match đủ mạnh?
   └─ Có + đủ dữ liệu cấu trúc → L1
7. Pinecone retrieval
8. Không có nguồn đủ ngưỡng?
   └─ L4 abstain
9. Một intent + 1–2 nguồn + không conflict?
   └─ L2
10. Multi-intent / compare / conflict / long-context?
   └─ L3
```

### 7.3. Pseudocode

```js
function chooseIntelligenceRoute(ctx) {
  if (ctx.approvedPreset) return { level: 'L0', reason: 'approved_preset' };

  if (ctx.verifiedLocationOnly && ctx.locationMatches.length === 1) {
    return { level: 'L0', reason: 'verified_location' };
  }

  if (ctx.procedure && ctx.singleFieldIntent && ctx.hasRequestedStructuredField) {
    return { level: 'L1', reason: 'structured_procedure_fact' };
  }

  if (!ctx.hasGroundedSource) {
    return { level: 'L4', reason: 'missing_grounded_source' };
  }

  if (ctx.sourceConflict) {
    return { level: 'L4', reason: 'source_conflict' };
  }

  if (
    ctx.intentCount === 1 &&
    ctx.topMatches.length <= 2 &&
    !ctx.requiresComparison &&
    !ctx.requiresLegalReasoning &&
    ctx.historyComplexity <= 1
  ) {
    return { level: 'L2', reason: 'simple_grounded_synthesis' };
  }

  return { level: 'L3', reason: 'complex_grounded_reasoning' };
}
```

### 7.4. Ngưỡng ban đầu để thử nghiệm

Không hardcode vĩnh viễn; phải hiệu chỉnh bằng regression.

- Dưới 0,62: không dùng tài liệu, giữ cơ chế fail-closed hiện tại.
- Top-1 ≥ 0,82 và chênh top-2 ≥ 0,08: ứng viên L1 nếu metadata đủ.
- Top-1 ≥ 0,68 nhưng chưa đủ cấu trúc: L2.
- Có từ 2 intent, từ 3 nguồn cần kết hợp hoặc truy vấn so sánh: L3.
- Có conflict current sources: L4, không để model tự chọn.

---

## 8. Chiến lược model

### 8.1. Cấu hình khuyến nghị trong giai đoạn tích hợp

```env
CHAT_ROUTER_MODE=deterministic
LLM_UTILITY_MODEL=gemini-2.5-flash-lite
LLM_LITE_MODEL=gemini-2.5-flash-lite
LLM_SMART_MODEL=gemini-2.5-flash
LLM_PRIMARY=lite
LLM_FALLBACK=deepseek
SMART_ROUTE_MAX_PERCENT=10
```

### 8.2. Không dùng alias `latest` ở production

Dùng model ID ổn định để:

- tránh model bị thay ngầm;
- giữ regression có ý nghĩa;
- kiểm soát thay đổi hành vi;
- rollback chính xác.

Alias `latest` chỉ phù hợp môi trường thử nghiệm hoặc canary.

### 8.3. Kế hoạch model 3.x

Không chuyển ngay trong Phase 1.

Khi chuyển `gemini-3.5-flash-lite` hoặc `gemini-3.6-flash` cần:

1. Bỏ `temperature`, `top_p`, `top_k` theo API mới.
2. Kiểm tra thinking level.
3. Kiểm tra multi-turn contents và model turns.
4. Bổ sung parsing usage metadata mới.
5. Chạy toàn bộ regression tối thiểu 3 lần/câu.
6. Canary 5%, 10%, 25%, 50% trước khi lên 100%.

### 8.4. Khi nào dùng model mới

- Dùng 3.5 Flash-Lite nếu chất lượng L2 tăng rõ và tổng token/answer giảm đủ bù giá.
- Dùng 3.6 Flash chỉ cho L3 nếu giảm lỗi, giảm số turn hoặc giảm retry đáng kể.
- Không dùng model mạnh cho câu location, FAQ hoặc fact đơn.

---

## 9. Ngân sách token đề xuất

### 9.1. Ngân sách theo route

| Route | Input mục tiêu | Output mục tiêu | Generation model |
|---|---:|---:|---|
| L0 | 0 | 0 LLM | Không dùng |
| L1 | 0–150 embedding/query | 0 LLM | Không dùng generation |
| L2 hẹp | 800–2.200 | 120–400 | Flash-Lite |
| L2 đầy đủ | 1.500–3.000 | 350–900 | Flash-Lite |
| L3 | 2.500–5.000 | 500–1.400 | Flash/Smart |
| L4 | 0 | 0 LLM hoặc template | Không dùng nếu rule xác định được |

### 9.2. `maxOutputTokens` động

Thay `3072` cố định bằng:

```js
const OUTPUT_BUDGETS = {
  location: 220,
  single_fact: 320,
  narrow_procedure: 520,
  full_procedure: 1000,
  comparison: 1400,
  complex: 1600,
};
```

`maxOutputTokens` không đồng nghĩa luôn bị tính đủ, nhưng đặt trần thấp giúp hạn chế lan man và giảm nguy cơ model kéo dài.

### 9.3. Rút system prompt theo module

Hiện prompt chính khoảng 15.763 ký tự. Tách thành:

```text
prompt/core.md                 vai trò, chống bịa, nguồn ưu tiên
prompt/modes/location.md       chỉ khi hỏi địa chỉ
prompt/modes/single-fact.md    chỉ khi hỏi phí/thời hạn/mẫu
prompt/modes/procedure.md      chỉ khi hỏi trọn thủ tục
prompt/modes/compare.md        chỉ khi so sánh
prompt/language/vi.md          mặc định, rất ngắn
prompt/language/en.md          chỉ khi cần
prompt/language/zh.md          chỉ khi cần
prompt/domain/foreigner.md     chỉ khi có chủ thể NNN
```

Mục tiêu:

- core 700–1.000 token;
- mode 150–350 token;
- language lock 40–120 token;
- domain guard 80–200 token.

Không gửi hướng dẫn địa chỉ khi câu hỏi chỉ hỏi lệ phí; không gửi template trọn thủ tục khi chỉ hỏi số điện thoại.

### 9.4. Giảm context tài liệu

Không đưa toàn văn tối đa 4 tài liệu trong mọi request.

#### Câu fact đơn

Chỉ đưa:

```text
TITLE
REQUESTED_FIELD
SOURCE
EFFECTIVE_DATE
VERIFIED_FACTS
```

#### Câu trọn thủ tục

Chỉ đưa các section:

- đối tượng/điều kiện;
- hồ sơ;
- trình tự;
- thời hạn;
- phí;
- nơi nộp;
- căn cứ.

#### Giới hạn đề xuất

- L2 hẹp: tối đa 1–2 nguồn, 1.200–1.800 token context.
- L2 đầy đủ: tối đa 2 nguồn, 2.500 token.
- L3: tối đa 3 nguồn, 4.000 token.
- Chỉ giữ 4 nguồn trong tình huống điều tra conflict hoặc eval.

### 9.5. History dạng state thay vì nhắc lại toàn văn

Thêm `conversationState`:

```json
{
  "language": "vi",
  "procedureId": "...",
  "intent": "fee",
  "subject": "foreign_national",
  "locationId": "...",
  "lastQuestionType": "clarification",
  "summary": "Người dùng hỏi gia hạn thẻ tạm trú và thuộc khu vực Phú Thọ cũ"
}
```

Quy tắc:

- Câu độc lập: không gửi history.
- Follow-up rõ: gửi state + 1 cặp gần nhất.
- Chỉ gọi model tóm tắt khi history thật sự dài và không thể tạo state bằng rule.
- Giới hạn summary 120–180 token.

### 9.6. Giảm model call phụ

Một request không nên mặc định có nhiều utility calls.

- Rewrite chỉ khi câu follow-up quá ngắn và thiếu chủ ngữ.
- Translation retrieval chỉ khi không phải tiếng Việt.
- Rerank chỉ khi top results mơ hồ; giữ rule hiện có và tăng lexical/direct routing.
- History summary chỉ khi vượt ngưỡng.
- Groundedness AI chỉ chạy theo sampling hoặc risk-based, không cần chạy mọi câu có số liệu.

Cấu hình đề xuất:

```env
GROUNDEDNESS_SAMPLE_RATE=0.10
GROUNDEDNESS_ALWAYS_FOR_SMART=1
GROUNDEDNESS_ALWAYS_FOR_LOW_CONFIDENCE=1
UTILITY_CALLS_MAX_PER_REQUEST=1
```

Nếu một request vừa cần rewrite, classify và language detect, gộp vào một utility call trả JSON thay vì ba call riêng.

---

## 10. FAQ/Preset không dùng token

### 10.1. Không bỏ 92 FAQ cũ

Dữ liệu FAQ của `capphutho` là tài sản tốt để:

- tìm kiếm nhanh;
- starter questions;
- route L0;
- fallback khi AI lỗi;
- bộ test regression.

### 10.2. Không dùng trực tiếp khi chưa kiểm chứng

Các số liệu phí, thời hạn, mẫu đơn và cơ quan tiếp nhận có thể thay đổi. Quy trình:

1. Convert `faq_db.js` thành `data/capphutho-faq-candidate.json`.
2. Mỗi câu có:
   - `id`;
   - `category`;
   - `question`;
   - `answer`;
   - `keywords`;
   - `source_refs`;
   - `review_status`;
   - `last_verified_at`;
   - `content_hash`.
3. Đối chiếu với corpus hiện hành.
4. Câu đạt yêu cầu chuyển sang `approved-faq-presets.json`.
5. Câu chưa xác minh chỉ dùng làm gợi ý tìm kiếm, không trả lời tất định.

### 10.3. Preset key

```text
kb_version | locale | app_id | preset_id
```

Ví dụ:

```text
2026-07-26|vi|capphutho|cccd_cap_lai_mat_the
```

### 10.4. Semantic cache

Không dùng semantic cache rộng cho nội dung pháp lý. Chỉ cache khi:

- cùng `procedure_id`;
- cùng intent;
- cùng locale;
- cùng `kb_version`;
- không có PII;
- không hỏi địa chỉ động;
- không có history cá nhân hóa.

---

## 11. Kế hoạch thay đổi file — `bandocapt`

## 11.1. File mới

### `chat-embed.html`

- Shell riêng cho chatbot.
- Giữ các ID mà `js/chatbot.js` đang cần.
- Không có bản đồ và navigation.
- Nạp `tokens.css`, `output.css`, `styles.css`, `styles/chat-embed.css`.
- Nạp `js/lazy-features.js` và `js/chat-embed.js`.

### `styles/chat-embed.css`

- `html/body` full height.
- Không launcher.
- Chat window full container.
- Không border radius bên trong nếu parent đã có khung.
- Tránh double scroll.
- Responsive 320 px trở lên.

### `js/chat-embed.js`

- Đọc query params allowlist.
- Khởi tạo config.
- Tải module chat.
- Mở chat tự động.
- Thiết lập `postMessage` listener.
- Gửi READY/BUSY/ERROR cho parent.
- Queue initial question cho đến khi Turnstile sẵn sàng.

### `lib/client-context.js`

- Allowlist client.
- Normalize `appId`, `unitId`, locale, preset/procedure.
- Không tin dữ liệu thẩm quyền từ client.

### `lib/chat-router.js`

- Chọn L0–L4.
- Trả `level`, `reason`, `model`, `budget`.
- Không chứa code gọi model.

### `lib/structured-answer.js`

- Dựng answer L0/L1 từ facts có cấu trúc.
- Trả text + sources + verifiedLocations.
- Không dùng LLM.

### `data/client-profiles.json`

```json
{
  "capphutho": {
    "displayName": "Trợ lý Công an phường Phú Thọ",
    "unitId": "cap-phu-tho",
    "starterPresetIds": [],
    "allowedLocales": ["vi", "en", "zh-CN"],
    "catalogCompare": false
  }
}
```

### Test mới

- `test/chat-embed-config.test.js`
- `test/client-context.test.js`
- `test/chat-router.test.js`
- `test/structured-answer.test.js`
- `test/token-budget.test.js`
- `test/e2e/chat-embed.spec.js`

## 11.2. File sửa

### `js/chatbot.js`

Thay đổi tối thiểu:

- đọc runtime config;
- cho phép ẩn header/close/launcher;
- starter questions theo profile;
- tắt catalog compare trong embed nếu chưa hỗ trợ;
- expose `ChatbotUI.ask(text, options)`;
- phát event busy/error;
- không thay logic stream chính.

### `js/gemini.js`

- thêm `clientContext` vào request;
- parse `route`, `model`, `usage` từ event done;
- không đổi API URL trong Phase 1.

### `api/chat.js`

Phase 1 chỉ thêm parsing context và telemetry, không đổi generation.

Phase token optimization:

- gọi `chat-router`;
- short-circuit L0/L1 trước embedding/generation;
- model URL động theo route;
- prompt module;
- output budget động;
- giảm utility calls;
- ghi usage metadata.

### `scripts/build-static.js`

Hiện chỉ `index.html` được giữ tên cố định. Cần:

- thêm `chat-embed.html`, `styles/chat-embed.css`, `js/chat-embed.js` vào build inputs;
- tạo `ENTRY_HTML = new Set(['index.html', 'chat-embed.html'])`;
- cả hai entry HTML không hash tên;
- vẫn rewrite reference tới asset có hash.

### `package.json`

- thêm các file mới vào `check:syntax`;
- thêm test route/token;
- nâng Node theo kế hoạch deploy riêng, không gộp nếu chưa cần.

### `vercel.json`

- `/chat-embed.html` no-cache.
- Cho phép `capphutho` frame `bandocapt`.
- Giữ allowlist hẹp.
- Bổ sung CSP cho các resource cần thiết.

Phương án ít thay đổi nhất:

```text
frame-ancestors 'self' https://capphutho.vercel.app;
```

Không dùng wildcard.

---

## 12. Kế hoạch thay đổi file — `capphutho`

## 12.1. `index.html`

Giữ `.chat-window` và `.chat-header`.

Thay `.chat-body` + `.chat-footer` bằng:

```html
<div id="chatEmbedShell" class="chat-embed-shell">
  <div id="chatEmbedLoading" class="chat-embed-loading">Đang kết nối trợ lý…</div>
  <iframe
    id="bandocaptChatFrame"
    title="Trợ lý dịch vụ công Công an phường Phú Thọ"
    data-src="https://bandocapt.vercel.app/chat-embed.html?client=capphutho"
    referrerpolicy="strict-origin-when-cross-origin"
    allow="clipboard-write"
    hidden
  ></iframe>
  <div id="chatEmbedError" class="chat-embed-error" hidden>
    <p>Trợ lý AI đang tạm thời không khả dụng.</p>
    <button id="openFaqFallbackBtn" type="button">Tra cứu câu hỏi thường gặp</button>
  </div>
</div>
```

Không đặt `src` ngay từ first paint; chỉ gán khi mở chat lần đầu.

## 12.2. `js/chatbot.js`

Không xóa logic global search.

Thêm mode:

```js
const CHAT_MODE = window.CAPP_CHAT_CONFIG?.mode || 'faq';
```

Khi `ai-embed`:

- `toggleChat()` mở modal và mount iframe;
- không `renderMainMenu()` vào chat body;
- giữ `FaqSearchEngine` cho global search;
- click kết quả tìm kiếm sẽ gửi canonical question/presetId sang iframe;
- nếu iframe lỗi, gọi lại flow FAQ hiện có.

Cần thêm:

- iframe ready promise;
- message queue;
- timeout load;
- origin validation;
- fallback activation;
- locale sync;
- cleanup listener.

## 12.3. `js/data/faq_db.js`, `faq_i18n.js`, `search_engine.js`

Giữ nguyên ở Phase 1 để:

- global search không hỏng;
- fallback sẵn sàng;
- không thay đổi quá nhiều.

Phase sau có thể tách `global-search.js` khỏi controller để giảm coupling.

## 12.4. `js/i18n.js`

Thêm text:

- connecting;
- AI unavailable;
- use FAQ fallback;
- retry AI;
- ask AI about this result.

Khi đổi locale:

- cập nhật parent header;
- gửi `CAPP_CHAT_SET_LOCALE` sang iframe.

## 12.5. CSS

Thêm:

- `.chat-embed-shell` full flex;
- iframe width/height 100%; border 0;
- loading skeleton;
- error/fallback state;
- mobile full-screen;
- safe area bottom;
- không double scrollbar.

---

## 13. Feature flag và rollback

### 13.1. Cấu hình `capphutho`

```html
<script>
window.CAPP_CHAT_CONFIG = {
  mode: 'ai-embed',
  embedUrl: 'https://bandocapt.vercel.app/chat-embed.html?client=capphutho',
  allowedOrigin: 'https://bandocapt.vercel.app',
  loadTimeoutMs: 10000,
  fallback: 'faq',
  preserveConversation: true
};
</script>
```

Rollback tức thời:

```js
mode: 'faq'
```

### 13.2. Cấu hình `bandocapt`

```env
CHAT_EMBED_ENABLED=1
CHAT_ROUTER_ENABLED=0
CHAT_STRUCTURED_ANSWER_ENABLED=0
CHAT_LITE_MODEL_ENABLED=0
```

Thứ tự bật:

1. `CHAT_EMBED_ENABLED`.
2. Router shadow mode.
3. Structured answers L0/L1.
4. Lite model cho 5%.
5. Tăng dần sau regression.

---

## 14. Các giai đoạn thi công

## Phase 0 — Baseline và khóa phạm vi

### Công việc

1. Tạo hai branch:
   - `feat/chat-embed-host` tại `bandocapt`;
   - `feat/bandocapt-chat-client` tại `capphutho`.
2. Ghi commit SHA baseline.
3. Chạy syntax/unit/regression hiện có.
4. Chụp ảnh chatbot FAQ desktop/mobile.
5. Ghi số liệu baseline:
   - latency;
   - số model calls/request;
   - input/output token nếu có;
   - tỷ lệ lỗi;
   - tỷ lệ FAQ cache hit.
6. Không sửa model.

### Đầu ra

- `docs/integration/baseline.md`.
- Danh sách test đang pass/fail.

### Lưu ý baseline hiện tại

Syntax các file chatbot chính đã kiểm tra được. Test Playwright của `capphutho` cần cài Chromium trong môi trường CI/dev trước khi chạy đầy đủ.

---

## Phase 1 — Tạo Chatbot Host độc lập tại `bandocapt`

### Công việc

1. Tạo `chat-embed.html`.
2. Tạo CSS embed.
3. Tạo `chat-embed.js`.
4. Thêm runtime config vào `js/chatbot.js`.
5. Tắt catalog compare trong embed mode.
6. Thêm entry vào `build-static.js`.
7. Thêm CSP `frame-ancestors` allowlist.
8. Test mở trực tiếp URL embed.
9. Test Turnstile, stream, stop, close, sources, location, feedback.

### Tiêu chí hoàn thành

- URL embed hoạt động độc lập.
- Không tải Leaflet/map/data bản đồ.
- Không có lỗi console.
- Không có double header.
- Build `dist/chat-embed.html` tồn tại và tham chiếu đúng hashed assets.

### Rollback

Không ảnh hưởng `index.html`; xóa route/embed files nếu cần.

---

## Phase 2 — Nhúng vào `capphutho`

### Công việc

1. Thêm config `ai-embed`.
2. Thay body/footer bằng iframe shell.
3. Lazy mount khi mở lần đầu.
4. Thêm handshake READY.
5. Thêm error timeout và FAQ fallback.
6. Giữ global search.
7. Click kết quả search gửi câu hỏi sang AI.
8. Đồng bộ locale.
9. Test desktop/mobile.

### Tiêu chí hoàn thành

- Trang ban đầu không tải iframe.
- Bấm chatbot mới tải iframe.
- Chat hoạt động và giữ hội thoại khi đóng/mở.
- Global search vẫn hoạt động.
- AI lỗi thì FAQ cũ vẫn dùng được.

### Rollback

Đổi `mode: 'faq'`, không cần rollback backend.

---

## Phase 3 — Cá nhân hóa và liên kết ứng dụng

### Công việc

1. Tên “Trợ lý Công an phường Phú Thọ”.
2. Lời chào theo locale.
3. Starter questions theo phạm vi phường.
4. `clientContext` allowlist.
5. `postMessage` mở module phù hợp tại `capphutho`.
6. Link “Xem hướng dẫn chi tiết” chỉ mở route/URL allowlist.
7. Không dùng unit context làm căn cứ thẩm quyền.

### Tiêu chí hoàn thành

- Branding đúng.
- Trả lời vẫn dùng chung corpus.
- Không hardcode địa chỉ phường vào prompt nếu chưa qua dữ liệu xác minh.

---

## Phase 4 — Import và duyệt FAQ preset

### Công việc

1. Convert 92 FAQ sang JSON candidate.
2. Gán ID ổn định.
3. Đối chiếu nguồn.
4. Duyệt nội dung còn hiệu lực.
5. Tạo preset L0.
6. Map global search result → presetId.
7. Câu chưa duyệt → AI RAG, không trả preset.

### Tiêu chí hoàn thành

- Mỗi preset có nguồn và ngày kiểm chứng.
- Cập nhật `kb_version` làm invalid cache.
- Không có preset chứa fact chưa xác minh.

---

## Phase 5 — Router shadow mode

### Công việc

1. Tạo `chat-router.js`.
2. Router chỉ ghi log, chưa thay response.
3. Đo phân bố L0/L1/L2/L3/L4 trên traffic thật.
4. So router với đánh giá thủ công.
5. Hiệu chỉnh ngưỡng.

### Tiêu chí hoàn thành

- Độ chính xác phân route mục tiêu ≥ 90% trên bộ test.
- Không tăng latency đáng kể.
- Có log reason rõ ràng.

---

## Phase 6 — Bật L0/L1 không dùng generation

### Công việc

1. Short-circuit approved preset.
2. Short-circuit verified location.
3. Short-circuit structured single fact.
4. Dùng cùng output validator/source formatter.
5. Canary 10% → 25% → 50% → 100%.

### Tiêu chí hoàn thành

- Đáp án L0/L1 chính xác bằng hoặc tốt hơn AI.
- Source chips đầy đủ.
- Token generation bằng 0 cho route này.
- Tỷ lệ route no-generation ≥ 40% trên nhóm truy vấn phổ biến.

---

## Phase 7 — Prompt và context modular

### Công việc

1. Tách prompt core/mode/language/domain.
2. Parse tài liệu thành section.
3. Chỉ gửi section được hỏi.
4. Giảm top docs theo route.
5. Output budget động.
6. State-based history.
7. Test prompt injection và grounding.

### Tiêu chí hoàn thành

- Input token trung bình L2 giảm ít nhất 50%.
- Không giảm điểm regression.
- Không tăng over-refusal quá ngưỡng chấp nhận.

---

## Phase 8 — Lite/Smart model routing

### Công việc

1. Thêm model URL động.
2. L2 → Flash-Lite.
3. L3 → Flash hiện tại.
4. DeepSeek chỉ fallback lỗi provider.
5. Log model và usage.
6. Canary Lite 5% → 10% → 25% → 50% → 100% L2.

### Gate

- required facts không giảm;
- source recall không giảm đáng kể;
- violation không tăng;
- tiếng Việt/Anh/Trung đúng;
- latency cải thiện hoặc tương đương.

---

## Phase 9 — Groundedness và utility optimization

### Công việc

1. Groundedness risk-based/sampling.
2. Gộp utility call khi cần.
3. Bỏ summary/rewrite/rerank không cần thiết.
4. Persistent exact cache theo `kb_version`.
5. Đo cache hit.

### Tiêu chí hoàn thành

- Utility calls trung bình < 0,5/request.
- Không bỏ cảnh báo ở route rủi ro.
- Cache không chứa PII.

---

## Phase 10 — Đánh giá model 3.x

Thực hiện riêng sau khi toàn bộ hệ thống ổn định.

1. Tạo adapter API 3.x.
2. Bỏ sampling params deprecated.
3. Chạy regression độc lập.
4. A/B Lite 3.5 và Smart 3.6.
5. So sánh:
   - accuracy;
   - input/output/thinking token;
   - latency;
   - retry;
   - chi phí/câu thành công.
6. Chỉ chuyển khi có lợi ích thực đo.

---

## 15. Telemetry phải bổ sung

Mỗi request ghi:

```json
{
  "app_id": "capphutho",
  "route_level": "L2",
  "route_reason": "simple_grounded_synthesis",
  "model": "gemini-2.5-flash-lite",
  "provider": "gemini",
  "input_tokens": 1800,
  "output_tokens": 320,
  "thinking_tokens": 0,
  "cached_tokens": 0,
  "embedding_tokens": 18,
  "utility_call_count": 1,
  "retrieved_doc_count": 2,
  "prompt_mode": "narrow_procedure",
  "history_mode": "state_plus_last_turn",
  "cache_hit": false,
  "latency_ms": 2100,
  "validated_violation_count": 0,
  "kb_version": "2026-07-26"
}
```

Không ghi mặc định:

- câu hỏi đầy đủ;
- câu trả lời đầy đủ;
- IP thô;
- CCCD, hộ chiếu, email, số điện thoại của người dùng.

Dashboard cần có:

- route distribution;
- smart model share;
- token/request;
- cost/successful answer;
- cache hit;
- abstention rate;
- user feedback;
- violations;
- latency p50/p95.

---

## 16. Kịch bản tối ưu token tham chiếu

Giả định 1.000 câu hỏi:

- 40% L0: không token;
- 25% L1: chỉ lexical/embedding rất nhỏ;
- 30% L2: trung bình 2.500 token tổng;
- 5% L3: trung bình 5.000 token tổng.

Tổng tham chiếu mới khoảng 1,025 triệu token, so với khoảng 9 triệu token nếu mọi câu đều đi qua pipeline generation gần 9.000 token/câu. Mức giảm lý thuyết khoảng **88,6%**.

Đây là mục tiêu kiến trúc, không phải cam kết trước khi đo traffic thật. Mục tiêu nghiệm thu thực tế nên đặt:

- giai đoạn đầu: giảm ≥ 50%;
- sau L0/L1 + prompt modular: giảm ≥ 70%;
- mục tiêu tốt: 80–90% với traffic nhiều FAQ phổ biến.

---

## 17. Bộ test bắt buộc

### 17.1. Tích hợp iframe

- Direct embed URL.
- Allowed parent.
- Disallowed parent.
- READY handshake.
- Ask before ready → queue.
- Locale sync.
- Close/reopen preserving conversation.
- Parent navigation allowlist.
- Timeout and fallback.

### 17.2. UI

- Desktop Chrome/Edge.
- Mobile 320, 360, 390, 430 px.
- Keyboard navigation.
- Screen reader labels.
- Zoom 200%.
- Dark/forced contrast nếu hỗ trợ.
- Không double scroll.
- Safe area iPhone/Android.

### 17.3. Chatbot

- 92 FAQ canonical.
- Bộ regression hiện có của `bandocapt`.
- Câu hỏi địa chỉ.
- Câu hỏi người nước ngoài.
- Căn cước, cư trú, đăng ký xe.
- Follow-up ngắn.
- Multi-intent.
- Source conflict.
- Không có tài liệu.
- Prompt injection.
- PII.
- Việt/Anh/Trung/Hàn nếu hỗ trợ.

### 17.4. Token

Test assertion:

- L0 không gọi embedding/generation.
- L1 không gọi generation.
- L2 không quá 2 docs mặc định.
- Smart share không vượt config.
- Utility call count không vượt max.
- Output budget đúng mode.
- History state không phình quá giới hạn.

### 17.5. Bảo mật

- Không có secret trong frontend.
- Origin validation.
- CSP.
- Turnstile trong iframe.
- HMAC vẫn đúng vì iframe dùng origin `bandocapt`.
- XSS qua message và source.
- URL allowlist.
- Không `postMessage('*')`.
- Không cho top navigation tùy ý.

---

## 18. Tiêu chí nghiệm thu cuối cùng

### Tích hợp

- Chatbot AI thay FAQ trong giao diện chính.
- Nút, modal và nhận diện `capphutho` không bị phá.
- Global search vẫn hoạt động.
- Không đưa API key sang `capphutho`.
- Chỉ một backend RAG.
- FAQ fallback hoạt động.

### Chất lượng

- Không giảm điểm regression so với baseline.
- Không bịa phí, thời hạn, mẫu đơn, địa chỉ.
- Nguồn hiện đầy đủ.
- Khi thiếu nguồn phải abstain đúng.
- Feedback 👍/👎 hoạt động.

### Token/chi phí

- ≥ 40% request không dùng generation model.
- L3 ≤ 10% request.
- Input token L2 giảm ≥ 50%.
- Tổng token/request giảm ≥ 70% sau hoàn thiện Phase 7–9.
- Có số liệu usage thực, không chỉ ước lượng.

### Vận hành

- Feature flag rollback dưới một thay đổi config/commit.
- Có dashboard route/token/error.
- Có version corpus/prompt/model.
- Có tài liệu deploy và runbook sự cố.

---

## 19. Rủi ro và biện pháp

| Rủi ro | Biện pháp |
|---|---|
| CSP chặn iframe | Allowlist chính xác domain, test preview trước production |
| Turnstile lỗi trong iframe | Test nested iframe, loading state và FAQ fallback |
| Global search bị hỏng | Giữ FAQ/search engine trong Phase 1; không xóa controller cũ |
| Double header/scroll | Embed mode ẩn header nội bộ, parent giữ header |
| Catalog compare không hoạt động | Tắt trong embed Phase 1 hoặc chuyển thành link mới |
| FAQ cũ có fact lỗi thời | Candidate → review → approved preset; không import thẳng |
| Model Lite giảm chất lượng | Canary + regression + smart escalation |
| Router sai cấp độ | Shadow mode, log reason, manual sample review |
| Cache trả dữ liệu cũ | Key có `kb_version`, invalid khi corpus đổi |
| Smart model bị lạm dụng | Hard cap tỷ lệ, complexity rule và telemetry |
| Nhiều utility calls | `UTILITY_CALLS_MAX_PER_REQUEST`, gộp tasks |
| Model 3.x gây lỗi API | Migration riêng, bỏ deprecated params, adapter và rollback |

---

## 20. Thứ tự ưu tiên thực hiện

### Ưu tiên P0

1. Tạo `chat-embed.html` hoạt động.
2. Sửa build static.
3. CSP allowlist.
4. Lazy iframe tại `capphutho`.
5. Handshake + fallback.
6. Không làm hỏng global search.
7. Test Turnstile và streaming.

### Ưu tiên P1

1. Client profile/branding.
2. Locale sync.
3. 92 FAQ candidate + review.
4. Router shadow.
5. Token telemetry.

### Ưu tiên P2

1. L0/L1 structured answer.
2. Prompt modular.
3. Context trimming.
4. State history.
5. Lite/Smart routing.

### Ưu tiên P3

1. Persistent exact cache.
2. Utility consolidation.
3. Model 3.x A/B.
4. Chuẩn hóa widget cho các dự án khác.

---

## 21. Cấu hình vận hành khuyến nghị sau hoàn thiện

```env
# Integration
CHAT_EMBED_ENABLED=1
CHAT_CLIENT_PROFILES_ENABLED=1

# Router
CHAT_ROUTER_ENABLED=1
CHAT_ROUTER_MODE=deterministic
CHAT_STRUCTURED_ANSWER_ENABLED=1
SMART_ROUTE_MAX_PERCENT=10

# Models
LLM_UTILITY_MODEL=gemini-2.5-flash-lite
LLM_LITE_MODEL=gemini-2.5-flash-lite
LLM_SMART_MODEL=gemini-2.5-flash
LLM_FALLBACK_PROVIDER=deepseek

# Token budget
MAX_L2_CONTEXT_TOKENS=2500
MAX_L3_CONTEXT_TOKENS=4500
MAX_HISTORY_STATE_TOKENS=180
MAX_UTILITY_CALLS_PER_REQUEST=1

# Quality
RAG_FAIL_CLOSED=1
GROUNDEDNESS_SAMPLE_RATE=0.10
GROUNDEDNESS_ALWAYS_FOR_SMART=1
GROUNDEDNESS_ALWAYS_FOR_LOW_CONFIDENCE=1

# Cache
FAQ_PRESET_CACHE_ENABLED=1
EXACT_RESPONSE_CACHE_ENABLED=1
SEMANTIC_CACHE_ENABLED=0
KB_VERSION=2026-07-26
```

---

## 22. Kết luận thi công

Phương án tối ưu không phải “đưa nguyên chatbot sang dự án mới”, mà là:

1. **Tách chatbot của `bandocapt` thành một surface nhúng độc lập.**
2. **Giữ `capphutho` nhẹ, chỉ làm client và fallback.**
3. **Dùng FAQ đã duyệt và dữ liệu cấu trúc để trả lời 0 token.**
4. **Dùng Flash-Lite cho câu thông thường.**
5. **Chỉ dùng model mạnh cho tối đa 5–10% câu thực sự phức tạp.**
6. **Rút prompt và context theo đúng intent thay vì gửi toàn bộ hướng dẫn/tài liệu.**
7. **Đo usage thực và triển khai canary, không đổi model theo cảm tính.**

Đây là hướng vừa ít thay đổi hai dự án, vừa tạo nền tảng để sau này nhúng cùng chatbot vào nhiều cổng thông tin Công an cấp xã/phường mà không nhân bản backend, dữ liệu hoặc chi phí vận hành.
