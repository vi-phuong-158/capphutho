/**
 * build_pptx.js — Slide thuyết trình SÁNG KIẾN
 *   "Cổng thông tin số và Trợ lý ảo hỗ trợ tra cứu thủ tục hành chính"
 *   — Công an phường Phú Thọ (tác giả: Nguyễn Minh Hiếu).
 *
 * Nhận diện riêng (đặc sắc Phú Thọ — Đất Tổ Hùng Vương):
 *   - Tông Đỏ – Vàng Công an (bám web app: --primary #C41E3A, --accent #FFD700)
 *   - Biểu tượng MẶT TRỜI TRỐNG ĐỒNG ĐÔNG SƠN làm dấu ấn xuyên suốt (tự vẽ SVG)
 *   - Dải chân trang đơn vị + số trang; nhiều layout riêng: cơ sở pháp lý,
 *     so sánh Trước/Sau, chỉ số tác động, lộ trình, trưng bày điện thoại.
 *
 * Cài đặt:  npm install pptxgenjs jszip react react-dom sharp react-icons
 * Chạy:     node build_pptx.js
 * Ảnh UI đặt trong ./shots (chụp bằng capture_shots.js). Thiếu thì vẽ placeholder.
 */

"use strict";
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");

// ============================================================ CONFIG
const CONFIG = {
  outFile: "Thuyet-trinh-Cong-Thong-Tin-So.pptx",
  author: "Nguyễn Minh Hiếu — Công an phường Phú Thọ",
  title: "Cổng thông tin số và Trợ lý ảo hỗ trợ tra cứu thủ tục hành chính",
  shotsDir: path.join(__dirname, "shots"),
  logo: path.join(__dirname, "logo.png"),
  font: "Segoe UI",
  unit: "CÔNG AN PHƯỜNG PHÚ THỌ",
  footTag: "SÁNG KIẾN CẢI CÁCH HÀNH CHÍNH · 2026",
};

// Bảng màu — Đỏ – Vàng Công an / Đất Tổ
const THEME = {
  deep: "7A0010", deep2: "4E0008",
  primary: "C41E3A", primaryDark: "8B0000",
  green: "1F7A1F", lime: "FFD700", gold2: "F6C700",
  mintTxt: "FFD700", mint2: "FFE9A8",
  danger: "B00020", warn: "C2410C", muted2: "9CA3AF",
  paper: "FFFFFF", ink: "1F2937", slate: "374151", muted: "6B7280",
  cardBg: "FFF4F2", cardBd: "F3D2D7", cardDark: "5F0D14",
  greyBg: "F1F1F1", greyBd: "D8D8D8",
};

