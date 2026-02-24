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
            optionContainer: document.getElementById('chatOptions'),
            
            // Global Search Elements
            globalInput: document.getElementById('globalSearchInput'),
            globalDropdown: document.getElementById('globalSearchResults'),
            globalContainer: document.getElementById('globalSearchContainer')
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

        // Search Input with Debounce to reduce performance cost of frequent search executions
        this.elements.input.addEventListener('input', this.debounce((e) => {
            this.handleSearch(e.target.value);
        }, 300));

        // Enter to search (nếu cần xử lý submit)
        this.elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                // Có thể xử lý gửi tin nhắn "custom" nếu muốn
            }
        });

        // ================= GLOBAL SEARCH =================
        if (this.elements.globalInput && this.elements.globalDropdown) {
            // Xử lý khi gõ vào ô tìm kiếm chính
            this.elements.globalInput.addEventListener('input', this.debounce((e) => {
                this.handleGlobalSearch(e.target.value);
            }, 300));

            // Hiển thị lại dropdown khi focus (nếu có nội dung)
            this.elements.globalInput.addEventListener('focus', () => {
                if (this.elements.globalInput.value.trim() !== '') {
                    this.elements.globalDropdown.classList.add('active');
                }
            });

            // Ẩn dropdown khi click ra ngoài
            document.addEventListener('click', (e) => {
                if (!this.elements.globalContainer.contains(e.target)) {
                    this.elements.globalDropdown.classList.remove('active');
                }
            });
            
            // Đóng bằng phím Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.elements.globalDropdown.classList.remove('active');
                    this.elements.globalInput.blur();
                }
            });
        }
    }

    // === RENDERING UI ===

    escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    addMessage(htmlContent, type = 'bot') {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}-message`;

        if (type === 'user') {
            msgDiv.textContent = htmlContent; // Secure: Treat user input as plain text
        } else {
            msgDiv.innerHTML = htmlContent; // Bot messages may contain trusted HTML
        }

        this.elements.body.insertBefore(msgDiv, this.elements.optionContainer); // Chèn TRƯỚC options
        this.scrollToBottom();
    }

    clearOptions() {
        this.elements.optionContainer.innerHTML = '';
    }

    renderButton(text, iconClass, onClick, isBack = false, container = null) {
        const btn = document.createElement('button');
        btn.className = `option-btn ${isBack ? 'back-btn' : ''}`;

        // Securely create elements to prevent XSS
        const icon = document.createElement('i');
        icon.className = iconClass;

        btn.appendChild(icon);
        btn.appendChild(document.createTextNode(' ' + text));

        btn.onclick = onClick;

        if (container) {
            container.appendChild(btn);
        } else {
            this.elements.optionContainer.appendChild(btn);
            this.scrollToBottom();
        }
    }

    renderMainMenu() {
        this.clearOptions();
        const categories = window.MAIN_CATEGORIES || [];
        const fragment = document.createDocumentFragment();
        categories.forEach(cat => {
            this.renderButton(cat.text, cat.icon, () => this.handleCategorySelect(cat), false, fragment);
        });
        this.elements.optionContainer.appendChild(fragment);
        this.scrollToBottom();
    }

    renderSubMenu(catId) {
        this.clearOptions();
        const faqData = window.FAQ_DATA || {};
        const questions = faqData[catId];
        const fragment = document.createDocumentFragment();

        if (questions) {
            questions.forEach(q => {
                this.renderButton(q.text, 'far fa-question-circle', () => this.handleQuestionSelect(q, catId), false, fragment);
            });
        }

        // Nút quay lại
        this.renderButton('Quay lại danh mục', 'fas fa-undo', () => this.renderMainMenu(), true, fragment);

        this.elements.optionContainer.appendChild(fragment);
        this.scrollToBottom();
    }

    // === LOGIC HANDLERS ===

    handleCategorySelect(category) {
        this.addMessage(category.text, 'user');
        this.showLoading(() => {
            this.addMessage(`Đây là các câu hỏi về <b>${this.escapeHtml(category.text)}</b>:`, 'bot');
            this.renderSubMenu(category.id);
        });
    }

    renderNavigationOptions(catId) {
        this.clearOptions();
        const fragment = document.createDocumentFragment();
        // 1. Nút xem thêm câu hỏi cùng chủ đề
        this.renderButton('Xem câu hỏi khác', 'far fa-question-circle', () => this.renderSubMenu(catId), false, fragment);
        // 2. Nút về danh mục chính
        this.renderButton('Về danh mục chính', 'fas fa-home', () => this.renderMainMenu(), true, fragment);

        this.elements.optionContainer.appendChild(fragment);
        this.scrollToBottom();
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
            const fragment = document.createDocumentFragment();
            results.forEach(res => {
                if (res.type === 'category') {
                    this.renderButton(`[Mục] ${res.text}`, res.original.icon, () => this.handleCategorySelect(res.original), false, fragment);
                } else {
                    this.renderButton(res.text, 'fas fa-search', () => this.handleQuestionSelect(res.original, res.catId), false, fragment);
                }
            });
            this.elements.optionContainer.appendChild(fragment);
            this.scrollToBottom();
        }
    }

    // ================= GLOBAL SEARCH HANDLERS =================
    
    handleGlobalSearch(query) {
        if (!query || query.trim() === '') {
            this.elements.globalDropdown.classList.remove('active');
            this.elements.globalDropdown.innerHTML = '';
            return;
        }

        const results = this.searchEngine.search(query);
        this.renderGlobalSearchResults(results, query);
    }
    
    renderGlobalSearchResults(results, query) {
        this.elements.globalDropdown.innerHTML = '';
        this.elements.globalDropdown.classList.add('active');

        if (results.length === 0) {
            this.elements.globalDropdown.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search-minus"></i>
                    Không tìm thấy kết quả cho "${this.escapeHtml(query)}"
                </div>
            `;
            return;
        }

        const fragment = document.createDocumentFragment();
        results.forEach(res => {
            const btn = document.createElement('button');
            btn.className = 'search-result-item';
            
            const iconWrap = document.createElement('div');
            iconWrap.className = 'search-result-icon';
            const icon = document.createElement('i');
            
            const contentWrap = document.createElement('div');
            contentWrap.className = 'search-result-content';
            
            const title = document.createElement('div');
            title.className = 'search-result-title';
            
            const subtitle = document.createElement('div');
            subtitle.className = 'search-result-subtitle';

            if (res.type === 'category') {
                icon.className = res.original.icon;
                title.textContent = res.text;
                subtitle.textContent = 'Danh mục thủ tục';
                
                btn.onclick = () => {
                    this.elements.globalDropdown.classList.remove('active');
                    this.elements.globalInput.value = ''; // Xóa chữ
                    this.openChatAndSelectCategory(res.original);
                };
            } else {
                icon.className = 'fas fa-file-contract';
                title.textContent = res.text;
                
                // Lấy tên danh mục làm phụ đề
                const categories = window.MAIN_CATEGORIES || [];
                const parentCat = categories.find(c => c.id === res.catId);
                subtitle.textContent = parentCat ? parentCat.text : 'Câu hỏi thường gặp';
                
                btn.onclick = () => {
                    this.elements.globalDropdown.classList.remove('active');
                    this.elements.globalInput.value = ''; // Xóa chữ
                    this.openChatAndSelectQuestion(res.original, res.catId);
                };
            }
            
            iconWrap.appendChild(icon);
            contentWrap.appendChild(title);
            contentWrap.appendChild(subtitle);
            
            btn.appendChild(iconWrap);
            btn.appendChild(contentWrap);
            
            fragment.appendChild(btn);
        });
        this.elements.globalDropdown.appendChild(fragment);
    }

    openChatAndSelectCategory(category) {
        // 1. Mở widget chat nếu chưa mở
        const chatWindow = this.elements.window;
        const launcher = document.querySelector('.chat-launcher');
        
        if (chatWindow.style.display !== 'flex') {
            chatWindow.style.display = 'flex';
            launcher.classList.add('active');
        }
        
        // 2. Clear input
        this.elements.input.value = '';
        
        // 3. Trigger category select
        this.handleCategorySelect(category);
    }
    
    openChatAndSelectQuestion(question, catId) {
        // 1. Mở widget chat nếu chưa mở
        const chatWindow = this.elements.window;
        const launcher = document.querySelector('.chat-launcher');
        
        if (chatWindow.style.display !== 'flex') {
            chatWindow.style.display = 'flex';
            launcher.classList.add('active');
        }
        
        // 2. Clear input
        this.elements.input.value = '';
        
        // 3. Trigger question select
        this.handleQuestionSelect(question, catId);
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

    debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
}

// Init Chatbot when DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new ChatbotController();
});
