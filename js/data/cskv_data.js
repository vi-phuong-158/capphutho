/**
 * SINGLE SOURCE OF TRUTH - DỮ LIỆU CẢNH SÁT KHU VỰC (CSKV)
 * Công an phường Phú Thọ
 */

window.CSKV_DATA = Object.freeze({
    generalContact: {
        name: "Điêu Thị Phương Hồng",
        displayTitleName: "Đồng chí Điêu Thị Phương Hồng",
        title: "Phó Trưởng Công an phường",
        phone: "0948562868",
        formattedPhone: "0948.562.868",
        note: "Phụ trách chung - Liên hệ công việc chung"
    },

    dutyPhone: "02106268588",
    formattedDutyPhone: "0210.626.8588",

    neighborhoods: [
        {
            id: "hung-vuong",
            name: "Hùng Vương",
            fullName: "TDP Hùng Vương",
            areas: ["Tân Lập", "Tân An"],
            aliases: [
                "TDP Hùng Vương",
                "Hùng Vương",
                "Tân Lập",
                "Tân An"
            ],
            officers: [
                {
                    name: "Nguyễn Minh Đức",
                    phones: ["0986248246"],
                    formattedPhones: ["0986.248.246"]
                }
            ]
        },
        {
            id: "long-xuyen",
            name: "Long Xuyên",
            fullName: "TDP Long Xuyên",
            areas: ["Tân Thành", "Sa Đéc"],
            aliases: [
                "TDP Long Xuyên",
                "Long Xuyên",
                "Tân Thành",
                "Sa Đéc"
            ],
            officers: [
                {
                    name: "Trương Tuấn Anh",
                    phones: ["0984529894"],
                    formattedPhones: ["0984.529.894"]
                },
                {
                    name: "Hoàng Kim Thành",
                    phones: ["0916668618"],
                    formattedPhones: ["0916.668.618"]
                }
            ]
        },
        {
            id: "phu-liem",
            name: "Phú Liêm",
            fullName: "TDP Phú Liêm",
            areas: ["Trường An", "Phú Liêm"],
            aliases: [
                "TDP Phú Liêm",
                "Phú Liêm",
                "Trường An"
            ],
            officers: [
                {
                    name: "Đỗ Thị Mỹ Hạnh",
                    phones: ["0378621268"],
                    formattedPhones: ["0378.621.268"]
                }
            ]
        },
        {
            id: "an-ninh",
            name: "An Ninh",
            fullName: "TDP An Ninh",
            areas: ["An Ninh Hạ", "An Ninh Thượng"],
            aliases: [
                "TDP An Ninh",
                "An Ninh",
                "An Ninh Hạ",
                "An Ninh Thượng"
            ],
            officers: [
                {
                    name: "Trương Tuấn Anh",
                    phones: ["0984529894"],
                    formattedPhones: ["0984.529.894"]
                }
            ]
        },
        {
            id: "thong-nhat",
            name: "Thống Nhất",
            fullName: "TDP Thống Nhất",
            areas: ["An Ninh Trung", "Thống Nhất"],
            aliases: [
                "TDP Thống Nhất",
                "Thống Nhất",
                "An Ninh Trung"
            ],
            officers: [
                {
                    name: "Lê Văn Nam",
                    phones: ["0904929386"],
                    formattedPhones: ["0904.929.386"]
                }
            ]
        },
        {
            id: "xuan-thanh",
            name: "Xuân Thành",
            fullName: "TDP Xuân Thành",
            areas: ["Xuân Thành", "Vạn Thắng", "Đoàn Kết"],
            aliases: [
                "TDP Xuân Thành",
                "Xuân Thành",
                "Vạn Thắng",
                "Đoàn Kết"
            ],
            officers: [
                {
                    name: "Nguyễn Xuân Hưng",
                    phones: ["0987769694"],
                    formattedPhones: ["0987.769.694"]
                }
            ]
        },
        {
            id: "xuan-van",
            name: "Xuân Vân",
            fullName: "TDP Xuân Vân",
            areas: ["Khu 1", "Khu 2", "Khu 3"],
            aliases: [
                "TDP Xuân Vân",
                "Xuân Vân",
                "Khu 1",
                "Khu 2",
                "Khu 3",
                "1",
                "2",
                "3",
                "khu 1",
                "khu 2",
                "khu 3"
            ],
            officers: [
                {
                    name: "Nguyễn Xuân Hòa",
                    phones: ["0974234795", "0932277626"],
                    formattedPhones: ["0974.234.795", "0932.277.626"]
                }
            ]
        },
        {
            id: "ngoc-lau",
            name: "Ngọc Lậu",
            fullName: "TDP Ngọc Lậu",
            areas: ["Khu 4", "Khu 5"],
            aliases: [
                "TDP Ngọc Lậu",
                "Ngọc Lậu",
                "Khu 4",
                "Khu 5",
                "4",
                "5",
                "khu 4",
                "khu 5"
            ],
            officers: [
                {
                    name: "Trần Mạnh Toàn",
                    phones: ["0986898345"],
                    formattedPhones: ["0986.898.345"]
                }
            ]
        },
        {
            id: "long-an",
            name: "Long Ân",
            fullName: "TDP Long Ân",
            areas: ["Khu 6", "Khu 7", "Khu 8"],
            aliases: [
                "TDP Long Ân",
                "Long Ân",
                "Khu 6",
                "Khu 7",
                "Khu 8",
                "6",
                "7",
                "8",
                "khu 6",
                "khu 7",
                "khu 8"
            ],
            officers: [
                {
                    name: "Bùi Ngọc Sơn",
                    phones: ["0965295345"],
                    formattedPhones: ["0965.295.345"]
                },
                {
                    name: "Phạm Văn Sơn",
                    phones: ["0985424768"],
                    formattedPhones: ["0985.424.768"]
                }
            ]
        }
    ]
});