// ============================================================ CONTENT
const CONTENT = {
  title: {
    type: "title",
    kicker: "CÔNG AN TỈNH PHÚ THỌ · CÔNG AN PHƯỜNG PHÚ THỌ",
    title: "CỔNG THÔNG TIN SỐ\n& TRỢ LÝ ẢO",
    subtitle: "Hỗ trợ tra cứu thủ tục hành chính — đẩy mạnh cải cách hành chính",
    chips: ["Quét QR", "Không cài đặt", "Chi phí ~0 đồng", "Phục vụ 24/7"],
    author: CONFIG.author,
    notes: "Kính thưa các đồng chí trong Hội đồng. Tôi xin trình bày sáng kiến Cổng thông tin số và Trợ lý ảo hỗ trợ tra cứu thủ tục hành chính tại Công an phường Phú Thọ. Đây là giải pháp chuyển đổi số xuất phát trực tiếp từ thực tiễn công tác tiếp dân hằng ngày: người dân chỉ cần quét một mã QR, không cần cài đặt bất kỳ ứng dụng nào, là đã có ngay một trợ lý hướng dẫn thủ tục phục vụ 24/7. Toàn bộ sáng kiến do cán bộ đơn vị tự nghiên cứu và lập trình, chi phí gần như bằng không, một sản phẩm công nghệ của người Công an cơ sở, ngay trên quê hương Đất Tổ Hùng Vương.",
  },
  slides: [
    {
      type: "legal",
      kicker: "Cơ sở pháp lý & định hướng", title: "Bám sát chủ trương chuyển đổi số",
      docs: [
        ["scroll", "Nghị quyết 57-NQ/TW", "22/12/2024 — Bộ Chính trị", "Đột phá phát triển khoa học công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia."],
        ["contract", "Kế hoạch 342/KH-CAT-PV01", "19/01/2026 — Công an tỉnh Phú Thọ", "Triển khai nghiên cứu sáng kiến nâng cao chất lượng chuyên môn, đẩy mạnh cải cách hành chính 2026."],
      ],
      footer: "Chỉ số PAR INDEX 2026: ứng dụng AI hỗ trợ cá nhân thực hiện thủ tục là TIÊU CHÍ BẮT BUỘC.",
      notes: "Sáng kiến bám sát hai văn bản định hướng. Một là Nghị quyết 57 của Bộ Chính trị về đột phá phát triển khoa học công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia. Hai là Kế hoạch 342 của Công an tỉnh Phú Thọ về nghiên cứu sáng kiến, nâng cao chất lượng chuyên môn và đẩy mạnh cải cách hành chính năm 2026. Đặc biệt, theo Chỉ số cải cách hành chính PAR INDEX năm 2026, việc ứng dụng trí tuệ nhân tạo hỗ trợ người dân thực hiện thủ tục đã trở thành tiêu chí bắt buộc, nên việc xây dựng cổng là rất cấp thiết.",
    },
    {
      type: "bigStat", dark: true,
      kicker: "Thực trạng trước khi có sáng kiến", stat: "Hàng chục",
      statSub: "lượt/ngày người dân đến hoặc gọi điện chỉ để hỏi thủ tục",
      items: [
        "Hướng dẫn thủ công: trực tiếp, điện thoại, tờ rơi — tốn thời gian trực ban",
        "Câu hỏi lặp lại: cần giấy tờ gì · bao lâu · phí bao nhiêu",
        "Người dân đi lại nhiều lần do chuẩn bị thiếu hồ sơ",
      ],
      icon: "comments",
      footer: "Quy định liên tục cập nhật (Luật Căn cước 2023, Thông tư 24/2023…) càng làm tăng nhu cầu tra cứu chính thống.",
      notes: "Trong công tác tiếp dân, nhu cầu hỏi và giải quyết thủ tục hành chính rất lớn. Trung bình mỗi ngày, trực ban Công an phường tiếp nhận hàng chục lượt người dân đến tận nơi hoặc gọi điện, chỉ để hỏi những việc lặp đi lặp lại: cần giấy tờ gì, mất bao lâu, lệ phí bao nhiêu. Việc hướng dẫn chủ yếu thủ công nên rất tốn thời gian của cán bộ; còn người dân thì hay đi lại nhiều lần do chuẩn bị thiếu hồ sơ, sinh tâm lý e ngại và giảm sự hài lòng.",
    },
    {
      type: "compare",
      kicker: "Sáng kiến đối chứng", title: "Từ tờ giấy tĩnh → cổng số tương tác",
      before: { title: "TRƯỚC ĐÂY", icon: "scroll", items: [
        "Bảng niêm yết bằng giấy tại trụ sở",
        "Gửi file PDF / Word vào nhóm Zalo",
        "Thiếu tương tác · chữ nhỏ khó đọc",
        "Khó tìm đúng trọng tâm thủ tục cần",
      ]},
      after: { title: "SÁNG KIẾN MỚI", icon: "mobile", items: [
        "Cổng số tương tác, tối ưu cho điện thoại",
        "Hỏi – đáp tức thì với Trợ lý ảo",
        "Tóm tắt ngắn gọn, dễ hiểu",
        "Nút nộp hồ sơ online ngay trên cổng",
      ]},
      notes: "Trước đây, đơn vị đã thử tuyên truyền thủ tục qua bảng niêm yết giấy tại trụ sở và gửi file PDF, Word vào các nhóm Zalo khu dân cư. Nhưng cách làm đó thiếu tính tương tác, chữ nhỏ khó đọc trên điện thoại, bà con khó tìm đúng trọng tâm thủ tục mình cần. Sáng kiến lần này là bước nâng cấp toàn diện: từ tờ giấy tĩnh sang một cổng số tương tác, tra cứu được, hỏi là đáp ngay, khắc phục triệt để những hạn chế cũ.",
    },
    {
      type: "steps",
      kicker: "Cách vận hành", title: "Web App — quét là dùng, không cài đặt",
      lead: "Truy cập qua trình duyệt hoặc quét mã QR. Ba bước tự nhiên cho người dân.",
      steps: [
        ["qrcode", "1. Quét mã QR", "Mở cổng ngay, không cần cài ứng dụng."],
        ["robot", "2. Tra cứu / hỏi Trợ lý ảo", "Tìm lĩnh vực hoặc gõ câu hỏi tự nhiên."],
        ["check", "3. Nộp hồ sơ online", "Liên kết thẳng tới Cổng DVC Bộ Công an."],
      ],
      notes: "Cổng hoạt động dưới dạng một Web App, mở bằng trình duyệt hoặc quét mã QR, không phải cài đặt ứng dụng. Người dân chỉ qua ba bước rất tự nhiên: quét mã QR để vào cổng; tra cứu lĩnh vực cần làm hoặc gõ câu hỏi cho Trợ lý ảo; rồi bấm nút nộp hồ sơ trực tuyến ngay trên Cổng dịch vụ công Bộ Công an. Đơn giản đến mức người lớn tuổi cũng tự làm được.",
    },
    {
      type: "services",
      kicker: "Phân loại thông minh", title: "06 nhóm lĩnh vực trọng tâm cấp phường",
      lead: "Mỗi lĩnh vực là một thẻ gập/mở (giấy tờ · thời gian · nút nộp online) — kèm chuyên mục riêng “Thủ tục liên thông trọng điểm”.",
      items: [
        ["idcard", "Cư trú & Căn cước", "CCCD · cư trú · định danh"],
        ["motorcycle", "Đăng ký xe", "Xe máy: cấp biển, sang tên"],
        ["store", "Ngành nghề ANTT", "Kinh doanh có điều kiện"],
        ["passport", "Người nước ngoài", "Tạm trú · visa · XNC"],
        ["bomb", "Vũ khí & Pháo", "Vận động giao nộp, tố giác"],
        ["penFancy", "Khiếu nại, tố cáo & Góp ý", "Tiếp nhận đơn thư, phản ánh"],
      ],
      notes: "Cổng phân loại thủ tục thành 06 nhóm lĩnh vực trọng tâm cấp phường: cư trú và căn cước; đăng ký xe máy; quản lý ngành nghề an ninh trật tự; quản lý người nước ngoài; vũ khí và pháo; cùng khiếu nại, tố cáo và góp ý. Mỗi lĩnh vực trình bày dạng thẻ gập mở, tóm tắt cực ngắn gọn ba điều người dân cần nhất: cần giấy tờ gì, mất bao lâu, và có nút liên kết nộp hồ sơ online ngay trên Cổng dịch vụ công Bộ Công an. Ngoài 06 nhóm này, Cổng còn dành riêng một chuyên mục Thủ tục liên thông trọng điểm, như khai sinh, đăng ký thường trú, cấp thẻ bảo hiểm y tế cho trẻ dưới 6 tuổi, hay khai tử, xóa thường trú, vốn là những việc người dân hay vướng mắc nhất.",
    },
    {
      type: "phones",
      kicker: "Giao diện thực tế", title: "Phần mềm đang vận hành trên điện thoại",
      shots: [
        ["home.png", "Trang chủ"],
        ["chatbot.png", "Trợ lý ảo"],
        ["modules.png", "Hướng dẫn lĩnh vực"],
        ["lienthong.png", "Thủ tục liên thông"],
      ],
      notes: "Đây là giao diện thật của Cổng, chụp trực tiếp trên điện thoại. Thiết kế theo phong cách Cổng dịch vụ công, tối ưu 100% cho điện thoại, nút bấm lớn, icon trực quan, màu đỏ vàng nhận diện của lực lượng. Ngay trên đầu trang có nút đổi ngôn ngữ Việt, Anh, Trung và chế độ Chữ to dễ đọc cho người cao tuổi. Từ trang chủ với các thẻ dịch vụ, đến trợ lý ảo hỏi đáp, trang hướng dẫn từng lĩnh vực, tất cả gọn trong lòng bàn tay.",
    },
    {
      type: "cards",
      kicker: "Tính mới, tính sáng tạo", title: "Bốn điểm khác biệt cốt lõi",
      cards: [
        ["penFancy", "primary", "Bình dân hóa pháp lý", "Văn bản luật dài → gạch đầu dòng ngắn gọn, dễ hiểu cho mọi người."],
        ["robot", "green", "Trợ lý ảo Chatbot", "Gõ “Làm sổ tạm trú”, “Mất cà vẹt xe” → trả lời ngay, không cần người trực."],
        ["language", "warn", "Đa ngôn ngữ", "Giao diện Việt – Anh – Trung; có chế độ Chữ to cho người cao tuổi, người nước ngoài."],
        ["bolt", "primaryDark", "Web tĩnh siêu nhẹ", "Tải cực nhanh · chi phí vận hành gần 0 · dễ đóng gói chuyển giao."],
      ],
      notes: "Điểm mới nằm ở bốn chỗ. Thứ nhất, thay vì bắt dân đọc cả văn bản luật dài, Cổng đã bình dân hóa ngôn ngữ pháp lý thành những gạch đầu dòng ngắn gọn, dễ hiểu. Thứ hai là Trợ lý ảo Chatbot: người dân chỉ cần gõ từ khóa như làm sổ tạm trú hay mất cà vẹt xe, hệ thống tự quét dữ liệu và trả lời chính xác, không cần con người can thiệp. Thứ ba, Cổng hỗ trợ ba thứ tiếng Việt, Anh, Trung cùng chế độ Chữ to dễ đọc, phục vụ cả người nước ngoài lẫn người cao tuổi tự tra cứu. Thứ tư, nhờ tư duy web tĩnh, trang tải cực nhanh, chi phí vận hành gần bằng 0 và đóng gói chuyển giao cho đơn vị khác rất dễ.",
    },
    {
      type: "metrics", dark: true, transition: "morph",
      kicker: "Kết quả thật", title: "Sau 1 tháng áp dụng thử nghiệm",
      metrics: [
        ["~60%", "số người dân hỏi trực tiếp GIẢM"],
        ["100%", "người mang hồ sơ đến đã đủ giấy tờ"],
        ["Hàng trăm", "lượt Chatbot phục vụ NGOÀI GIỜ"],
      ],
      footer: "Những lượt hỏi buổi tối, ngày nghỉ — trước đây không có ai trực để trả lời.",
      notes: "Và đây là kết quả thật chỉ sau một tháng áp dụng thử. Số người dân phải hỏi trực tiếp giảm khoảng 60%, giải phóng đáng kể thời gian cho cán bộ trực ban. 100% người dân khi mang hồ sơ đến trụ sở đều đã chuẩn bị đầy đủ giấy tờ theo hướng dẫn trên cổng, không còn cảnh đi lại nhiều lần. Và Trợ lý ảo đã tự động phục vụ thành công hàng trăm lượt truy vấn ngoài giờ hành chính, những buổi tối, ngày nghỉ mà trước đây không ai trực để trả lời.",
    },
    {
      type: "cards", dark: true,
      kicker: "Giá trị mang lại", title: "Chuyên môn · Kinh tế · Phục vụ Nhân dân",
      cards: [
        ["shield", "primary", "≥50% thời gian", "Giảm thời gian giải đáp — cán bộ tập trung nghiệp vụ chính."],
        ["coins", "green", "Tiết kiệm", "Cắt giảm chi phí in ấn tờ rơi, biểu mẫu giấy."],
        ["handshake", "warn", "24/7", "Phục vụ dân mọi lúc — hướng tới Công an phường kiểu mẫu."],
      ],
      notes: "Giá trị thể hiện trên ba mặt. Về chuyên môn: đạt mục tiêu giảm ít nhất 50% thời gian giải đáp thủ tục cơ bản, để cán bộ tập trung cho nhiệm vụ nghiệp vụ chính. Về kinh tế: tiết kiệm rõ rệt chi phí in ấn tờ rơi, biểu mẫu giấy. Và về phục vụ Nhân dân: thông tin chính thống đến với dân 24/7, góp phần xây dựng hình ảnh Công an phường điển hình, kiểu mẫu về an ninh trật tự và văn minh đô thị.",
    },
    {
      type: "timeline",
      kicker: "Lộ trình & khả năng nhân rộng", title: "Từ thí điểm một phường → toàn tỉnh",
      nodes: [
        ["10/3/2026", "Thí điểm", "Dán mã QR tại trụ sở & nhà văn hóa khu dân cư."],
        ["Sau 1 tháng", "Kết quả tích cực", "Người dân đón nhận, hiệu quả rõ rệt."],
        ["4/4/2026", "Đề nghị công nhận", "Hoàn thiện bản mô tả sáng kiến."],
        ["Năm 2026", "Nhân rộng toàn tỉnh", "Đổi logo & tên đơn vị → 100% CA xã/phường."],
      ],
      footer: "Mã nguồn dạng module độc lập — nhân rộng KHÔNG mất thêm chi phí lập trình.",
      notes: "Về lộ trình: ngày 10 tháng 3 chúng tôi triển khai thí điểm, dán mã QR tại trụ sở Công an phường và các nhà văn hóa khu dân cư. Chỉ sau một tháng đã cho kết quả tích cực. Đến ngày 4 tháng 4 hoàn thiện bản mô tả để đề nghị công nhận. Về nhân rộng, khả năng ứng dụng là cực kỳ lớn: mã nguồn thiết kế dạng module độc lập, chỉ cần đổi logo và tên đơn vị là có thể nhân rộng ngay cho 100% Công an các xã, phường toàn tỉnh Phú Thọ trong năm 2026, không mất thêm chi phí lập trình.",
    },
    {
      type: "conclusion", dark: true,
      kicker: "Kết luận & kiến nghị", title: "Giải pháp thực tiễn cao từ yêu cầu công tác",
      bullets: [
        "Giải quyết triệt để quá tải trong khâu hướng dẫn thủ tục.",
        "Thuận tiện tối đa cho người dân — đúng định hướng NQ 57 & KH 342.",
        "Chi phí gần 0 · dễ chuyển giao · hiệu quả thực chất.",
      ],
      askTitle: "KÍNH ĐỀ NGHỊ",
      asks: [
        "Hội đồng Sáng kiến Công an tỉnh công nhận Sáng kiến cấp cơ sở năm 2026",
        "Ban Giám đốc cho phép chuyển giao mã nguồn, nhân rộng toàn tỉnh",
      ],
      thanks: "Trân trọng cảm ơn Hội đồng!",
      notes: "Kính thưa Hội đồng. Sáng kiến này là một giải pháp công nghệ mang tính thực tiễn cao, xuất phát trực tiếp từ yêu cầu công tác; đã giải quyết triệt để tình trạng quá tải trong khâu hướng dẫn thủ tục, đem lại sự thuận tiện tối đa cho người dân, đáp ứng xuất sắc định hướng ứng dụng AI và chuyển đổi số theo Nghị quyết 57 và Kế hoạch 342. Vì vậy, tôi kính đề nghị: một là Hội đồng Sáng kiến Công an tỉnh thẩm định, công nhận đây là Sáng kiến cấp cơ sở năm 2026; hai là Ban Giám đốc Công an tỉnh cho phép chuyển giao mã nguồn, nhân rộng mô hình tới Công an các xã, phường toàn tỉnh. Trân trọng cảm ơn Hội đồng!",
    },
    {
      type: "appendix",
      kicker: "Phụ lục — tổ chức thực hiện & kỹ thuật", title: "Chỉ trình chiếu khi được hỏi sâu",
      rows: [
        ["Hạ tầng", "Lưu trữ web miễn phí / máy chủ Công an tỉnh · link rút gọn + mã QR"],
        ["Triển khai", "Standee, bảng mica QR tại bàn tiếp dân CA phường, CA thành phố, một cửa UBND"],
        ["Truyền thông", "Zalo OA Công an phường · CSKV gửi link vào nhóm Zalo tổ dân phố"],
        ["Công nghệ", "Web App tĩnh HTML / CSS / JS — không backend, không CSDL"],
        ["Trợ lý ảo", "Chatbot FAQ quét từ khóa, trả lời tự động"],
        ["Chi phí", "Server / Hosting gần 0 đồng · module độc lập, dễ chuyển giao"],
      ],
      notes: "Về tổ chức thực hiện: hạ tầng đưa lên nền tảng web miễn phí hoặc máy chủ Công an tỉnh, tạo link rút gọn và mã QR; triển khai bằng standee, bảng mica gắn QR đặt tại bàn tiếp dân của Công an phường, Công an thành phố và bộ phận một cửa UBND; truyền thông qua Zalo OA và Cảnh sát khu vực gửi link vào các nhóm Zalo tổ dân phố. Về kỹ thuật, cổng là web tĩnh HTML CSS JS, không máy chủ xử lý, không cơ sở dữ liệu; Trợ lý ảo là Chatbot FAQ quét từ khóa trả lời tự động; nhờ thiết kế module độc lập nên chi phí gần bằng 0 và rất dễ chuyển giao.",
    },
  ],
};

