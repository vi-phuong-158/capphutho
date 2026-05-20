# Hướng Dẫn Bảo Mật — Cổng Thông Tin Số Công An Phường Phú Thọ

> **Dành cho**: Lập trình viên bảo trì và quản trị viên dự án  
> **Cập nhật lần cuối**: 2026-05-18  
> **Phiên bản**: 1.0

---

## Mục Lục

1. [Tổng quan rủi ro](#1-tổng-quan-rủi-ro)
2. [Tấn công XSS — Tiêm mã độc vào trang web](#2-tấn-công-xss--tiêm-mã-độc-vào-trang-web)
3. [Tấn công qua CDN bên thứ ba](#3-tấn-công-qua-cdn-bên-thứ-ba)
4. [Clickjacking — Lừa người dùng nhấp vào nội dung giả](#4-clickjacking--lừa-người-dùng-nhấp-vào-nội-dung-giả)
5. [Tấn công Phishing — Giả mạo trang web](#5-tấn-công-phishing--giả-mạo-trang-web)
6. [Rò rỉ thông tin nhạy cảm](#6-rò-rỉ-thông-tin-nhạy-cảm)
7. [Content Security Policy (CSP) — Lá chắn toàn diện](#7-content-security-policy-csp--lá-chắn-toàn-diện)
8. [Checklist trước khi deploy](#8-checklist-trước-khi-deploy)
9. [Khi phát hiện sự cố](#9-khi-phát-hiện-sự-cố)

---

## 1. Tổng Quan Rủi Ro

Đây là website **tĩnh** (HTML/CSS/JavaScript thuần), không có server backend hay cơ sở dữ liệu. Điều này có nghĩa:

**Ưu điểm bảo mật:**
- Không có SQL Injection (vì không có database)
- Không có Server-Side code injection
- Không có lộ thông tin đăng nhập người dùng (vì không có tài khoản)

**Rủi ro còn tồn tại:**
- Tấn công XSS nếu xử lý input không cẩn thận
- Bị giả mạo (phishing) — kẻ xấu tạo bản sao trang
- Tài nguyên từ CDN bên ngoài bị thay thế bằng mã độc
- Người dùng bị lừa click vào nội dung ẩn (clickjacking)

---

## 2. Tấn Công XSS — Tiêm Mã Độc Vào Trang Web

### XSS là gì?

**Tưởng tượng thế này:** Kẻ xấu gõ vào ô tìm kiếm của bạn một đoạn mã như:
```
<script>alert('Bạn đã bị hack!')</script>
```
Nếu trang web không xử lý đúng, đoạn mã trên sẽ *chạy thật* trong trình duyệt của người dùng khác — cho phép kẻ tấn công đánh cắp dữ liệu, chuyển hướng trang, hoặc hiển thị nội dung giả.

### Dự án hiện đang làm đúng ✅

**Chatbot xử lý input an toàn** — file `js/chatbot.js` có hàm `escapeHtml()` chuyển đổi ký tự nguy hiểm thành dạng vô hại trước khi hiển thị:

```javascript
// Ví dụ: "<script>" → "&lt;script&gt;" (hiển thị như text, không chạy)
escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
```

Input người dùng được gán qua `textContent` (an toàn) thay vì `innerHTML` (nguy hiểm).

### Quy tắc bắt buộc khi viết code mới

**KHÔNG BAO GIỜ làm thế này với dữ liệu từ người dùng:**
```javascript
// ❌ NGUY HIỂM — kẻ xấu có thể tiêm mã độc
element.innerHTML = userInput;
document.write(userInput);
eval(userInput);
```

**LUÔN LUÔN làm thế này:**
```javascript
// ✅ AN TOÀN — chỉ hiển thị text thuần, không chạy code
element.textContent = userInput;

// ✅ AN TOÀN — nếu PHẢI dùng innerHTML, escape trước
element.innerHTML = escapeHtml(userInput);
```

### Trường hợp cần sửa trong dự án

Một số chỗ dùng `innerHTML` với chuỗi cố định (hiện an toàn, nhưng nên refactor):

- `modules/nguoi-nuoc-ngoai.html` dòng 743–745
- `index.html` dòng 1518–1520

Cách sửa an toàn hơn:
```javascript
// ❌ Hiện tại
span.innerHTML = '<i class="fa-solid fa-circle-check"></i> &nbsp;Thu gọn hướng dẫn';

// ✅ Nên đổi thành
const icon = document.createElement('i');
icon.className = 'fa-solid fa-circle-check';
const text = document.createTextNode(' Thu gọn hướng dẫn');
span.replaceChildren(icon, text);
```

---

## 3. Tấn Công Qua CDN Bên Thứ Ba

### Nguy cơ là gì?

Dự án tải font và icon từ máy chủ nước ngoài:
- Google Fonts: `fonts.googleapis.com`
- FontAwesome: `cdnjs.cloudflare.com`

**Kịch bản tấn công:** Nếu một trong các máy chủ này bị hacker kiểm soát, họ có thể thay file CSS/JS bằng phiên bản chứa mã độc — và tất cả trình duyệt truy cập trang của bạn sẽ tải mã độc đó về.

### Giải pháp: Subresource Integrity (SRI)

SRI là một đoạn mã kiểm tra "chữ ký số" của file tải về. Nếu file bị thay đổi dù chỉ một ký tự, trình duyệt sẽ từ chối tải và báo lỗi — bảo vệ người dùng hoàn toàn.

**FontAwesome đã có SRI ✅** — xem `index.html` dòng 18:
```html
<link rel="stylesheet" 
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
  integrity="sha512-iecdLmaskl7CV..." 
  crossorigin="anonymous">
```

**Google Fonts CHƯA có SRI ❌** — cần bổ sung:
```html
<!-- Xóa 3 dòng Google Fonts hiện tại và thay bằng: -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap"
  rel="stylesheet"
  crossorigin="anonymous">
```

> **Lưu ý:** Google Fonts thay đổi URL động nên không hỗ trợ SRI trực tiếp. Giải pháp tốt nhất là **tải font về và host cùng dự án** (xem phần dưới).

**Tải font về local (khuyến nghị):**
1. Vào [google-webfonts-helper.herokuapp.com](https://gwfh.mranftl.com/fonts) — tải file font `Be Vietnam Pro`
2. Đặt vào thư mục `fonts/`
3. Xóa thẻ Google Fonts, thêm vào CSS:
```css
@font-face {
    font-family: 'Be Vietnam Pro';
    src: url('../fonts/be-vietnam-pro-v10-vietnamese-regular.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
}
```

---

## 4. Clickjacking — Lừa Người Dùng Nhấp Vào Nội Dung Giả

### Clickjacking là gì?

**Hình dung thế này:** Kẻ xấu tạo một trang web giả, nhúng trang của bạn vào bên trong (qua `<iframe>`) nhưng làm nó trong suốt, vô hình. Phía trước là nút "Nhận quà miễn phí" — nhưng thực ra người dùng đang nhấp vào trang của bạn phía sau. Đây là cách kẻ tấn công lừa người dùng thực hiện hành động mà họ không hay biết.

### Giải pháp: HTTP Header `X-Frame-Options`

Trên Vercel (nền tảng hiện tại), thêm file `vercel.json` vào thư mục gốc:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        }
      ]
    }
  ]
}
```

**Giải thích từng header:**
| Header | Tác dụng |
|--------|----------|
| `X-Frame-Options: DENY` | Ngăn trang bị nhúng vào iframe của trang khác |
| `X-Content-Type-Options: nosniff` | Ngăn trình duyệt đoán nhầm loại file (tránh chạy JS giả dạng ảnh) |
| `Referrer-Policy` | Kiểm soát thông tin "đến từ đâu" khi click link |
| `Permissions-Policy` | Tắt quyền camera/mic/GPS không cần thiết |

### Sandbox cho Google Maps iframe

File `index.html` dòng 1400 — thêm thuộc tính `sandbox`:

```html
<!-- ❌ Hiện tại -->
<iframe src="https://www.google.com/maps/embed?..." allowfullscreen loading="lazy">

<!-- ✅ Nên đổi thành -->
<iframe src="https://www.google.com/maps/embed?..."
  allowfullscreen
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  sandbox="allow-same-origin allow-scripts allow-popups allow-presentation">
</iframe>
```

---

## 5. Tấn Công Phishing — Giả Mạo Trang Web

### Phishing là gì?

Kẻ xấu tạo một bản sao y hệt trang của bạn tại địa chỉ khác (ví dụ: `capphutho-vn.com` thay vì `capphutho.vn`) nhằm lừa người dùng cung cấp thông tin cá nhân.

### Cách phòng chống

**1. Đăng ký tên miền chính thức** và luôn dùng HTTPS — Vercel đã tự động bật HTTPS ✅

**2. Thêm meta canonical** vào tất cả trang để báo cho Google biết địa chỉ thật:
```html
<!-- Thêm vào <head> của index.html và tất cả module pages -->
<link rel="canonical" href="https://capphutho.vercel.app/">
```
*(Thay URL bằng địa chỉ thật của dự án)*

**3. Không đặt link đến trang ngoài mà không kiểm tra** — tất cả link bên ngoài hiện đã có `rel="noopener noreferrer"` ✅

**4. Thêm thông báo rõ ràng trên trang** về địa chỉ chính thức, giúp người dùng phân biệt thật/giả.

---

## 6. Rò Rỉ Thông Tin Nhạy Cảm

### Những gì KHÔNG được commit lên git

Tạo (hoặc cập nhật) file `.gitignore` để đảm bảo:

```gitignore
# Secrets và credentials
.env
.env.local
.env.production
*.pem
*.key
secrets.json

# Thông tin debug không cần thiết
*.log
```

### Kiểm tra xem đã lỡ commit secret chưa

```bash
# Tìm từ khóa nguy hiểm trong toàn bộ lịch sử git
git log --all --full-history -- "*.env"
git grep -i "password\|api_key\|secret\|token" $(git log --pretty=format:%H)
```

Nếu phát hiện secret đã commit — **đổi secret đó ngay lập tức** vì xóa khỏi git không xóa được khỏi lịch sử.

### Analytics và Privacy

File `index.html` dòng 1351 có tích hợp **Vercel Analytics** — thu thập dữ liệu truy cập ẩn danh. Đây là dịch vụ hợp pháp nhưng cần lưu ý:

- Nếu website phục vụ công dân, nên có **chính sách quyền riêng tư** mô tả dữ liệu nào được thu thập
- Nếu không cần analytics, xóa đoạn script này để tăng tốc và tăng quyền riêng tư cho người dùng

---

## 7. Content Security Policy (CSP) — Lá Chắn Toàn Diện

### CSP là gì?

CSP là "danh sách trắng" — bạn khai báo trình duyệt **chỉ được** tải tài nguyên từ những nguồn bạn tin tưởng. Nếu trang bị XSS và kẻ tấn công cố tải script từ server lạ, CSP sẽ chặn lại.

### Cách thêm CSP cho dự án này

Thêm vào `<head>` của **tất cả** file HTML (index.html và tất cả modules/\*.html):

```html
<meta http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
    img-src 'self' https: data:;
    font-src https://fonts.gstatic.com https://cdnjs.cloudflare.com;
    frame-src https://www.google.com;
    connect-src 'none';
    object-src 'none';
    base-uri 'self';
  ">
```

> **Lưu ý:** Cần có `'unsafe-inline'` vì dự án dùng `<style>` và `onclick` inline. Về lâu dài, nên chuyển tất cả style ra file `.css` riêng và dùng `addEventListener()` để loại bỏ `'unsafe-inline'` — khi đó CSP sẽ mạnh hơn nhiều.

### Kiểm tra CSP hoạt động đúng không

Sau khi thêm CSP, mở DevTools (F12) → tab **Console** → tải lại trang. Nếu thấy lỗi `Content Security Policy` thì cần điều chỉnh whitelist. Dùng [CSP Evaluator](https://csp-evaluator.withgoogle.com/) để kiểm tra.

---

## 8. Checklist Trước Khi Deploy

Chạy qua danh sách này mỗi khi có thay đổi lớn:

### Bảo mật Code

- [ ] Không có `eval()`, `Function()`, `document.write()` trong code mới
- [ ] Tất cả input người dùng đều qua `escapeHtml()` hoặc dùng `textContent`
- [ ] Không có hardcoded password, API key, hay token trong source code
- [ ] Tất cả link `target="_blank"` có `rel="noopener noreferrer"`

### Tài Nguyên Bên Ngoài

- [ ] Tất cả CDN resources có `integrity` (SRI) attribute
- [ ] Google Maps iframe có `sandbox` attribute
- [ ] Không thêm CDN mới mà không kiểm tra độ tin cậy

### Headers & Cấu Hình

- [ ] File `vercel.json` có đủ security headers (`X-Frame-Options`, `X-Content-Type-Options`)
- [ ] CSP meta tag có trong tất cả trang HTML
- [ ] HTTPS đang hoạt động (Vercel tự động bật)

### Kiểm Tra Thủ Công (15 phút)

- [ ] Mở DevTools Console → không có lỗi CSP sau khi thêm
- [ ] Thử nhập `<script>alert(1)</script>` vào ô tìm kiếm chatbot → phải hiển thị như text, không alert
- [ ] Kiểm tra [securityheaders.com](https://securityheaders.com) với URL của dự án

---

## 9. Khi Phát Hiện Sự Cố

### Dấu hiệu bị tấn công

- Trang hiển thị nội dung lạ mà bạn không đặt
- Người dùng báo bị chuyển hướng đến trang lạ
- Console hiển thị request đến domain không quen
- Vercel dashboard báo traffic bất thường

### Quy Trình Xử Lý

**Bước 1 — Kiểm tra ngay (5 phút)**
```bash
# Xem commit gần nhất có gì bất thường
git log --oneline -10

# Kiểm tra file có bị sửa đổi ngoài ý muốn không
git status
git diff HEAD
```

**Bước 2 — Cô lập**
- Nếu phát hiện file bị thay đổi trái phép: tạm thời đặt trang ở chế độ maintenance trên Vercel
- Đổi ngay mật khẩu GitHub và Vercel nếu nghi bị lộ credentials

**Bước 3 — Khôi phục**
```bash
# Quay về phiên bản sạch gần nhất
git log --oneline   # tìm commit ID sạch
git checkout <commit-id> -- .   # khôi phục file
git commit -m "fix: revert to clean state after security incident"
git push
```

**Bước 4 — Điều tra nguồn gốc**
- Xem Vercel Access Logs tìm request bất thường
- Kiểm tra GitHub Activity Log xem có đăng nhập lạ không
- Đổi tất cả credentials liên quan (GitHub, Vercel, email)

**Bước 5 — Báo cáo**
- Ghi lại sự cố, thời gian phát hiện, biện pháp đã xử lý
- Nếu dữ liệu người dùng bị ảnh hưởng → báo cáo theo quy định bảo mật thông tin nhà nước

---

## Tóm Tắt Ưu Tiên Hành Động

| Mức Độ | Việc Cần Làm | File Cần Sửa |
|--------|--------------|--------------|
| 🔴 Quan trọng | Thêm `vercel.json` với security headers | Tạo mới `vercel.json` |
| 🔴 Quan trọng | Thêm CSP meta tag | Tất cả `*.html` |
| 🟡 Nên làm | Thêm `sandbox` cho Google Maps iframe | `index.html` dòng 1400 |
| 🟡 Nên làm | Host font local (xóa Google Fonts CDN) | Tất cả `*.html` |
| 🟢 Cải thiện | Thay `innerHTML` bằng `createElement` | `nguoi-nuoc-ngoai.html`, `index.html` |
| 🟢 Cải thiện | Chuẩn hóa `maxlength` input tìm kiếm | `index.html`, `nguoi-nuoc-ngoai.html` |

---

*Tài liệu này được tạo dựa trên kết quả đánh giá bảo mật ngày 2026-05-18. Cập nhật lại sau mỗi lần có thay đổi lớn về kiến trúc hoặc thêm tính năng mới.*
