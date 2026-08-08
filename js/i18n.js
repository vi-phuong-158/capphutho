/**
 * Lightweight client-side i18n for the static site.
 * Vietnamese remains the source/fallback language.
 */
(function () {
    const SUPPORTED_LANGS = ['vi', 'en', 'zh-CN'];
    const DEFAULT_LANG = 'vi';

    const translations = {
        vi: {
            'meta.title': 'Cổng Thông Tin Số | Công An Phường Phú Thọ',
            'meta.description': 'Cổng thông tin số hỗ trợ công dân - Công an phường Phú Thọ',
            'brand.name': 'Công An Phường Phú Thọ',
            'home.title': 'Cổng Thông Tin Số',
            'home.subtitle': 'Hỗ trợ Thủ tục hành chính & Dịch vụ công',
            'language.label': 'Ngôn ngữ',
            'elder.on': 'Chữ to / Dễ đọc',
            'elder.off': 'Chế độ thường',
            'status.title': 'Thông báo giờ giải quyết TTHC',
            'status.hours': 'Thứ 2 - Thứ 7 | Sáng: 7h30-11h30 | Chiều: 13h00-16h30',
            'video.title': 'Video giới thiệu',
            'video.subtitle': 'Tổng quan dịch vụ công và hỗ trợ người dân tại Công an phường Phú Thọ',
            'video.aria': 'Video giới thiệu Công an phường Phú Thọ',
            'video.fallback': 'Trình duyệt của bạn không hỗ trợ phát video. Vui lòng tải tệp videogioithieu.mp4 để xem.',
            'maps.title': 'Vị trí Công an Phường Phú Thọ',
            'maps.directions': 'Chỉ đường',
            'maps.directionsAria': 'Chỉ đường tới Công an phường Phú Thọ',
            'search.aria': 'Tìm kiếm thủ tục hành chính',
            'search.placeholder': 'Bạn cần tìm thủ tục gì? (Ví dụ: Định danh, Hộ khẩu...)',
            'grid.title': 'Dịch Vụ Trực Tuyến',
            'grid.badge': '24/7',
            'card.residence.title': 'Cư Trú & Định Danh',
            'card.residence.desc': 'CCCD, VNeID, CT07, CT08',
            'card.vehicle.title': 'Đăng Ký Xe',
            'card.vehicle.desc': 'Cấp biển số, sang tên đổi chủ',
            'card.weapon.title': 'Vũ Khí & Pháo',
            'card.weapon.desc': 'Vận động giao nộp, tố giác',
            'card.security.title': 'An Ninh Trật Tự',
            'card.security.desc': 'Ngành nghề kinh doanh, lưu trú',
            'card.complaint.title': 'Khiếu Nại & Tố Cáo',
            'card.complaint.desc': 'Gửi đơn thư, phản ánh',
            'card.cskv.title': 'Tra cứu Cảnh sát khu vực',
            'card.cskv.desc': 'Tìm cán bộ phụ trách theo TDP, khu dân cư hoặc tên cán bộ',
            'card.provincial.title': 'Thủ Tục Cấp Tỉnh',
            'card.provincial.desc': 'Hộ chiếu, GPLX, LLTP, NNN...',
            'card.foreigner.title': 'Người Nước Ngoài',
            'card.foreigner.desc': 'Khai báo tạm trú, Visa, XNC',
            'card.interlinked.title': 'Thủ Tục Liên Thông',
            'card.interlinked.desc': 'Khai sinh, khai tử, cư trú, BHYT',
            'card.bocdong.title': 'Một phút bốc đồng',
            'card.bocdong.desc': 'Tuyên truyền phòng ngừa vi phạm pháp luật',
            'interlinked.eyebrow': 'TTHC liên thông điện tử',
            'interlinked.title': 'Thủ tục liên thông trọng điểm',
            'interlinked.desc': 'Căn cứ Nghị định 63/2024/NĐ-CP, người dân có thể nộp một hồ sơ trực tuyến để hệ thống chuyển xử lý đồng thời giữa hộ tịch, cư trú, bảo hiểm xã hội và cơ quan chính sách có liên quan.',
            'interlinked.birth.title': 'Khai sinh - thường trú - cấp thẻ BHYT',
            'interlinked.birth.subtitle': 'Áp dụng cho trẻ em dưới 06 tuổi',
            'interlinked.birth.item1': '<strong>Thủ tục:</strong> Đăng ký khai sinh, đăng ký thường trú và cấp thẻ bảo hiểm y tế.',
            'interlinked.birth.item2': '<strong>Cách làm:</strong> Nộp 01 bộ hồ sơ trực tuyến; hệ thống chuyển dữ liệu giữa UBND cấp xã, Công an và Bảo hiểm xã hội.',
            'interlinked.birth.item3': '<strong>Thời hạn:</strong> Thông thường 03 ngày làm việc; trường hợp cần xác minh không quá 05 ngày làm việc.',
            'interlinked.death.title': 'Khai tử - xóa thường trú - mai táng phí, tử tuất',
            'interlinked.death.subtitle': 'Hỗ trợ gia đình thực hiện nhiều thủ tục sau khi có người thân qua đời',
            'interlinked.death.item1': '<strong>Thủ tục:</strong> Đăng ký khai tử, xóa đăng ký thường trú, giải quyết mai táng phí và chế độ tử tuất nếu đủ điều kiện.',
            'interlinked.death.item2': '<strong>Cách làm:</strong> Có thể chọn liên thông 02, 03 hoặc 04 thủ tục; phần mềm tự điều chỉnh tờ khai và hồ sơ đính kèm.',
            'interlinked.death.item3': '<strong>Thời hạn:</strong> Khoảng 06-18 ngày làm việc tùy nhóm đối tượng và chế độ do BHXH hoặc ngành Lao động - Thương binh và Xã hội giải quyết.',
            'interlinked.flow.commune': 'UBND cấp xã',
            'interlinked.flow.police': 'Công an',
            'interlinked.flow.insurance': 'BHXH',
            'interlinked.flow.policy': 'BHXH/LĐ-TB&XH',
            'interlinked.badge.oneFile': '01 hồ sơ',
            'interlinked.badge.online': 'Trực tuyến',
            'interlinked.badge.multiple': '02-04 thủ tục',
            'interlinked.badge.travel': 'Giảm đi lại',
            'platform.national': 'Cổng DVC Quốc gia',
            'platform.vneid': 'Ứng dụng VNeID',
            'platform.police': 'Cổng DVC Bộ Công an',
            'footer.name': 'Công An Phường Phú Thọ',
            'footer.copy': '© 2026 Bản quyền thuộc về Công an phường Phú Thọ, tỉnh Phú Thọ',
            'chat.label': 'Trợ lý ảo 24/7',
            'chat.openAria': 'Mở hộp thoại chat',
            'chat.closeAria': 'Đóng hộp thoại chat',
            'chat.title': 'Trợ lý Ảo Công an Phường',
            'chat.status': 'Luôn sẵn sàng hỗ trợ',
            'chat.welcome': 'Xin chào bà con! Tôi là <b>Trợ lý ảo</b> của Công an phường Phú Thọ.<br>Tôi có thể giúp gì cho bà con hôm nay?',
            'chat.inputAria': 'Nhập câu hỏi',
            'chat.placeholder': 'Nhập câu hỏi hoặc thủ tục cần tìm...',
            'chat.sendAria': 'Gửi tin nhắn',
            'chat.backCategories': 'Quay lại danh mục',
            'chat.categoryIntro': 'Đây là các câu hỏi về <b>{category}</b>:',
            'chat.moreQuestions': 'Xem câu hỏi khác',
            'chat.mainCategories': 'Về danh mục chính',
            'chat.categoryPrefix': '[Mục] {text}',
            'chat.modeAi': 'Trợ lý AI',
            'chat.modeFaq': 'Câu hỏi thường gặp',
            'chat.aiLoading': 'Đang tải trợ lý AI...',
            'chat.aiUiReady': 'Trợ lý AI đang xác minh bảo mật...',
            'chat.aiReady': 'Trợ lý AI đã sẵn sàng',
            'chat.aiError': 'Không thể kết nối trợ lý AI. Vui lòng thử lại hoặc dùng FAQ.',
            'chat.aiRetry': 'Thử lại',
            'chat.useFaq': 'Dùng FAQ',
            'chat.faqStatus': 'Đang dùng câu hỏi thường gặp',
            'chat.retryLimit': 'Đã đạt giới hạn thử lại. Vui lòng dùng FAQ.',
            'search.noResults': 'Không tìm thấy kết quả cho "{query}"',
            'search.categorySubtitle': 'Danh mục thủ tục',
            'search.questionSubtitle': 'Câu hỏi thường gặp'
        },
        en: {
            'meta.title': 'Digital Information Portal | Phu Tho Ward Police',
            'meta.description': 'Digital citizen support portal - Phu Tho Ward Police',
            'brand.name': 'Phu Tho Ward Police',
            'home.title': 'Digital Information Portal',
            'home.subtitle': 'Administrative procedure and public service support',
            'language.label': 'Language',
            'elder.on': 'Large text / Easy read',
            'elder.off': 'Standard mode',
            'status.title': 'Administrative service hours',
            'status.hours': 'Monday - Saturday | Morning: 7:30-11:30 | Afternoon: 13:00-16:30',
            'video.title': 'Introduction Video',
            'video.subtitle': 'Overview of public services and citizen support at Phu Tho Ward Police',
            'video.aria': 'Introduction video for Phu Tho Ward Police',
            'video.fallback': 'Your browser does not support video playback. Please download videogioithieu.mp4 to watch.',
            'maps.title': 'Phu Tho Ward Police Location',
            'maps.directions': 'Directions',
            'maps.directionsAria': 'Get directions to Phu Tho Ward Police',
            'search.aria': 'Search administrative procedures',
            'search.placeholder': 'What procedure do you need? (Example: VNeID, residence...)',
            'grid.title': 'Online Services',
            'grid.badge': '24/7',
            'card.residence.title': 'Residence & Digital ID',
            'card.residence.desc': 'Citizen ID, VNeID, CT07, CT08',
            'card.vehicle.title': 'Vehicle Registration',
            'card.vehicle.desc': 'License plates, ownership transfer',
            'card.weapon.title': 'Weapons & Fireworks',
            'card.weapon.desc': 'Voluntary handover, reporting',
            'card.security.title': 'Security & Order',
            'card.security.desc': 'Conditional businesses, lodging',
            'card.complaint.title': 'Complaints & Denunciations',
            'card.complaint.desc': 'Submit letters, feedback',
            'card.cskv.title': 'Local Police Officer Lookup',
            'card.cskv.desc': 'Find the officer responsible for your area',
            'card.provincial.title': 'Provincial Procedures',
            'card.provincial.desc': 'Passports, Driver\'s Licenses, Records...',
            'card.foreigner.title': 'Foreign Nationals',
            'card.foreigner.desc': 'Temporary residence, Visas, Immigration',
            'card.interlinked.title': 'Interlinked Procedures',
            'card.interlinked.desc': 'Birth, death, residence, health insurance',
            'card.bocdong.title': 'Impulsive Moment',
            'card.bocdong.desc': 'Propaganda for prevention of violations',
            'interlinked.eyebrow': 'Digital interlinked administrative procedures',
            'interlinked.title': 'Key interlinked procedures',
            'interlinked.desc': 'Under Decree 63/2024/ND-CP, residents can submit one online application so the system forwards data among civil status, residence, social insurance and relevant policy agencies.',
            'interlinked.birth.title': 'Birth registration - permanent residence - health insurance card',
            'interlinked.birth.subtitle': 'For children under 6 years old',
            'interlinked.birth.item1': '<strong>Procedures:</strong> Birth registration, permanent residence registration and health insurance card issuance.',
            'interlinked.birth.item2': '<strong>How to apply:</strong> Submit one online dossier; the system transfers data among the commune-level People\'s Committee, Police and Social Insurance agency.',
            'interlinked.birth.item3': '<strong>Processing time:</strong> Usually 3 working days; no more than 5 working days if verification is needed.',
            'interlinked.death.title': 'Death registration - residence deregistration - funeral allowance and survivor benefits',
            'interlinked.death.subtitle': 'Helps families complete multiple procedures after a relative passes away',
            'interlinked.death.item1': '<strong>Procedures:</strong> Death registration, permanent residence deregistration, funeral allowance and survivor benefits if eligible.',
            'interlinked.death.item2': '<strong>How to apply:</strong> Applicants can select 2, 3 or 4 linked procedures; the software adjusts forms and attachments automatically.',
            'interlinked.death.item3': '<strong>Processing time:</strong> About 6-18 working days depending on the applicant group and the benefit handled by Social Insurance or the labor and social affairs authority.',
            'interlinked.flow.commune': 'Commune-level People\'s Committee',
            'interlinked.flow.police': 'Police',
            'interlinked.flow.insurance': 'Social Insurance',
            'interlinked.flow.policy': 'Social Insurance/Labor authority',
            'interlinked.badge.oneFile': '1 dossier',
            'interlinked.badge.online': 'Online',
            'interlinked.badge.multiple': '2-4 procedures',
            'interlinked.badge.travel': 'Fewer visits',
            'platform.national': 'National Public Service Portal',
            'platform.vneid': 'VNeID app',
            'platform.police': 'Ministry of Public Security Service Portal',
            'footer.name': 'Phu Tho Ward Police',
            'footer.copy': '© 2026 Copyright belongs to Phu Tho Ward Police, Phu Tho Province',
            'chat.label': 'Virtual assistant 24/7',
            'chat.openAria': 'Open chat dialog',
            'chat.closeAria': 'Close chat dialog',
            'chat.title': 'Ward Police Virtual Assistant',
            'chat.status': 'Always ready to help',
            'chat.welcome': 'Hello! I am the <b>virtual assistant</b> of Phu Tho Ward Police.<br>How can I help you today?',
            'chat.inputAria': 'Enter your question',
            'chat.placeholder': 'Enter a question or procedure to search...',
            'chat.sendAria': 'Send message',
            'chat.backCategories': 'Back to categories',
            'chat.categoryIntro': 'Here are questions about <b>{category}</b>:',
            'chat.moreQuestions': 'See other questions',
            'chat.mainCategories': 'Main categories',
            'chat.categoryPrefix': '[Category] {text}',
            'chat.modeAi': 'AI assistant',
            'chat.modeFaq': 'Frequently asked questions',
            'chat.aiLoading': 'Loading AI assistant...',
            'chat.aiUiReady': 'AI assistant is verifying security...',
            'chat.aiReady': 'AI assistant is ready',
            'chat.aiError': 'Unable to connect to the AI assistant. Please try again or use the FAQ.',
            'chat.aiRetry': 'Try again',
            'chat.useFaq': 'Use FAQ',
            'chat.faqStatus': 'Using frequently asked questions',
            'chat.retryLimit': 'Retry limit reached. Please use the FAQ.',
            'search.noResults': 'No results found for "{query}"',
            'search.categorySubtitle': 'Procedure category',
            'search.questionSubtitle': 'Frequently asked question'
        },
        'zh-CN': {
            'meta.title': '数字信息门户 | 富寿坊公安',
            'meta.description': '富寿坊公安公民服务数字信息门户',
            'brand.name': '富寿坊公安',
            'home.title': '数字信息门户',
            'home.subtitle': '行政手续与公共服务支持',
            'language.label': '语言',
            'elder.on': '大字 / 易读',
            'elder.off': '标准模式',
            'status.title': '行政服务办理时间',
            'status.hours': '周一至周六 | 上午：7:30-11:30 | 下午：13:00-16:30',
            'video.title': '介绍视频',
            'video.subtitle': '富寿坊公安公共服务和居民支持概览',
            'video.aria': '富寿坊公安介绍视频',
            'video.fallback': '您的浏览器不支持视频播放。请下载 videogioithieu.mp4 查看。',
            'maps.title': '富寿坊公安位置',
            'maps.directions': '路线',
            'maps.directionsAria': '前往富寿坊公安的路线',
            'search.aria': '搜索行政手续',
            'search.placeholder': '您需要办理什么手续？例如：电子身份、居住登记...',
            'grid.title': '在线服务',
            'grid.badge': '24/7',
            'card.residence.title': '居住与电子身份',
            'card.residence.desc': '公民身份证、VNeID、CT07、CT08',
            'card.vehicle.title': '车辆登记',
            'card.vehicle.desc': '号牌办理、过户',
            'card.weapon.title': '武器与烟花爆竹',
            'card.weapon.desc': '主动上交、举报',
            'card.security.title': '治安管理',
            'card.security.desc': '特种行业、住宿管理',
            'card.complaint.title': '投诉与举报',
            'card.complaint.desc': '提交信件、反映情况',
            'card.cskv.title': '社区警务人员查询',
            'card.cskv.desc': '按辖区查找负责警员',
            'card.provincial.title': '省级行政手续',
            'card.provincial.desc': '护照、驾驶证、无犯罪记录...',
            'card.foreigner.title': '外国人服务',
            'card.foreigner.desc': '暂住申报、签证、出入境',
            'card.interlinked.title': '联办手续',
            'card.interlinked.desc': '出生、死亡、居住、医保',
            'card.bocdong.title': '一分钟冲动',
            'card.bocdong.desc': '预防违法行为宣传',
            'interlinked.eyebrow': '电子联办行政手续',
            'interlinked.title': '重点联办手续',
            'interlinked.desc': '根据第63/2024/ND-CP号议定，居民可在线提交一套材料，由系统在户籍、居住、社会保险和相关政策机关之间转办。',
            'interlinked.birth.title': '出生登记 - 常住登记 - 医保卡办理',
            'interlinked.birth.subtitle': '适用于6岁以下儿童',
            'interlinked.birth.item1': '<strong>手续：</strong>出生登记、常住登记和医保卡办理。',
            'interlinked.birth.item2': '<strong>办理方式：</strong>在线提交一套材料；系统在乡级人民委员会、公安和社会保险机关之间传递数据。',
            'interlinked.birth.item3': '<strong>时限：</strong>通常3个工作日；需要核实时不超过5个工作日。',
            'interlinked.death.title': '死亡登记 - 注销常住 - 丧葬费、遗属待遇',
            'interlinked.death.subtitle': '帮助家属在亲人去世后一次办理多项手续',
            'interlinked.death.item1': '<strong>手续：</strong>死亡登记、注销常住登记、丧葬费和符合条件的遗属待遇。',
            'interlinked.death.item2': '<strong>办理方式：</strong>可选择联办2项、3项或4项手续；系统自动调整表格和附件。',
            'interlinked.death.item3': '<strong>时限：</strong>约6-18个工作日，取决于对象类别及由社会保险或劳动社会事务机关处理的待遇。',
            'interlinked.flow.commune': '乡级人民委员会',
            'interlinked.flow.police': '公安',
            'interlinked.flow.insurance': '社会保险',
            'interlinked.flow.policy': '社保/劳动机关',
            'interlinked.badge.oneFile': '一套材料',
            'interlinked.badge.online': '在线',
            'interlinked.badge.multiple': '2-4项手续',
            'interlinked.badge.travel': '减少往返',
            'platform.national': '国家公共服务门户',
            'platform.vneid': 'VNeID应用',
            'platform.police': '公安部公共服务门户',
            'footer.name': '富寿坊公安',
            'footer.copy': '© 2026 版权所有：富寿省富寿坊公安',
            'chat.label': '智能助手 24/7',
            'chat.openAria': '打开聊天窗口',
            'chat.closeAria': '关闭聊天窗口',
            'chat.title': '坊公安智能助手',
            'chat.status': '随时为您服务',
            'chat.welcome': '您好！我是富寿坊公安的<b>智能助手</b>。<br>今天可以为您提供什么帮助？',
            'chat.inputAria': '输入问题',
            'chat.placeholder': '请输入问题或要查询的手续...',
            'chat.sendAria': '发送消息',
            'chat.backCategories': '返回分类',
            'chat.categoryIntro': '以下是关于 <b>{category}</b> 的问题：',
            'chat.moreQuestions': '查看更多问题',
            'chat.mainCategories': '返回主分类',
            'chat.categoryPrefix': '[分类] {text}',
            'chat.modeAi': 'AI 助手',
            'chat.modeFaq': '常见问题',
            'chat.aiLoading': '正在加载 AI 助手...',
            'chat.aiUiReady': 'AI 助手正在验证安全性...',
            'chat.aiReady': 'AI 助手已就绪',
            'chat.aiError': '无法连接 AI 助手。请重试或使用常见问题。',
            'chat.aiRetry': '重试',
            'chat.useFaq': '使用常见问题',
            'chat.faqStatus': '正在使用常见问题',
            'chat.retryLimit': '已达到重试上限。请使用常见问题。',
            'search.noResults': '未找到“{query}”的结果',
            'search.categorySubtitle': '手续分类',
            'search.questionSubtitle': '常见问题'
        }
    };

    function normalizeLang(lang) {
        if (!lang) return DEFAULT_LANG;
        if (lang === 'zh' || lang === 'zh-cn') return 'zh-CN';
        return SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
    }

    function getInitialLanguage() {
        const params = new URLSearchParams(window.location.search);
        return normalizeLang(params.get('lang') || localStorage.getItem('siteLanguage'));
    }

    let currentLang = getInitialLanguage();
    localStorage.setItem('siteLanguage', currentLang);

    function t(key, vars = {}) {
        const value = (translations[currentLang] && translations[currentLang][key])
            || translations[DEFAULT_LANG][key]
            || key;
        return value.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
    }

    function applyTranslations() {
        document.documentElement.lang = currentLang;
        document.title = t('meta.title');

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) metaDescription.setAttribute('content', t('meta.description'));

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            el.textContent = t(el.dataset.i18n);
        });

        document.querySelectorAll('[data-i18n-html]').forEach((el) => {
            el.innerHTML = t(el.dataset.i18nHtml);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
            el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
            el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
        });

        const selector = document.getElementById('languageSelect');
        if (selector) selector.value = currentLang;

        document.querySelectorAll('a[href*=".html"]').forEach((link) => {
            const rawHref = link.getAttribute('href');
            if (!rawHref || rawHref.startsWith('http') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return;
            const [pathAndQuery, hash = ''] = rawHref.split('#');
            const [path, query = ''] = pathAndQuery.split('?');
            const params = new URLSearchParams(query);
            params.set('lang', currentLang);
            link.setAttribute('href', `${path}?${params.toString()}${hash ? `#${hash}` : ''}`);
        });
    }

    function setLanguage(lang) {
        currentLang = normalizeLang(lang);
        localStorage.setItem('siteLanguage', currentLang);
        const url = new URL(window.location.href);
        url.searchParams.set('lang', currentLang);
        window.location.href = url.toString();
    }

    window.I18N = {
        t,
        applyTranslations,
        getLanguage: () => currentLang,
        setLanguage,
        supportedLanguages: SUPPORTED_LANGS
    };

    document.addEventListener('DOMContentLoaded', () => {
        applyTranslations();
        const selector = document.getElementById('languageSelect');
        if (selector) {
            selector.addEventListener('change', (event) => setLanguage(event.target.value));
        }
    });
})();