// ============================================================ ICONS (optional)
let React, ReactDOMServer, sharp, FA;
let ICONS_OK = true;
try {
  React = require("react");
  ReactDOMServer = require("react-dom/server");
  sharp = require("sharp");
  FA = require("react-icons/fa");
} catch (e) {
  ICONS_OK = false;
  console.warn("[icon] Thiếu react/sharp/react-icons — bỏ qua icon. Cài để có icon đẹp.");
}
const FA_MAP = ICONS_OK ? {
  shield: FA.FaShieldAlt, db: FA.FaDatabase, search: FA.FaSearchPlus, idcard: FA.FaIdCard,
  sync: FA.FaSyncAlt, check: FA.FaCheckCircle, alert: FA.FaExclamationTriangle, clock: FA.FaClock,
  coins: FA.FaCoins, comments: FA.FaComments, users: FA.FaUsers, arrow: FA.FaArrowRight,
  motorcycle: FA.FaMotorcycle, passport: FA.FaPassport, bomb: FA.FaBomb, store: FA.FaStore,
  qrcode: FA.FaQrcode, robot: FA.FaRobot, bullhorn: FA.FaBullhorn, scroll: FA.FaScroll,
  contract: FA.FaFileContract, gavel: FA.FaGavel, mobile: FA.FaMobileAlt, language: FA.FaLanguage,
  bolt: FA.FaBolt, rocket: FA.FaRocket, handshake: FA.FaHandshake, penFancy: FA.FaPenFancy,
  times: FA.FaTimesCircle,
} : {};

