# Nghiệm Thu Module "Thủ Tục Cấp Tỉnh" (PR #147)

Tài liệu nghiệm thu cho module `modules/thu-tuc-cap-tinh.html` và các thay đổi liên quan
(card trang chủ, chatbot routing, dữ liệu FAQ đa ngôn ngữ, regression tests).

- **Branch:** `feat/provincial-procedures`
- **Ngày kiểm chứng nguồn:** 2026-08-07
- **Phạm vi:** Chỉ danh mục thủ tục phổ biến thuộc thẩm quyền Công an cấp tỉnh. Không thay backend, không đổi kiến trúc chatbot, không deploy production.

---

## 1. Scope

Module gồm 6 nhóm thủ tục:

1. **Hộ chiếu & Xuất nhập cảnh** (cấp hộ chiếu phổ thông trong nước).
2. **Giấy phép lái xe (GPLX)** (cấp, đổi, cấp lại; sát hạch theo phân cấp).
3. **Phiếu Lý lịch tư pháp (LLTP)**.
4. **Người nước ngoài** (thị thực, thẻ tạm trú, gia hạn tạm trú).
5. **Chứng nhận đủ điều kiện về ANTT**.
6. **Đăng ký xe cấp tỉnh**.

Các thay đổi kèm theo:
- 01 card "Thủ Tục Cấp Tỉnh" trên trang chủ (`index.html`), không trùng lặp.
- Category `cap_tinh` trong `faq_db.js` / `faq_i18n.js` (vi/en/zh-CN) có `url` để global search điều hướng tới module.
- CTA "Hỏi Trợ lý AI" trong module điều hướng về `index.html?openChat=1` thay vì nhúng chatbot.

---

## 2. Official sources

| Nhóm | Tên TTHC / Nội dung | Mã TTHC | Cấp | Cơ quan | Nguồn | Ngày kiểm chứng |
| ---- | ------------------- | ------- | --- | ------- | ----- | --------------- |
| Hộ chiếu | Cấp hộ chiếu phổ thông ở trong nước | ma-thu-tuc=29497 (deep-link DVC) | Tỉnh | Phòng QLXNC - CA cấp tỉnh | dichvucong.bocongan.gov.vn | 2026-08-07 |
| GPLX | Sát hạch, cấp/đổi/cấp lại GPLX (quy định mới) | 61616 / 3.000346 | Theo phân cấp CSGT | Cục CSGT (cơ quan thực hiện DVC); Phòng CSGT tổ chức sát hạch; tiếp nhận theo phân cấp | Thông tư 108/2026/TT-BCA; csgt.bocongan.gov.vn; congan.phutho.gov.vn; congan.cantho.gov.vn; congan.angiang.gov.vn | 2026-08-07 |
| LLTP | Cấp Phiếu LLTP cho công dân VN, người nước ngoài cư trú tại VN | ma-thu-tuc=61555 (DVC) / 3.000333 | Tỉnh | Phòng Hồ sơ nghiệp vụ - Công an tỉnh Phú Thọ | dichvucong.bocongan.gov.vn | 2026-08-07 |
| Người nước ngoài | Thị thực, thẻ tạm trú, gia hạn tạm trú | — | Tỉnh | Phòng QLXNC - CA cấp tỉnh | dichvucong.bocongan.gov.vn | 2026-08-07 |
| ANTT | Giấy chứng nhận đủ điều kiện về ANTT | — | Cục / Tỉnh / Xã (theo loại hình) | Cục CSQLHC về TTXH / CA tỉnh / CA xã | dichvucong.bocongan.gov.vn | 2026-08-07 |
| Đăng ký xe | Đăng ký, cấp biển số (cấp lần đầu, sang tên, đổi/cấp lại) | ma-thu-tuc=26120 (deep-link "cấp lần đầu") | Tỉnh / Xã (theo phân cấp) | Phòng CSGT / CA cấp xã | dichvucong.bocongan.gov.vn | 2026-08-07 |

**Ghi chú GPLX quá hạn (Thông tư 108/2026/TT-BCA, hiệu lực 01/7/2026):**
- Quá hạn **dưới 30 ngày**: cấp lại, **không** phải sát hạch.
- Quá hạn **từ đủ 30 ngày đến dưới 01 năm**: sát hạch lại **lý thuyết**.
- Quá hạn **từ đủ 01 năm trở lên**: sát hạch lại **đầy đủ** (lý thuyết + thực hành).

**Ghi chú cơ quan GPLX:** "Cơ quan thực hiện" của thủ tục DVC là Cục CSGT; **Phòng CSGT** tổ chức sát hạch; hồ sơ được tiếp nhận theo phân cấp (trực tuyến / bưu chính / Công an cấp xã). Do đó UI không khẳng định "Phòng CSGT cấp tỉnh thực hiện toàn bộ thủ tục".

**⚠️ Chênh lệch nguồn GPLX (không được "sửa ngược"):** Tại thời điểm kiểm chứng, trang thủ tục `61616` trên Cổng DVC Bộ Công an vẫn còn hiển thị một số căn cứ theo **Thông tư 12/2025/TT-BCA**, trong khi Công an tỉnh Phú Thọ (congan.phutho.gov.vn, công bố 04/7/2026) đã áp dụng **Thông tư 108/2026/TT-BCA** thay thế, hiệu lực từ 01/7/2026. PR cố ý dùng nguồn Phú Thọ mới hơn cho các mốc "quá hạn". **Không cập nhật lùi về Thông tư 12/2025** khi thấy Cổng DVC còn dữ liệu cũ; chỉ đổi khi có văn bản mới hơn 108/2026/TT-BCA.

