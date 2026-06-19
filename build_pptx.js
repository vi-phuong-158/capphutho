/**
 * build_pptx.js — Dựng slide thuyết trình "Cổng Thông Tin Số" (Công an phường Phú Thọ).
 * Theme: Đỏ – Vàng Công an (bám sát tông màu web app: --primary #C41E3A, --accent #FFD700).
 *
 * Cài đặt (lần đầu):
 *   npm install pptxgenjs jszip            # bắt buộc
 *   npm install react react-dom sharp react-icons   # tùy chọn — để có icon
 *
 * Chạy:   node build_pptx.js
 *
 * CÁCH DÙNG: chỉ sửa 2 khối CONFIG và CONTENT cho khớp dự án.
 * Nếu thiếu react/sharp/react-icons → script vẫn chạy, chỉ bỏ phần icon.
 * Ảnh chụp UI đặt trong thư mục ./shots ; chưa có thì script tự vẽ placeholder.
 */

"use strict";
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");

// ============================================================ CONFIG
const CONFIG = {
  outFile: "Thuyet-trinh-Cong-Thong-Tin-So.pptx",
  author: "Công an phường Phú Thọ",
  title: "Cổng Thông Tin Số — Công an phường Phú Thọ",
  shotsDir: path.join(__dirname, "shots"),
  font: "Segoe UI",
};

// Bảng màu — bám sát tông Đỏ – Vàng của web app (styles.css / index.html)
const THEME = {
  deep: "8B0000", deep2: "5A0000",      // nền slide tối (đỏ đậm / đỏ rất đậm)
  primary: "C41E3A",                     // đỏ Công an
  green: "1F7A1F", lime: "FFD700",       // green = xanh điểm nhấn, lime = vàng Công an
  mintTxt: "FFD700", mint2: "FFE9A8",    // chữ nhấn trên nền tối: vàng & vàng kem
  danger: "B00020", warn: "D97706",
  paper: "FFFFFF", ink: "1F2937", slate: "374151", muted: "6B7280",
  cardBg: "FFF0F2", cardBd: "F3D2D7",    // thẻ nền sáng (đỏ rất nhạt)
  cardDark: "6E1014",                    // thẻ nền trên slide tối
};