async function renderIcon(key, color, size = 256) {
  if (!ICONS_OK || !FA_MAP[key]) return null;
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(FA_MAP[key], { color, size: String(size) })
  );
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + png.toString("base64");
}

// Biểu tượng mặt trời trống đồng Đông Sơn (tự vẽ) — dấu ấn Đất Tổ
function drumSVG(color, size = 512) {
  const c = size / 2, rays = 14, r1 = c * 0.50, r2 = c * 0.24;
  let pts = "";
  for (let i = 0; i < rays; i++) {
    const a0 = (i / rays) * 2 * Math.PI - Math.PI / 2;
    const a1 = ((i + 0.5) / rays) * 2 * Math.PI - Math.PI / 2;
    pts += `${(c + Math.cos(a0) * r1).toFixed(1)},${(c + Math.sin(a0) * r1).toFixed(1)} `;
    pts += `${(c + Math.cos(a1) * r2).toFixed(1)},${(c + Math.sin(a1) * r2).toFixed(1)} `;
  }
  const rings = [0.60, 0.78, 0.96].map((f, i) =>
    `<circle cx="${c}" cy="${c}" r="${(c * f).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${i === 2 ? 5 : 7}" ${i === 1 ? 'stroke-dasharray="9 9"' : ""}/>`
  ).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${rings}<polygon points="${pts.trim()}" fill="${color}"/><circle cx="${c}" cy="${c}" r="${(c * 0.085).toFixed(1)}" fill="${color}"/></svg>`;
}
async function renderDrum(color) {
  if (!ICONS_OK) return null;
  const png = await sharp(Buffer.from(drumSVG(color))).png().toBuffer();
  return "image/png;base64," + png.toString("base64");
}

// ============================================================ TRANSITIONS
const MC = 'xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"';
const P159 = 'xmlns:p159="http://schemas.microsoft.com/office/powerpoint/2015/9/main"';
const P14 = 'xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main"';
const morphXml = (dur) =>
  `<mc:AlternateContent ${MC}><mc:Choice ${P159} Requires="p159">` +
  `<p:transition ${P14} spd="med" p14:dur="${dur}"><p159:morph option="byObject"/></p:transition>` +
  `</mc:Choice><mc:Fallback><p:transition spd="med"><p:fade/></p:transition></mc:Fallback></mc:AlternateContent>`;
const fadeXml = (dur) => `<p:transition ${P14} spd="med" p14:dur="${dur}"><p:fade/></p:transition>`;

async function applyTransitions(file, morphSet) {
  let JSZip;
  try { JSZip = require("jszip"); }
  catch (e) { console.warn("[transition] Thiếu jszip — bỏ hiệu ứng."); return { nMorph: 0, nFade: 0 }; }
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const slides = Object.keys(zip.files).filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n));
  let nMorph = 0, nFade = 0;
  for (const name of slides) {
    const num = parseInt(name.match(/slide(\d+)\.xml/)[1], 10);
    let xml = await zip.file(name).async("string");
    if (/<p:transition|p159:morph/.test(xml)) continue;
    const isMorph = morphSet.includes(num);
    xml = xml.replace("</p:sld>", (isMorph ? morphXml(800) : fadeXml(450)) + "</p:sld>");
    zip.file(name, xml);
    isMorph ? nMorph++ : nFade++;
  }
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
  return { nMorph, nFade };
}

// ============================================================ BUILD
async function main() {
  const C = THEME, HF = CONFIG.font, BF = CONFIG.font;
  const PW = 13.3, PH = 7.5, M = 0.7;

  const usedKeys = new Set(["arrow", "check", "times", "alert"]);
  const collect = (o) => {
    if (!o) return;
    if (o.icon) usedKeys.add(o.icon);
    (o.cards || []).forEach((c) => usedKeys.add(c[0]));
    (o.steps || []).forEach((c) => usedKeys.add(c[0]));
    (o.items || []).forEach((c) => Array.isArray(c) && usedKeys.add(c[0]));
    (o.docs || []).forEach((c) => usedKeys.add(c[0]));
    if (o.before) usedKeys.add(o.before.icon);
    if (o.after) usedKeys.add(o.after.icon);
  };
  collect(CONTENT.title);
  CONTENT.slides.forEach(collect);
  const ic = {}, icBrand = {}, icGold = {};
  for (const k of usedKeys) {
    ic[k] = await renderIcon(k, "#FFFFFF");
    icBrand[k] = await renderIcon(k, "#" + C.primary);
    icGold[k] = await renderIcon(k, "#" + C.lime);
  }
  const drumGold = await renderDrum("#" + C.lime);
  const drumRed = await renderDrum("#" + C.primary);
  const hasLogo = fs.existsSync(CONFIG.logo);

  const p = new pptxgen();
  p.defineLayout({ name: "WIDE", width: PW, height: PH });
  p.layout = "WIDE";
  p.author = CONFIG.author;
  p.title = CONFIG.title;

  const sh = () => ({ type: "outer", color: C.deep2, blur: 9, offset: 3, angle: 135, opacity: 0.22 });
  const shLight = () => ({ type: "outer", color: "94A3B8", blur: 7, offset: 2, angle: 135, opacity: 0.30 });
  const bg = (s, color) => { s.background = { color }; };
  const col = (name) => C[name] || name;
  let PAGE = 0;

  // dấu trống đồng góc trên-phải + dải chân trang đơn vị (đặc sắc riêng)
  function chrome(s, dark) {
    if (drumGold) s.addImage({ data: dark ? drumGold : drumRed, x: PW - 1.18, y: 0.42, w: 0.62, h: 0.62, transparency: dark ? 18 : 30 });
    s.addShape(p.shapes.RECTANGLE, { x: M, y: PH - 0.46, w: PW - 2 * M, h: 0.014, fill: { color: dark ? C.lime : C.cardBd } });
    s.addText(CONFIG.unit + "   ·   " + CONFIG.footTag, { x: M, y: PH - 0.42, w: 9, h: 0.3, margin: 0, fontFace: BF, fontSize: 9, bold: true, color: dark ? C.mint2 : C.muted, charSpacing: 1 });
    PAGE += 1;
    s.addText(String(PAGE).padStart(2, "0"), { x: PW - M - 1.0, y: PH - 0.42, w: 1.0, h: 0.3, margin: 0, fontFace: HF, fontSize: 10, bold: true, color: dark ? C.lime : C.primary, align: "right" });
  }
  function head(s, kick, title, dark) {
    s.addText(String(kick).toUpperCase(), { x: M, y: 0.5, w: PW - 2 * M - 1.0, h: 0.35, margin: 0, fontFace: BF, fontSize: 13, bold: true, color: dark ? C.mintTxt : C.primary, charSpacing: 2 });
    s.addText(title, { x: M, y: 0.84, w: PW - 2 * M - 1.0, h: 0.85, margin: 0, fontFace: HF, fontSize: 28, bold: true, color: dark ? "FFFFFF" : C.ink, valign: "top" });
    s.addShape(p.shapes.RECTANGLE, { x: M, y: 1.62, w: 1.1, h: 0.07, fill: { color: C.lime } });
  }
  function iconCircle(s, x, y, d, fill, iconData) {
    s.addShape(p.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, shadow: sh() });
    if (iconData) { const pad = d * 0.27; s.addImage({ data: iconData, x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad }); }
  }
  function shot(s, file, x, y, w, h, caption, frame) {
    const full = path.join(CONFIG.shotsDir, file);
    if (frame) s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: x - 0.07, y: y - 0.07, w: w + 0.14, h: h + 0.14, rectRadius: 0.16, fill: { color: C.ink }, shadow: sh() });
    if (!fs.existsSync(full)) {
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.1, fill: { color: "F1E3E5" }, line: { color: C.primary, width: 1, dashType: "dash" } });
      s.addText("(ảnh: " + file + ")", { x, y, w, h, margin: 0, fontFace: BF, fontSize: 11, italic: true, color: C.muted, align: "center", valign: "middle" });
    } else {
      s.addImage({ path: full, x, y, w, h, sizing: { type: "cover", w, h } });
    }
    if (caption && caption.trim()) s.addText(caption, { x: x - 0.1, y: y + h + 0.12, w: w + 0.2, h: 0.32, margin: 0, fontFace: BF, fontSize: 12.5, bold: true, color: C.slate, align: "center" });
  }

  // ---- factories ----
  function titleSlide(d) {
    const s = p.addSlide(); bg(s, C.deep);
    s.addShape(p.shapes.RECTANGLE, { x: 0, y: 0, w: 0.2, h: PH, fill: { color: C.lime } });
    if (drumGold) s.addImage({ data: drumGold, x: 8.7, y: 1.5, w: 5.2, h: 5.2, transparency: 80 });
    if (hasLogo) s.addImage({ path: CONFIG.logo, x: M, y: 0.6, w: 0.85, h: 0.85 });
    s.addText(String(d.kicker).toUpperCase(), { x: hasLogo ? M + 1.05 : M, y: 0.72, w: 9.5, h: 0.6, margin: 0, fontFace: BF, fontSize: 13, bold: true, color: C.mintTxt, charSpacing: 1, valign: "middle" });
    s.addText(d.title, { x: M, y: 2.0, w: 11, h: 1.9, margin: 0, fontFace: HF, fontSize: 50, bold: true, color: "FFFFFF", lineSpacingMultiple: 0.95 });
    if (d.subtitle) s.addText(d.subtitle, { x: M, y: 3.95, w: 9.6, h: 0.7, margin: 0, fontFace: BF, fontSize: 19, color: C.mint2 });
    let cx = M;
    (d.chips || []).forEach((t) => {
      const w = 0.42 + t.length * 0.115;
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: cx, y: 4.85, w, h: 0.5, rectRadius: 0.25, fill: { color: C.primary }, line: { color: C.lime, width: 1 } });
      s.addText(t, { x: cx, y: 4.85, w, h: 0.5, margin: 0, fontFace: BF, fontSize: 13.5, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
      cx += w + 0.22;
    });
    if (d.author) s.addText([{ text: "Tác giả: ", options: { color: C.mintTxt } }, { text: d.author, options: { bold: true, color: "FFFFFF" } }], { x: M, y: 6.3, w: 11.5, h: 0.4, margin: 0, fontFace: BF, fontSize: 15 });
    chrome(s, true);
    s.addNotes(d.notes || "");
    return s;
  }
  function legalSlide(d) {
    const s = p.addSlide(); bg(s, C.paper);
    head(s, d.kicker, d.title || "");
    const cw = (PW - 2 * M - 0.6) / 2;
    (d.docs || []).slice(0, 2).forEach((dc, i) => {
      const x = M + i * (cw + 0.6), y = 2.05;
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: 3.05, rectRadius: 0.1, fill: { color: C.cardBg }, line: { color: C.cardBd, width: 1 }, shadow: shLight() });
      s.addShape(p.shapes.RECTANGLE, { x, y, w: cw, h: 0.12, fill: { color: C.primary } });
      iconCircle(s, x + 0.35, y + 0.42, 0.95, C.primary, ic[dc[0]] || null);
      s.addText(dc[1], { x: x + 1.5, y: y + 0.42, w: cw - 1.7, h: 0.5, margin: 0, fontFace: HF, fontSize: 19, bold: true, color: C.primaryDark });
      s.addText(dc[2], { x: x + 1.5, y: y + 0.92, w: cw - 1.7, h: 0.4, margin: 0, fontFace: BF, fontSize: 13, italic: true, color: C.muted });
      s.addText(dc[3], { x: x + 0.4, y: y + 1.65, w: cw - 0.8, h: 1.2, margin: 0, fontFace: BF, fontSize: 14.5, color: C.slate });
    });
    if (d.footer) {
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y: 5.45, w: PW - 2 * M, h: 0.95, rectRadius: 0.1, fill: { color: C.primaryDark } });
      if (icGold.alert) s.addImage({ data: icGold.alert, x: M + 0.35, y: 5.72, w: 0.42, h: 0.42 });
      s.addText(d.footer, { x: M + 1.0, y: 5.45, w: PW - 2 * M - 1.3, h: 0.95, margin: 0, fontFace: BF, fontSize: 15.5, bold: true, color: "FFFFFF", valign: "middle" });
    }
    chrome(s, false);
    s.addNotes(d.notes || "");
    return s;
  }
  function bigStatSlide(d) {
    const s = p.addSlide(); bg(s, d.dark ? C.deep : C.paper);
    head(s, d.kicker, d.title || "", d.dark);
    s.addText(d.stat, { x: M - 0.1, y: 2.15, w: 6.4, h: 1.5, margin: 0, fontFace: HF, fontSize: 64, bold: true, color: C.mintTxt, align: "center" });
    if (d.statSub) s.addText(d.statSub, { x: M, y: 3.65, w: 6.2, h: 1.0, margin: 0, fontFace: BF, fontSize: 17, color: d.dark ? C.mint2 : C.slate, align: "center" });
    (d.items || []).forEach((t, i) => {
      const y = 2.15 + i * 1.12;
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 7.1, y, w: PW - M - 7.1, h: 0.92, rectRadius: 0.1, fill: { color: d.dark ? C.cardDark : C.cardBg }, line: { color: C.lime, width: 1 } });
      iconCircle(s, 7.4, y + 0.16, 0.6, C.primary, ic[d.icon] || null);
      s.addText(t, { x: 8.2, y, w: PW - M - 8.35, h: 0.92, margin: 0, fontFace: BF, fontSize: 14.5, bold: true, color: d.dark ? "FFFFFF" : C.ink, valign: "middle" });
    });
    if (d.footer) s.addText(d.footer, { x: M, y: 6.05, w: PW - 2 * M, h: 0.7, margin: 0, fontFace: BF, fontSize: 14.5, italic: true, color: d.dark ? C.mintTxt : C.slate });
    chrome(s, d.dark);
    s.addNotes(d.notes || "");
    return s;
  }
  function compareSlide(d) {
    const s = p.addSlide(); bg(s, C.paper);
    head(s, d.kicker, d.title || "");
    const cw = 5.45, y0 = 2.0, ch = 4.2;
    const xL = M, xR = PW - M - cw;
    // TRƯỚC (xám)
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: xL, y: y0, w: cw, h: ch, rectRadius: 0.12, fill: { color: C.greyBg }, line: { color: C.greyBd, width: 1 }, shadow: shLight() });
    s.addShape(p.shapes.RECTANGLE, { x: xL, y: y0, w: cw, h: 0.7, fill: { color: C.muted2 } });
    if (ic[d.before.icon]) s.addImage({ data: ic[d.before.icon], x: xL + 0.3, y: y0 + 0.16, w: 0.38, h: 0.38 });
    s.addText(d.before.title, { x: xL + 0.85, y: y0, w: cw - 1, h: 0.7, margin: 0, fontFace: HF, fontSize: 18, bold: true, color: "FFFFFF", valign: "middle" });
    d.before.items.forEach((t, i) => {
      const y = y0 + 1.0 + i * 0.74;
      if (icBrand.times) s.addImage({ data: icBrand.times, x: xL + 0.32, y: y + 0.03, w: 0.32, h: 0.32 });
      s.addText(t, { x: xL + 0.8, y, w: cw - 1.1, h: 0.6, margin: 0, fontFace: BF, fontSize: 14, color: C.slate, valign: "middle" });
    });
    // mũi tên giữa
    if (icBrand.arrow) s.addImage({ data: icBrand.arrow, x: PW / 2 - 0.33, y: y0 + ch / 2 - 0.33, w: 0.66, h: 0.66 });
    // SAU (đỏ-vàng)
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: xR, y: y0, w: cw, h: ch, rectRadius: 0.12, fill: { color: C.deep }, line: { color: C.lime, width: 1.4 }, shadow: sh() });
    s.addShape(p.shapes.RECTANGLE, { x: xR, y: y0, w: cw, h: 0.7, fill: { color: C.primary } });
    if (ic[d.after.icon]) s.addImage({ data: ic[d.after.icon], x: xR + 0.3, y: y0 + 0.16, w: 0.38, h: 0.38 });
    s.addText(d.after.title, { x: xR + 0.85, y: y0, w: cw - 1, h: 0.7, margin: 0, fontFace: HF, fontSize: 18, bold: true, color: "FFFFFF", valign: "middle" });
    d.after.items.forEach((t, i) => {
      const y = y0 + 1.0 + i * 0.74;
      if (icGold.check) s.addImage({ data: icGold.check, x: xR + 0.32, y: y + 0.03, w: 0.32, h: 0.32 });
      s.addText(t, { x: xR + 0.8, y, w: cw - 1.1, h: 0.6, margin: 0, fontFace: BF, fontSize: 14, bold: true, color: "FFFFFF", valign: "middle" });
    });
    chrome(s, false);
    s.addNotes(d.notes || "");
    return s;
  }
  function stepsSlide(d) {
    const s = p.addSlide(); bg(s, C.paper);
    head(s, d.kicker, d.title || "");
    if (d.lead) s.addText(d.lead, { x: M, y: 1.78, w: PW - 2 * M, h: 0.6, margin: 0, fontFace: BF, fontSize: 15.5, color: C.slate });
    const steps = d.steps || [], n = steps.length;
    const sw = (PW - 2 * M - (n - 1) * 0.9) / n;
    steps.forEach((st, i) => {
      const x = M + i * (sw + 0.9), last = i === n - 1;
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: 2.7, w: sw, h: 3.3, rectRadius: 0.12, fill: { color: last ? C.deep : C.cardBg }, line: { color: last ? C.lime : C.cardBd, width: 1 }, shadow: shLight() });
      iconCircle(s, x + sw / 2 - 0.6, 3.0, 1.2, last ? C.green : C.primary, ic[st[0]] || null);
      s.addText(st[1], { x: x + 0.2, y: 4.4, w: sw - 0.4, h: 0.55, margin: 0, fontFace: HF, fontSize: 18, bold: true, color: last ? "FFFFFF" : C.ink, align: "center" });
      s.addText(st[2], { x: x + 0.25, y: 5.0, w: sw - 0.5, h: 0.9, margin: 0, fontFace: BF, fontSize: 14, color: last ? C.mint2 : C.slate, align: "center" });
      if (i < n - 1 && icBrand.arrow) s.addImage({ data: icBrand.arrow, x: x + sw + 0.22, y: 4.1, w: 0.46, h: 0.46 });
    });
    chrome(s, false);
    s.addNotes(d.notes || "");
    return s;
  }
  function servicesSlide(d) {
    const s = p.addSlide(); bg(s, C.paper);
    head(s, d.kicker, d.title || "");
    if (d.lead) s.addText(d.lead, { x: M, y: 1.74, w: PW - 2 * M, h: 0.45, margin: 0, fontFace: BF, fontSize: 14, italic: true, color: C.slate });
    const items = d.items || [], cols = 3;
    const cw = (PW - 2 * M - (cols - 1) * 0.4) / cols, ch = 1.85, gap = 0.35, y0 = 2.35;
    items.forEach((it, i) => {
      const x = M + (i % cols) * (cw + 0.4), y = y0 + Math.floor(i / cols) * (ch + gap);
      const accent = [C.primary, C.green, C.warn][i % 3];
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: ch, rectRadius: 0.1, fill: { color: C.cardBg }, line: { color: C.cardBd, width: 1 }, shadow: shLight() });
      s.addShape(p.shapes.RECTANGLE, { x, y, w: 0.1, h: ch, fill: { color: accent } });
      iconCircle(s, x + 0.32, y + 0.32, 0.85, accent, ic[it[0]] || null);
      s.addText(it[1], { x: x + 1.35, y: y + 0.3, w: cw - 1.55, h: 0.55, margin: 0, fontFace: HF, fontSize: 16, bold: true, color: C.ink, valign: "middle" });
      s.addText(it[2] || "", { x: x + 1.35, y: y + 0.82, w: cw - 1.55, h: 0.4, margin: 0, fontFace: BF, fontSize: 12, color: C.muted });
      s.addText("Giấy tờ · Thời gian · Nộp online", { x: x + 0.3, y: y + ch - 0.45, w: cw - 0.6, h: 0.32, margin: 0, fontFace: BF, fontSize: 10.5, bold: true, italic: true, color: accent, valign: "middle" });
    });
    chrome(s, false);
    s.addNotes(d.notes || "");
    return s;
  }
  function phonesSlide(d) {
    const s = p.addSlide(); bg(s, C.paper);
    head(s, d.kicker, d.title || "");
    const g = (d.shots || []).slice(0, 4), n = g.length;
    const ph = 4.05, pw = ph * 0.49, total = n * pw + (n - 1) * 0.55;
    let x = (PW - total) / 2, y = 2.1;
    g.forEach((it) => { shot(s, it[0], x, y, pw, ph, it[1], true); x += pw + 0.55; });
    chrome(s, false);
    s.addNotes(d.notes || "");
    return s;
  }
  function cardsSlide(d) {
    const s = p.addSlide(); bg(s, d.dark ? C.deep : C.paper);
    head(s, d.kicker, d.title || "", d.dark);
    const cards = d.cards || [], n = cards.length;
    const cw = (PW - 2 * M - (n - 1) * 0.5) / n;
    cards.forEach((row, i) => {
      const x = M + i * (cw + 0.5);
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: 2.4, w: cw, h: 3.4, rectRadius: 0.12, fill: { color: d.dark ? C.cardDark : C.cardBg }, line: { color: d.dark ? col(row[1]) : C.cardBd, width: 1 }, shadow: shLight() });
      iconCircle(s, x + cw / 2 - 0.6, 2.78, 1.2, col(row[1]), ic[row[0]] || null);
      s.addText(row[2], { x: x + 0.2, y: 4.15, w: cw - 0.4, h: 0.6, margin: 0, fontFace: HF, fontSize: 21, bold: true, color: d.dark ? "FFFFFF" : C.ink, align: "center" });
      s.addText(row[3], { x: x + 0.3, y: 4.8, w: cw - 0.6, h: 0.95, margin: 0, fontFace: BF, fontSize: 14, color: d.dark ? C.mint2 : C.slate, align: "center" });
    });
    chrome(s, d.dark);
    s.addNotes(d.notes || "");
    return s;
  }
  function metricsSlide(d) {
    const s = p.addSlide(); bg(s, C.deep);
    head(s, d.kicker, d.title || "", true);
    const ms = (d.metrics || []).slice(0, 3), n = ms.length;
    const cw = (PW - 2 * M - (n - 1) * 0.6) / n, dia = 2.5, y0 = 2.2;
    ms.forEach((m, i) => {
      const x = M + i * (cw + 0.6), cx = x + cw / 2;
      s.addShape(p.shapes.OVAL, { x: cx - dia / 2, y: y0, w: dia, h: dia, fill: { color: C.cardDark }, line: { color: C.lime, width: 3 }, shadow: sh() });
      s.addShape(p.shapes.OVAL, { x: cx - dia / 2 + 0.18, y: y0 + 0.18, w: dia - 0.36, h: dia - 0.36, fill: { type: "none" }, line: { color: C.primary, width: 1.5, dashType: "dash" } });
      s.addText(m[0], { x: cx - dia / 2, y: y0 + 0.55, w: dia, h: 1.4, margin: 0, fontFace: HF, fontSize: m[0].length > 5 ? 30 : 44, bold: true, color: C.mintTxt, align: "center", valign: "middle" });
      s.addText(m[1], { x: x, y: y0 + dia + 0.2, w: cw, h: 1.0, margin: 0, fontFace: BF, fontSize: 15, bold: true, color: "FFFFFF", align: "center" });
    });
    if (d.footer) {
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y: 6.05, w: PW - 2 * M, h: 0.85, rectRadius: 0.1, fill: { color: C.primary }, line: { color: C.lime, width: 1 } });
      s.addText(d.footer, { x: M + 0.2, y: 6.05, w: PW - 2 * M - 0.4, h: 0.85, margin: 0, fontFace: BF, fontSize: 15, bold: true, italic: true, color: "FFFFFF", align: "center", valign: "middle" });
    }
    chrome(s, true);
    s.addNotes(d.notes || "");
    return s;
  }
  function timelineSlide(d) {
    const s = p.addSlide(); bg(s, C.paper);
    head(s, d.kicker, d.title || "");
    const nodes = d.nodes || [], n = nodes.length;
    const x0 = M + 0.3, x1 = PW - M - 0.3, span = x1 - x0, lineY = 3.7;
    s.addShape(p.shapes.RECTANGLE, { x: x0, y: lineY, w: span, h: 0.05, fill: { color: C.primary } });
    nodes.forEach((nd, i) => {
      const cx = x0 + (span / (n - 1)) * i, dotD = 0.5;
      const up = i % 2 === 0;
      iconCircle(s, cx - dotD / 2, lineY - dotD / 2 + 0.025, dotD, C.lime, null);
      s.addShape(p.shapes.OVAL, { x: cx - 0.1, y: lineY - 0.075, w: 0.2, h: 0.2, fill: { color: C.primaryDark } });
      const cardY = up ? lineY - 1.55 : lineY + 0.55, cardW = 2.5;
      const cxw = Math.max(x0, Math.min(cx - cardW / 2, x1 - cardW));
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: cxw, y: cardY, w: cardW, h: 1.0, rectRadius: 0.08, fill: { color: i === n - 1 ? C.deep : C.cardBg }, line: { color: i === n - 1 ? C.lime : C.cardBd, width: 1 }, shadow: shLight() });
      s.addText(nd[0], { x: cxw + 0.12, y: cardY + 0.08, w: cardW - 0.24, h: 0.3, margin: 0, fontFace: HF, fontSize: 13, bold: true, color: i === n - 1 ? C.lime : C.primary });
      s.addText(nd[1], { x: cxw + 0.12, y: cardY + 0.36, w: cardW - 0.24, h: 0.3, margin: 0, fontFace: HF, fontSize: 13.5, bold: true, color: i === n - 1 ? "FFFFFF" : C.ink });
      s.addText(nd[2], { x: cxw + 0.12, y: cardY + 0.62, w: cardW - 0.24, h: 0.36, margin: 0, fontFace: BF, fontSize: 10.5, color: i === n - 1 ? C.mint2 : C.muted });
    });
    if (d.footer) s.addText(d.footer, { x: M, y: 6.2, w: PW - 2 * M, h: 0.5, margin: 0, fontFace: BF, fontSize: 15, bold: true, italic: true, color: C.primaryDark, align: "center" });
    chrome(s, false);
    s.addNotes(d.notes || "");
    return s;
  }
  function conclusionSlide(d) {
    const s = p.addSlide(); bg(s, C.deep);
    if (drumGold) s.addImage({ data: drumGold, x: 9.6, y: 1.4, w: 4.6, h: 4.6, transparency: 84 });
    s.addText(String(d.kicker).toUpperCase(), { x: M, y: 0.6, w: 10, h: 0.4, margin: 0, fontFace: BF, fontSize: 14, bold: true, color: C.mintTxt, charSpacing: 2 });
    s.addText(d.title || "", { x: M, y: 0.98, w: 11.5, h: 0.85, margin: 0, fontFace: HF, fontSize: 28, bold: true, color: "FFFFFF" });
    (d.bullets || []).forEach((t, i) => {
      const y = 2.0 + i * 0.78;
      if (icGold.check) s.addImage({ data: icGold.check, x: M, y: y + 0.05, w: 0.42, h: 0.42 });
      s.addText(t, { x: M + 0.62, y, w: 8.6, h: 0.6, margin: 0, fontFace: BF, fontSize: 16, color: C.mint2, valign: "middle" });
    });
    if (d.asks && d.asks.length) {
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y: 4.65, w: PW - 2 * M, h: 1.85, rectRadius: 0.12, fill: { color: C.cardDark }, line: { color: C.lime, width: 1.3 }, shadow: sh() });
      s.addText((d.askTitle || "KÍNH ĐỀ NGHỊ").toUpperCase(), { x: M + 0.5, y: 4.85, w: 11, h: 0.45, margin: 0, fontFace: BF, fontSize: 14, bold: true, color: C.mintTxt, charSpacing: 1.5 });
      s.addText(d.asks.map((t, i) => ({ text: t, options: { bullet: { code: "2022" }, breakLine: i < d.asks.length - 1 } })), { x: M + 0.55, y: 5.3, w: PW - 2 * M - 1.0, h: 1.1, margin: 0, fontFace: BF, fontSize: 16.5, bold: true, color: "FFFFFF", paraSpaceAfter: 8 });
    }
    if (d.thanks) s.addText(d.thanks, { x: M, y: 6.55, w: PW - 2 * M, h: 0.4, margin: 0, fontFace: HF, fontSize: 16, italic: true, color: C.mintTxt, align: "right" });
    chrome(s, true);
    s.addNotes(d.notes || "");
    return s;
  }
  function appendixSlide(d) {
    const s = p.addSlide(); bg(s, C.paper);
    head(s, d.kicker, d.title || "");
    const rows = d.rows || [];
    let y = 1.95;
    rows.forEach((r, i) => {
      s.addShape(p.shapes.RECTANGLE, { x: M, y, w: 3.6, h: 0.66, fill: { color: i % 2 ? C.cardBg : "FBE4E7" } });
      s.addShape(p.shapes.RECTANGLE, { x: M + 3.6, y, w: PW - 2 * M - 3.6, h: 0.66, fill: { color: i % 2 ? "FFFFFF" : "FFF8F9" } });
      s.addText(r[0], { x: M + 0.18, y, w: 3.3, h: 0.66, margin: 0, fontFace: HF, fontSize: 14, bold: true, color: C.primary, valign: "middle" });
      s.addText(r[1], { x: M + 3.78, y, w: PW - 2 * M - 3.95, h: 0.66, margin: 0, fontFace: BF, fontSize: 13, color: C.slate, valign: "middle" });
      y += 0.66;
    });
    chrome(s, false);
    s.addNotes(d.notes || "");
    return s;
  }

  const FACTORY = { title: titleSlide, legal: legalSlide, bigStat: bigStatSlide, compare: compareSlide, steps: stepsSlide, services: servicesSlide, phones: phonesSlide, cards: cardsSlide, metrics: metricsSlide, timeline: timelineSlide, conclusion: conclusionSlide, appendix: appendixSlide };

  const morphSlides = [];
  if (CONTENT.title) titleSlide(CONTENT.title);
  CONTENT.slides.forEach((d) => {
    const f = FACTORY[d.type];
    if (!f) { console.warn("[slide] type không hỗ trợ:", d.type); return; }
    f(d);
    if (d.transition === "morph") morphSlides.push(p.slides.length);
  });

  await p.writeFile({ fileName: CONFIG.outFile });
  const t = await applyTransitions(CONFIG.outFile, morphSlides);
  console.log(`OK: ${p.slides.length} slides · Morph: ${t.nMorph} · Fade: ${t.nFade} → ${CONFIG.outFile}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
