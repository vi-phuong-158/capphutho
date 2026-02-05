// ===== CÔNG AN PHƯỜNG PHÚ THỌ - MAIN APP =====

document.addEventListener('DOMContentLoaded', () => {
    initModuleCards();
    initFloatingButtons();
});

// Add touch feedback for module cards
function initModuleCards() {
    const cards = document.querySelectorAll('.module-card');
    
    cards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', () => {
            card.style.transform = '';
        });
    });
}

// Show/hide floating buttons on scroll
function initFloatingButtons() {
    const floatingBtns = document.querySelector('.floating-buttons');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            floatingBtns.style.opacity = '0.5';
        } else {
            floatingBtns.style.opacity = '1';
        }
        
        lastScrollY = currentScrollY;
    });
}
