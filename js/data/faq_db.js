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
    { id: 'xe', icon: 'fa-solid fa-motorcycle', text: 'Đăng ký xe', keywords: ['dang ky xe', 'bien so', 'sang ten', 'xe may', 'o to', 'cap lai'] },
    { id: 'xuat_nhap_canh', icon: 'fa-solid fa-plane-departure', text: 'Xuất nhập cảnh', keywords: ['ho chieu', 'visa', 'nguoi nuoc ngoai', 'tam tru', 'apec'] },
    { id: 'vu_khi', icon: 'fa-solid fa-person-military-rifle', text: 'Vũ khí & CCHT', keywords: ['vu khi', 'dao', 'kiem', 'phao', 'cong cu ho tro', 'khai bao'] },
    { id: 'kinh_doanh', icon: 'fa-solid fa-shop', text: 'Ngành nghề KD', keywords: ['an ninh trat tu', 'nha nghi', 'gas', 'pccc', 'giay phep'] },
    { id: 'khieu_nai', icon: 'fa-solid fa-file-pen', text: 'Khiếu nại & Tố cáo', keywords: ['khieu nai', 'to cao', 'don thu', 'cong an xa'] }
];

// 2. Chi tiết câu hỏi và trả lời
// Export to Global Scope
window.FAQ_DATA = {
    'cu_tru': [
        {
            text: "Đăng ký thường trú (nhà thuê, ở nhờ) cần giấy tờ gì?",
            answer: "<b>Hồ sơ gồm:</b><br>1. Tờ khai CT01 (nêu rõ ý kiến đồng ý của chủ hộ/chủ sở hữu).<br>2. Hợp đồng thuê/mượn/ở nhờ công chứng.<br>3. Giấy tờ chứng minh diện tích nhà ở (nếu chưa có trên CSDL).",
            keywords: ["dang ky thuong tru", "nha thue", "o nho"]
        },
        {
            text: "Lệ phí đăng ký thường trú và tạm trú?",
            answer: "<b>Thường trú:</b> 20k (trực tiếp) / 10k (online).<br><b>Tạm trú:</b> 15k (trực tiếp) / 7k (online).<br>👉 Trẻ em, người cao tuổi, người có công... được miễn phí.",
            keywords: ["le phi", "tien", "chi phi"]
        },
        {
            text: "Thời hạn giải quyết đăng ký cư trú?",
            answer: "<b>Thường trú:</b> 07 ngày làm việc.<br><b>Tạm trú:</b> 03 ngày làm việc.<br><b>Tách hộ:</b> 05 ngày làm việc.",
            keywords: ["thoi gian", "bao lau", "ngay lam viec"]
        },
        {
            text: "Đăng ký cư trú online có cần công chứng giấy tờ không?",
            answer: "<b>Không bắt buộc.</b><br>Bạn chỉ cần chụp/scan bản chính rõ nét. Khi cán bộ kiểm tra, bạn xuất trình bản gốc để đối chiếu.",
            keywords: ["online", "cong chung", "ban sao"]
        },
        {
            text: "Điều kiện và thủ tục Tách hộ?",
            answer: "<b>Điều kiện:</b> Có năng lực hành vi dân sự đầy đủ; chung chỗ ở hợp pháp; được chủ hộ đồng ý.<br><b>Hồ sơ:</b> Tờ khai CT01 (ghi rõ ý kiến đồng ý tách hộ).",
            keywords: ["tach ho", "dieu kien", "thu tuc"]
        },
        {
            text: "Xóa đăng ký thường trú (người mất, ra nước ngoài...)?",
            answer: "Trong thời hạn <b>07 ngày</b>, đại diện hộ gia đình phải làm thủ tục xóa đăng ký. Nếu không, Công an sẽ lập biên bản và tự xóa.",
            keywords: ["xoa thuong tru", "nguoi mat", "ra nuoc ngoai"]
        },
        {
            text: "Thông báo lưu trú khi có khách đến nhà?",
            answer: "Phải thông báo <b>trước 23 giờ</b> cùng ngày. Nếu khách đến sau 23 giờ thì thông báo trước 08 giờ sáng hôm sau.",
            keywords: ["luu tru", "thong bao", "khach den choi"]
        },
        {
            text: "Xin xác nhận cư trú (CT07) mất bao lâu?",
            answer: "<b>Nửa ngày:</b> Nếu thông tin có sẵn trong CSDL.<br><b>03 ngày:</b> Nếu cần xác minh.<br>👉 Nộp tại bất kỳ CA xã nào thuận tiện.",
            keywords: ["ct07", "xac nhan cu tru", "xin giay"]
        },
        {
            text: "Gia hạn tạm trú khi nào?",
            answer: "Làm thủ tục trước khi hết hạn <b>15 ngày</b>.<br>Thủ tục giống đăng ký lần đầu nhưng không cần chứng minh chỗ ở lại nếu chủ hộ đồng ý.",
            keywords: ["gia han", "tam tru", "het han"]
        },
        {
            text: "Khai báo tạm vắng khi nào?",
            answer: "Bắt buộc với: Bị can, bị cáo, người bị quản chế... hoặc đi khỏi nơi cư trú theo quy định. Công dân bình thường đi vắng không bắt buộc.",
            keywords: ["tam vang", "khai bao"]
        }
    ],
    'cccd': [
        {
            text: "Làm Căn cước cho trẻ dưới 14 tuổi?",
            answer: "<b>Dưới 06 tuổi:</b> Làm online 100% trên DVC/VNeID, không cần đưa trẻ đến, không thu sinh trắc học.<br><b>06-14 tuổi:</b> Cha mẹ đưa trẻ đến Công an để thu vân tay, mống mắt, ảnh.",
            keywords: ["tre em", "duoi 14 tuoi", "lam can cuoc"]
        },
        {
            text: "Mất thẻ, làm lại có cần chụp ảnh/lăn tay lại không?",
            answer: "<b>Không.</b> Sử dụng lại ảnh và vân tay cũ trong CSDL. Có thể nộp hồ sơ Online hoàn toàn.<br>Lệ phí: 70.000đ.",
            keywords: ["cap lai", "mat the", "anh cu"]
        },
        {
            text: "Thông tin trong CSDL bị sai (năm sinh, nơi sinh)?",
            answer: "Nộp hồ sơ điều chỉnh tại Công an xã hoặc Online. Thời gian giải quyết: <b>02 ngày làm việc</b>. Miễn phí.",
            keywords: ["sai thong tin", "dinh chinh", "tuoi"]
        },
        {
            text: "Xin xác nhận số CMND 9 số cũ?",
            answer: "Nộp tại Công an xã.<br>Thời gian: 03 ngày (nếu có dữ liệu) hoặc 07 ngày (nếu cần tra cứu).",
            keywords: ["xac nhan so", "cmnd 9 so", "chung minh thu"]
        },
        {
            text: "Tích hợp GPLX, BHYT vào Căn cước?",
            answer: "Có thể yêu cầu tích hợp khi đi làm thẻ hoặc nộp hồ sơ riêng qua VNeID/DVC. Thời gian: 07 ngày làm việc.",
            keywords: ["tich hop", "giay phep lai xe", "bang lai"]
        },
        {
            text: "Thu thập ADN và Giọng nói vào Căn cước?",
            answer: "<b>ADN:</b> Phải có kết quả xét nghiệm của tổ chức y tế/giám định, Công an không tự xét nghiệm.<br><b>Giọng nói:</b> Công an thu trực tiếp.",
            keywords: ["adn", "giong noi", "sinh trac hoc"]
        },
        {
            text: "Giấy chứng nhận căn cước là gì?",
            answer: "Là giấy tờ cấp cho <b>người gốc Việt Nam chưa xác định được quốc tịch</b> đang sinh sống tại VN > 6 tháng.",
            keywords: ["nguoi goc viet", "giay chung nhan"]
        },
        {
            text: "Độ tuổi đổi thẻ Căn cước?",
            answer: "Bắt buộc đổi khi đủ: <b>14 tuổi, 25 tuổi, 40 tuổi, 60 tuổi</b>.",
            keywords: ["doi the", "het han", "tuoi quy dinh"]
        },
        {
            text: "Hủy và xác lập lại số định danh cá nhân?",
            answer: "Chỉ khi: Xác định lại giới tính, cải chính năm sinh, hoặc có sai sót về nơi sinh/năm sinh/giới tính do lỗi thu thập.",
            keywords: ["so dinh danh", "huy so", "sai sot"]
        },
        {
            text: "Khai thác thông tin người khác trong CSDL?",
            answer: "Phải được người đó đồng ý (hoặc người giám hộ). Nộp phiếu yêu cầu tại Công an xã, có mất phí.",
            keywords: ["khai thac", "tra cuu", "thong tin nguoi khac"]
        }
    ],
    'dinh_danh': [
        {
            text: "Đăng ký VNeID Mức 2 ở đâu?",
            answer: "<b>Bắt buộc đến Công an</b> (xã/phường bất kỳ).<br>Mang theo: Căn cước gắn chip + Điện thoại chính chủ.",
            keywords: ["vneid muc 2", "dang ky", "o dau"]
        },
        {
            text: "Cấp VNeID mức 2 cho trẻ dưới 14 tuổi?",
            answer: "Cha mẹ đưa trẻ đến Công an xã. Dùng số điện thoại của cha/mẹ để đăng ký.",
            keywords: ["tre em", "con nho", "duoi 14"]
        },
        {
            text: "Thời gian cấp VNeID mức 2?",
            answer: "Nếu đã có Căn cước chip: <b>03 ngày</b>.<br>Nếu làm cùng Căn cước: <b>07 ngày</b>.",
            keywords: ["thoi gian", "bao lau"]
        },
        {
            text: "Mất điện thoại, muốn khóa VNeID/Căn cước điện tử?",
            answer: "Yêu cầu khóa trực tiếp tại Công an xã hoặc trên ứng dụng VNeID (bằng thiết bị khác). Hệ thống sẽ <b>khóa ngay lập tức</b>.",
            keywords: ["khoa tai khoan", "mat dien thoai", "khoa gap"]
        },
        {
            text: "Chưa có Căn cước chip (dùng CMND cũ) có làm VNeID được không?",
            answer: "Được, nhưng phải làm thủ tục cấp Căn cước gắn chip <b>đồng thời</b> với cấp tài khoản định danh mức 2.",
            keywords: ["cmnd cu", "chua doi the"]
        },
        {
            text: "Mở khóa Căn cước điện tử?",
            answer: "Đến Công an xã hoặc yêu cầu trên ứng dụng VNeID. Hệ thống mở khóa ngay lập tức.",
            keywords: ["mo khoa", "bi khoa"]
        },
        {
            text: "Đăng ký VNeID cho Doanh nghiệp/Tổ chức?",
            answer: "Người đại diện pháp luật dùng VNeID cá nhân để đăng ký online, hoặc đến Trung tâm dữ liệu quốc gia về dân cư.",
            keywords: ["doanh nghiep", "to chuc", "cong ty"]
        },
        {
            text: "Thời gian cấp VNeID cho tổ chức?",
            answer: "03 ngày (nếu thông tin đã có) hoặc 15 ngày (nếu cần xác minh).",
            keywords: ["thoi gian", "to chuc"]
        },
        {
            text: "Cơ quan tố tụng yêu cầu khóa VNeID?",
            answer: "Công an xã nhận -> Cục C06 duyệt. Tổng thời gian 03 ngày làm việc.",
            keywords: ["to tung", "toa an", "khoa"]
        },
        {
            text: "Phí đăng ký, khóa/mở khóa VNeID?",
            answer: "<b>Hoàn toàn Miễn phí.</b>",
            keywords: ["phi", "tien", "le phi"]
        }
    ],
    'xe': [
        {
            text: "Đăng ký xe mới online toàn trình?",
            answer: "Điều kiện: Có VNeID mức 2 + Xe lắp ráp trong nước (có phiếu xuất xưởng điện tử). Nhận biển qua bưu điện.",
            keywords: ["dang ky xe", "online", "toan trinh"]
        },
        {
            text: "Thủ tục Sang tên đổi chủ (Mua ban xe)?",
            answer: "<b>Bán (Chủ cũ):</b> Làm thủ tục Thu hồi biển số.<br><b>Mua (Chủ mới):</b> Làm thủ tục Sang tên (cần chứng nhận thu hồi của chủ cũ).",
            keywords: ["sang ten", "mua ban", "thu hoi"]
        },
        {
            text: "Thời hạn sang tên xe?",
            answer: "Trong vòng <b>30 ngày</b> kể từ ngày ký giấy mua bán. Quá hạn chủ cũ sẽ bị phạt.",
            keywords: ["qua han", "cham sang ten", "phat"]
        },
        {
            text: "Cấp lại đăng ký/biển số bị mất?",
            answer: "Thời gian xác minh: 30 ngày. Thời gian cấp: 02 ngày sau khi xác minh xong.",
            keywords: ["mat giay to", "mat bien", "cap lai"]
        },
        {
            text: "Sơn lại màu xe?",
            answer: "Phải khai báo online lấy mã hồ sơ -> Mang xe đến Công an kiểm tra thực tế -> Cấp đổi đăng ký.",
            keywords: ["doi mau son", "son xe"]
        },
        {
            text: "Đăng ký xe tạm thời?",
            answer: "Có thể làm <b>Online 100%</b>. Nhận kết quả bản điện tử trong 8 giờ. Dùng cho xe chạy từ kho đến đại lý, xe chạy thử...",
            keywords: ["tam thoi", "xe moi mua"]
        },
        {
            text: "Xe hết niên hạn/hư hỏng không dùng được?",
            answer: "Làm thủ tục <b>Thu hồi</b> online trong 07 ngày. Trả biển qua bưu điện. Không mất phí.",
            keywords: ["xe nat", "het nien han", "thu hoi"]
        },
        {
            text: "Thời gian cấp biển số lần đầu?",
            answer: "Trực tiếp: Cấp ngay. Online: 08 giờ.",
            keywords: ["bao lau", "thoi gian"]
        },
        {
            text: "Đổi biển số vàng sang trắng (hoặc ngược lại)?",
            answer: "Thủ tục Cấp đổi đăng ký, biển số. Không cần mang xe đến kiểm tra (trừ khi xe cải tạo).",
            keywords: ["doi bien", "bien vang", "kinh doanh"]
        },
        {
            text: "Nhận giấy tờ tại nhà?",
            answer: "Được. Đăng ký dịch vụ bưu chính công ích để nhận kết quả.",
            keywords: ["buu dien", "nhan tai nha"]
        }
    ],
    'xuat_nhap_canh': [
        {
            text: "Mất hộ chiếu phổ thông báo trong bao lâu?",
            answer: "Trong vòng <b>02 ngày làm việc</b>. Nếu quá hạn (do ốm đau, thiên tai) phải giải thích rõ trong đơn.",
            keywords: ["mat ho chieu", "trinh bao", "thoi han"]
        },
        {
            text: "Báo mất hộ chiếu ở đâu?",
            answer: "Tại Công an xã gần nhất (không cần về nơi thường trú), hoặc báo Online trên DVC Bộ Công an.",
            keywords: ["o dau", "online", "dia diem"]
        },
        {
            text: "Bao lâu hộ chiếu bị hủy giá trị?",
            answer: "Sau khi báo mất 01 ngày, Công an xã chuyển tin. Sau 01 ngày tiếp theo, Cục QLXNC sẽ hủy hộ chiếu.",
            keywords: ["huy ho chieu", "gia tri"]
        },
        {
            text: "Khai báo tạm trú cho người nước ngoài?",
            answer: "Trong vòng <b>12 giờ</b> (với vùng sâu xa là 24 giờ) kể từ khi khách đến.",
            keywords: ["nguoi nuoc ngoai", "khach tay", "tam tru"]
        },
        {
            text: "Thủ tục khai báo tạm trú cho khách nước ngoài?",
            answer: "Khai và nộp phiếu NA17 cho Công an xã. Không cần đưa khách đến trụ sở.",
            keywords: ["thu tuc", "na17", "khai bao"]
        },
        {
            text: "Mất thẻ APEC (ABTC)?",
            answer: "Phải báo mất trong vòng <b>48 giờ</b>.",
            keywords: ["the apec", "abtc", "doanh nhan"]
        },
        {
            text: "Mất giấy thông hành biên giới?",
            answer: "Báo mất trong 02 ngày làm việc. Nộp tại Công an xã hoặc Online.",
            keywords: ["thong hanh", "bien gioi", "lao", "trung quoc"]
        },
        {
            text: "Lệ phí trình báo mất giấy tờ XNC?",
            answer: "<b>Miễn phí.</b>",
            keywords: ["le phi", "tien"]
        },
        {
            text: "Giấy tờ cần mang khi đi báo mất?",
            answer: "Thẻ Căn cước/CCCD còn hiệu lực.",
            keywords: ["giay to", "mang theo"]
        }
    ],
    'vu_khi': [
        {
            text: "Gia đình lưu giữ vũ khí thô sơ (đồ gia bảo)?",
            answer: "<b>Bắt buộc khai báo.</b> Theo Luật Quản lý vũ khí 2024, vũ khí thô sơ là đồ gia bảo, hiện vật trưng bày phải khai báo với Công an.",
            keywords: ["kiem co", "gia bao", "dao", "kiem", "trung bay"]
        },
        {
            text: "Nộp hồ sơ khai báo vũ khí ở đâu?",
            answer: "1. <b>Trực tiếp:</b> Tại Công an xã/phường nơi cư trú.<br>2. <b>Trực tuyến:</b> Qua Cổng dịch vụ công.",
            keywords: ["o dau", "nop ho so", "online"]
        },
        {
            text: "Hồ sơ khai báo cần những gì?",
            answer: "1. Tờ khai (ghi rõ họ tên, số định danh, lý do, thông tin vũ khí).<br>2. Giấy tờ chứng minh nguồn gốc (nếu có).",
            keywords: ["ho so", "giay to", "can nhung gi"]
        },
        {
            text: "Thời gian giải quyết và Lệ phí?",
            answer: "<b>Thời hạn:</b> 03 ngày làm việc.<br><b>Lệ phí:</b> Không thu phí.",
            keywords: ["thoi gian", "bao lau", "le phi", "tien"]
        },
        {
            text: "Hồ sơ online bị thiếu hoặc sai?",
            answer: "Cán bộ sẽ thông báo trên Cổng DVC. Nếu thiếu -> Yêu cầu bổ sung. Nếu không đạt -> Từ chối và nêu rõ lý do.",
            keywords: ["thieu ho so", "bo sung", "bi tra lai"]
        },
        {
            text: "Kết quả của thủ tục là gì?",
            answer: "<b>Thông báo xác nhận khai báo vũ khí thô sơ</b> (Mẫu VC21). Không phải là cấp Giấy phép.",
            keywords: ["ket qua", "giay xac nhan", "giay phep"]
        },
        {
            text: "Mẫu đơn đề nghị khai báo?",
            answer: "Không quy định mẫu cụ thể. Công dân tự viết Tờ khai, bắt buộc có: Thông tin cá nhân, Lý do khai báo, Thông tin chi tiết về vũ khí.",
            keywords: ["mau don", "to khai", "viet tay"]
        },
        {
            text: "Nộp hồ sơ qua bưu điện được không?",
            answer: "<b>Được.</b> Cán bộ sẽ thông báo bằng văn bản về thời gian trả kết quả (nếu đạt) hoặc lý do không tiếp nhận (nếu hồ sơ thiếu).",
            keywords: ["buu dien", "gui thu"]
        },
        {
            text: "Căn cứ pháp lý?",
            answer: "Luật Quản lý VK 2024; Thông tư 75/2024; Thông tư 77/2024; Quyết định 885/QĐ-BCA-C06.",
            keywords: ["luat", "thong tu", "phap ly"]
        },
        {
            text: "Thông tin sau khai báo được quản lý thế nào?",
            answer: "Được nhập vào <b>Hệ thống Cơ sở dữ liệu</b> quản lý vũ khí của Bộ Công an để quản lý chặt chẽ.",
            keywords: ["quan ly", "du lieu"]
        }
    ],
    'kinh_doanh': [
        {
            text: "Nộp hồ sơ ANTT cho nhà nghỉ nhỏ, cửa hàng gas?",
            answer: "Nộp tại <b>Công an cấp xã</b>. (Áp dụng cho nhà nghỉ < 10 phòng, hộ kinh doanh gas).",
            keywords: ["nha nghi", "gas", "karaoke nho"]
        },
        {
            text: "Hồ sơ xin giấy ANTT gồm những gì?",
            answer: "1. Văn bản đề nghị (Mẫu 03).<br>2. Đăng ký kinh doanh.<br>3. Giấy tờ PCCC.<br>4. Lý lịch tư pháp người đứng đầu.",
            keywords: ["ho so", "giay to", "can nhung gi"]
        },
        {
            text: "Thời gian và Lệ phí cấp giấy ANTT?",
            answer: "Thời gian: 05 ngày làm việc.<br>Lệ phí: 300.000đ.",
            keywords: ["thoi gian", "le phi", "tien"]
        },
        {
            text: "Mất giấy ANTT, xin cấp lại?",
            answer: "Phải nộp phạt vi phạm hành chính về làm mất giấy tờ trước, sau đó nộp hồ sơ xin cấp lại tại CA xã.",
            keywords: ["mat giay", "cap lai"]
        },
        {
            text: "Đổi tên cơ sở hoặc người đứng đầu?",
            answer: "Làm thủ tục <b>Cấp đổi</b>. Cần nộp lại bản chính giấy cũ cùng tài liệu chứng minh thay đổi.",
            keywords: ["doi ten", "thay doi", "cap doi"]
        },
        {
            text: "Người nước ngoài đứng tên giấy ANTT?",
            answer: "Được. Hồ sơ thay Lý lịch tư pháp bằng Bản khai nhân sự + Hộ chiếu/Thẻ tạm trú.",
            keywords: ["nguoi nuoc ngoai", "tay"]
        },
        {
            text: "Giấy PCCC có cần trước không?",
            answer: "<b>Bắt buộc.</b> Phải có văn bản nghiệm thu hoặc biên bản kiểm tra an toàn PCCC trước khi nộp hồ sơ ANTT.",
            keywords: ["pccc", "phong chay"]
        },
        {
            text: "Ai phải nộp Lý lịch tư pháp (nếu có nhiều đại diện)?",
            answer: "Chỉ người <b>đứng tên trong Giấy chứng nhận ANTT</b> mới phải nộp.",
            keywords: ["ly lich", "dai dien"]
        },
        {
            text: "Bị thu hồi giấy ANTT có xin lại được không?",
            answer: "Được (đối với một số lỗi), nhưng phải chứng minh đã khắc phục xong vi phạm.",
            keywords: ["thu hoi", "bi phat"]
        },
        {
            text: "Nhận kết quả Giấy ANTT ở đâu?",
            answer: "Trực tiếp, qua Bưu điện, hoặc bản điện tử qua Cổng DVC.",
            keywords: ["nhan ket qua", "o dau"]
        }
    ],
    'xuat_nhap_canh': [
        {
            text: "Mất hộ chiếu phổ thông báo trong bao lâu?",
            answer: "Trong vòng <b>02 ngày làm việc</b>. Nếu quá hạn (do ốm đau, thiên tai) phải giải thích rõ trong đơn.",
            keywords: ["mat ho chieu", "trinh bao", "thoi han"]
        },
        {
            text: "Báo mất hộ chiếu ở đâu?",
            answer: "Tại Công an xã gần nhất (không cần về nơi thường trú), hoặc báo Online trên DVC Bộ Công an.",
            keywords: ["o dau", "online", "dia diem"]
        },
        {
            text: "Bao lâu hộ chiếu bị hủy giá trị?",
            answer: "Sau khi báo mất 01 ngày, Công an xã chuyển tin. Sau 01 ngày tiếp theo, Cục QLXNC sẽ hủy hộ chiếu.",
            keywords: ["huy ho chieu", "gia tri"]
        },
        {
            text: "Khai báo tạm trú cho người nước ngoài?",
            answer: "Trong vòng <b>12 giờ</b> (với vùng sâu xa là 24 giờ) kể từ khi khách đến.",
            keywords: ["nguoi nuoc ngoai", "khach tay", "tam tru"]
        },
        {
            text: "Thủ tục khai báo tạm trú cho khách nước ngoài?",
            answer: "Khai và nộp phiếu NA17 cho Công an xã. Không cần đưa khách đến trụ sở.",
            keywords: ["thu tuc", "na17", "khai bao"]
        },
        {
            text: "Mất thẻ APEC (ABTC)?",
            answer: "Phải báo mất trong vòng <b>48 giờ</b>.",
            keywords: ["the apec", "abtc", "doanh nhan"]
        },
        {
            text: "Kết quả báo mất thẻ ABTC?",
            answer: "Nhận 2 thông báo: Của CA xã (đã chuyển đơn) và của Cục QLXNC (giải quyết đơn - sau 3 ngày).",
            keywords: ["ket qua", "apec"]
        },
        {
            text: "Mất giấy thông hành biên giới?",
            answer: "Báo mất trong 02 ngày làm việc. Nộp tại Công an xã hoặc Online.",
            keywords: ["thong hanh", "bien gioi", "lao", "trung quoc"]
        },
        {
            text: "Lệ phí trình báo mất giấy tờ XNC?",
            answer: "<b>Miễn phí.</b>",
            keywords: ["le phi", "tien"]
        },
        {
            text: "Giấy tờ cần mang khi đi báo mất?",
            answer: "Thẻ Căn cước/CCCD còn hiệu lực.",
            keywords: ["giay to", "mang theo"]
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
    ]
};