---

## 3. Decisions

- **Hộ chiếu:** Không tạo một TTHC mới tên "hộ chiếu hết hạn/hư hỏng"; các trường hợp cấp lần đầu / mất / hỏng / hết hạn đều thuộc thủ tục "Cấp hộ chiếu phổ thông ở trong nước".
- **GPLX quá hạn:** Không dùng quy tắc chung "hết hạn → đổi, không sát hạch". Phân biệt theo **thời gian quá hạn** theo Thông tư 108/2026/TT-BCA. Kèm hướng dẫn kiểm tra trường hợp cụ thể.
- **GPLX cơ quan:** Diễn đạt phân biệt "cơ quan thực hiện DVC" (Cục CSGT), "tổ chức sát hạch" (Phòng CSGT) và "tiếp nhận theo phân cấp".
- **Đăng ký xe:** Không dùng quy tắc đơn giản theo loại phương tiện (ô tô = tỉnh, xe máy = xã...) để suy đoán thẩm quyền. Hướng người dân chọn đúng TTHC ghi "thực hiện tại cấp tỉnh" trên Cổng DVC.
- **ANTT:** Giữ 3 cấp Cục / Tỉnh / Xã; không phục hồi "cấp huyện" hay phân loại theo quy mô (khách sạn lớn / nhà nghỉ nhỏ). Khi không rõ, hướng người dân tra cứu đúng loại hình hoặc hỏi Trợ lý AI.
- **LLTP tại Phú Thọ:** Phòng Hồ sơ nghiệp vụ - Công an tỉnh Phú Thọ thực hiện (đã sửa từ vòng trước, giữ nguyên).
- **CTA AI:** Module không nhúng `chatbot-embed-client.js`; CTA điều hướng về `index.html?openChat=1`. Trang chủ đọc query, mở chat, ưu tiên AI, fallback FAQ, dọn query bằng `history.replaceState()`.

---

## 4. Existing module review

| Module | Tình trạng | Phân loại | Hành động |
| ------ | ---------- | --------- | --------- |
| `modules/an-ninh.html` | Dùng 3 cấp cơ bản, nhưng còn heuristic "hộ kinh doanh cá thể, nhà nghỉ nhỏ" khi mô tả nơi nộp (dòng ~97). Không có "cấp huyện". | **P2** | Document. Không sửa trong PR này (ngoài scope; không dẫn tới nộp sai nơi nghiêm trọng vì cơ sở nhỏ nộp tại CA cấp xã là phù hợp phân cấp mới). Nên rà lại theo loại hình cụ thể ở PR sau. |
| `modules/dang-ky-xe.html` | Còn dẫn "Thông tư 24/2023/TT-BCA" (dòng ~137) — có thể đã bị thay thế/điều chỉnh bởi văn bản mới hơn. | **P2** | Document. Cần xác minh lại số hiệu văn bản còn hiệu lực ở PR sau. Không kết luận "hoàn toàn phù hợp". |
| `modules/nguoi-nuoc-ngoai.html` | Module khai báo tạm trú trực tuyến cho cơ sở lưu trú. Không mâu thuẫn với module cấp tỉnh (thị thực/thẻ tạm trú cá nhân). | **P2** | Document. Không cần sửa. |

Không phát hiện P0/P1 trong 3 module cũ (không có trường hợp trực tiếp làm người dân nộp sai nơi cần sửa gấp trong PR này).

---

## 5. Tests

Lệnh chạy:

```bash
npm ci
npm run test:chat-embed
node --test tests/provincial-procedures.test.js
```

- `tests/chatbot-embed-client.test.js`: regression cho chatbot embed adapter (chạy qua `npm run test:chat-embed`).
- `tests/provincial-procedures.test.js`: đọc **file production thật** (`index.html`, `modules/thu-tuc-cap-tinh.html`, `faq_db.js`, `faq_i18n.js`, `search_engine.js`) — kiểm tra card trang chủ, 6 nhóm module, external links (HTTPS + `target=_blank` + `rel=noopener noreferrer`), search production data, i18n `cap_tinh` (vi/en/zh-CN) + key `card.provincial.*`, và CTA regression (module KHÔNG load `chatbot-embed-client.js`, KHÔNG còn `DVC_AI_Chat`, dùng `openChat=1`).

Kết quả thực tế (node --test, không dùng `npm test` placeholder làm cổng nghiệm thu):

- `test:chat-embed`: **8/8 pass, 0 fail**
- `provincial-procedures` (A–F): **8/8 pass, 0 fail**
- `tests/verify_security.py`: không chạy được do thiếu module `playwright`; xác minh tĩnh `maxlength` global=100 / chat=200 (đúng, không thay đổi).

Manual QA: xem mục Known limitations và báo cáo cuối.

---

## 6. Known limitations

- Module cấp tỉnh chỉ là **danh mục thủ tục phổ biến**, không thay thế Cổng DVC Bộ Công an.
- Thẩm quyền cụ thể (đăng ký xe, ANTT) có thể phụ thuộc loại hình/hồ sơ/trường hợp; UI dùng wording trung tính và hướng người dân chọn đúng TTHC trên Cổng DVC.
- Các mốc GPLX quá hạn trích theo Thông tư 108/2026/TT-BCA; nếu văn bản được sửa đổi, cần cập nhật lại con số.
- Unit test không validate mạng (không kiểm tra external link còn sống); chỉ kiểm tra dạng URL an toàn.
- P2 ở `an-ninh.html` / `dang-ky-xe.html` chưa xử lý trong PR này (ngoài scope), đã ghi nhận để PR sau.
