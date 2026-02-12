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
        this.setupEventListeners();
        this.renderMainMenu(); // Init sẵn menu
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

        // Enter to send message
        this.elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Click send button
        if (this.elements.sendBtn) {
            this.elements.sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }
    }

    // === USER INPUT HANDLING ===

    sendMessage() {
        const text = this.elements.input.value.trim();
        if (!text) return;

        // 1. Add User Message (Safe via textContent)
        this.addMessage(text, 'user');

        // 2. Clear Input
        this.elements.input.value = '';

        // 3. Process Search/Response
        this.showLoading(() => {
            const results = this.searchEngine.search(text);
            if (results.length === 0) {
                this.addMessage('Xin lỗi, tôi không tìm thấy thông tin phù hợp. Bà con vui lòng thử từ khóa khác.', 'bot');
                this.renderMainMenu();
            } else {
                this.addMessage(`Tìm thấy ${results.length} kết quả liên quan:`, 'bot');
                this.handleSearch(text);
            }
        });
    }

    // === RENDERING UI ===

    addMessage(content, type = 'bot') {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}-message`;

        // Prevent XSS: Only use innerHTML for trusted 'bot' messages
        if (type === 'user') {
            msgDiv.textContent = content;
        } else {
            msgDiv.innerHTML = content;
        }

        this.elements.body.insertBefore(msgDiv, this.elements.optionContainer); // Chèn TRƯỚC options
        this.scrollToBottom();
    }

    clearOptions() {
        this.elements.optionContainer.innerHTML = '';
    }

    renderButton(text, iconClass, onClick, isBack = false) {
        const btn = document.createElement('button');
        btn.className = `option-btn ${isBack ? 'back-btn' : ''}`;

        // Create icon
        const icon = document.createElement('i');
        icon.className = iconClass;

        // Create text (safely)
        const textNode = document.createTextNode(' ' + text);

        btn.appendChild(icon);
        btn.appendChild(textNode);
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
        // 1. Nếu query rỗng -> Hiện lại Main Menu
        if (!query || query.trim() === '') {
            this.renderMainMenu();
            return;
        }

        // 2. Tìm kiếm
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