// ============================================================ CONTENT
// Mỗi phần tử = 1 slide. `notes` = đúng đoạn LỜI ĐỌC trong Ban-doc-thuyet-trinh.md.
const CONTENT = {
  title: {
    type: "title",
    kicker: "CÔNG AN PHƯỜNG PHÚ THỌ · TỈNH PHÚ THỌ",
    title: "CỔNG THÔNG TIN SỐ",
    subtitle: "Một địa chỉ số, một chạm — tra cứu mọi thủ tục hành chính",
    chips: ["Chi phí 0 đồng", "Hoạt động 24/7", "Cán bộ tự xây dựng"],
    author: CONFIG.author,
    icon: "shield",
    notes: "Kính thưa Hội đồng. Chỉ với một chiếc điện thoại và một mã QR, người dân phường Phú Thọ giờ đây có thể tra cứu 7 nhóm thủ tục hành chính, hỏi đáp hơn 90 tình huống thường gặp và xem hướng dẫn bằng 3 ngôn ngữ — bất kể là mấy giờ. Đó là kết quả của sáng kiến Cổng Thông Tin Số do Công an phường Phú Thọ tự xây dựng, không tốn một đồng ngân sách. Một cánh cổng bằng dữ liệu, mở 24/7, đưa thông tin chính thống đến tận tay người dân.",
  },
  slides: [
    {
      type: "bigStat", dark: true,
      kicker: "Bài toán đặt ra", stat: "03",
      statSub: "rào cản lớn khi người dân tiếp cận thông tin chính thống",
      items: [
        "Thông tin thủ tục nằm rải rác nhiều nơi",
        "Tin giả, tin sai lan nhanh trên mạng xã hội",
        "Người cao tuổi khó tiếp cận do khoảng cách số",
      ],
      icon: "alert",
      footer: "Người dân đi lại nhiều lần, làm sai mẫu, mất thời gian — vì thiếu một điểm chạm số thống nhất.",
      notes: "Trước khi có sáng kiến, người dân muốn biết một thủ tục thì phải tìm ở rất nhiều nơi: hỏi người quen, lục trên mạng xã hội, hoặc trực tiếp lên trụ sở. Thông tin phân tán, mỗi nơi nói một kiểu. Trong khi đó, tin giả và tin sai về thủ tục lan rất nhanh, khiến bà con đi lại nhiều lần, làm sai mẫu, mất thời gian. Khoảng cách số, đặc biệt với người cao tuổi, càng làm việc tiếp cận thông tin chính thống trở nên khó khăn.",
    },
    {
      type: "cards",
      kicker: "Hệ quả của cách làm cũ", title: "Bốn hệ quả chính",
      cards: [
        ["hourglass", "primary", "Bị động", "Chờ dân đến tận nơi mới hướng dẫn được."],
        ["layers", "green", "Quá tải", "Cùng một câu hỏi lặp lại mỗi ngày."],
        ["alert", "warn", "Dễ sai lệch", "Dân làm theo tin đồn, sai mẫu hồ sơ."],
        ["eyeslash", "danger", "Bỏ lại phía sau", "Người cao tuổi, người nước ngoài khó tiếp cận."],
      ],
      notes: "Cách làm cũ kéo theo bốn hệ quả. Thứ nhất, cán bộ luôn bị động, chờ dân đến tận nơi mới hướng dẫn được. Thứ hai là quá tải, vì cùng một câu hỏi đơn giản phải trả lời đi trả lời lại mỗi ngày. Thứ ba, người dân dễ làm sai do nghe theo tin đồn, dẫn đến phải bổ sung, làm lại hồ sơ. Và thứ tư, những nhóm yếu thế như người cao tuổi hay người nước ngoài gần như bị bỏ lại phía sau vì rào cản công nghệ và ngôn ngữ.",
    },
    {
      type: "steps",
      kicker: "Giải pháp", title: "Một cổng — một chạm",
      lead: "Cổng đóng vai trò trợ lý số theo ba bước tự nhiên: Tra cứu → Hướng dẫn → Kết nối thực hiện.",
      steps: [
        ["search", "1. Tra cứu", "Người dân tìm đúng lĩnh vực cần làm."],
        ["audit", "2. Xem hướng dẫn", "Đọc hướng dẫn chi tiết kèm biểu mẫu."],
        ["check", "3. Thực hiện trực tuyến", "Kết nối thẳng tới Cổng DVC & VNeID."],
      ],
      notes: "Giải pháp của chúng tôi là một Cổng Thông Tin Số duy nhất, gom tất cả về một địa chỉ, một chạm là tới. Cổng hoạt động như một trợ lý số theo ba bước rất tự nhiên: người dân tra cứu lĩnh vực cần làm, đọc hướng dẫn chi tiết kèm biểu mẫu, rồi được kết nối thẳng tới Cổng dịch vụ công và VNeID để thực hiện trực tuyến. Không phải nhớ nhiều địa chỉ, không phải đi lại nhiều lần.",
    },
    {
      type: "gallery",
      kicker: "Giao diện thực tế", title: "Hình ảnh phần mềm đang vận hành",
      shots: [
        ["home.png", "Trang chủ — các thẻ dịch vụ"],
        ["modules.png", "Hướng dẫn theo lĩnh vực"],
        ["chatbot.png", "Trợ lý ảo hỏi – đáp"],
        ["lienthong.png", "Thủ tục liên thông"],
      ],
      notes: "Đây là giao diện thật của cổng khi đang vận hành. Tất cả được thiết kế cho màn hình điện thoại: trang chủ với các thẻ dịch vụ lớn, ô tìm kiếm thông minh, trợ lý ảo hỏi đáp, và trang hướng dẫn từng lĩnh vực. Màu sắc đỏ vàng truyền thống của lực lượng Công an, chữ rõ, nút bấm to, ai cũng dùng được ngay từ lần đầu.",
    },
    {
      type: "twoCol",
      kicker: "Tính năng nổi bật", title: "Hai trụ cột nghiệp vụ",
      cards: [
        ["search", "primary", "Trợ lý ảo hỏi – đáp", "Người dân gõ câu hỏi, hệ thống tự tìm trong kho hơn 90 câu hỏi – đáp và trả lời ngay, 24/7."],
        ["layers", "green", "Thủ tục liên thông", "Hướng dẫn nộp một bộ hồ sơ, nhiều cơ quan cùng xử lý — theo Nghị định 63/2024/NĐ-CP."],
      ],
      shot: ["chatbot.png", "Trợ lý ảo trả lời người dân"],
      notes: "Trong rất nhiều tính năng, có hai trụ cột đáng chú ý nhất. Một là trợ lý ảo hỏi đáp: người dân gõ câu hỏi, hệ thống tự tìm trong kho hơn 90 câu hỏi đáp đã được biên soạn và trả lời ngay, không cần chờ giờ hành chính. Hai là khu vực thủ tục liên thông, hướng dẫn nộp một bộ hồ sơ mà nhiều cơ quan cùng xử lý, đúng tinh thần Nghị định 63 năm 2024, ví dụ liên thông khai sinh, thường trú và cấp thẻ bảo hiểm y tế.",
    },
    {
      type: "services",
      kicker: "Phạm vi phục vụ", title: "Bảy nhóm dịch vụ sát với đời sống",
      items: [
        ["idcard", "Cư trú & Định danh", "CCCD, VNeID, CT07, CT08"],
        ["sync", "Đăng ký xe", "Cấp biển số, sang tên đổi chủ"],
        ["flag", "Vũ khí & Pháo", "Vận động giao nộp, tố giác"],
        ["shield", "An ninh trật tự", "Ngành nghề kinh doanh, lưu trú"],
        ["audit", "Khiếu nại & Tố cáo", "Gửi đơn thư, phản ánh"],
        ["users", "Người nước ngoài", "Khai báo tạm trú, Visa, XNC"],
        ["layers", "Thủ tục liên thông", "Khai sinh, khai tử, cư trú, BHYT"],
      ],
      notes: "Về phạm vi, cổng bao phủ 7 nhóm dịch vụ sát với đời sống người dân: cư trú và định danh điện tử; đăng ký xe; vũ khí và pháo; an ninh trật tự; khiếu nại tố cáo; người nước ngoài; và thủ tục liên thông. Mỗi nhóm có trang hướng dẫn riêng, kèm biểu mẫu tải về và đường dẫn tới dịch vụ công trực tuyến. Một cổng phủ trọn những việc bà con hay cần nhất.",
    },
    {
      type: "result", dark: true, transition: "morph",
      kicker: "Kết quả thật", title: "Sáng kiến đã cho kết quả thật",
      cards: [
        ["layers", "lime", "07", "nhóm dịch vụ — phủ những việc người dân hay cần nhất."],
        ["search", "lime", "90+", "câu hỏi – đáp đã biên soạn cho trợ lý ảo trả lời tức thì."],
      ],
      footer: "Hỗ trợ 3 ngôn ngữ (Việt · Anh · Trung) · Hoạt động 24/7 · Quét mã QR là vào · Có chế độ chữ to cho người cao tuổi.",
      notes: "Và đây là kết quả thật, đã chạy được. Cổng hiện phục vụ 7 nhóm dịch vụ, với kho hơn 90 câu hỏi đáp thường gặp, hỗ trợ 3 ngôn ngữ là tiếng Việt, tiếng Anh và tiếng Trung, để cả người nước ngoài cũng dùng được. Hệ thống hoạt động 24/7, người dân chỉ cần quét mã QR dán tại khu dân cư là vào ngay. Đặc biệt có chế độ chữ to, dễ đọc dành riêng cho người cao tuổi. Đây không phải ý tưởng trên giấy, nó đang phục vụ bà con mỗi ngày.",
    },
    {
      type: "cards", dark: true,
      kicker: "Hiệu quả mang lại", title: "Chi phí · Thời gian · Xã hội",
      cards: [
        ["coins", "green", "0 đồng", "chi phí — cán bộ tự phát triển, không thuê ngoài, không máy chủ."],
        ["clock", "primary", "24/7", "tra cứu mọi lúc — giảm đi lại và hỏi trực tiếp."],
        ["users", "warn", "Gần hơn", "thu hẹp khoảng cách số, đẩy lùi tin giả, tin sai."],
      ],
      notes: "Hiệu quả thể hiện ở ba mặt. Về chi phí: gần như 0 đồng, vì cán bộ tự xây dựng, không thuê ngoài, không cần máy chủ. Về thời gian: người dân tra cứu được bất cứ lúc nào, giảm hẳn việc đi lại và hỏi trực tiếp, cán bộ cũng bớt phải trả lời lặp lại. Và về xã hội: cổng góp phần thu hẹp khoảng cách số, đưa thông tin chính thống đến với dân nhanh hơn, từ đó đẩy lùi tin giả, tin sai trên mạng xã hội.",
    },
    {
      type: "cards",
      kicker: "Khả năng nhân rộng", title: "Dễ sao chép cho phường, xã khác",
      cards: [
        ["copy", "primary", "Dễ sao chép", "Chỉ cần đổi logo, thông tin và nội dung địa phương."],
        ["users", "green", "Đoàn Thanh niên", "Đồng hành hướng dẫn cài đặt, quét QR, tra cứu."],
        ["seedling", "warn", "Từ cơ sở", "Chuyển đổi số bắt đầu từ cơ sở, lan ra toàn tỉnh."],
      ],
      notes: "Vì là web tĩnh, gọn nhẹ, mô hình này rất dễ nhân rộng: một đơn vị khác chỉ cần thay logo, thông tin liên hệ và nội dung địa phương là dùng được ngay, không phát sinh chi phí. Tại phường Phú Thọ, Đoàn Thanh niên đồng hành cùng lực lượng Công an, trực tiếp hướng dẫn bà con cài đặt, quét mã QR và tra cứu, nhất là với người lớn tuổi. Đây là một cách làm chuyển đổi số từ cơ sở, có thể lan ra toàn tỉnh.",
    },
    {
      type: "conclusion", dark: true,
      kicker: "Kết luận & kiến nghị", title: "Từ phân tán → chủ động, thống nhất",
      bullets: [
        "Lần đầu có một điểm chạm số thống nhất, chính thống tại đơn vị.",
        "Kết quả thật, số liệu cụ thể, chi phí gần như bằng không.",
        "Hiệu quả cao · An toàn thông tin · Dễ nhân rộng.",
      ],
      askTitle: "KÍNH ĐỀ NGHỊ HỘI ĐỒNG",
      asks: ["Công nhận Sáng kiến cấp cơ sở năm 2026", "Cho phép áp dụng, nhân rộng sang các đơn vị khác"],
      thanks: "Trân trọng cảm ơn Hội đồng!",
      icon: "shield",
      notes: "Kính thưa Hội đồng. Từ chỗ thông tin phân tán, nay phường Phú Thọ đã có một điểm chạm số thống nhất, chính thống và chủ động phục vụ người dân. Sáng kiến cho kết quả thật, số liệu cụ thể, chi phí gần như bằng không và an toàn thông tin. Vì vậy, chúng tôi kính đề nghị Hội đồng: một là công nhận đây là Sáng kiến cấp cơ sở năm 2026; hai là cho phép áp dụng, nhân rộng sang các đơn vị khác trong tỉnh. Trân trọng cảm ơn Hội đồng đã lắng nghe.",
    },
    {
      type: "appendix",
      kicker: "Phụ lục kỹ thuật", title: "Chỉ trình chiếu khi được hỏi sâu",
      rows: [
        ["Nền tảng", "Web tĩnh HTML5 / CSS3 / JavaScript thuần — không backend, không CSDL"],
        ["Giao diện", "Be Vietnam Pro · FontAwesome 6 · mobile-first · glassmorphism"],
        ["Đa ngôn ngữ", "Cơ chế i18n tự xây — Tiếng Việt / English / 中文"],
        ["Trợ lý ảo", "Search engine nội bộ khớp từ khóa tiếng Việt không dấu"],
        ["Bảo mật", "Chống XSS (escapeHtml) · SRI cho CDN · định hướng CSP"],
        ["Triển khai", "Hosting tĩnh (Vercel) · phát hành qua mã QR"],
      ],
      notes: "Về mặt kỹ thuật, toàn bộ cổng là một web tĩnh viết bằng HTML, CSS và JavaScript thuần, không có máy chủ xử lý, không có cơ sở dữ liệu, nên gần như không có chi phí vận hành và rất khó bị tấn công kiểu truyền thống. Đa ngôn ngữ do chúng tôi tự xây bằng cơ chế i18n. Trợ lý ảo dùng một bộ tìm kiếm nội bộ khớp từ khóa tiếng Việt không dấu, dữ liệu nằm hoàn toàn trên máy người dùng. Về an toàn, chúng tôi đã xử lý chống tấn công XSS, gắn kiểm tra toàn vẹn SRI cho thư viện ngoài và định hướng áp dụng CSP. Sản phẩm được triển khai trên hạ tầng hosting tĩnh và phát hành tới người dân qua mã QR.",
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
  sync: FA.FaSyncAlt, user360: FA.FaUserShield, chart: FA.FaChartBar, lock: FA.FaLock,
  plug: FA.FaPlug, userlock: FA.FaUserLock, audit: FA.FaClipboardList, cap: FA.FaGraduationCap,
  check: FA.FaCheckCircle, alert: FA.FaExclamationTriangle, clock: FA.FaClock, coins: FA.FaCoins,
  copy: FA.FaCopy, hourglass: FA.FaHourglassHalf, layers: FA.FaLayerGroup, users: FA.FaUsers,
  excel: FA.FaFileExcel, eyeslash: FA.FaEyeSlash, seedling: FA.FaSeedling, flag: FA.FaFlag,
  arrow: FA.FaArrowRight, balance: FA.FaBalanceScale, trendUp: FA.FaArrowUp,
} : {};

async function renderIcon(key, color, size = 256) {
  if (!ICONS_OK || !FA_MAP[key]) return null;
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(FA_MAP[key], { color, size: String(size) })
  );
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
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
const fadeXml = (dur) =>
  `<p:transition ${P14} spd="med" p14:dur="${dur}"><p:fade/></p:transition>`;

async function applyTransitions(file, morphSet) {
  let JSZip;
  try { JSZip = require("jszip"); }
  catch (e) { console.warn("[transition] Thiếu jszip — bỏ qua hiệu ứng chuyển slide."); return { nMorph: 0, nFade: 0 }; }
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
  const PW = 13.3, M = 0.7;

  // Tải sẵn icon: trắng (trên nền màu) + đỏ (mũi tên/điểm nhấn sáng) + vàng (watermark)
  const usedKeys = new Set();
  const collect = (o) => {
    if (!o) return;
    if (o.icon) usedKeys.add(o.icon);
    (o.cards || []).forEach((c) => usedKeys.add(c[0]));
    (o.steps || []).forEach((c) => usedKeys.add(c[0]));
    (o.items || []).forEach((c) => Array.isArray(c) && usedKeys.add(c[0]));
  };
  collect(CONTENT.title);
  CONTENT.slides.forEach(collect);
  usedKeys.add("arrow");
  const ic = {}, icBrand = {}, icGold = {};
  for (const k of usedKeys) {
    ic[k] = await renderIcon(k, "#FFFFFF");
    icBrand[k] = await renderIcon(k, "#" + C.primary);
    icGold[k] = await renderIcon(k, "#" + C.lime);
  }

  const p = new pptxgen();
  p.defineLayout({ name: "WIDE", width: PW, height: 7.5 });
  p.layout = "WIDE";
  p.author = CONFIG.author;
  p.title = CONFIG.title;

  const sh = () => ({ type: "outer", color: C.deep2, blur: 9, offset: 3, angle: 135, opacity: 0.22 });
  const shLight = () => ({ type: "outer", color: "94A3B8", blur: 7, offset: 2, angle: 135, opacity: 0.28 });
  const bg = (s, color) => { s.background = { color }; };

  function head(s, kick, title, dark) {
    s.addText(String(kick).toUpperCase(), { x: M, y: 0.5, w: PW - 2 * M, h: 0.35, margin: 0, fontFace: BF, fontSize: 13, bold: true, color: dark ? C.mintTxt : C.primary, charSpacing: 2 });
    s.addText(title, { x: M, y: 0.84, w: PW - 2 * M, h: 0.85, margin: 0, fontFace: HF, fontSize: 29, bold: true, color: dark ? "FFFFFF" : C.ink, valign: "top" });
    // gạch chân vàng điểm nhấn (giống border-bottom accent của web)
    s.addShape(p.shapes.RECTANGLE, { x: M, y: 1.62, w: 1.1, h: 0.07, fill: { color: C.lime } });
  }
  function iconCircle(s, x, y, d, fill, iconData) {
    s.addShape(p.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, shadow: sh() });
    if (iconData) { const pad = d * 0.27; s.addImage({ data: iconData, x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad }); }
  }
  function shot(s, file, x, y, w, h, caption) {
    const full = path.join(CONFIG.shotsDir, file);
    if (!fs.existsSync(full)) {
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.06, fill: { color: "F1E3E5" }, line: { color: C.primary, width: 1, dashType: "dash" } });
      s.addText("(ảnh: " + file + ")", { x, y, w, h, margin: 0, fontFace: BF, fontSize: 12, italic: true, color: C.muted, align: "center", valign: "middle" });
    } else {
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.06, fill: { color: "FFFFFF" }, line: { color: C.cardBd, width: 2 }, shadow: sh() });
      const pad = 0.08;
      s.addImage({ path: full, x: x + pad, y: y + pad, w: w - 2 * pad, h: h - 2 * pad, sizing: { type: "contain", w: w - 2 * pad, h: h - 2 * pad } });
    }
    if (caption && caption.trim()) s.addText(caption, { x, y: y + h + 0.06, w, h: 0.32, margin: 0, fontFace: BF, fontSize: 12.5, italic: true, color: C.muted, align: "center" });
  }
  const col = (name) => C[name] || name;

  // ---- factories ----
  function titleSlide(d) {
    const s = p.addSlide(); bg(s, C.deep);
    // dải vàng dọc bên trái (điểm nhấn nhận diện)
    s.addShape(p.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 7.5, fill: { color: C.lime } });
    if (d.icon && icGold[d.icon]) s.addImage({ data: icGold[d.icon], x: 9.7, y: 1.0, w: 5.2, h: 5.2, transparency: 88 });
    s.addText(String(d.kicker).toUpperCase(), { x: M, y: 1.15, w: 9.5, h: 0.4, margin: 0, fontFace: BF, fontSize: 14, bold: true, color: C.mintTxt, charSpacing: 1.5 });
    s.addText(d.title, { x: M, y: 1.75, w: 11, h: 1.2, margin: 0, fontFace: HF, fontSize: 54, bold: true, color: "FFFFFF" });
    if (d.subtitle) s.addText(d.subtitle, { x: M, y: 3.15, w: 11, h: 0.7, margin: 0, fontFace: BF, fontSize: 23, color: C.mint2 });
    let cx = M;
    (d.chips || []).forEach((t) => {
      const w = 0.42 + t.length * 0.115;
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: cx, y: 4.1, w, h: 0.52, rectRadius: 0.26, fill: { color: C.primary }, line: { color: C.lime, width: 1 } });
      s.addText(t, { x: cx, y: 4.1, w, h: 0.52, margin: 0, fontFace: BF, fontSize: 14, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
      cx += w + 0.25;
    });
    if (d.author) s.addText([{ text: "Tác giả: ", options: { color: C.mintTxt } }, { text: d.author, options: { bold: true, color: "FFFFFF" } }], { x: M, y: 6.35, w: 11, h: 0.4, margin: 0, fontFace: BF, fontSize: 15 });
    s.addNotes(d.notes || "");
    return s;
  }
  function bigStatSlide(d) {
    const s = p.addSlide(); bg(s, d.dark ? C.deep : C.paper);
    head(s, d.kicker, d.title || "", d.dark);
    s.addText(d.stat, { x: M - 0.1, y: 2.0, w: 6.4, h: 1.7, margin: 0, fontFace: HF, fontSize: 90, bold: true, color: C.mintTxt, align: "center" });
    if (d.statSub) s.addText(d.statSub, { x: M, y: 3.7, w: 6.2, h: 0.9, margin: 0, fontFace: BF, fontSize: 18, color: d.dark ? C.mint2 : C.slate, align: "center" });
    (d.items || []).forEach((t, i) => {
      const y = 2.25 + i * 1.15;
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 7.1, y, w: PW - M - 7.1, h: 0.95, rectRadius: 0.1, fill: { color: d.dark ? C.cardDark : C.cardBg }, line: { color: C.lime, width: 1 } });
      iconCircle(s, 7.4, y + 0.18, 0.6, C.primary, ic[d.icon] || null);
      s.addText(t, { x: 8.2, y, w: PW - M - 8.35, h: 0.95, margin: 0, fontFace: BF, fontSize: 16, bold: true, color: d.dark ? "FFFFFF" : C.ink, valign: "middle" });
    });
    if (d.footer) s.addText(d.footer, { x: M, y: 6.15, w: PW - 2 * M, h: 0.7, margin: 0, fontFace: BF, fontSize: 16, italic: true, color: d.dark ? C.mintTxt : C.slate });
    s.addNotes(d.notes || "");
    return s;
  }
  function cardsSlide(d) {
    const s = p.addSlide(); bg(s, d.dark ? C.deep : C.paper);
    head(s, d.kicker, d.title || "", d.dark);
    const cards = d.cards || [];
    const n = cards.length;
    if (n <= 3) {
      const cw = (PW - 2 * M - (n - 1) * 0.5) / n;
      cards.forEach((row, i) => {
        const x = M + i * (cw + 0.5);
        s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: 2.4, w: cw, h: 3.3, rectRadius: 0.12, fill: { color: d.dark ? C.cardDark : C.cardBg }, line: { color: d.dark ? col(row[1]) : C.cardBd, width: 1 }, shadow: shLight() });
        iconCircle(s, x + cw / 2 - 0.6, 2.75, 1.2, col(row[1]), ic[row[0]] || null);
        s.addText(row[2], { x: x + 0.2, y: 4.1, w: cw - 0.4, h: 0.6, margin: 0, fontFace: HF, fontSize: 22, bold: true, color: d.dark ? "FFFFFF" : C.ink, align: "center" });
        s.addText(row[3], { x: x + 0.3, y: 4.75, w: cw - 0.6, h: 0.9, margin: 0, fontFace: BF, fontSize: 14.5, color: d.dark ? C.mint2 : C.slate, align: "center" });
      });
    } else {
      const cw = (PW - 2 * M - 0.5) / 2;
      cards.forEach((row, i) => {
        const x = M + (i % 2) * (cw + 0.5), y = 2.05 + Math.floor(i / 2) * 2.25;
        s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: 2.0, rectRadius: 0.1, fill: { color: d.dark ? C.cardDark : C.cardBg }, line: { color: d.dark ? col(row[1]) : C.cardBd, width: 1 }, shadow: shLight() });
        iconCircle(s, x + 0.35, y + 0.35, 0.9, col(row[1]), ic[row[0]] || null);
        s.addText(row[2], { x: x + 1.45, y: y + 0.32, w: cw - 1.7, h: 0.5, margin: 0, fontFace: HF, fontSize: 18, bold: true, color: d.dark ? "FFFFFF" : C.ink });
        s.addText(row[3], { x: x + 1.45, y: y + 0.85, w: cw - 1.7, h: 1.0, margin: 0, fontFace: BF, fontSize: 14, color: d.dark ? C.mint2 : C.slate });
      });
    }
    s.addNotes(d.notes || "");
    return s;
  }
  function stepsSlide(d) {
    const s = p.addSlide(); bg(s, C.paper);
    head(s, d.kicker, d.title || "");
    if (d.lead) s.addText(d.lead, { x: M, y: 1.8, w: PW - 2 * M, h: 0.6, margin: 0, fontFace: BF, fontSize: 16, color: C.slate });
    const steps = d.steps || [], n = steps.length;
    const sw = (PW - 2 * M - (n - 1) * 0.9) / n;
    steps.forEach((st, i) => {
      const x = M + i * (sw + 0.9), last = i === n - 1;
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: 2.7, w: sw, h: 3.4, rectRadius: 0.12, fill: { color: last ? C.deep : C.cardBg }, line: { color: last ? C.lime : C.cardBd, width: 1 }, shadow: shLight() });
      iconCircle(s, x + sw / 2 - 0.6, 3.05, 1.2, last ? C.green : C.primary, ic[st[0]] || null);
      s.addText(st[1], { x: x + 0.25, y: 4.45, w: sw - 0.5, h: 0.55, margin: 0, fontFace: HF, fontSize: 19, bold: true, color: last ? "FFFFFF" : C.ink, align: "center" });
      s.addText(st[2], { x: x + 0.3, y: 5.05, w: sw - 0.6, h: 0.95, margin: 0, fontFace: BF, fontSize: 14.5, color: last ? C.mint2 : C.slate, align: "center" });
      if (i < n - 1 && icBrand.arrow) s.addImage({ data: icBrand.arrow, x: x + sw + 0.22, y: 4.15, w: 0.46, h: 0.46 });
    });
    s.addNotes(d.notes || "");
    return s;
  }
  function gallerySlide(d) {
    const s = p.addSlide(); bg(s, C.paper);
    head(s, d.kicker, d.title || "");
    const g = d.shots || [];
    const gcW = (PW - 2 * M - 0.6) / 2;
    g.slice(0, 4).forEach((it, i) => {
      const x = M + (i % 2) * (gcW + 0.6), y = 1.95 + Math.floor(i / 2) * 2.62;
      shot(s, it[0], x, y, gcW, 2.05, it[1]);
    });
    s.addNotes(d.notes || "");
    return s;
  }
  function twoColSlide(d) {
    const s = p.addSlide(); bg(s, C.paper);
    head(s, d.kicker, d.title || "");
    (d.cards || []).slice(0, 2).forEach((f, i) => {
      const y = 2.0 + i * 2.15;
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y, w: 6.1, h: 1.95, rectRadius: 0.1, fill: { color: i === 1 ? C.deep : C.cardBg }, line: { color: i === 1 ? C.lime : C.cardBd, width: 1 }, shadow: shLight() });
      iconCircle(s, M + 0.3, y + 0.3, 0.85, col(f[1]), ic[f[0]] || null);
      s.addText(f[2], { x: M + 1.4, y: y + 0.28, w: 4.55, h: 0.5, margin: 0, fontFace: HF, fontSize: 18, bold: true, color: i === 1 ? "FFFFFF" : C.ink });
      s.addText(f[3], { x: M + 1.4, y: y + 0.8, w: 4.55, h: 1.0, margin: 0, fontFace: BF, fontSize: 13.5, color: i === 1 ? C.mint2 : C.slate });
    });
    if (d.shot) shot(s, d.shot[0], 7.15, 2.1, 5.45, 3.7, d.shot[1]);
    s.addNotes(d.notes || "");
    return s;
  }
  function servicesSlide(d) {
    const s = p.addSlide(); bg(s, C.paper);
    head(s, d.kicker, d.title || "");
    const items = d.items || [];
    const cols = 2;
    const cw = (PW - 2 * M - 0.5) / cols;
    const rh = 0.74, gap = 0.18, y0 = 2.0;
    items.forEach((it, i) => {
      const x = M + (i % cols) * (cw + 0.5);
      const y = y0 + Math.floor(i / cols) * (rh + gap);
      const accent = i % 2 ? C.green : C.primary;
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: rh, rectRadius: 0.09, fill: { color: C.cardBg }, line: { color: C.cardBd, width: 1 }, shadow: shLight() });
      iconCircle(s, x + 0.18, y + 0.12, rh - 0.24, accent, ic[it[0]] || null);
      s.addText(it[1], { x: x + 0.95, y: y + 0.08, w: cw - 1.15, h: 0.34, margin: 0, fontFace: HF, fontSize: 15.5, bold: true, color: C.ink, valign: "middle" });
      s.addText(it[2] || "", { x: x + 0.95, y: y + 0.4, w: cw - 1.15, h: 0.28, margin: 0, fontFace: BF, fontSize: 11.5, color: C.muted, valign: "middle" });
    });
    s.addNotes(d.notes || "");
    return s;
  }
  function resultSlide(d) {
    const s = p.addSlide(); bg(s, C.deep);
    s.addText(String(d.kicker).toUpperCase(), { x: M, y: 0.6, w: 10, h: 0.4, margin: 0, fontFace: BF, fontSize: 14, bold: true, color: C.mintTxt, charSpacing: 2 });
    s.addText(d.title || "", { x: M, y: 0.98, w: 11.5, h: 0.8, margin: 0, fontFace: HF, fontSize: 30, bold: true, color: "FFFFFF" });
    const cards = (d.cards || []).slice(0, 2);
    cards.forEach((row, i) => {
      const x = i === 0 ? M : 7.0, w = i === 0 ? 6.0 : PW - M - 7.0;
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: 2.1, w, h: 3.5, rectRadius: 0.12, fill: { color: C.cardDark }, line: { color: col(row[1]), width: 1.2 }, shadow: sh() });
      if (icGold[row[0]]) s.addImage({ data: icGold[row[0]], x: x + 0.45, y: 2.22, w: 1.05, h: 1.05, transparency: 86 });
      s.addText(row[2], { x: x + 0.3, y: 2.28, w: w - 0.6, h: 0.95, margin: 0, fontFace: HF, fontSize: 60, bold: true, color: C.mintTxt });
      s.addText(row[3], { x: x + 0.3, y: 3.5, w: w - 0.6, h: 1.9, margin: 0, fontFace: BF, fontSize: 15, color: "FFFFFF" });
    });
    if (d.footer) {
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y: 5.9, w: PW - 2 * M, h: 0.95, rectRadius: 0.1, fill: { color: C.primary }, line: { color: C.lime, width: 1 } });
      s.addText(d.footer, { x: M + 0.2, y: 5.9, w: PW - 2 * M - 0.4, h: 0.95, margin: 0, fontFace: BF, fontSize: 15, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    }
    s.addNotes(d.notes || "");
    return s;
  }
  function conclusionSlide(d) {
    const s = p.addSlide(); bg(s, C.deep);
    if (d.icon && icGold[d.icon]) s.addImage({ data: icGold[d.icon], x: 9.9, y: 1.2, w: 4.8, h: 4.8, transparency: 90 });
    s.addText(String(d.kicker).toUpperCase(), { x: M, y: 0.6, w: 10, h: 0.4, margin: 0, fontFace: BF, fontSize: 14, bold: true, color: C.mintTxt, charSpacing: 2 });
    s.addText(d.title || "", { x: M, y: 0.98, w: 11.5, h: 0.8, margin: 0, fontFace: HF, fontSize: 30, bold: true, color: "FFFFFF" });
    (d.bullets || []).forEach((t, i) => {
      const y = 2.05 + i * 0.85;
      if (icGold.check) s.addImage({ data: icGold.check, x: M, y: y + 0.05, w: 0.45, h: 0.45 });
      s.addText(t, { x: M + 0.65, y, w: 8.8, h: 0.6, margin: 0, fontFace: BF, fontSize: 17, color: C.mint2, valign: "middle" });
    });
    if (d.asks && d.asks.length) {
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y: 4.95, w: PW - 2 * M, h: 1.7, rectRadius: 0.12, fill: { color: C.cardDark }, line: { color: C.lime, width: 1.3 }, shadow: sh() });
      s.addText((d.askTitle || "KÍNH ĐỀ NGHỊ").toUpperCase(), { x: M + 0.5, y: 5.15, w: 11, h: 0.45, margin: 0, fontFace: BF, fontSize: 14, bold: true, color: C.mintTxt, charSpacing: 1.5 });
      s.addText(d.asks.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < d.asks.length - 1 } })), { x: M + 0.55, y: 5.6, w: 11, h: 1.0, margin: 0, fontFace: BF, fontSize: 18, bold: true, color: "FFFFFF", paraSpaceAfter: 6 });
    }
    if (d.thanks) s.addText(d.thanks, { x: M, y: 6.85, w: PW - 2 * M, h: 0.4, margin: 0, fontFace: HF, fontSize: 16, italic: true, color: C.mintTxt, align: "right" });
    s.addNotes(d.notes || "");
    return s;
  }
  function appendixSlide(d) {
    const s = p.addSlide(); bg(s, C.paper);
    head(s, d.kicker, d.title || "");
    const rows = d.rows || [];
    let y = 1.9;
    rows.forEach((r, i) => {
      s.addShape(p.shapes.RECTANGLE, { x: M, y, w: 3.5, h: 0.62, fill: { color: i % 2 ? C.cardBg : "FBE4E7" } });
      s.addShape(p.shapes.RECTANGLE, { x: M + 3.5, y, w: PW - 2 * M - 3.5, h: 0.62, fill: { color: i % 2 ? "FFFFFF" : "FFF8F9" } });
      s.addText(r[0], { x: M + 0.15, y, w: 3.2, h: 0.62, margin: 0, fontFace: HF, fontSize: 14, bold: true, color: C.primary, valign: "middle" });
      s.addText(r[1], { x: M + 3.65, y, w: PW - 2 * M - 3.7, h: 0.62, margin: 0, fontFace: BF, fontSize: 13.5, color: C.slate, valign: "middle" });
      y += 0.62;
    });
    s.addNotes(d.notes || "");
    return s;
  }

  const FACTORY = { title: titleSlide, bigStat: bigStatSlide, cards: cardsSlide, steps: stepsSlide, gallery: gallerySlide, twoCol: twoColSlide, services: servicesSlide, result: resultSlide, conclusion: conclusionSlide, appendix: appendixSlide };

  // ---- assemble ----
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
