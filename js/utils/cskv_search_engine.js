/**
 * CLIENT-SIDE CSKV SEARCH ENGINE
 * ------------------------------
 * Bộ máy tìm kiếm Cảnh sát khu vực (CSKV).
 * Độc lập với FaqSearchEngine, không thao tác DOM.
 */

window.CskvSearchEngine = class CskvSearchEngine {
    constructor() {
        this.index = [];
        this.cache = new Map();
        this.MAX_CACHE_SIZE = 100;
        this.buildIndex();
    }

    // 1. Chuẩn hóa chuỗi (bỏ dấu tiếng Việt, lowercase, trim)
    normalize(str) {
        if (!str) return '';
        return str.toString().toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "d")
            .trim();
    }

    // Chuẩn hóa số điện thoại (chỉ giữ lại chữ số)
    normalizePhone(str) {
        if (!str) return '';
        return str.toString().replace(/\D/g, '');
    }

    // 2. Xây dựng chỉ mục tìm kiếm (Flat Index)
    buildIndex() {
        const data = window.CSKV_DATA;
        if (!data || !Array.isArray(data.neighborhoods)) return;

        this.index = [];

        data.neighborhoods.forEach(nh => {
            const normalizedId = nh.id;
            const normalizedName = this.normalize(nh.name);
            const normalizedFullName = this.normalize(nh.fullName);
            const normalizedAreas = nh.areas.map(a => this.normalize(a));
            const normalizedAliases = (nh.aliases || []).map(a => this.normalize(a));

            const officersNormalized = nh.officers.map(off => {
                const normalizedOffName = this.normalize(off.name);
                const phonesDigits = off.phones.map(p => this.normalizePhone(p));
                return {
                    name: off.name,
                    phones: off.phones,
                    normalizedName: normalizedOffName,
                    phonesDigits: phonesDigits
                };
            });

            this.index.push({
                type: 'cskv',
                id: normalizedId,
                name: nh.name,
                fullName: nh.fullName,
                areas: nh.areas,
                officers: nh.officers,
                normalizedName: normalizedName,
                normalizedFullName: normalizedFullName,
                normalizedAreas: normalizedAreas,
                normalizedAliases: normalizedAliases,
                officersNormalized: officersNormalized,
                url: `modules/cskv.html?area=${normalizedId}`
            });
        });
    }

    // 3. Hàm tìm kiếm
    search(query) {
        if (!query || query.trim().length < 1) return [];

        // Truncate to prevent DoS
        if (query.length > 200) query = query.substring(0, 200);

        if (this.cache.has(query)) {
            return this.cache.get(query);
        }

        const normalizedQuery = this.normalize(query);
        const queryPhoneDigits = this.normalizePhone(query);
        const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

        const results = [];

        for (const item of this.index) {
            let score = 0;
            let matchReason = '';
            let matchedOfficer = null;

            // a. Match TDP Name / Full Name / Exact Alias (Strong = 100)
            if (item.normalizedName === normalizedQuery || item.normalizedFullName === normalizedQuery) {
                score += 100;
                matchReason = 'exact_tdp';
            } else if (item.normalizedAliases.some(alias => alias === normalizedQuery)) {
                score += 100;
                matchReason = 'exact_alias';
            } else if (item.normalizedAreas.some(area => area === normalizedQuery)) {
                score += 100;
                matchReason = 'exact_area';
            }

            // b. Match Officer Name / Phone Number (Strong = 90 - 100)
            for (const off of item.officersNormalized) {
                if (off.normalizedName === normalizedQuery) {
                    score += 90;
                    matchReason = 'exact_officer_name';
                    matchedOfficer = off.name;
                } else if (off.normalizedName.includes(normalizedQuery)) {
                    score += 50;
                    if (!matchReason) matchReason = 'partial_officer_name';
                    if (!matchedOfficer) matchedOfficer = off.name;
                }

                // Phone matching: compare digits or formatted string
                if (queryPhoneDigits && queryPhoneDigits.length >= 3) {
                    if (off.phonesDigits.some(p => p.includes(queryPhoneDigits))) {
                        score += 95;
                        matchReason = 'phone_match';
                        if (!matchedOfficer) matchedOfficer = off.name;
                    }
                }
            }

            // c. Substring match on TDP / area / alias (Medium = 40 - 50)
            if (score === 0) {
                if (item.normalizedFullName.includes(normalizedQuery) || item.normalizedName.includes(normalizedQuery)) {
                    score += 50;
                    matchReason = 'partial_tdp';
                } else if (item.normalizedAreas.some(area => area.includes(normalizedQuery))) {
                    score += 45;
                    matchReason = 'partial_area';
                } else if (item.normalizedAliases.some(alias => alias.includes(normalizedQuery))) {
                    score += 40;
                    matchReason = 'partial_alias';
                }
            }

            // d. Token matching (Weak = 10 per token)
            if (score === 0 && queryTokens.length > 0) {
                let tokenMatches = 0;
                for (const token of queryTokens) {
                    if (
                        item.normalizedFullName.includes(token) ||
                        item.normalizedAreas.some(a => a.includes(token)) ||
                        item.normalizedAliases.some(a => a.includes(token)) ||
                        item.officersNormalized.some(o => o.normalizedName.includes(token))
                    ) {
                        tokenMatches += 1;
                    }
                }
                if (tokenMatches === queryTokens.length) {
                    score += 30;
                    matchReason = 'all_tokens_match';
                } else if (tokenMatches > 0) {
                    score += 10 * tokenMatches;
                    matchReason = 'partial_token_match';
                }
            }

            if (score > 0) {
                results.push({
                    ...item,
                    score,
                    matchReason,
                    matchedOfficer
                });
            }
        }

        // Sort descending by score
        const sorted = results.sort((a, b) => b.score - a.score);

        // Cache result
        if (this.cache.size >= this.MAX_CACHE_SIZE) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(query, sorted);

        return sorted;
    }
};
