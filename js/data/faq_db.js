/**
 * CƠ SỞ DỮ LIỆU CÂU HỎI THƯỜNG GẶP (STATIC DATABASE)
 * ---------------------------------------------------
 * File này chứa toàn bộ dữ liệu Text của Chatbot.
 * Dễ dàng cập nhật, sửa đổi mà không ảnh hưởng đến Logic code.
 */

// 1. Danh sách Danh mục chính (Root Category)
// Export to Global Scope for direct file access
window.MAIN_CATEGORIES = [
    { id: 'cu_tru', icon: 'fa-solid fa-house-user', text: 'Cư trú', keywords: ['thuong tru', 'tam tru', 'tach ho', 'ct01', 'ct07', 'luu tru'] },
    { id: 'cccd', icon: 'fa-solid fa-id-card', text: 'Căn cước (CCCD)', keywords: ['cccd', 'can cuoc', 'gan chip', 'cap lai', 'cmnd'] },
    { id: 'dinh_danh', icon: 'fa-solid fa-passport', text: 'Định danh (VNeID)', keywords: ['vneid', 'dinh danh', 'muc 2', 'tai khoan', 'khoa can cuoc'] },
    { id: 'lien_thong', icon: 'fa-solid fa-link', text: 'Thủ tục liên thông', keywords: ['lien thong', 'khai sinh', 'khai tu', 'xoa thuong tru', 'bhyt', 'mai tang phi', 'tu tuat'] },
    { id: 'xe', icon: 'fa-solid fa-motorcycle', text: 'Đăng ký xe', keywords: ['dang ky xe', 'bien so', 'sang ten', 'xe may', 'o to', 'cap lai'] },
    { id: 'xuat_nhap_canh', icon: 'fa-solid fa-plane-departure', text: 'Xuất nhập cảnh', keywords: ['ho chieu', 'visa', 'nguoi nuoc ngoai', 'tam tru', 'apec'] },
    { id: 'vu_khi', icon: 'fa-solid fa-person-military-rifle', text: 'Vũ khí & CCHT', keywords: ['vu khi', 'dao', 'kiem', 'phao', 'cong cu ho tro', 'khai bao'] },
    { id: 'kinh_doanh', icon: 'fa-solid fa-shop', text: 'Ngành nghề KD', keywords: ['an ninh trat tu', 'nha nghi', 'gas', 'pccc', 'giay phep'] },
    { id: 'khieu_nai', icon: 'fa-solid fa-file-pen', text: 'Khiếu nại & Tố cáo', keywords: ['khieu nai', 'to cao', 'don thu', 'cong an xa'] },
    { id: 'cap_tinh', icon: 'fa-solid fa-building-columns', text: 'Thủ tục Công an tỉnh', url: 'modules/thu-tuc-cap-tinh.html', keywords: ['ho chieu', 'passport', 'mat ho chieu', 'gplx', 'giay phep lai xe', 'bang lai', 'doi bang lai', 'mat bang lai', 'ly lich tu phap', 'phieu ly lich tu phap', 'visa', 'thi thuc', 'the tam tru', 'gia han tam tru', 'giay antt', 'giay phep an ninh trat tu', 'dang ky xe cap tinh', 'phong csgt', 'cap tinh'] }
];

