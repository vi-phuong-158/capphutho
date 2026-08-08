/**
 * CSKV PAGE CONTROLLER
 * -------------------
 * Quản lý giao diện và tương tác cho trang modules/cskv.html
 */

window.CskvPageController = class CskvPageController {
    constructor() {
        this.engine = new window.CskvSearchEngine();
        this.data = window.CSKV_DATA;

        this.elements = {
            searchInput: document.getElementById('cskvSearchInput'),
            chipsContainer: document.getElementById('cskvChipsContainer'),
            gridContainer: document.getElementById('cskvGridContainer'),
            generalBox: document.getElementById('cskvGeneralBox'),
            dutyBox: document.getElementById('cskvDutyBox'),
            toast: document.getElementById('cskvToast')
        };

        this.activeChipId = null;
        this.init();
    }

    init() {
        this.renderGeneralContact();
        this.renderDutyContact();
        this.renderChips();
        this.renderCards();
        this.setupEventListeners();
        this.handleInitialUrlParams();
    }

    // Render Khối Phụ Trách Chung
    renderGeneralContact() {
        if (!this.elements.generalBox || !this.data.generalContact) return;
        const gc = this.data.generalContact;
        const formatFn = window.formatCskvPhone || (p => p);

        this.elements.generalBox.innerHTML = '';
        const infoWrap = document.createElement('div');
        infoWrap.className = 'cskv-general-info';

        const icon = document.createElement('div');
        icon.className = 'cskv-general-icon';
        icon.innerHTML = '<i class="fa-solid fa-user-shield"></i>';

        const textGroup = document.createElement('div');
        
        const tag = document.createElement('span');
        tag.className = 'cskv-general-tag';
        tag.textContent = 'Phụ trách chung - Liên hệ công việc chung';

        const nameEl = document.createElement('h2');
        nameEl.className = 'cskv-general-name';
        nameEl.textContent = gc.displayTitleName || (`Đồng chí ${gc.name}`);

        const titleEl = document.createElement('div');
        titleEl.className = 'cskv-general-title';
        titleEl.textContent = gc.title;

        const phoneEl = document.createElement('span');
        phoneEl.className = 'cskv-general-phone';
        phoneEl.textContent = formatFn(gc.phone);

        textGroup.appendChild(tag);
        textGroup.appendChild(nameEl);
        textGroup.appendChild(titleEl);
        textGroup.appendChild(phoneEl);

        infoWrap.appendChild(icon);
        infoWrap.appendChild(textGroup);

        const callBtn = document.createElement('a');
        callBtn.className = 'cskv-call-btn';
        callBtn.href = `tel:${gc.phone}`;
        callBtn.setAttribute('aria-label', `Gọi cho đồng chí ${gc.name}`);
        callBtn.innerHTML = '<i class="fa-solid fa-phone"></i> Gọi ngay';

        this.elements.generalBox.appendChild(infoWrap);
        this.elements.generalBox.appendChild(callBtn);
    }

    // Render Trực ban Công an phường
    renderDutyContact() {
        if (!this.elements.dutyBox) return;
        const dutyPhone = this.data.dutyPhone;
        const formatFn = window.formatCskvPhone || (p => p);
        const formattedDutyPhone = formatFn(dutyPhone);

        this.elements.dutyBox.innerHTML = '';

        const title = document.createElement('div');
        title.className = 'cskv-duty-title';
        title.textContent = 'Cần hỗ trợ chung?';

        const desc = document.createElement('div');
        desc.className = 'cskv-duty-desc';
        desc.textContent = 'Số điện thoại trực ban Công an phường:';

        const phoneLink = document.createElement('a');
        phoneLink.className = 'cskv-duty-phone-link';
        phoneLink.href = `tel:${dutyPhone}`;
        phoneLink.textContent = formattedDutyPhone;

        const callBtn = document.createElement('a');
        callBtn.className = 'cskv-call-btn';
        callBtn.href = `tel:${dutyPhone}`;
        callBtn.setAttribute('aria-label', `Gọi số trực ban Công an phường ${formattedDutyPhone}`);
        callBtn.innerHTML = '<i class="fa-solid fa-phone-flip"></i> Gọi trực ban';

        this.elements.dutyBox.appendChild(title);
        this.elements.dutyBox.appendChild(desc);
        this.elements.dutyBox.appendChild(phoneLink);
        this.elements.dutyBox.appendChild(callBtn);
    }

    // Render 9 Quick Filter Chips
    renderChips() {
        if (!this.elements.chipsContainer) return;
        this.elements.chipsContainer.innerHTML = '';

        const fragment = document.createDocumentFragment();
        this.data.neighborhoods.forEach(nh => {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'cskv-chip';
            chip.dataset.id = nh.id;
            chip.textContent = nh.name;
            chip.setAttribute('aria-label', `Lọc theo TDP ${nh.name}`);

            chip.onclick = () => this.handleChipClick(nh.id, chip);
            fragment.appendChild(chip);
        });

        this.elements.chipsContainer.appendChild(fragment);
    }

    // Render Cards cho 9 TDP
    renderCards() {
        if (!this.elements.gridContainer) return;
        this.elements.gridContainer.innerHTML = '';

        const fragment = document.createDocumentFragment();
        const formatFn = window.formatCskvPhone || (p => p);

        this.data.neighborhoods.forEach(nh => {
            const card = document.createElement('div');
            card.className = 'cskv-card';
            card.id = `cskv-card-${nh.id}`;
            card.dataset.id = nh.id;

            // Card Header
            const header = document.createElement('div');
            header.className = 'cskv-card-header';

            const title = document.createElement('h3');
            title.className = 'cskv-card-title';
            title.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${this.escapeHtml(nh.fullName)}`;

            const areasWrap = document.createElement('div');
            areasWrap.className = 'cskv-card-areas';

            const areaLabel = document.createElement('span');
            areaLabel.style.fontWeight = '700';
            areaLabel.textContent = 'Địa bàn:';
            areasWrap.appendChild(areaLabel);

            nh.areas.forEach(area => {
                const badge = document.createElement('span');
                badge.className = 'cskv-area-badge';
                badge.textContent = area;
                areasWrap.appendChild(badge);
            });

            header.appendChild(title);
            header.appendChild(areasWrap);
            card.appendChild(header);

            // Officers List
            const officersList = document.createElement('div');
            officersList.className = 'cskv-officers-list';

            nh.officers.forEach(off => {
                const offItem = document.createElement('div');
                offItem.className = 'cskv-officer-item';

                const offName = document.createElement('div');
                offName.className = 'cskv-officer-name';
                offName.innerHTML = `<i class="fa-solid fa-user-shield"></i> ${this.escapeHtml(off.name)}`;
                offItem.appendChild(offName);

                off.phones.forEach((phone) => {
                    const formattedPhone = formatFn(phone);

                    const phoneRow = document.createElement('div');
                    phoneRow.className = 'cskv-phone-row';

                    const phoneText = document.createElement('span');
                    phoneText.className = 'cskv-phone-text';
                    phoneText.textContent = formattedPhone;

                    const actions = document.createElement('div');
                    actions.className = 'cskv-phone-actions';

                    // Call Button
                    const callLink = document.createElement('a');
                    callLink.className = 'cskv-btn-call-sm';
                    callLink.href = `tel:${phone}`;
                    callLink.setAttribute('aria-label', `Gọi cho ${off.name} số ${formattedPhone}`);
                    callLink.innerHTML = '<i class="fa-solid fa-phone"></i> Gọi';

                    // Copy Button
                    const copyBtn = document.createElement('button');
                    copyBtn.type = 'button';
                    copyBtn.className = 'cskv-btn-copy-sm';
                    copyBtn.setAttribute('aria-label', `Sao chép số điện thoại ${formattedPhone}`);
                    copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Sao chép';
                    copyBtn.onclick = () => this.copyToClipboard(formattedPhone);

                    actions.appendChild(callLink);
                    actions.appendChild(copyBtn);

                    phoneRow.appendChild(phoneText);
                    phoneRow.appendChild(actions);

                    offItem.appendChild(phoneRow);
                });

                officersList.appendChild(offItem);
            });

            card.appendChild(officersList);
            fragment.appendChild(card);
        });

        this.elements.gridContainer.appendChild(fragment);
    }

    setupEventListeners() {
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }

    handleChipClick(id, chipEl) {
        const allChips = this.elements.chipsContainer.querySelectorAll('.cskv-chip');
        const cards = this.elements.gridContainer.querySelectorAll('.cskv-card');

        // Restore visibility of ALL cards first
        cards.forEach(c => (c.style.display = 'block'));
        this.elements.searchInput.value = '';

        if (this.activeChipId === id) {
            // Uncheck filter
            this.activeChipId = null;
            allChips.forEach(c => c.classList.remove('active'));
        } else {
            this.activeChipId = id;
            allChips.forEach(c => c.classList.remove('active'));
            chipEl.classList.add('active');

            const targetCard = document.getElementById(`cskv-card-${id}`);
            if (targetCard) {
                if (typeof targetCard.scrollIntoView === 'function') {
                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                this.highlightCard(targetCard);
            }
        }
    }

    handleSearch(query) {
        const cards = this.elements.gridContainer.querySelectorAll('.cskv-card');
        const allChips = this.elements.chipsContainer ? this.elements.chipsContainer.querySelectorAll('.cskv-chip') : [];

        // Clear chip active state when user types in search input
        if (query && query.trim() !== '') {
            this.activeChipId = null;
            allChips.forEach(c => c.classList.remove('active'));
        }

        if (!query || query.trim() === '') {
            cards.forEach(c => (c.style.display = 'block'));
            return;
        }

        const results = this.engine.search(query);
        const matchedIds = new Set(results.map(r => r.id));

        cards.forEach(c => {
            if (matchedIds.has(c.dataset.id)) {
                c.style.display = 'block';
            } else {
                c.style.display = 'none';
            }
        });
    }

    handleInitialUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        let targetId = urlParams.get('area');

        if (!targetId && window.location.hash) {
            targetId = window.location.hash.replace('#', '');
        }

        if (targetId) {
            const targetCard = document.getElementById(`cskv-card-${targetId}`);
            if (targetCard) {
                setTimeout(() => {
                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    this.highlightCard(targetCard);
                }, 200);
            }
        }
    }

    highlightCard(cardEl) {
        cardEl.classList.remove('cskv-card-highlight');
        // Trigger reflow
        void cardEl.offsetWidth;
        cardEl.classList.add('cskv-card-highlight');

        setTimeout(() => {
            cardEl.classList.remove('cskv-card-highlight');
        }, 2500);
    }

    copyToClipboard(text) {
        if (!text) return;

        const showToast = () => {
            if (!this.elements.toast) return;
            this.elements.toast.classList.add('show');
            setTimeout(() => {
                this.elements.toast.classList.remove('show');
            }, 2000);
        };

        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            navigator.clipboard.writeText(text)
                .then(showToast)
                .catch(() => this.fallbackCopyText(text, showToast));
        } else {
            this.fallbackCopyText(text, showToast);
        }
    }

    fallbackCopyText(text, callback) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            if (callback) callback();
        } catch (e) {
            // Fail-safe: do not let clipboard errors disrupt user UX
        }
    }

    escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.cskvPageController = new CskvPageController();
});
