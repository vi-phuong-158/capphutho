/**
 * CHATBOT LOGIC CONTROLLER
 * ------------------------
 * Điều khiển giao diện Chatbot, xử lý sự kiện và tích hợp tìm kiếm.
 */

// import { MAIN_CATEGORIES, FAQ_DATA } from './data/faq_db.js'; // REMOVED
// import { FaqSearchEngine } from './utils/search_engine.js';   // REMOVED

class ChatbotController {
    constructor() {
        // Element Refs
        this.elements = {
            window: document.getElementById('chatWindow'),
            body: document.getElementById('chatBody'),
            input: document.getElementById('chatSearchInput'),
            sendBtn: document.getElementById('chatSendBtn'),
            optionContainer: document.getElementById('chatOptions')
        };

        // Use Global Search Engine
        this.searchEngine = new window.FaqSearchEngine();

        // Initialize Debounced Search
        // Bind performSearch to preserve 'this' context
        this.performSearch = this.performSearch.bind(this);
        // Create a debounced version with 300ms delay
        this.debouncedSearch = this.debounce(this.performSearch, 300);

        this.setupEventListeners();
        this.renderMainMenu(); // Init sẵn menu
    }

    // Utility: Debounce function
    debounce(func, wait) {
        let timeout;
        const debounced = function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
        debounced.cancel = () => clearTimeout(timeout);
        return debounced;
    }

    setupEventListeners() {
        // Toggle Chat
        window.toggleChat = () => {
            const el = this.elements.window;
            const launcher = document.querySelector('.chat-launcher'); // Get launcher

            if (el.style.display === 'flex') {
                el.style.display = 'none';
                launcher.classList.remove('active'); // Remove active class
            } else {
                el.style.display = 'flex';
                launcher.classList.add('active'); // Add active class to shrink
                this.scrollToBottom();
            }
        };

        // Search Input
        this.elements.input.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Enter to search (nếu cần xử lý submit)
        this.elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                // Có thể xử lý gửi tin nhắn "custom" nếu muốn
            }
        });
    }

    // === RENDERING UI ===

    addMessage(htmlContent, type = 'bot') {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}-message`;
        msgDiv.innerHTML = htmlContent;
        this.elements.body.insertBefore(msgDiv, this.elements.optionContainer); // Chèn TRƯỚC options
        this.scrollToBottom();
    }

    clearOptions() {
        this.elements.optionContainer.innerHTML = '';
    }

    renderButton(text, iconClass, onClick, isBack = false) {
        const btn = document.createElement('button');
        btn.className = `option-btn ${isBack ? 'back-btn' : ''}`;
        btn.innerHTML = `<i class="${iconClass}"></i> ${text}`;
        btn.onclick = onClick;
        this.elements.optionContainer.appendChild(btn);
        this.scrollToBottom();
    }

    renderMainMenu() {
        this.clearOptions();
        const categories = window.MAIN_CATEGORIES || [];
        categories.forEach(cat => {
            this.renderButton(cat.text, cat.icon, () => this.handleCategorySelect(cat));
        });
    }

    renderSubMenu(catId) {
        this.clearOptions();
        const faqData = window.FAQ_DATA || {};
        const questions = faqData[catId];

        if (questions) {
            questions.forEach(q => {
                this.renderButton(q.text, 'far fa-question-circle', () => this.handleQuestionSelect(q, catId));
            });
        }

        // Nút quay lại
        this.renderButton('Quay lại danh mục', 'fas fa-undo', () => this.renderMainMenu(), true);
    }

    // === LOGIC HANDLERS ===

    handleCategorySelect(category) {
        this.addMessage(category.text, 'user');
        this.showLoading(() => {
            this.addMessage(`Đây là các câu hỏi về <b>${category.text}</b>:`, 'bot');
            this.renderSubMenu(category.id);
        });
    }

    renderNavigationOptions(catId) {
        this.clearOptions();
        // 1. Nút xem thêm câu hỏi cùng chủ đề
        this.renderButton('Xem câu hỏi khác', 'far fa-question-circle', () => this.renderSubMenu(catId));
        // 2. Nút về danh mục chính
        this.renderButton('Về danh mục chính', 'fas fa-home', () => this.renderMainMenu(), true);
    }

    handleQuestionSelect(question, catId) {
        this.addMessage(question.text, 'user');
        this.showLoading(() => {
            this.addMessage(question.answer, 'bot');
            // Thay vì hiện lại toàn bộ list câu hỏi (gây trôi tin nhắn), chỉ hiện nút điều hướng
            this.renderNavigationOptions(catId);
        });
    }

    handleSearch(query) {
        // 1. Nếu query rỗng -> Hiện lại Main Menu NGAY LẬP TỨC
        if (!query || query.trim() === '') {
            this.debouncedSearch.cancel(); // Hủy search đang chờ để tránh race condition
            this.renderMainMenu();
            return;
        }

        // 2. Nếu có query -> Gọi hàm search đã được debounce
        this.debouncedSearch(query);
    }

    performSearch(query) {
        // 2. Tìm kiếm (Logic thực sự)
        const results = this.searchEngine.search(query);

        // 3. Hiển thị kết quả dưới dạng Options
        this.clearOptions();

        if (results.length === 0) {
            // Không tìm thấy
            // this.renderButton('Không tìm thấy kết quả', 'fas fa-exclamation-circle', () => {});
        } else {
            results.forEach(res => {
                if (res.type === 'category') {
                    this.renderButton(`[Mục] ${res.text}`, res.original.icon, () => this.handleCategorySelect(res.original));
                } else {
                    this.renderButton(res.text, 'fas fa-search', () => this.handleQuestionSelect(res.original, res.catId));
                }
            });
        }
    }

    // === UTILS ===

    showLoading(callback) {
        const loadingId = 'loading-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = `message bot-message`;
        msgDiv.id = loadingId;
        msgDiv.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
        this.elements.body.insertBefore(msgDiv, this.elements.optionContainer);
        this.scrollToBottom();

        setTimeout(() => {
            const el = document.getElementById(loadingId);
            if (el) el.remove();
            if (callback) callback();
        }, 500); // Fake delay
    }

    scrollToBottom() {
        this.elements.body.scrollTop = this.elements.body.scrollHeight;
    }
}

// Init Chatbot when DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new ChatbotController();
});