// 2. Chi tiết câu hỏi và trả lời
// Export to Global Scope
window.FAQ_DATA = {
    'cu_tru': [
        {
            text: "Tôi muốn đăng ký thường trú vào nhà thuê, mượn hoặc ở nhờ thì cần chuẩn bị hồ sơ gồm những giấy tờ gì?",
            answer: "<b>Hồ sơ gồm:</b><br>1. <b>Tờ khai thay đổi thông tin cư trú (Mẫu CT01):</b> Trong đó phải ghi rõ ý kiến đồng ý cho đăng ký thường trú của chủ hộ, chủ sở hữu chỗ ở hợp pháp được cho thuê, cho mượn, cho ở nhờ hoặc người được ủy quyền (trừ trường hợp đã có ý kiến đồng ý bằng văn bản).<br>2. <b>Hợp đồng, văn bản về việc cho thuê, cho mượn, cho ở nhờ:</b> Các văn bản này phải được công chứng hoặc chứng thực theo quy định của pháp luật.<br>3. <b>Giấy tờ chứng minh diện tích nhà ở:</b> Giấy tờ, tài liệu chứng minh bảo đảm diện tích nhà ở tối thiểu để đăng ký thường trú (nếu chưa có trên CSDL).<br><b>Lưu ý:</b> Nếu cơ quan đăng ký cư trú có thể khai thác thông tin trên CSDLQG về dân cư thì công dân không cần nộp giấy tờ chứng minh diện tích.",
            keywords: ["dang ky thuong tru", "nha thue", "o nho", "muon nha", "ct01"]
        },
        {
            text: "Mức thu lệ phí khi thực hiện đăng ký thường trú và đăng ký tạm trú hiện nay là bao nhiêu?",
            answer: "<b>Đăng ký thường trú:</b><br>- Trực tiếp: 20.000 đồng/lần.<br>- Trực tuyến: 10.000 đồng/lần.<br><br><b>Đăng ký tạm trú:</b><br>- Trực tiếp: 15.000 đồng/lần.<br>- Trực tuyến: 7.000 đồng/lần.<br>👉 Trẻ em, người cao tuổi, người có công... được miễn phí nếu có giấy tờ chứng minh.",
            keywords: ["le phi", "tien", "chi phi", "dang ky thuong tru", "tam tru"]
        },
        {
            text: "Thời hạn giải quyết thủ tục đăng ký thường trú và tạm trú là bao lâu?",
            answer: "<b>Thường trú:</b> 07 ngày làm việc kể từ ngày nhận đủ hồ sơ.<br><b>Tạm trú:</b> 03 ngày làm việc kể từ ngày nhận đủ hồ sơ.<br><b>Gia hạn tạm trú:</b> 03 ngày làm việc.<br><b>Tách hộ:</b> 05 ngày làm việc.",
            keywords: ["thoi gian", "bao lau", "ngay lam viec", "giai quyet"]
        },
        {
            text: "Đăng ký cư trú online có cần nộp bản sao công chứng giấy tờ không?",
            answer: "<b>Không bắt buộc.</b><br>Bạn chỉ cần chụp/scan bản chính rõ nét và tải lên. Khi cán bộ kiểm tra, xác minh, bạn có trách nhiệm xuất trình bản gốc để đối chiếu. Nếu thông tin đã có trên CSDL quốc gia thì không cần nộp lại.",
            keywords: ["online", "cong chung", "ban sao", "nop ho so"]
        },
        {
            text: "Điều kiện và thủ tục để thực hiện \"Tách hộ\" là gì?",
            answer: "<b>Điều kiện:</b> Có năng lực hành vi dân sự đầy đủ; chung chỗ ở hợp pháp; được chủ hộ đồng ý.<br><b>Hồ sơ:</b> Tờ khai CT01 (ghi rõ ý kiến đồng ý tách hộ của chủ hộ và chủ sở hữu chỗ ở hợp pháp).<br><b>Lệ phí:</b> 10.000đ (trực tiếp) / 5.000đ (online).",
            keywords: ["tach ho", "dieu kien", "thu tuc", "ho so"]
        },
        {
            text: "Khi gia đình có người thân qua đời hoặc thuộc diện xóa đăng ký thường trú thì thời hạn làm thủ tục là bao lâu?",
            answer: "Trong thời hạn <b>07 ngày</b> kể từ ngày sự việc xảy ra, đại diện hộ gia đình phải làm thủ tục xóa đăng ký. Nếu không tự giác, Công an sẽ lập biên bản và tự xóa đăng ký.",
            keywords: ["xoa thuong tru", "nguoi mat", "ra nuoc ngoai", "xoa dang ky"]
        },
        {
            text: "Người thân đến chơi và ngủ lại có cần thông báo lưu trú không? Thời gian thông báo thế nào?",
            answer: "<b>Bắt buộc thông báo.</b><br>Thời gian: Trước <b>23 giờ</b> cùng ngày. Nếu khách đến sau 23 giờ thì thông báo trước <b>08 giờ sáng hôm sau</b>.<br>Nếu là người thân (ông bà, cha mẹ, vợ chồng, con...) đến nhiều lần thì chỉ cần thông báo 1 lần.",
            keywords: ["luu tru", "thong bao", "khach den choi", "nguoi than"]
        },
        {
            text: "Xin giấy \"Xác nhận thông tin về cư trú\" (CT07) mất bao lâu và làm ở đâu?",
            answer: "<b>Nơi làm:</b> Công an cấp xã bất kỳ hoặc Online.<br><b>Thời gian:</b><br>- 0,5 ngày (nếu thông tin có sẵn trong CSDL).<br>- 03 ngày (nếu cần xác minh).<br>👉 Thủ tục này <b>Miễn phí</b>.",
            keywords: ["ct07", "xac nhan cu tru", "xin giay", "thoi gian"]
        },
        {
            text: "Gia hạn tạm trú khi nào và thủ tục ra sao?",
            answer: "Phải làm thủ tục trước khi hết hạn <b>15 ngày</b>.<br>Thủ tục giống như đăng ký ban đầu. Nếu chủ hộ đồng ý thì không cần xuất trình lại giấy tờ chứng minh chỗ ở hợp pháp.",
            keywords: ["gia han", "tam tru", "het han", "thu tuc"]
        },
        {
            text: "Những trường hợp nào bắt buộc phải \"Khai báo tạm vắng\"?",
            answer: "Bắt buộc đối với: Bị can, bị cáo, người bị quản chế, người bị kết án phạt tù... hoặc người đi khỏi nơi cư trú theo quy định đặc biệt.<br>Công dân bình thường đi vắng không bắt buộc phải làm thủ tục này.",
            keywords: ["tam vang", "khai bao", "bat buoc"]
        }
    ],
    'lien_thong': [
        {
            text: "Thủ tục liên thông khai sinh, thường trú và cấp thẻ BHYT cho trẻ dưới 06 tuổi gồm những gì?",
            answer: "<b>Gồm 03 thủ tục:</b><br>1. Đăng ký khai sinh.<br>2. Đăng ký thường trú.<br>3. Cấp thẻ bảo hiểm y tế cho trẻ em dưới 06 tuổi.<br><br>Người dân nộp <b>01 bộ hồ sơ trực tuyến</b> trên Cổng DVC Quốc gia hoặc ứng dụng VNeID. Hồ sơ được chuyển xử lý giữa UBND cấp xã, cơ quan Công an và cơ quan Bảo hiểm xã hội.",
            keywords: ["lien thong", "khai sinh", "thuong tru", "bhyt", "tre em", "duoi 6 tuoi"]
        },
        {
            text: "Thủ tục liên thông khai tử, xóa thường trú, mai táng phí và tử tuất thực hiện ra sao?",
            answer: "<b>Gồm các thủ tục có thể chọn liên thông:</b><br>1. Đăng ký khai tử.<br>2. Xóa đăng ký thường trú.<br>3. Giải quyết mai táng phí.<br>4. Giải quyết chế độ tử tuất nếu đủ điều kiện.<br><br>Sau khi có Trích lục khai tử điện tử, hệ thống chuyển hồ sơ đến quản lý cư trú để xóa thường trú và đến BHXH hoặc ngành Lao động - Thương binh và Xã hội để giải quyết chế độ.",
            keywords: ["lien thong", "khai tu", "xoa thuong tru", "mai tang phi", "tu tuat", "nguoi mat"]
        },
        {
            text: "Nộp hồ sơ liên thông khai sinh, khai tử ở đâu?",
            answer: "Người dân có thể thực hiện trên <b>Cổng Dịch vụ công Quốc gia</b> hoặc trên <b>ứng dụng VNeID</b>, chọn mục dịch vụ công liên thông khai sinh, khai tử. Có thể tra cứu thêm danh mục, thành phần hồ sơ tại <b>Cổng Dịch vụ công Bộ Công an</b>.",
            keywords: ["nop o dau", "dich vu cong quoc gia", "vneid", "bo cong an", "online"]
        },
        {
            text: "Thời hạn giải quyết các thủ tục liên thông là bao lâu?",
            answer: "<b>Khai sinh - thường trú - BHYT:</b> Thông thường 03 ngày làm việc, trường hợp cần xác minh không quá 05 ngày làm việc.<br><br><b>Khai tử - xóa thường trú - mai táng phí, tử tuất:</b> Tùy nhóm đối tượng, khoảng 06-18 ngày làm việc theo hồ sơ và chế độ được lựa chọn.",
            keywords: ["thoi han", "bao lau", "ngay lam viec", "giai quyet", "lien thong"]
        }
    ],
    'cccd': [
        {
            text: "Tôi muốn làm Thẻ căn cước cho trẻ dưới 14 tuổi thì thủ tục như thế nào?",
            answer: "<b>Dưới 06 tuổi:</b> Làm online 100% trên DVC/VNeID, <b>không cần đưa trẻ đến</b>, không thu nhận sinh trắc học.<br><b>06-14 tuổi:</b> Cha mẹ đưa trẻ đến Công an để thu nhận vân tay, mống mắt, ảnh khuôn mặt.<br>Thời hạn: 07 ngày làm việc.",
            keywords: ["tre em", "duoi 14 tuoi", "lam can cuoc", "thu tuc"]
        },
        {
            text: "Bị mất Thẻ căn cước làm lại có cần chụp ảnh/lăn tay lại không?",
            answer: "<b>Không bắt buộc.</b><br>Cán bộ sẽ sử dụng ảnh và vân tay cũ trong CSDL để cấp lại thẻ. Bạn có thể làm online hoàn toàn.<br>Lệ phí: 70.000đ.",
            keywords: ["cap lai", "mat the", "anh cu", "van tay"]
        },
        {
            text: "Thông tin trong CSDL bị sai (năm sinh, nơi sinh) thì điều chỉnh mất bao lâu?",
            answer: "Nộp hồ sơ tại Công an xã hoặc Online.<br>Thời gian giải quyết: <b>02 ngày làm việc</b>.<br>Miễn phí.",
            keywords: ["sai thong tin", "dinh chinh", "tuoi", "noi sinh"]
        },
        {
            text: "Xin xác nhận số CMND 9 số cũ để giao dịch ngân hàng?",
            answer: "Nộp tại Công an xã hoặc Online.<br><b>Thời gian:</b> 03 ngày (nếu có dữ liệu) hoặc 07 ngày (nếu cần tra cứu).<br>Kết quả: Giấy xác nhận số CMND 09 số (Mẫu CC04).",
            keywords: ["xac nhan so", "cmnd 9 so", "chung minh thu", "cc04"]
        },
        {
            text: "Tích hợp GPLX, BHYT vào Căn cước như thế nào?",
            answer: "Có 2 cách:<br>1. Yêu cầu tích hợp khi đi làm thẻ Căn cước.<br>2. Nộp hồ sơ riêng qua VNeID/DVC để đề nghị tích hợp.<br>Thời gian: 07 ngày làm việc.",
            keywords: ["tich hop", "giay phep lai xe", "bang lai", "bhyt"]
        },
        {
            text: "Thu thập ADN và Giọng nói vào Căn cước thực hiện ra sao?",
            answer: "<b>ADN:</b> Phải có kết quả xét nghiệm của tổ chức y tế/giám định hợp pháp, Công an không tự xét nghiệm.<br><b>Giọng nói:</b> Công an thu nhận trực tiếp tại trụ sở.<br>Thời gian: 07 ngày làm việc.",
            keywords: ["adn", "giong noi", "sinh trac hoc"]
        },
        {
            text: "\"Giấy chứng nhận căn cước\" là gì?",
            answer: "Là giấy tờ cấp cho <b>người gốc Việt Nam chưa xác định được quốc tịch</b> đang sinh sống tại VN từ 06 tháng trở lên.<br>Thủ tục cấp tại Công an xã, miễn phí, thời gian 15 ngày.",
            keywords: ["nguoi goc viet", "giay chung nhan", "chua co quoc tich"]
        },
        {
            text: "Độ tuổi nào bắt buộc phải đi đổi Thẻ căn cước?",
            answer: "Bắt buộc đổi khi công dân đủ: <b>14 tuổi, 25 tuổi, 40 tuổi, 60 tuổi</b>.<br>Ngoài ra đổi khi thẻ hỏng, thay đổi thông tin...",
            keywords: ["doi the", "het han", "tuoi quy dinh", "14", "25", "40", "60"]
        },
        {
            text: "Trường hợp nào được Hủy và xác lập lại số định danh cá nhân?",
            answer: "Chỉ khi:<br>1. Xác định lại giới tính hoặc cải chính năm sinh.<br>2. Có sai sót về nơi sinh, năm sinh, giới tính do lỗi thu thập dữ liệu.<br>Thời gian: 15 ngày làm việc.",
            keywords: ["so dinh danh", "huy so", "sai sot", "dinh chinh"]
        },
        {
            text: "Tôi có thể kiểm tra thông tin người khác trong CSDL không?",
            answer: "<b>Được, nhưng có điều kiện.</b><br>Phải được người đó đồng ý (hoặc người giám hộ đồng ý). Nộp phiếu yêu cầu (Mẫu DC02) tại Công an xã và phải nộp phí khai thác.",
            keywords: ["khai thac", "tra cuu", "thong tin nguoi khac"]
        }
    ],
    'dinh_danh': [
        {
            text: "Đăng ký tài khoản định danh VNeID Mức 2 ở đâu? Cần mang gì?",
            answer: "<b>Bắt buộc đến Công an xã/phường.</b><br>Mang theo: Thẻ Căn cước gắn chip + Điện thoại chính chủ + Các giấy tờ muốn tích hợp (GPLX, Đăng ký xe...).",
            keywords: ["vneid muc 2", "dang ky", "o dau", "thu tuc"]
        },
        {
            text: "Cấp VNeID mức 2 cho trẻ dưới 14 tuổi?",
            answer: "Cha mẹ đưa trẻ đến Công an xã. Sử dụng số điện thoại của cha/mẹ để đăng ký tài khoản cho con.",
            keywords: ["tre em", "con nho", "duoi 14"]
        },
        {
            text: "Thời gian cấp tài khoản VNeID mức 2?",
            answer: "<b>03 ngày làm việc:</b> Nếu đã có thẻ Căn cước gắn chip.<br><b>07 ngày làm việc:</b> Nếu làm cùng lúc với cấp thẻ Căn cước.",
            keywords: ["thoi gian", "bao lau", "cap tai khoan"]
        },
        {
            text: "Mất điện thoại, muốn khóa VNeID/Căn cước điện tử ngay lập tức?",
            answer: "Yêu cầu khóa tại Công an xã hoặc tự khóa trên ứng dụng VNeID (bằng thiết bị khác). Hệ thống sẽ <b>thực hiện khóa ngay lập tức</b>.",
            keywords: ["khoa tai khoan", "mat dien thoai", "khoa gap"]
        },
        {
            text: "Chưa có Căn cước chip (dùng CMND cũ) có làm VNeID mức 2 được không?",
            answer: "<b>Được.</b><br>Nhưng phải làm thủ tục cấp Căn cước gắn chip <b>đồng thời</b> với đăng ký tài khoản định danh mức 2.",
            keywords: ["cmnd cu", "chua doi the", "muc 2"]
        },
        {
            text: "Muốn mở khóa Căn cước điện tử thì làm thế nào?",
            answer: "Đến Công an xã hoặc yêu cầu mở khóa trên ứng dụng VNeID. Hệ thống sẽ mở khóa <b>ngay lập tức</b> sau khi xác thực.",
            keywords: ["mo khoa", "bi khoa", "khoa can cuoc"]
        },
        {
            text: "Doanh nghiệp/Tổ chức đăng ký VNeID như thế nào?",
            answer: "Người đại diện pháp luật dùng VNeID cá nhân để đăng ký online, hoặc đến trực tiếp Trung tâm dữ liệu quốc gia về dân cư (C06).",
            keywords: ["doanh nghiep", "to chuc", "cong ty"]
        },
        {
            text: "Thời gian cấp VNeID cho tổ chức?",
            answer: "03 ngày (nếu thông tin đã có trong CSDL) hoặc 15 ngày (nếu cần xác minh).",
            keywords: ["thoi gian", "to chuc"]
        },
        {
            text: "Cơ quan tố tụng yêu cầu khóa VNeID thì mất bao lâu?",
            answer: "Tổng thời gian giải quyết là <b>03 ngày làm việc</b> (Công an xã -> Cục C06 -> Phê duyệt).",
            keywords: ["to tung", "toa an", "yeu cau khoa"]
        },
        {
            text: "Phí đăng ký, khóa/mở khóa VNeID là bao nhiêu?",
            answer: "<b>Hoàn toàn Miễn phí.</b>",
            keywords: ["phi", "tien", "le phi", "mien phi"]
        }
    ],
    'xe': [
        {
            text: "Đăng ký xe mới online toàn trình cần điều kiện gì?",
            answer: "1. Chủ xe là công dân VN có VNeID mức 2.<br>2. Xe sản xuất lắp ráp trong nước (có phiếu xuất xưởng điện tử).<br>👉 Nhận biển số, giấy tờ qua bưu điện. Nộp lại phiếu xuất xưởng bản giấy qua bưu điện.",
            keywords: ["dang ky xe", "online", "toan trinh", "xe moi"]
        },
        {
            text: "Thủ tục Sang tên đổi chủ (Mua bán xe) gồm những bước nào?",
            answer: "<b>Bước 1 (Chủ cũ):</b> Làm thủ tục <b>Thu hồi</b> biển số, đăng ký xe (giữ lại nộp cho Công an).<br><b>Bước 2 (Chủ mới):</b> Làm thủ tục <b>Sang tên</b> (cần chứng nhận thu hồi của chủ cũ).",
            keywords: ["sang ten", "mua ban", "thu hoi", "doi chu"]
        },
        {
            text: "Thời hạn sang tên xe là bao lâu? Quá hạn có bị phạt không?",
            answer: "Trong vòng <b>30 ngày</b> kể từ ngày làm giấy mua bán, chủ cũ phải làm thủ tục thu hồi. Quá hạn sẽ bị phạt.",
            keywords: ["qua han", "cham sang ten", "phat", "thoi han"]
        },
        {
            text: "Mất đăng ký xe hoặc biển số, xin cấp lại mất bao lâu?",
            answer: "<b>Xác minh:</b> 30 ngày.<br><b>Cấp lại:</b> 02 ngày sau khi xác minh xong.",
            keywords: ["mat giay to", "mat bien", "cap lai", "thoi gian"]
        },
        {
            text: "Sơn lại màu xe có cần mang xe đến công an không?",
            answer: "<b>Có.</b> Phải khai báo online lấy mã hồ sơ -> Mang xe đến Công an kiểm tra thực tế -> Cấp đổi đăng ký.",
            keywords: ["doi mau son", "son xe", "thay doi mau"]
        },
        {
            text: "Đăng ký xe tạm thời có giá trị bao lâu?",
            answer: "Xe di chuyển (từ kho, cảng): 15 ngày.<br>Xe chạy thử nghiệm: Tối đa 06 tháng.<br>Có thể làm <b>Online 100%</b> và nhận kết quả trong 8 giờ.",
            keywords: ["tam thoi", "xe moi mua", "thoi han"]
        },
        {
            text: "Xe hết niên hạn/hư hỏng không dùng được thì làm gì?",
            answer: "Phải làm thủ tục <b>Thu hồi</b> online trong thời hạn 07 ngày. Trả biển số qua bưu điện. Không mất phí.",
            keywords: ["xe nat", "het nien han", "thu hoi"]
        },
        {
            text: "Thời gian cấp biển số lần đầu là bao lâu?",
            answer: "<b>Trực tiếp:</b> Cấp ngay.<br><b>Online:</b> Không quá 08 giờ làm việc.",
            keywords: ["bao lau", "thoi gian", "bien so"]
        },
        {
            text: "Nhận giấy tờ xe tại nhà được không?",
            answer: "<b>Được.</b> Bạn có thể đăng ký dịch vụ bưu chính công ích để nhận kết quả tại nhà.",
            keywords: ["buu dien", "nhan tai nha", "tra ket qua"]
        }
    ],
    'xuat_nhap_canh': [
        {
            text: "Thời hạn phải báo mất hộ chiếu phổ thông?",
            answer: "Trong thời hạn <b>02 ngày làm việc</b> kể từ ngày phát hiện hộ chiếu phổ thông bị mất, bạn phải thực hiện thủ tục trình báo mất hộ chiếu.<br><br><b>Trường hợp bất khả kháng:</b> Nếu vì lý do bất khả kháng (như ốm đau, thiên tai, tai nạn...), thời hạn có thể dài hơn nhưng phải <b>giải thích cụ thể</b> trong đơn.",
            keywords: ["mat ho chieu", "trinh bao", "thoi han", "bao lau"]
        },
        {
            text: "Báo mất hộ chiếu ở đâu?",
            answer: "<b>Nơi nộp:</b> Công an cấp xã nơi gần nhất hoặc thuận lợi nhất (không bắt buộc về nơi thường trú).<br><b>Hình thức:</b> Trực tiếp, Online qua cổng DVC, hoặc qua bưu chính.",
            keywords: ["o dau", "online", "dia diem", "nop ho so"]
        },
        {
            text: "Sau bao lâu hộ chiếu bị hủy giá trị?",
            answer: "Sau 01 ngày làm việc kể từ khi nhận đơn, Công an xã báo lên Cục. Sau 01 ngày tiếp theo, Cục QLXNC sẽ hủy giá trị sử dụng của hộ chiếu.",
            keywords: ["huy ho chieu", "gia tri"]
        },
        {
            text: "Thời hạn khai báo tạm trú cho người nước ngoài?",
            answer: "<b>Thông thường:</b> Trong vòng <b>12 giờ</b> kể từ khi khách đến.<br><b>Vùng sâu, vùng xa:</b> Trong vòng <b>24 giờ</b>.",
            keywords: ["thoi han", "khai bao", "bao lau", "nguoi nuoc ngoai"]
        },
        {
            text: "Mất thẻ APEC (ABTC) báo trong bao lâu?",
            answer: "Trong thời hạn <b>48 giờ</b> (tính theo giờ) kể từ khi phát hiện mất thẻ.",
            keywords: ["the apec", "abtc", "doanh nhan", "mat the"]
        },
        {
            text: "Kết quả báo mất thẻ ABTC?",
            answer: "Công an xã thông báo đã chuyển đơn (Mẫu CV04). Sau khoảng 03 ngày, Cục QLXNC thông báo kết quả giải quyết (Mẫu CV05).",
            keywords: ["ket qua", "apec"]
        },
        {
            text: "Mất giấy thông hành biên giới?",
            answer: "Báo mất trong vòng <b>02 ngày làm việc</b>. Nộp tại Công an xã hoặc Online. Giấy thông hành sẽ bị hủy giá trị sau 01 ngày.",
            keywords: ["thong hanh", "bien gioi", "lao", "trung quoc"]
        },
        {
            text: "Lệ phí trình báo mất giấy tờ, khai báo tạm trú?",
            answer: "<b>Hoàn toàn Miễn phí.</b>",
            keywords: ["le phi", "tien", "chi phi", "mien phi"]
        },
        {
            text: "Đăng ký tài khoản khai báo tạm trú cho người nước ngoài ở đâu?",
            answer: "Truy cập trang <b>https://tbltkbtt.bocongan.gov.vn/</b> -> Chọn Đăng ký -> Điền thông tin -> Xác nhận.",
            keywords: ["tai khoan", "dang ky", "kbtt", "trang web"]
        },
        {
            text: "Lấy mã xác thực (Google Authenticator) để đăng nhập KBTT?",
            answer: "Tải app Google Authenticator -> Quét mã QR khi đăng nhập lần đầu. Các lần sau mở app lấy mã 6 số để đăng nhập.",
            keywords: ["google authenticator", "ma xac thuc", "token", "otp"]
        },
        {
            text: "Hệ thống KBTT có tự động lấy thông tin từ ảnh hộ chiếu không?",
            answer: "<b>Có.</b> Ấn nút 'Tải lên' và chọn ảnh hộ chiếu, hệ thống sẽ tự động điền thông tin. Bạn cần kiểm tra lại trước khi Lưu.",
            keywords: ["tu dong", "scan", "anh ho chieu"]
        },
        {
            text: "Nhập liệu nhanh cho đoàn khách đông người?",
            answer: "Sử dụng nút <b>'Thêm hồ sơ khác'</b> sau khi nhập xong khách đầu tiên để nhập liên tục mà không cần quay lại danh sách.",
            keywords: ["khach doan", "nhap nhanh", "dong nguoi"]
        },
        {
            text: "Xem báo cáo thống kê khách lưu trú?",
            answer: "Vào mục 'Thống kê theo quốc tịch' hoặc 'Thống kê tình trạng xử lý' để xem biểu đồ và xuất file Excel.",
            keywords: ["bao cao", "thong ke", "excel"]
        }
    ],
    'vu_khi': [
        {
            text: "Gia đình lưu giữ vũ khí thô sơ (đồ gia bảo) có phải khai báo không?",
            answer: "<b>Bắt buộc khai báo.</b><br>Theo Luật Quản lý vũ khí 2024, vũ khí thô sơ là đồ gia bảo, hiện vật trưng bày phải khai báo với Công an.",
            keywords: ["kiem co", "gia bao", "dao", "kiem", "trung bay"]
        },
        {
            text: "Nộp hồ sơ khai báo vũ khí thô sơ ở đâu?",
            answer: "1. <b>Trực tiếp:</b> Tại Công an xã/phường nơi cư trú.<br>2. <b>Trực tuyến:</b> Qua Cổng dịch vụ công.",
            keywords: ["o dau", "nop ho so", "online"]
        },
        {
            text: "Hồ sơ khai báo gồm những giấy tờ gì?",
            answer: "1. Tờ khai (ghi rõ thông tin cá nhân, lý do, thông tin vũ khí).<br>2. Giấy tờ chứng minh nguồn gốc (nếu có).<br>👉 Nếu là đồ gia bảo lâu đời không còn giấy tờ thì vẫn khai báo thông tin hiện có.",
            keywords: ["ho so", "giay to", "can nhung gi"]
        },
        {
            text: "Thời gian giải quyết và Lệ phí khai báo vũ khí?",
            answer: "<b>Thời hạn:</b> 03 ngày làm việc.<br><b>Lệ phí:</b> Miễn phí.",
            keywords: ["thoi gian", "bao lau", "le phi", "tien"]
        },
        {
            text: "Kết quả của thủ tục khai báo là gì?",
            answer: "Là <b>Thông báo xác nhận khai báo vũ khí thô sơ</b> (Mẫu VC21).<br>Lưu ý: Đây không phải là Giấy phép.",
            keywords: ["ket qua", "giay xac nhan", "giay phep"]
        },
        {
            text: "Mẫu đơn đề nghị khai báo?",
            answer: "Không có mẫu đơn cụ thể. Công dân tự viết Tờ khai nhưng phải đảm bảo đủ các thông tin: Nhân thân, Lý do, Thông tin vũ khí.",
            keywords: ["mau don", "to khai", "viet tay"]
        },
        {
            text: "Nộp hồ sơ qua bưu điện được không?",
            answer: "<b>Được.</b> Cán bộ sẽ thông báo bằng văn bản về thời gian trả kết quả hoặc lý do từ chối (nếu hồ sơ không đạt).",
            keywords: ["buu dien", "gui thu"]
        },
        {
            text: "Thông tin vũ khí sau khai báo được quản lý thế nào?",
            answer: "Được nhập vào <b>Hệ thống Cơ sở dữ liệu</b> quản lý vũ khí của Bộ Công an để quản lý chặt chẽ.",
            keywords: ["quan ly", "du lieu", "csdl"]
        }
    ],
    'kinh_doanh': [
        {
            text: "Nộp hồ sơ ANTT cho nhà nghỉ nhỏ, cửa hàng gas ở đâu?",
            answer: "Nộp tại <b>Công an cấp xã</b>.<br>Áp dụng cho: Nhà nghỉ < 10 phòng, Hộ kinh doanh khí (gas).",
            keywords: ["nha nghi", "gas", "karaoke nho", "o dau"]
        },
        {
            text: "Hồ sơ xin giấy ANTT gồm những gì?",
            answer: "1. Văn bản đề nghị (Mẫu 03).<br>2. Bản sao Đăng ký kinh doanh.<br>3. Giấy tờ PCCC (Biên bản kiểm tra hoặc Văn bản nghiệm thu).<br>4. Lý lịch tư pháp và Bản khai lý lịch của người đứng đầu.",
            keywords: ["ho so", "giay to", "can nhung gi"]
        },
        {
            text: "Thời gian và Lệ phí cấp giấy ANTT?",
            answer: "<b>Thời gian:</b> 05 ngày làm việc.<br><b>Lệ phí:</b> 300.000 đồng.",
            keywords: ["thoi gian", "le phi", "tien", "chi phi"]
        },
        {
            text: "Mất giấy ANTT, xin cấp lại thế nào?",
            answer: "Phải nộp phạt vi phạm hành chính về làm mất giấy tờ trước, sau đó nộp hồ sơ xin cấp lại (Mẫu 03 + Biên lai nộp phạt).",
            keywords: ["mat giay", "cap lai", "thu tuc"]
        },
        {
            text: "Đổi tên cơ sở hoặc người đứng đầu có cần xin cấp lại?",
            answer: "Làm thủ tục <b>Cấp đổi</b>. Nộp lại bản chính giấy cũ cùng tài liệu chứng minh thay đổi.",
            keywords: ["doi ten", "thay doi", "cap doi"]
        },
        {
            text: "Người nước ngoài đứng tên giấy ANTT được không?",
            answer: "<b>Được.</b> Hồ sơ thay Lý lịch tư pháp bằng Bản khai nhân sự (Mẫu 02b) + Hộ chiếu/Thẻ tạm trú.",
            keywords: ["nguoi nuoc ngoai", "tay", "dung ten"]
        },
        {
            text: "Giấy PCCC có cần làm trước không?",
            answer: "<b>Bắt buộc.</b> Phải hoàn thành thủ tục PCCC và có văn bản nghiệm thu hoặc biên bản kiểm tra an toàn PCCC trước khi nộp hồ sơ ANTT.",
            keywords: ["pccc", "phong chay", "bat buoc"]
        },
        {
            text: "Bị thu hồi giấy ANTT có xin lại được không?",
        },
        {
            text: "Lấy mã xác thực (Google Authenticator) để đăng nhập?",
            answer: "Để bảo mật, hệ thống yêu cầu xác thực 2 lớp qua ứng dụng <b>Google Authenticator</b>:<br><ul><li><b>Cài đặt lần đầu:</b> Khi đăng nhập lần đầu, hệ thống hiện mã QR. Bạn tải app Google Authenticator, quét mã QR này để lấy mã xác thực (token).</li><li><b>Đăng nhập các lần sau:</b><br>1. Nhập tên đăng nhập, mật khẩu, captcha.<br>2. Hệ thống yêu cầu 'Mã Authenticator'.<br>3. Mở app lấy mã 6 số nhập vào và nhấn 'Xác nhận'.</li></ul>",
            keywords: ["google authenticator", "ma xac thuc", "token", "otp"]
        },
        {
            text: "Hệ thống có tự động lấy thông tin từ ảnh hộ chiếu không?",
            answer: "Bạn <b>không nhất thiết phải gõ tay</b> toàn bộ thông tin.<br><b>Cách thực hiện:</b> Ấn nút <b>'Tải lên'</b> và chọn ảnh chụp trang nhân thân hộ chiếu.<br><b>Kết quả:</b> Hệ thống tự động nhận diện và điền thông tin (Số hộ chiếu, Họ tên, Ngày sinh, Giới tính, Quốc tịch...).<br><b>Lưu ý:</b> Sau khi điền tự động, bạn <b>cần kiểm tra lại</b> để đảm bảo chính xác trước khi Lưu.",
            keywords: ["tu dong", "trich xuat", "quét ảnh", "scan"]
        },
        {
            text: "Các thông tin bắt buộc khi khai báo tạm trú?",
            answer: "Sau khi tải ảnh hộ chiếu, bạn cần kiểm tra và điền đủ <b>các trường thông tin có dấu sao đỏ (*)</b> bắt buộc bao gồm:<br><ul><li>Số hộ chiếu</li><li>Quốc tịch</li><li>Họ và tên</li><li>Ngày sinh</li><li>Giới tính</li><li>Ngày đến cơ sở lưu trú</li><li>Ngày đi dự kiến</li><li>Số phòng</li></ul>Sau khi điền đủ, ấn nút <b>'Lưu thông tin'</b> để hoàn tất.",
            keywords: ["bat buoc", "thong tin", "truong nao"]
        },
        {
            text: "Cách nhập liệu nhanh cho đoàn khách đông người?",
            answer: "<b>Có.</b> Hệ thống hỗ trợ nhập liệu cho khách đoàn.<br>Thay vì ấn 'Lưu thông tin' rồi quay lại danh sách, sau khi nhập xong khách thứ nhất, bạn hãy ấn vào nút <b>'Thêm hồ sơ khác'</b>.<br>Chức năng này cho phép nhập liên tục nhiều hồ sơ tiếp theo mà không bị gián đoạn, tiết kiệm thời gian.",
            keywords: ["khach doan", "nhap nhanh", "dong nguoi"]
        },
        {
            text: "Xem báo cáo thống kê khách lưu trú?",
            answer: "Hệ thống cung cấp chức năng <b>'Báo cáo thống kê'</b>:<br>1. <b>Thống kê theo quốc tịch:</b> Xem biểu đồ Top 10 quốc tịch, lọc theo thời gian và tải file Excel.<br>2. <b>Thống kê theo tình trạng xử lý:</b> Xem số lượng hồ sơ theo trạng thái (Mới, Xác nhận, Từ chối...) và xuất file Excel lưu trữ.",
            keywords: ["bao cao", "thong ke", "excel"]
        },
        {
            text: "Thời hạn báo mất thẻ APEC (ABTC)?",
            answer: "Thời hạn báo mất thẻ ABTC <b>gấp hơn</b> so với hộ chiếu.<br>Trong thời hạn <b>48 giờ</b> (tính theo giờ, không phải ngày làm việc) kể từ khi phát hiện thẻ ABTC bị mất, doanh nhân phải thực hiện việc trình báo. Nếu có lý do bất khả kháng thì được kéo dài nhưng phải giải thích rõ.",
            keywords: ["the apec", "abtc", "doanh nhan", "mat the"]
        },
        {
            text: "Kết quả báo mất thẻ ABTC?",
            answer: "Bạn sẽ nhận được 02 thông báo theo trình tự:<br>1. Thông báo của Công an cấp xã về việc đã chuyển đơn trình báo lên Cục Quản lý xuất nhập cảnh (Mẫu CV04).<br>2. Sau khoảng <b>03 ngày làm việc</b> tiếp theo, Cục Quản lý xuất nhập cảnh sẽ gửi thông báo về việc giải quyết đơn trình báo mất thẻ (Mẫu CV05).",
            keywords: ["ket qua", "apec"]
        },
        {
            text: "Mất giấy thông hành biên giới?",
            answer: "Về cơ bản thủ tục tương tự như báo mất hộ chiếu:<br><ul><li><b>Thời hạn báo:</b> Trong vòng <b>02 ngày làm việc</b> kể từ khi phát hiện mất.</li><li><b>Nơi nộp:</b> Công an cấp xã nơi thuận lợi, Cổng dịch vụ công hoặc qua bưu chính.</li><li><b>Hồ sơ:</b> Sử dụng đơn trình báo mất giấy thông hành (Mẫu M02a).</li><li><b>Kết quả:</b> Giấy thông hành sẽ bị hủy giá trị sử dụng trong vòng 01 ngày làm việc sau khi cơ quan cấp nhận thông báo.</li></ul>",
            keywords: ["thong hanh", "bien gioi", "lao", "trung quoc"]
        },
        {
            text: "Lệ phí trình báo mất giấy tờ, khai báo tạm trú?",
            answer: "<b>Không.</b> Theo quy định hiện hành, tất cả các thủ tục thực hiện tại Công an cấp xã đều <b>không thu lệ phí</b>, cụ thể:<br><ul><li>Trình báo mất hộ chiếu: Không thu phí.</li><li>Khai báo tạm trú cho người nước ngoài: Không thu phí.</li><li>Trình báo mất thẻ ABTC: Không thu phí.</li><li>Trình báo mất giấy thông hành: Không thu phí.</li></ul>",
            keywords: ["le phi", "tien", "chi phi"]
        },
        {
            text: "Giấy tờ cần mang khi đi báo mất trực tiếp?",
            answer: "Khi đến nộp hồ sơ trực tiếp, bạn cần xuất trình một trong số các giấy tờ sau còn giá trị sử dụng để kiểm tra:<br><ul><li>Thẻ căn cước.</li><li>Căn cước công dân.</li><li>Căn cước điện tử.</li></ul>Quy định này áp dụng cho việc trình báo mất hộ chiếu và các giấy tờ xuất nhập cảnh khác.",
            keywords: ["giay to", "mang theo", "cccd"]
        }
    ],
    'khieu_nai': [
        {
            text: "Thời hạn giải quyết khiếu nại lần đầu?",
            answer: "Thông thường: 30 ngày. Phức tạp: 45 ngày.",
            keywords: ["khieu nai", "thoi han"]
        },
        {
            text: "Điều kiện thụ lý khiếu nại?",
            answer: "Người khiếu nại có quyền lợi trực tiếp, có năng lực hành vi, đơn gửi đúng thẩm quyền và chưa đưa ra Tòa.",
            keywords: ["thu ly", "dieu kien"]
        },
        {
            text: "Giải quyết khiếu nại có được đối thoại không?",
            answer: "<b>Có.</b> Đối thoại là thủ tục bắt buộc.",
            keywords: ["doi thoai", "gap go"]
        },
        {
            text: "Bao lâu biết đơn tố cáo được thụ lý?",
            answer: "Xử lý ban đầu: 07 ngày. Nếu thụ lý sẽ thông báo trong 05 ngày tiếp theo.",
            keywords: ["to cao", "thoi gian", "thu ly"]
        },
        {
            text: "Gửi đơn tố cáo nhầm nơi?",
            answer: "Cơ quan nhận sẽ chuyển đến đúng nơi trong 05 ngày và thông báo cho bạn.",
            keywords: ["nham noi", "sai dia chi"]
        },
        {
            text: "Thời hạn giải quyết tố cáo?",
            answer: "Không quá 30 ngày.",
            keywords: ["to cao", "thoi gian"]
        },
        {
            text: "Kết quả tố cáo có công khai không?",
            answer: "<b>Có.</b> Công khai trong 07 ngày (Niêm yết, cuộc họp...).",
            keywords: ["cong khai", "ket qua"]
        },
        {
            text: "Tố cáo có được giữ bí mật không?",
            answer: "<b>Có.</b> Cơ quan công an có trách nhiệm bảo vệ bí mật thông tin người tố cáo.",
            keywords: ["bi mat", "danh tinh", "lo thong tin"]
        },
        {
            text: "Lệ phí khiếu nại, tố cáo?",
            answer: "Hoàn toàn miễn phí.",
            keywords: ["le phi", "tien"]
        },
        {
            text: "Hồ sơ tố cáo cần gì?",
            answer: "Đơn tố cáo + Tài liệu chứng cứ chứng minh.",
            keywords: ["ho so", "giay to"]
        }
    ],
    'cap_tinh': [
        {
            text: "Thủ tục cấp hộ chiếu phổ thông lần đầu làm ở đâu?",
            answer: "Thủ tục <b>Cấp hộ chiếu phổ thông ở trong nước</b> được thực hiện tại Phòng Quản lý xuất nhập cảnh - Công an cấp tỉnh. Bạn có thể nộp hồ sơ trực tuyến toàn trình trên Cổng Dịch vụ công Bộ Công an.",
            keywords: ["ho chieu", "lam ho chieu", "o dau", "cap tinh", "passport"]
        },
        {
            text: "Hộ chiếu bị mất, hỏng, hết hạn thì làm thủ tục gì?",
            answer: "Bạn vẫn thực hiện thủ tục <b>Cấp hộ chiếu phổ thông ở trong nước</b> tại Công an cấp tỉnh, ghi rõ lý do cấp lại (do mất, hỏng, hoặc hết hạn) trong tờ khai.",
            keywords: ["mat ho chieu", "hong ho chieu", "het han", "cap lai"]
        },
        {
            text: "Thủ tục cấp giấy phép lái xe do cơ quan nào thực hiện?",
            answer: "Thủ tục <b>Cấp giấy phép lái xe</b> (và các thủ tục liên quan như cấp lại, cấp đổi) do Phòng Cảnh sát giao thông - Công an cấp tỉnh thực hiện.",
            keywords: ["gplx", "giay phep lai xe", "bang lai", "cap doi"]
        },
        {
            text: "Mất giấy phép lái xe hoặc quá hạn sử dụng phải làm sao?",
            answer: "Bạn cần thực hiện thủ tục sát hạch hoặc cấp lại tại Phòng CSGT cấp tỉnh. Hãy kiểm tra thủ tục chính xác trên Cổng DVC Bộ Công an hoặc hỏi Chatbot để biết hồ sơ chi tiết.",
            keywords: ["mat gplx", "mat bang lai", "qua han"]
        },
        {
            text: "Xin cấp Phiếu lý lịch tư pháp ở đâu?",
            answer: "Bạn thực hiện thủ tục <b>Cấp Phiếu lý lịch tư pháp cho công dân Việt Nam, người nước ngoài đang cư trú tại Việt Nam</b> tại Phòng Hồ sơ nghiệp vụ - Công an tỉnh Phú Thọ.",
            keywords: ["ly lich tu phap", "phieu lltp", "cap tinh"]
        },
        {
            text: "Người nước ngoài muốn gia hạn tạm trú thì làm ở đâu?",
            answer: "Thủ tục gia hạn tạm trú, cấp thị thực, cấp thẻ tạm trú cho người nước ngoài thuộc thẩm quyền của Phòng Quản lý xuất nhập cảnh - Công an cấp tỉnh.",
            keywords: ["nguoi nuoc ngoai", "gia han tam tru", "thi thuc", "visa"]
        },
        {
            text: "Giấy chứng nhận đủ điều kiện về ANTT làm ở cơ quan nào?",
            answer: "Tùy thuộc vào loại hình cơ sở kinh doanh mà thẩm quyền giải quyết thuộc về Cục Cảnh sát QLHC về TTXH, Công an cấp tỉnh, hoặc Công an cấp xã. Hãy tra cứu danh mục TTHC hoặc hỏi Chatbot để biết thẩm quyền cụ thể đối với cơ sở của bạn.",
            keywords: ["antt", "giay phep antt", "kinh doanh", "xa hay tinh"]
        },
        {
            text: "Phòng CSGT cấp tỉnh giải quyết thủ tục đăng ký xe nào?",
            answer: "Các thủ tục như Đăng ký, cấp biển số xe lần đầu, Sang tên, di chuyển xe, hay Đổi, cấp lại chứng nhận đăng ký xe thuộc thẩm quyền giải quyết của Công an cấp tỉnh. Chi tiết từng trường hợp có quy định riêng trên Cổng DVC Bộ Công an.",
            keywords: ["dang ky xe", "bien so xe", "phong csgt", "cong an tinh"]
        }
    ]
};
