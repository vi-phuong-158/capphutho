/**
 * Localized FAQ datasets used by the chatbot/search.
 * The original Vietnamese dataset loaded from faq_db.js is preserved as fallback.
 */
(function () {
    const viCategories = window.MAIN_CATEGORIES || [];
    const viFaqData = window.FAQ_DATA || {};

    const categoriesEn = [
        { id: 'cu_tru', icon: 'fa-solid fa-house-user', text: 'Residence', keywords: ['residence', 'permanent residence', 'temporary residence', 'ct01', 'ct07', 'household'] },
        { id: 'cccd', icon: 'fa-solid fa-id-card', text: 'Citizen ID (CCCD)', keywords: ['citizen id', 'cccd', 'identity card', 'chip id', 'renewal'] },
        { id: 'dinh_danh', icon: 'fa-solid fa-passport', text: 'Digital Identity (VNeID)', keywords: ['vneid', 'digital identity', 'level 2', 'account', 'electronic id'] },
        { id: 'lien_thong', icon: 'fa-solid fa-link', text: 'Interlinked procedures', keywords: ['linked procedures', 'birth', 'death', 'residence', 'health insurance'] },
        { id: 'xe', icon: 'fa-solid fa-motorcycle', text: 'Vehicle registration', keywords: ['vehicle', 'motorbike', 'license plate', 'transfer', 'registration'] },
        { id: 'xuat_nhap_canh', icon: 'fa-solid fa-plane-departure', text: 'Immigration', keywords: ['passport', 'visa', 'foreigner', 'temporary stay', 'apec'] },
        { id: 'vu_khi', icon: 'fa-solid fa-person-military-rifle', text: 'Weapons & support tools', keywords: ['weapon', 'fireworks', 'support tools', 'declaration', 'handover'] },
        { id: 'kinh_doanh', icon: 'fa-solid fa-shop', text: 'Conditional businesses', keywords: ['security order', 'lodging', 'gas', 'fire safety', 'permit'] },
        { id: 'khieu_nai', icon: 'fa-solid fa-file-pen', text: 'Complaints & denunciations', keywords: ['complaint', 'denunciation', 'petition', 'feedback'] },
        { id: 'cap_tinh', icon: 'fa-solid fa-building-columns', text: 'Provincial procedures', url: 'modules/thu-tuc-cap-tinh.html', keywords: ['passport', 'driver license', 'criminal record', 'visa', 'security', 'vehicle registration'] }
    ];

    const faqDataEn = {
        cu_tru: [
            {
                text: 'What documents are needed to register permanent residence at a rented, borrowed or hosted home?',
                answer: '<b>Required documents:</b><br>1. Residence information change declaration form (CT01), with the consent of the household head or lawful homeowner where required.<br>2. A notarized or certified rental, borrowing or accommodation agreement.<br>3. Documents proving the minimum housing area, if the information is not already available in the national database.',
                keywords: ['permanent residence', 'rented home', 'ct01', 'documents']
            },
            {
                text: 'How long does permanent or temporary residence registration take?',
                answer: '<b>Permanent residence:</b> 7 working days after receiving a complete dossier.<br><b>Temporary residence:</b> 3 working days after receiving a complete dossier.<br><b>Household separation:</b> 5 working days.',
                keywords: ['processing time', 'temporary residence', 'permanent residence']
            }
        ],
        lien_thong: [
            {
                text: 'What is included in the interlinked birth, residence and health insurance procedure?',
                answer: '<b>It includes 3 procedures:</b><br>1. Birth registration.<br>2. Permanent residence registration.<br>3. Health insurance card issuance for children under 6 years old.<br>The applicant submits one online dossier through the National Public Service Portal or VNeID.',
                keywords: ['birth', 'health insurance', 'children', 'interlinked']
            },
            {
                text: 'Where can I submit interlinked birth or death procedures?',
                answer: 'You can submit the application on the National Public Service Portal or through the VNeID app, then select the interlinked public service for birth or death registration.',
                keywords: ['submit', 'online', 'vneid', 'public service portal']
            }
        ],
        cccd: [
            {
                text: 'How can children under 14 get a citizen ID card?',
                answer: '<b>Under 6:</b> Apply fully online via public service portals or VNeID; the child does not need to come in person.<br><b>From 6 to under 14:</b> A parent/guardian brings the child to the police office for biometric collection. Processing time is usually 7 working days.',
                keywords: ['children', 'under 14', 'citizen id', 'biometrics']
            },
            {
                text: 'If my citizen ID card is lost, do I need to take a new photo or fingerprints?',
                answer: '<b>Not always.</b> Officers may reuse existing photo and fingerprint data in the database when eligible. You may be able to apply online. Fee: 70,000 VND.',
                keywords: ['lost card', 'renewal', 'photo', 'fingerprints']
            }
        ],
        dinh_danh: [
            {
                text: 'Where can I register for a level-2 VNeID account?',
                answer: 'You can register at the police office when completing citizen ID procedures or at designated identity registration points. Bring your citizen ID card and relevant documents if you want to integrate licenses or insurance information.',
                keywords: ['vneid', 'level 2', 'register']
            },
            {
                text: 'What should I do if I lose my phone and need to lock VNeID immediately?',
                answer: 'Contact the police office or use official VNeID support channels to request account locking. Bring identification when completing the request in person.',
                keywords: ['lost phone', 'lock account', 'vneid']
            }
        ],
        xe: [
            {
                text: 'What are the conditions for full online first-time vehicle registration?',
                answer: 'The vehicle and owner information must be available and verifiable through connected systems. Applicants normally need citizen ID information, invoice data, vehicle quality certificate and registration fee payment information.',
                keywords: ['online registration', 'vehicle', 'license plate']
            },
            {
                text: 'How long do I have to transfer vehicle ownership?',
                answer: 'The ownership transfer should be completed within the legal deadline after purchase or transfer. Late registration may be subject to administrative penalties.',
                keywords: ['ownership transfer', 'deadline', 'penalty']
            }
        ],
        xuat_nhap_canh: [
            {
                text: 'When must a lost ordinary passport be reported?',
                answer: 'A lost ordinary passport should be reported promptly to the competent authority so the passport can be handled according to regulations and misuse can be prevented.',
                keywords: ['lost passport', 'report']
            },
            {
                text: 'What is the deadline for declaring temporary residence for foreigners?',
                answer: 'Accommodation providers must declare temporary residence for foreigners according to immigration regulations, usually through the online temporary residence declaration system.',
                keywords: ['foreigner', 'temporary residence', 'lodging']
            }
        ],
        vu_khi: [
            {
                text: 'Does a family-held traditional weapon need to be declared?',
                answer: 'Yes. Weapons, rudimentary weapons or support tools kept by organizations or individuals must be declared or handed over according to regulations when applicable.',
                keywords: ['weapon', 'declaration', 'family heirloom']
            },
            {
                text: 'Where can I submit a weapon declaration dossier?',
                answer: 'Submit it to the competent police office. Officers will guide the required form and documents depending on the type and origin of the item.',
                keywords: ['submit', 'weapon declaration', 'police']
            }
        ],
        kinh_doanh: [
            {
                text: 'Where does a small lodging facility or gas shop submit security-order documents?',
                answer: 'Submit the security and order eligibility dossier to the competent police authority or through the Ministry of Public Security public service portal when available.',
                keywords: ['security order', 'lodging', 'gas shop']
            },
            {
                text: 'What documents are needed for a security-order eligibility certificate?',
                answer: 'Typical documents include the application form, business registration documents and papers proving fire safety or other conditions required for the specific business line.',
                keywords: ['certificate', 'documents', 'conditional business']
            }
        ],
        khieu_nai: [
            {
                text: 'What is the processing time for a first-time complaint?',
                answer: 'The standard statutory time limit applies from the date the complaint is accepted. Complicated cases may take longer according to law.',
                keywords: ['complaint', 'processing time']
            },
            {
                text: 'Is submitting a complaint or denunciation free of charge?',
                answer: 'Yes. Submitting complaints and denunciations is free of charge.',
                keywords: ['fee', 'complaint', 'denunciation']
            }
        ],
        cap_tinh: [
            {
                text: 'Where to apply for a new passport?',
                answer: 'You can apply for a new passport at the Immigration Department of the Provincial Police. You can also apply online via the Public Service Portal.',
                keywords: ['passport', 'apply', 'where']
            },
            {
                text: 'What to do if passport is lost, damaged or expired?',
                answer: 'You can apply for a re-issuance at the Immigration Department of the Provincial Police, stating the reason clearly.',
                keywords: ['lost passport', 'damaged', 'expired']
            },
            {
                text: 'Which agency issues driver\'s licenses?',
                answer: 'The Traffic Police Department of the Provincial Police handles driver\'s license issuance, renewal, and replacement.',
                keywords: ['driver license', 'agency', 'issue']
            },
            {
                text: 'What to do if driver\'s license is lost or expired?',
                answer: 'You must apply for re-issuance or retake the driving test at the Provincial Traffic Police Department depending on how long it has been expired.',
                keywords: ['lost license', 'expired license']
            },
            {
                text: 'Where to get a criminal record certificate?',
                answer: 'Apply for a Criminal Record Certificate for Vietnamese citizens and foreigners residing in Vietnam at the Provincial Police Department.',
                keywords: ['criminal record', 'certificate', 'where']
            },
            {
                text: 'Where can foreigners extend their temporary residence?',
                answer: 'Procedures for visa and temporary residence extension are handled by the Immigration Department of the Provincial Police.',
                keywords: ['foreigner', 'extend residence', 'visa']
            },
            {
                text: 'Is the security and order certificate issued at the commune or provincial level?',
                answer: 'It depends on the business scale. Large hotels/security services are provincial/district level; small lodging/gas shops are commune level.',
                keywords: ['security certificate', 'commune', 'provincial']
            },
            {
                text: 'Is vehicle registration done at the commune or Traffic Police Department?',
                answer: 'Cars/organization vehicles are usually done at the Provincial Traffic Police. Personal motorbikes are often done at the commune/district police.',
                keywords: ['vehicle registration', 'commune', 'traffic police']
            }
        ]
    };

    const categoriesZh = [
        { id: 'cu_tru', icon: 'fa-solid fa-house-user', text: '居住登记', keywords: ['居住', '常住', '暂住', 'ct01', 'ct07'] },
        { id: 'cccd', icon: 'fa-solid fa-id-card', text: '公民身份证', keywords: ['身份证', '公民身份证', '补办', '芯片'] },
        { id: 'dinh_danh', icon: 'fa-solid fa-passport', text: '电子身份 VNeID', keywords: ['vneid', '电子身份', '二级账户', '账户'] },
        { id: 'lien_thong', icon: 'fa-solid fa-link', text: '联办手续', keywords: ['联办', '出生', '死亡', '居住', '医保'] },
        { id: 'xe', icon: 'fa-solid fa-motorcycle', text: '车辆登记', keywords: ['车辆', '摩托车', '号牌', '过户', '登记'] },
        { id: 'xuat_nhap_canh', icon: 'fa-solid fa-plane-departure', text: '出入境', keywords: ['护照', '签证', '外国人', '临时住宿'] },
        { id: 'vu_khi', icon: 'fa-solid fa-person-military-rifle', text: '武器与工具', keywords: ['武器', '烟花', '工具', '申报', '上交'] },
        { id: 'kinh_doanh', icon: 'fa-solid fa-shop', text: '特种行业', keywords: ['治安', '住宿', '燃气', '消防', '许可'] },
        { id: 'khieu_nai', icon: 'fa-solid fa-file-pen', text: '投诉与举报', keywords: ['投诉', '举报', '申请', '反映'] },
        { id: 'cap_tinh', icon: 'fa-solid fa-building-columns', text: '省级行政手续', url: 'modules/thu-tuc-cap-tinh.html', keywords: ['护照', '驾驶证', '无犯罪记录', '签证', '治安', '车辆登记'] }
    ];

    const faqDataZh = {
        cu_tru: [
            {
                text: '在租赁、借住或寄住住房登记常住需要哪些材料？',
                answer: '<b>主要材料：</b><br>1. 居住信息变更申报表（CT01），按规定取得户主或合法房屋所有人的同意。<br>2. 经公证或认证的租赁、借住或寄住协议。<br>3. 如国家数据库尚无信息，需提供住房面积证明材料。',
                keywords: ['常住', '租房', 'ct01', '材料']
            },
            {
                text: '常住或暂住登记需要多长时间？',
                answer: '<b>常住登记：</b>收到完整材料后7个工作日。<br><b>暂住登记：</b>收到完整材料后3个工作日。<br><b>分户：</b>5个工作日。',
                keywords: ['时限', '暂住', '常住']
            }
        ],
        lien_thong: [
            {
                text: '出生登记、常住登记和医保卡联办包括哪些内容？',
                answer: '<b>包括3项手续：</b><br>1. 出生登记。<br>2. 常住登记。<br>3. 为6岁以下儿童办理医保卡。<br>申请人可通过国家公共服务门户或VNeID在线提交一套材料。',
                keywords: ['出生', '医保', '儿童', '联办']
            },
            {
                text: '出生或死亡联办手续在哪里提交？',
                answer: '可在国家公共服务门户或VNeID应用提交，并选择出生或死亡登记联办服务。',
                keywords: ['提交', '在线', 'vneid', '公共服务']
            }
        ],
        cccd: [
            {
                text: '14岁以下儿童如何办理公民身份证？',
                answer: '<b>6岁以下：</b>可通过公共服务平台或VNeID全程在线办理，儿童无需到场。<br><b>6岁至14岁以下：</b>父母或监护人带儿童到公安机关采集生物信息。通常7个工作日办理。',
                keywords: ['儿童', '14岁以下', '身份证']
            },
            {
                text: '公民身份证丢失补办时需要重新拍照或采集指纹吗？',
                answer: '<b>不一定。</b>符合条件时可使用数据库中已有照片和指纹信息，也可在线申请。费用：70,000越南盾。',
                keywords: ['丢失', '补办', '照片', '指纹']
            }
        ],
        dinh_danh: [
            {
                text: '在哪里注册二级VNeID账户？',
                answer: '可在办理公民身份证时或指定身份登记点注册。请携带公民身份证；如需整合驾照、医保等信息，请携带相关材料。',
                keywords: ['vneid', '二级', '注册']
            },
            {
                text: '手机丢失，需要立即锁定VNeID怎么办？',
                answer: '请联系公安机关或通过官方VNeID支持渠道申请锁定账户。现场办理时需携带身份证明。',
                keywords: ['手机丢失', '锁定账户', 'vneid']
            }
        ],
        xe: [
            {
                text: '首次车辆登记全程网上办理需要什么条件？',
                answer: '车辆和车主信息需可通过联网系统核验。通常需要公民身份证信息、发票信息、车辆出厂质量证明和车辆购置税/登记费缴纳信息。',
                keywords: ['网上登记', '车辆', '号牌']
            },
            {
                text: '车辆过户应在多长时间内办理？',
                answer: '购买或转让车辆后应在法定期限内办理过户。逾期可能受到行政处罚。',
                keywords: ['过户', '期限', '处罚']
            }
        ],
        xuat_nhap_canh: [
            {
                text: '普通护照遗失应何时报告？',
                answer: '普通护照遗失后应及时向有权限机关报告，以便按规定处理并防止被滥用。',
                keywords: ['护照遗失', '报告']
            },
            {
                text: '外国人临时住宿申报期限是什么？',
                answer: '住宿经营者应按出入境规定为外国人申报临时住宿，通常通过在线临时住宿申报系统办理。',
                keywords: ['外国人', '临时住宿', '住宿']
            }
        ],
        vu_khi: [
            {
                text: '家庭保存的传统武器需要申报吗？',
                answer: '需要。组织或个人保存的武器、简易武器或支持工具，应按规定申报或上交。',
                keywords: ['武器', '申报', '家传']
            },
            {
                text: '武器申报材料在哪里提交？',
                answer: '请向有权限的公安机关提交。工作人员会根据物品种类和来源指导表格及材料。',
                keywords: ['提交', '武器申报', '公安']
            }
        ],
        kinh_doanh: [
            {
                text: '小型住宿场所或燃气店在哪里提交治安材料？',
                answer: '向有权限的公安机关提交治安条件材料；可用时也可通过公安部公共服务门户提交。',
                keywords: ['治安', '住宿', '燃气']
            },
            {
                text: '申请治安条件证明需要哪些材料？',
                answer: '通常包括申请表、营业登记材料，以及该行业要求的消防安全或其他条件证明。',
                keywords: ['证明', '材料', '特种行业']
            }
        ],
        khieu_nai: [
            {
                text: '首次投诉的处理时限是多少？',
                answer: '自投诉被受理之日起按法定时限处理。复杂案件可依法延长。',
                keywords: ['投诉', '时限']
            },
            {
                text: '投诉和举报是否收费？',
                answer: '不收费。提交投诉和举报完全免费。',
                keywords: ['费用', '投诉', '举报']
            }
        ],
        cap_tinh: [
            {
                text: '在哪里申请新护照？',
                answer: '您可以在省级公安机关出入境管理处申请新护照，也可以通过公共服务门户网站在线申请。',
                keywords: ['护照', '申请', '哪里']
            },
            {
                text: '护照丢失、损坏或过期怎么办？',
                answer: '您可以在省级公安机关出入境管理处申请重新签发，并说明原因。',
                keywords: ['护照丢失', '损坏', '过期']
            },
            {
                text: '哪个机构颁发驾驶证？',
                answer: '省级公安交警部门负责驾驶证的签发、更新和补发。',
                keywords: ['驾驶证', '机构', '颁发']
            },
            {
                text: '驾驶证丢失或过期怎么办？',
                answer: '您必须在省级交警部门申请补发或重新参加驾驶考试（取决于过期时间）。',
                keywords: ['驾驶证丢失', '过期']
            },
            {
                text: '在哪里办理无犯罪记录证明？',
                answer: '越南公民和在越居住的外国人在省级公安机关办理无犯罪记录证明。',
                keywords: ['无犯罪记录', '证明', '哪里']
            },
            {
                text: '外国人可以在哪里延长暂住期？',
                answer: '签证和暂住延期手续由省级公安机关出入境管理处办理。',
                keywords: ['外国人', '延长暂住', '签证']
            },
            {
                text: '治安条件证明是在乡级还是省级办理？',
                answer: '取决于企业规模。大型酒店/保安服务为省/县级；小型住宿/燃气店为乡级。',
                keywords: ['治安证明', '乡级', '省级']
            },
            {
                text: '车辆登记是在乡级还是交警部门办理？',
                answer: '汽车/机构车辆通常在省级交警部门办理。个人摩托车通常在乡/县公安局办理。',
                keywords: ['车辆登记', '乡级', '交警']
            }
        ]
    };

    const datasets = {
        vi: { categories: viCategories, faq: viFaqData },
        en: { categories: categoriesEn, faq: faqDataEn },
        'zh-CN': { categories: categoriesZh, faq: faqDataZh }
    };

    function applyFaqLanguage(lang) {
        const dataset = datasets[lang] || datasets.vi;
        window.MAIN_CATEGORIES = dataset.categories;
        window.FAQ_DATA = dataset.faq;
    }

    window.FAQ_I18N = { applyFaqLanguage, datasets };
    applyFaqLanguage(window.I18N ? window.I18N.getLanguage() : 'vi');
})();
