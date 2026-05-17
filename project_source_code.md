# Source Code

## app.js
```javascript

document.addEventListener('DOMContentLoaded', () => {
    initModuleCards();
    initFloatingButtons();
});
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
```

## index.html
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="Cổng thông tin số hỗ trợ công dân - Công an phường Phú Thọ">
    <meta name="theme-color" content="#FFFFFF">
    <title>Cổng Thông Tin Số | Công An Phường Phú Thọ</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <style>
        :root {
            --primary: #C41E3A;
            --primary-dark: #8B0000;
            --accent: #FFD700;
            --primary-light: #FFF0F2;
            --secondary: #1F2937;
            --text-gray: #6B7280;
            --bg-body: #F9FAFB;
            --surface: #FFFFFF;
            --glass-bg: rgba(255, 255, 255, 0.95);
            --glass-border: rgba(196, 30, 58, 0.1);
            --glass-shadow: 0 8px 32px 0 rgba(196, 30, 58, 0.05);
            --radius-xl: 24px;
            --radius-lg: 16px;
            --radius-md: 12px;
            --container-width: 800px;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: transparent;
        }
        body {
            font-family: 'Be Vietnam Pro', sans-serif;
            background-color: var(--bg-body);
            color: var(--secondary);
            line-height: 1.5;
            min-height: 100vh;
            background-image:
                radial-gradient(at 0% 0%, rgba(196, 30, 58, 0.05) 0px, transparent 50%),
                radial-gradient(at 100% 0%, rgba(255, 215, 0, 0.05) 0px, transparent 50%);
            background-attachment: fixed;
        }
        a {
            text-decoration: none;
            color: inherit;
        }
        .app-container {
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 20px 100px 20px;
        }
        .header {
            padding-top: 30px;
            padding-bottom: 20px;
            text-align: center;
            margin-bottom: 20px;
            animation: fadeInDown 0.8s ease-out;
            border-bottom: 3px solid var(--accent);
            background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(196, 30, 58, 0.03) 100%);
            border-bottom-left-radius: 30px;
            border-bottom-right-radius: 30px;
        }
        .brand-badge {
            display: inline-flex;
            align-items: center;
            background: var(--surface);
            padding: 6px 16px;
            border-radius: 100px;
            box-shadow: 0 4px 15px rgba(196, 30, 58, 0.15);
            margin-bottom: 12px;
            border: 1px solid var(--primary-light);
        }
        .brand-logo {
            width: 28px;
            height: 28px;
            margin-right: 10px;
            object-fit: contain;
        }
        .brand-text {
            font-size: 0.85rem;
            font-weight: 800;
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .header-title {
            font-size: 1.8rem;
            font-weight: 800;
            color: var(--primary-dark);
            letter-spacing: -1px;
            line-height: 1.2;
            margin-bottom: 8px;
        }
        .header-subtitle {
            font-size: 0.95rem;
            color: var(--text-gray);
            font-weight: 500;
        }
        .search-container {
            position: relative;
            z-index: 500;
            background: var(--surface);
            border-radius: var(--radius-lg);
            padding: 8px 16px;
            display: flex;
            align-items: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
            margin-bottom: 30px;
            border: 1px solid rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
        }
        .search-container:focus-within {
            box-shadow: 0 8px 25px rgba(196, 30, 58, 0.1);
            border-color: rgba(196, 30, 58, 0.2);
            transform: translateY(-2px);
        }
        .search-icon {
            color: var(--text-gray);
            font-size: 1.1rem;
            margin-right: 12px;
        }
        .search-input {
            border: none;
            background: transparent;
            width: 100%;
            padding: 8px 0;
            font-family: inherit;
            font-size: 1rem;
            color: var(--secondary);
            outline: none;
        }
        .search-results-dropdown {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            right: 0;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: var(--radius-lg);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(196, 30, 58, 0.1);
            z-index: 1000;
            max-height: 350px;
            overflow-y: auto;
            display: none;
            flex-direction: column;
            padding: 8px 0;
            animation: fadeInDown 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .search-results-dropdown.active {
            display: flex;
        }
        .search-result-item {
            padding: 12px 20px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
            cursor: pointer;
            transition: background-color 0.2s;
            border-bottom: 1px solid rgba(0, 0, 0, 0.03);
            text-align: left;
            background: none;
            border-left: none;
            border-right: none;
            border-top: none;
            width: 100%;
            font-family: inherit;
        }
        .search-result-item:last-child {
            border-bottom: none;
        }
        .search-result-item:hover {
            background-color: rgba(196, 30, 58, 0.05);
        }
        .search-result-icon {
            color: var(--primary);
            font-size: 1.1rem;
            margin-top: 2px;
            width: 20px;
            text-align: center;
        }
        .search-result-content {
            display: flex;
            flex-direction: column;
            gap: 4px;
            flex: 1;
        }
        .search-result-title {
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--secondary);
            line-height: 1.3;
        }
        .search-result-subtitle {
            font-size: 0.8rem;
            color: var(--text-gray);
        }
        .search-no-results {
            padding: 20px;
            text-align: center;
            color: var(--text-gray);
            font-size: 0.95rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }
        .search-no-results i {
            font-size: 1.5rem;
            color: rgba(196, 30, 58, 0.3);
        }
        .search-results-dropdown::-webkit-scrollbar {
            width: 6px;
        }
        .search-results-dropdown::-webkit-scrollbar-track {
            background: transparent;
        }
        .search-results-dropdown::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        .grid-label {
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text-gray);
            margin-bottom: 16px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .bento-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
        }
        .card {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            border-radius: var(--radius-lg);
            padding: 16px;
            border: none;
            box-shadow: 0 4px 15px rgba(196, 30, 58, 0.15);
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            min-height: auto;
            cursor: pointer;
            text-align: left;
        }
        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 15px 25px -5px rgba(196, 30, 58, 0.3);
        }
        .card:active {
            transform: scale(0.97);
        }
        .card-icon-wrapper {
            width: 48px;
            height: 48px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;
            margin-bottom: 0;
            flex-shrink: 0;
            transition: all 0.3s ease;
        }
        .card-icon {
            font-size: 1.3rem;
            color: var(--accent);
            transition: color 0.3s ease;
        }
        .card:hover .card-icon {
            color: white;
        }
        .card:hover .card-icon-wrapper {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(-5deg);
        }
        .card-title {
            font-size: 1rem;
            font-weight: 700;
            color: white;
            margin-bottom: 4px;
            line-height: 1.3;
        }
        .card-desc {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 400;
            line-height: 1.3;
        }
        .fab-container {
            position: fixed;
            bottom: 30px;
            right: 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            z-index: 100;
        }
        .fab {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            border: none;
            cursor: pointer;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
        }
        .fab:hover {
            transform: scale(1.1);
        }
        .fab:active {
            transform: scale(0.9);
        }
        .fab-phone {
            background: var(--primary);
        }
        .fab-fb {
            background: #1877F2;
        }
        .fab::after {
            content: attr(data-tooltip);
            position: absolute;
            right: 70px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 0.75rem;
            font-family: 'Be Vietnam Pro', sans-serif;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s;
        }
        .fab:hover::after {
            opacity: 1;
        }
        .fab-phone::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid var(--primary);
            animation: ripple 2s infinite;
        }
        @keyframes ripple {
            0% {
                transform: scale(1);
                opacity: 0.6;
            }
            100% {
                transform: scale(1.5);
                opacity: 0;
            }
        }
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .footer {
            text-align: center;
            margin-top: 60px;
            padding-top: 30px;
            border-top: 1px solid rgba(0, 0, 0, 0.05);
            color: var(--text-gray);
            font-size: 0.85rem;
        }
        @media (min-width: 1024px) {
            :root {
                --container-width: 1200px;
            }
            .bento-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 24px;
            }
            .header-title {
                font-size: 3rem;
            }
            .header-subtitle {
                font-size: 1.2rem;
            }
            .card {
                padding: 24px;
                min-height: 140px;
            }
            .card-icon-wrapper {
                width: 64px;
                height: 64px;
                margin-right: 20px;
            }
            .card-icon {
                font-size: 1.8rem;
            }
            .card-title {
                font-size: 1.25rem;
                margin-bottom: 8px;
            }
            .card-desc {
                font-size: 1rem;
            }
            .search-input {
                font-size: 1.2rem;
                padding: 12px 0;
            }
            .search-icon {
                font-size: 1.4rem;
            }
            .card.featured {
                grid-column: span 1;
            }
            .chat-launcher {
                width: 180px;
                height: 180px;
                filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
                transition: transform 0.3s ease, filter 0.3s ease;
            }
            .chat-launcher:hover {
                transform: scale(1.15);
                filter: drop-shadow(0 12px 24px rgba(196, 30, 58, 0.5));
            }
            .chat-label {
                font-size: 1.1rem;
                padding: 8px 16px;
                bottom: 10px;
            }
        }
        .elder-mode-toggle {
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 200;
            background: var(--surface);
            border: 2px solid var(--primary);
            border-radius: 100px;
            padding: 6px 10px;
            font-size: 0.7rem;
            font-weight: 600;
            color: var(--primary);
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
            box-shadow: 0 2px 10px rgba(196, 30, 58, 0.2);
            transition: all 0.3s ease;
        }
        .elder-mode-toggle:hover {
            background: var(--primary);
            color: white;
        }
        .elder-mode-toggle i {
            font-size: 0.9rem;
        }
        @media (max-width: 400px) {
            .elder-mode-toggle span {
                display: none;
            }
            .elder-mode-toggle {
                padding: 8px;
                border-radius: 50%;
            }
        }
        html.elder-mode {
            font-size: 24px !important;
        }
        html.elder-mode body {
            background: #FFFFFF !important;
            background-image: none !important;
            color: #000000 !important;
        }
        html.elder-mode .header {
            background: #FFFFFF !important;
            border-bottom: 4px solid #C41E3A !important;
        }
        html.elder-mode .header-title {
            color: #000000 !important;
            font-size: 2rem !important;
        }
        html.elder-mode .header-subtitle {
            color: #333333 !important;
        }
        html.elder-mode .card {
            background: #000000 !important;
            border-radius: 12px !important;
            box-shadow: 0 4px 0 #333 !important;
        }
        html.elder-mode .card-title,
        html.elder-mode .card-desc {
            color: #FFFFFF !important;
        }
        html.elder-mode .search-container {
            background: #FFFFFF !important;
            border: 3px solid #000000 !important;
            box-shadow: none !important;
        }
        html.elder-mode .search-input::placeholder {
            color: #333333 !important;
        }
        html.elder-mode .elder-mode-toggle {
            background: #000000 !important;
            color: #FFFFFF !important;
            border-color: #000000 !important;
        }
        .status-widget {
            background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%);
            border-radius: var(--radius-lg);
            padding: 16px 20px;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            gap: 14px;
            box-shadow: 0 4px 20px rgba(196, 30, 58, 0.3);
            border: 2px solid #FFD700;
        }
        .status-icon {
            width: 44px;
            height: 44px;
            background: rgba(255, 215, 0, 0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .status-icon i {
            font-size: 1.3rem;
            color: #FFD700;
        }
        .status-text {
            font-size: 0.95rem;
            font-weight: 600;
            color: #FFFFFF;
        }
        .status-text small {
            display: block;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 400;
            margin-top: 4px;
        }
        .maps-widget {
            background: var(--surface);
            border-radius: var(--radius-lg);
            overflow: hidden;
            margin-bottom: 24px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        .maps-widget-header {
            padding: 12px 16px;
            display: flex;
            align-items: center;
            gap: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        .maps-widget-header i {
            color: var(--primary);
            font-size: 1.1rem;
        }
        .maps-widget-header span {
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--secondary);
            flex: 1; 
        }
        .btn-directions {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background-color: var(--primary-light);
            color: var(--primary);
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-decoration: none;
            border: 1px solid rgba(196, 30, 58, 0.2);
            transition: all 0.3s ease;
        }
        .btn-directions:hover {
            background-color: var(--primary);
            color: white;
            box-shadow: 0 4px 10px rgba(196, 30, 58, 0.2);
            transform: translateY(-1px);
        }
        .btn-directions i {
            font-size: 0.85rem;
            color: inherit; 
        }
        .maps-widget iframe {
            width: 100%;
            height: 200px;
            border: none;
        }
        .preview-card {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%) !important;
        }
        .preview-card .card-icon {
            color: #8B0000 !important;
        }
        .preview-card .card-title,
        .preview-card .card-desc {
            color: #1A1A1A !important;
        }
        .fab-sos {
            background: #DC2626 !important;
            animation: sosGlow 1.5s ease-in-out infinite;
        }
        @keyframes sosGlow {
            0%,
            100% {
                box-shadow: 0 0 5px #DC2626, 0 0 20px rgba(220, 38, 38, 0.4);
            }
            50% {
                box-shadow: 0 0 10px #DC2626, 0 0 40px rgba(220, 38, 38, 0.6);
            }
        }
        .fab-sos::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 3px solid #DC2626;
            animation: sosRipple 1.5s infinite;
        }
        @keyframes sosRipple {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(1.8);
                opacity: 0;
            }
        }
        .fab-zalo {
            background: #0068FF !important;
        }
        .fab-zalo::after {
            content: 'Chat CSKV';
            position: absolute;
            right: 70px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 0.75rem;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s;
        }
        .fab-zalo:hover::after {
            opacity: 1;
        }
        .fab-toggle {
            background: #6B7280 !important;
            border: none;
            transition: all 0.3s ease;
        }
        .fab-toggle:hover {
            background: #4B5563 !important;
        }
        .fab-toggle i {
            transition: transform 0.3s ease;
        }
        .fab-container.collapsed .fab-toggle i {
            transform: rotate(180deg);
        }
        .fab-item {
            transition: all 0.3s ease;
            transform-origin: center;
        }
        .fab-container.collapsed .fab-item {
            opacity: 0;
            transform: scale(0);
            pointer-events: none;
            height: 0;
            margin: 0;
            padding: 0;
        }
        .guide-section {
            background: var(--surface);
            border-radius: var(--radius-lg);
            padding: 20px;
            margin-bottom: 24px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        .guide-title {
            font-size: 1rem;
            font-weight: 700;
            color: var(--secondary);
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .guide-title i {
            color: var(--primary);
        }
        .guide-steps {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        @media (min-width: 768px) {
            .guide-steps {
                flex-direction: row;
                gap: 16px;
            }
        }
        .guide-step {
            flex: 1;
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 14px;
            background: linear-gradient(135deg, var(--primary-light) 0%, #FFF 100%);
            border-radius: 12px;
            border-left: 4px solid var(--primary);
        }
        .step-num {
            width: 28px;
            height: 28px;
            background: var(--primary);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.85rem;
            flex-shrink: 0;
        }
        .step-info h4 {
            margin: 0 0 4px 0;
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--secondary);
        }
        .step-info p {
            margin: 0;
            font-size: 0.8rem;
            color: var(--text-gray);
        }
        .faq-section {
            background: var(--surface);
            border-radius: var(--radius-lg);
            padding: 20px;
            margin-top: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        .faq-title {
            font-size: 1rem;
            font-weight: 700;
            color: var(--secondary);
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .faq-title i {
            color: var(--accent);
        }
        .faq-item {
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }
        .faq-item:last-child {
            border-bottom: none;
        }
        .faq-question {
            width: 100%;
            background: none;
            border: none;
            padding: 14px 0;
            text-align: left;
            font-family: inherit;
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--secondary);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
        }
        .faq-question i {
            color: var(--primary);
            font-size: 0.8rem;
            transition: transform 0.3s ease;
        }
        .faq-item.open .faq-question i {
            transform: rotate(180deg);
        }
        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease, padding 0.3s ease;
        }
        .faq-item.open .faq-answer {
            max-height: 200px;
            padding-bottom: 14px;
        }
        .faq-answer p {
            margin: 0;
            font-size: 0.85rem;
            color: var(--text-gray);
            line-height: 1.6;
        }
        .chat-widget {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 999;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }
        .chat-label {
            background: white;
            color: #d84315;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 700;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            position: relative;
            white-space: nowrap;
            animation: float 3s ease-in-out infinite;
        }
        .chat-label::after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 6px 6px 0;
            border-style: solid;
            border-color: white transparent transparent transparent;
        }
        @keyframes float {
            0%,
            100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
            }
        }
        .chat-launcher {
            background: none;
            border: none;
            padding: 0;
            width: 130px;
            height: 130px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.3s;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }
        .chat-launcher img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .chat-launcher:hover {
            transform: scale(1.1);
        }
        .chat-launcher.active {
            transform: scale(0.6) translateY(55px);
            filter: grayscale(0.5);
        }
        @keyframes pulse-red {
            0% {
                box-shadow: 0 0 0 0 rgba(206, 25, 8, 0.7);
            }
            70% {
                box-shadow: 0 0 0 15px rgba(206, 25, 8, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(206, 25, 8, 0);
            }
        }
        .chat-window {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 360px;
            height: 520px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            display: none;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid #eee;
            font-size: 14px;
            animation: popUp 0.3s ease-out;
            transform-origin: bottom right;
        }
        @keyframes popUp {
            from {
                opacity: 0;
                transform: scale(0.5);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        .chat-header {
            background: linear-gradient(135deg, #ce1908 0%, #a50f00 100%);
            color: white;
            padding: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .chat-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .chat-avatar {
            width: 35px;
            height: 35px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ce1908;
        }
        .status-dot {
            width: 8px;
            height: 8px;
            background: #2ecc71;
            border-radius: 50%;
            display: inline-block;
            margin-right: 5px;
        }
        .close-chat {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
        }
        .chat-body {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            background-color: #f9f9f9;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .message {
            max-width: 85%;
            padding: 10px 14px;
            border-radius: 12px;
            line-height: 1.4;
            word-wrap: break-word;
        }
        .bot-message {
            background: #fff;
            color: #333;
            border: 1px solid #e0e0e0;
            align-self: flex-start;
            border-top-left-radius: 2px;
        }
        .user-message {
            background: #ce1908;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 2px;
        }
        .option-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
            width: 100%;
            margin-top: 5px;
        }
        .option-btn {
            background: white;
            border: 1px solid #ce1908;
            color: #ce1908;
            padding: 8px 12px;
            border-radius: 20px;
            cursor: pointer;
            text-align: left;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
        }
        .option-btn:hover {
            background: #ce1908;
            color: white;
            transform: translateX(3px);
        }
        .option-btn i {
            width: 20px;
            text-align: center;
        }
        .back-btn {
            border-color: #666;
            color: #555;
            margin-top: 5px;
        }
        .back-btn:hover {
            background: #666;
            color: white;
        }
        .chat-footer {
            padding: 10px;
            border-top: 1px solid #eee;
            background: white;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .chat-input {
            flex: 1;
            padding: 10px 15px;
            background: #f0f2f5;
            border: 1px solid transparent;
            border-radius: 20px;
            color: #333;
            font-size: 13px;
            outline: none;
            transition: 0.3s;
        }
        .chat-input:focus {
            border-color: #ce1908;
            background: white;
        }
        .send-btn {
            color: #ce1908;
            font-size: 18px;
            background: none;
            border: none;
            cursor: pointer;
        }
    </style>
    <script>
        window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    </script>
    <script defer src="/_vercel/insights/script.js"></script>
</head>
<body>
    <div class="app-container">
        <header class="header">
            <div class="brand-badge">
                <img src="logo.png" onerror="this.src='https://cdn-icons-png.flaticon.com/512/921/921079.png'"
                    alt="Logo" class="brand-logo">
                <span class="brand-text">Công An Phường Phú Thọ</span>
            </div>
            <h1 class="header-title">Cổng Thông Tin Số</h1>
            <p class="header-subtitle">Hỗ trợ Thủ tục hành chính & Dịch vụ công</p>
        </header>
        <button class="elder-mode-toggle" id="elderModeToggle" onclick="toggleElderMode()">
            <i class="fa-solid fa-eye"></i>
            <span>Chữ to / Dễ đọc</span>
        </button>
        <div class="status-widget">
            <div class="status-icon">
                <i class="fa-solid fa-clock"></i>
            </div>
            <div class="status-text">
                <span>Thông báo giờ giải quyết TTHC</span>
                <small>Thứ 2 - Thứ 7 | Sáng: 7h30-11h30 | Chiều: 13h00-16h30</small>
            </div>
        </div>
        <div class="maps-widget">
            <div class="maps-widget-header">
                <i class="fa-solid fa-location-dot"></i>
                <span>Vị trí Công an Phường Phú Thọ</span>
                <a href="https://www.google.com/maps/dir/?api=1&destination=21.4217052,105.2162247" target="_blank" rel="noopener noreferrer" class="btn-directions" aria-label="Chỉ đường tới Công an phường Phú Thọ">
                    <i class="fa-solid fa-directions"></i> Chỉ đường
                </a>
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3714.191791208034!2d105.2162247!3d21.421705199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDI1JzE4LjEiTiAxMDXCsDEyJzU4LjQiRQ!5e0!3m2!1svi!2s!4v1773816749539!5m2!1svi!2s"
                allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
        <div class="search-container" id="globalSearchContainer">
            <i class="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
            <input type="text" class="search-input" id="globalSearchInput" aria-label="Tìm kiếm thủ tục hành chính"
                maxlength="100" placeholder="Bạn cần tìm thủ tục gì? (Ví dụ: Định danh, Hộ khẩu...)">
            <div class="search-results-dropdown" id="globalSearchResults">
            </div>
        </div>
        <div class="grid-label">
            <span>Dịch Vụ Trực Tuyến</span>
            <span style="font-size: 0.7rem; background: #E5E7EB; padding: 2px 8px; border-radius: 10px;">24/7</span>
        </div>
        <div class="bento-grid">
            <a href="modules/cu-tru.html" class="card">
                <div class="card-icon-wrapper">
                    <i class="fa-solid fa-address-card card-icon"></i>
                </div>
                <div>
                    <h3 class="card-title">Cư Trú & Định Danh</h3>
                    <p class="card-desc">CCCD, VNeID, CT07, CT08</p>
                </div>
            </a>
            <a href="modules/dang-ky-xe.html" class="card">
                <div class="card-icon-wrapper">
                    <i class="fa-solid fa-motorcycle card-icon"></i>
                </div>
                <div>
                    <h3 class="card-title">Đăng Ký Xe</h3>
                    <p class="card-desc">Cấp biển số, sang tên đổi chủ</p>
                </div>
            </a>
            <a href="modules/vu-khi.html" class="card">
                <div class="card-icon-wrapper">
                    <i class="fa-solid fa-person-military-rifle card-icon"></i>
                </div>
                <div>
                    <h3 class="card-title">Vũ Khí & Pháo</h3>
                    <p class="card-desc">Vận động giao nộp, tố giác</p>
                </div>
            </a>
            <a href="modules/an-ninh.html" class="card">
                <div class="card-icon-wrapper">
                    <i class="fa-solid fa-building-shield card-icon"></i>
                </div>
                <div>
                    <h3 class="card-title">An Ninh Trật Tự</h3>
                    <p class="card-desc">Ngành nghề kinh doanh, lưu trú</p>
                </div>
            </a>
            <a href="modules/khieu-nai.html" class="card">
                <div class="card-icon-wrapper">
                    <i class="fa-solid fa-file-pen card-icon"></i>
                </div>
                <div>
                    <h3 class="card-title">Khiếu Nại & Tố Cáo</h3>
                    <p class="card-desc">Gửi đơn thư, phản ánh</p>
                </div>
            </a>
            <a href="modules/nguoi-nuoc-ngoai.html" class="card featured">
                <div class="card-icon-wrapper">
                    <i class="fa-solid fa-passport card-icon"></i>
                </div>
                <div>
                    <h3 class="card-title">Người Nước Ngoài</h3>
                    <p class="card-desc">Khai báo tạm trú, Visa, XNC</p>
                </div>
            </a>
        </div>
        <footer class="footer">
            <p><strong>Công An Phường Phú Thọ</strong></p>
            <p style="margin-top: 8px; font-size: 0.75rem; opacity: 0.6">© 2026 Bản quyền thuộc về Công an phường Phú
                Thọ, tỉnh Phú Thọ</p>
        </footer>
    </div>
    <script>
        function toggleElderMode() {
            const html = document.documentElement;
            const isElderMode = html.classList.toggle('elder-mode');
            localStorage.setItem('elderMode', isElderMode);
            const toggleBtn = document.getElementById('elderModeToggle');
            if (isElderMode) {
                toggleBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i><span>Chế độ thường</span>';
            } else {
                toggleBtn.innerHTML = '<i class="fa-solid fa-eye"></i><span>Chữ to / Dễ đọc</span>';
            }
        }
        function toggleFaq(button) {
            const faqItem = button.parentElement;
            faqItem.classList.toggle('open');
        }
        if (localStorage.getItem('elderMode') === 'true') {
            document.documentElement.classList.add('elder-mode');
            document.addEventListener('DOMContentLoaded', () => {
                const toggleBtn = document.getElementById('elderModeToggle');
                if (toggleBtn) {
                    toggleBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i><span>Chế độ thường</span>';
                }
            });
        }
        function updateOfficeStatus() {
            const now = new Date();
            const day = now.getDay(); 
            const hour = now.getHours();
            const minute = now.getMinutes();
            const timeInMinutes = hour * 60 + minute;
            const indicator = document.getElementById('statusIndicator');
            const message = document.getElementById('statusMessage');
            const isWorkingDay = day >= 1 && day <= 6;
            const isMorningHours = timeInMinutes >= 450 && timeInMinutes <= 690;
            const isAfternoonHours = timeInMinutes >= 780 && timeInMinutes <= 990;
            if (isWorkingDay && (isMorningHours || isAfternoonHours)) {
                indicator.className = 'status-indicator open';
                message.textContent = 'Đang làm việc - Mời bà con đến!';
            } else {
                indicator.className = 'status-indicator closed';
                if (!isWorkingDay) {
                    message.textContent = 'Chủ nhật nghỉ - Vui lòng quay lại thứ 2';
                } else {
                    message.textContent = 'Hết giờ hành chính - Vui lòng quay lại sau';
                }
            }
        }
    </script>
    <div class="chat-widget">
        <div class="chat-label">Trợ lý ảo 24/7</div>
        <button class="chat-launcher" onclick="toggleChat()" aria-label="Mở hộp thoại chat">
            <img src="Icon.png" alt="Chatbot Icon">
        </button>
    </div>
    <div class="chat-window" id="chatWindow">
        <div class="chat-header">
            <div class="chat-info">
                <div class="chat-avatar">
                    <i class="fa-solid fa-robot"></i>
                </div>
                <div>
                    <span style="font-weight: 700; font-size: 1.05rem;">Trợ lý Ảo Công an Phường</span>
                    <div style="font-size: 0.75rem; opacity: 0.9;">
                        <span class="status-dot"></span> Luôn sẵn sàng hỗ trợ
                    </div>
                </div>
            </div>
            <button class="close-chat" onclick="toggleChat()" aria-label="Đóng hộp thoại chat">&times;</button>
        </div>
        <div class="chat-body" id="chatBody">
            <div class="message bot-message">
                Xin chào bà con! Tôi là <b>Trợ lý ảo</b> của Công an phường Phú Thọ.<br>
                Tôi có thể giúp gì cho bà con hôm nay?
            </div>
            <div class="option-container" id="chatOptions">
            </div>
        </div>
        <div class="chat-footer">
            <input type="text" class="chat-input" id="chatSearchInput" aria-label="Nhập câu hỏi" maxlength="200"
                placeholder="Nhập câu hỏi hoặc thủ tục cần tìm...">
            <button class="send-btn" id="chatSendBtn" aria-label="Gửi tin nhắn">
                <i class="fa-solid fa-paper-plane"></i>
            </button>
        </div>
    </div>
    <script src="js/data/faq_db.js"></script>
    <script src="js/utils/search_engine.js"></script>
    <script src="js/chatbot.js"></script>
</body>
</html>
```

## styles.css
```css

:root {
    --color-primary: #C41E3A;
    --color-primary-dark: #8B0000;
    --color-secondary: #FFD700;
    --color-secondary-light: #FFF4B8;
    --color-accent: #228B22;
    --color-white: #FFFFFF;
    --color-bg: #FFF9F0;
    --color-text: #1A1A1A;
    --color-text-light: #666666;
    --color-border: #E5E5E5;
    --gradient-primary: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%);
    --gradient-gold: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
    --gradient-hero: linear-gradient(180deg, #C41E3A 0%, #8B0000 60%, #5A0000 100%);
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.2);
    --shadow-gold: 0 4px 20px rgba(255, 215, 0, 0.3);
    --font-main: 'Segoe UI', 'Roboto', sans-serif;
    --font-heading: 'Playfair Display', Georgia, serif;
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 20px;
    --radius-full: 50%;
}
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
html {
    scroll-behavior: smooth;
    font-size: 16px;
}
body {
    font-family: var(--font-main);
    background: var(--color-bg);
    color: var(--color-text);
    line-height: 1.6;
    min-height: 100vh;
}
a {
    text-decoration: none;
    color: inherit;
}
img {
    max-width: 100%;
    height: auto;
    display: block;
}
.header {
    background: var(--gradient-hero);
    color: var(--color-white);
    padding: var(--spacing-md) var(--spacing-sm);
    text-align: center;
    position: relative;
    overflow: hidden;
}
.header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,215,0,0.1)" stroke-width="0.5"/></svg>') repeat;
    opacity: 0.3;
}
.header-content {
    position: relative;
    z-index: 1;
}
.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
}
.logo {
    width: 70px;
    height: 70px;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}
.header-title {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--color-secondary);
    margin-bottom: 4px;
}
.header-main-title {
    font-size: 1.3rem;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    line-height: 1.3;
}
.header-subtitle {
    font-size: 0.8rem;
    opacity: 0.9;
    margin-top: var(--spacing-xs);
}
.main-content {
    padding: var(--spacing-md);
    max-width: 500px;
    margin: 0 auto;
}
.section-intro {
    text-align: center;
    margin-bottom: var(--spacing-lg);
    padding: var(--spacing-sm);
    background: var(--color-white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    border-left: 4px solid var(--color-primary);
}
.section-intro h2 {
    color: var(--color-primary);
    font-size: 1.1rem;
    margin-bottom: var(--spacing-xs);
}
.section-intro p {
    font-size: 0.9rem;
    color: var(--color-text-light);
}
.module-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
}
.module-card {
    background: var(--color-white);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    text-align: center;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid transparent;
    position: relative;
    overflow: hidden;
}
.module-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-gold);
}
.module-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-secondary);
}
.module-card:active {
    transform: translateY(-2px);
}
.module-icon {
    width: 50px;
    height: 50px;
    margin: 0 auto var(--spacing-xs);
    background: var(--gradient-primary);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--color-white);
    box-shadow: var(--shadow-sm);
}
.module-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 4px;
    line-height: 1.3;
}
.module-desc {
    font-size: 0.75rem;
    color: var(--color-text-light);
}
.floating-buttons {
    position: fixed;
    bottom: 20px;
    right: 16px;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    z-index: 1000;
}
.float-btn {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--color-white);
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
}
.float-btn:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-lg);
}
.float-btn.zalo {
    background: #0068FF;
}
.float-btn.facebook {
    background: #1877F2;
    font-weight: bold;
    font-family: sans-serif;
}
.float-btn.hotline {
    background: var(--color-primary);
    animation: pulse 2s infinite;
}
@keyframes pulse {
    0%,
    100% {
        box-shadow: 0 0 0 0 rgba(196, 30, 58, 0.5);
    }
    50% {
        box-shadow: 0 0 0 12px rgba(196, 30, 58, 0);
    }
}
.footer {
    background: var(--color-text);
    color: var(--color-white);
    text-align: center;
    padding: var(--spacing-lg) var(--spacing-sm);
    margin-top: var(--spacing-xl);
}
.footer-logo {
    width: 50px;
    margin: 0 auto var(--spacing-sm);
    filter: brightness(0) invert(1) opacity(0.8);
}
.footer-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-secondary);
    margin-bottom: var(--spacing-xs);
}
.footer-info {
    font-size: 0.8rem;
    opacity: 0.8;
    line-height: 1.8;
}
.footer-copyright {
    margin-top: var(--spacing-md);
    padding-top: var(--spacing-sm);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.75rem;
    opacity: 0.6;
}
@media (min-width: 600px) {
    .header-main-title {
        font-size: 1.6rem;
    }
    .module-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    .main-content {
        max-width: 700px;
    }
}
@media (min-width: 900px) {
    .main-content {
        max-width: 900px;
    }
    .logo {
        width: 90px;
        height: 90px;
    }
}
```

## js\chatbot.js
```javascript

class ChatbotController {
    constructor() {
        this.elements = {
            window: document.getElementById('chatWindow'),
            body: document.getElementById('chatBody'),
            input: document.getElementById('chatSearchInput'),
            sendBtn: document.getElementById('chatSendBtn'),
            optionContainer: document.getElementById('chatOptions'),
            globalInput: document.getElementById('globalSearchInput'),
            globalDropdown: document.getElementById('globalSearchResults'),
            globalContainer: document.getElementById('globalSearchContainer')
        };
        this.searchEngine = new window.FaqSearchEngine();
        this.setupEventListeners();
        this.renderMainMenu(); 
    }
    setupEventListeners() {
        window.toggleChat = () => {
            const el = this.elements.window;
            const launcher = document.querySelector('.chat-launcher'); 
            if (el.style.display === 'flex') {
                el.style.display = 'none';
                launcher.classList.remove('active'); 
            } else {
                el.style.display = 'flex';
                launcher.classList.add('active'); 
                this.scrollToBottom();
            }
        };
        this.elements.input.addEventListener('input', this.debounce((e) => {
            this.handleSearch(e.target.value);
        }, 300));
        this.elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
            }
        });
        if (this.elements.globalInput && this.elements.globalDropdown) {
            this.elements.globalInput.addEventListener('input', this.debounce((e) => {
                this.handleGlobalSearch(e.target.value);
            }, 300));
            this.elements.globalInput.addEventListener('focus', () => {
                if (this.elements.globalInput.value.trim() !== '') {
                    this.elements.globalDropdown.classList.add('active');
                }
            });
            document.addEventListener('click', (e) => {
                if (!this.elements.globalContainer.contains(e.target)) {
                    this.elements.globalDropdown.classList.remove('active');
                }
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.elements.globalDropdown.classList.remove('active');
                    this.elements.globalInput.blur();
                }
            });
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
```

## js\data\faq_db.js
```javascript

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
window.FAQ_DATA = {
    'cu_tru': [
        {
            text: "Tôi muốn đăng ký thường trú vào nhà thuê, mượn hoặc ở nhờ thì cần chuẩn bị hồ sơ gồm những giấy tờ gì?",
            answer: "<b>Hồ sơ gồm:</b><br>1. <b>Tờ khai thay đổi thông tin cư trú (Mẫu CT01):</b> Trong đó phải ghi rõ ý kiến đồng ý cho đăng ký thường trú của chủ hộ, chủ sở hữu chỗ ở hợp pháp được cho thuê, cho mượn, cho ở nhờ hoặc người được ủy quyền (trừ trường hợp đã có ý kiến đồng ý bằng văn bản).<br>2. <b>Hợp đồng, văn bản về việc cho thuê, cho mượn, cho ở nhờ:</b> Các văn bản này phải được công chứng hoặc chứng thực theo quy định của pháp luật.<br>3. <b>Giấy tờ chứng minh diện tích nhà ở:</b> Giấy tờ, tài liệu chứng minh bảo đảm diện tích nhà ở tối thiểu để đăng ký thường trú (nếu chưa có trên CSDL).<br><b>Lưu ý:</b> Nếu cơ quan đăng ký cư trú có thể khai thác thông tin trên CSDLQG về dân cư thì công dân không cần nộp giấy tờ chứng minh diện tích.",
            keywords: ["dang ky thuong tru", "nha thue", "o nho", "muon nha", "ct01"]
        },
        {
            text: "Mức thu lệ phí khi thực hiện đăng ký thường trú và đăng ký tạm trú hiện nay là bao nhiêu?",
            answer: "<b>Đăng ký thường trú:</b><br>- Trực tiếp: 20.000 đồng/lần.<br>- Trực tuyến: 10.000 đồng/lần.<br><br><b>Đăng ký tạm trú:</b><br>- Trực tiếp: 15.000 đồng/lần.<br>- Trực tuyến: 7.000 đồng/lần.<br>👉 Trẻ em, người cao tuổi, người có công... được miễn phí nếu có giấy tờ chứng minh.",
            keywords: ["le phi", "tien", "chi phi", "dang ky thuong tru", "tam tru"]
        },
        {
            text: "Thời hạn giải quyết thủ tục đăng ký thường trú và tạm trú là bao lâu?",
            answer: "<b>Thường trú:</b> 07 ngày làm việc kể từ ngày nhận đủ hồ sơ.<br><b>Tạm trú:</b> 03 ngày làm việc kể từ ngày nhận đủ hồ sơ.<br><b>Gia hạn tạm trú:</b> 03 ngày làm việc.<br><b>Tách hộ:</b> 05 ngày làm việc.",
            keywords: ["thoi gian", "bao lau", "ngay lam viec", "giai quyet"]
        },
        {
            text: "Đăng ký cư trú online có cần nộp bản sao công chứng giấy tờ không?",
            answer: "<b>Không bắt buộc.</b><br>Bạn chỉ cần chụp/scan bản chính rõ nét và tải lên. Khi cán bộ kiểm tra, xác minh, bạn có trách nhiệm xuất trình bản gốc để đối chiếu. Nếu thông tin đã có trên CSDL quốc gia thì không cần nộp lại.",
            keywords: ["online", "cong chung", "ban sao", "nop ho so"]
        },
        {
            text: "Điều kiện và thủ tục để thực hiện \"Tách hộ\" là gì?",
            answer: "<b>Điều kiện:</b> Có năng lực hành vi dân sự đầy đủ; chung chỗ ở hợp pháp; được chủ hộ đồng ý.<br><b>Hồ sơ:</b> Tờ khai CT01 (ghi rõ ý kiến đồng ý tách hộ của chủ hộ và chủ sở hữu chỗ ở hợp pháp).<br><b>Lệ phí:</b> 10.000đ (trực tiếp) / 5.000đ (online).",
            keywords: ["tach ho", "dieu kien", "thu tuc", "ho so"]
        },
        {
            text: "Khi gia đình có người thân qua đời hoặc thuộc diện xóa đăng ký thường trú thì thời hạn làm thủ tục là bao lâu?",
            answer: "Trong thời hạn <b>07 ngày</b> kể từ ngày sự việc xảy ra, đại diện hộ gia đình phải làm thủ tục xóa đăng ký. Nếu không tự giác, Công an sẽ lập biên bản và tự xóa đăng ký.",
            keywords: ["xoa thuong tru", "nguoi mat", "ra nuoc ngoai", "xoa dang ky"]
        },
        {
            text: "Người thân đến chơi và ngủ lại có cần thông báo lưu trú không? Thời gian thông báo thế nào?",
            answer: "<b>Bắt buộc thông báo.</b><br>Thời gian: Trước <b>23 giờ</b> cùng ngày. Nếu khách đến sau 23 giờ thì thông báo trước <b>08 giờ sáng hôm sau</b>.<br>Nếu là người thân (ông bà, cha mẹ, vợ chồng, con...) đến nhiều lần thì chỉ cần thông báo 1 lần.",
            keywords: ["luu tru", "thong bao", "khach den choi", "nguoi than"]
        },
        {
            text: "Xin giấy \"Xác nhận thông tin về cư trú\" (CT07) mất bao lâu và làm ở đâu?",
            answer: "<b>Nơi làm:</b> Công an cấp xã bất kỳ hoặc Online.<br><b>Thời gian:</b><br>- 0,5 ngày (nếu thông tin có sẵn trong CSDL).<br>- 03 ngày (nếu cần xác minh).<br>👉 Thủ tục này <b>Miễn phí</b>.",
            keywords: ["ct07", "xac nhan cu tru", "xin giay", "thoi gian"]
        },
        {
            text: "Gia hạn tạm trú khi nào và thủ tục ra sao?",
            answer: "Phải làm thủ tục trước khi hết hạn <b>15 ngày</b>.<br>Thủ tục giống như đăng ký ban đầu. Nếu chủ hộ đồng ý thì không cần xuất trình lại giấy tờ chứng minh chỗ ở hợp pháp.",
            keywords: ["gia han", "tam tru", "het han", "thu tuc"]
        },
        {
            text: "Những trường hợp nào bắt buộc phải \"Khai báo tạm vắng\"?",
            answer: "Bắt buộc đối với: Bị can, bị cáo, người bị quản chế, người bị kết án phạt tù... hoặc người đi khỏi nơi cư trú theo quy định đặc biệt.<br>Công dân bình thường đi vắng không bắt buộc phải làm thủ tục này.",
            keywords: ["tam vang", "khai bao", "bat buoc"]
        }
    ],
    'cccd': [
        {
            text: "Tôi muốn làm Thẻ căn cước cho trẻ dưới 14 tuổi thì thủ tục như thế nào?",
            answer: "<b>Dưới 06 tuổi:</b> Làm online 100% trên DVC/VNeID, <b>không cần đưa trẻ đến</b>, không thu nhận sinh trắc học.<br><b>06-14 tuổi:</b> Cha mẹ đưa trẻ đến Công an để thu nhận vân tay, mống mắt, ảnh khuôn mặt.<br>Thời hạn: 07 ngày làm việc.",
            keywords: ["tre em", "duoi 14 tuoi", "lam can cuoc", "thu tuc"]
        },
        {
            text: "Bị mất Thẻ căn cước làm lại có cần chụp ảnh/lăn tay lại không?",
            answer: "<b>Không bắt buộc.</b><br>Cán bộ sẽ sử dụng ảnh và vân tay cũ trong CSDL để cấp lại thẻ. Bạn có thể làm online hoàn toàn.<br>Lệ phí: 70.000đ.",
            keywords: ["cap lai", "mat the", "anh cu", "van tay"]
        },
        {
            text: "Thông tin trong CSDL bị sai (năm sinh, nơi sinh) thì điều chỉnh mất bao lâu?",
            answer: "Nộp hồ sơ tại Công an xã hoặc Online.<br>Thời gian giải quyết: <b>02 ngày làm việc</b>.<br>Miễn phí.",
            keywords: ["sai thong tin", "dinh chinh", "tuoi", "noi sinh"]
        },
        {
            text: "Xin xác nhận số CMND 9 số cũ để giao dịch ngân hàng?",
            answer: "Nộp tại Công an xã hoặc Online.<br><b>Thời gian:</b> 03 ngày (nếu có dữ liệu) hoặc 07 ngày (nếu cần tra cứu).<br>Kết quả: Giấy xác nhận số CMND 09 số (Mẫu CC04).",
            keywords: ["xac nhan so", "cmnd 9 so", "chung minh thu", "cc04"]
        },
        {
            text: "Tích hợp GPLX, BHYT vào Căn cước như thế nào?",
            answer: "Có 2 cách:<br>1. Yêu cầu tích hợp khi đi làm thẻ Căn cước.<br>2. Nộp hồ sơ riêng qua VNeID/DVC để đề nghị tích hợp.<br>Thời gian: 07 ngày làm việc.",
            keywords: ["tich hop", "giay phep lai xe", "bang lai", "bhyt"]
        },
        {
            text: "Thu thập ADN và Giọng nói vào Căn cước thực hiện ra sao?",
            answer: "<b>ADN:</b> Phải có kết quả xét nghiệm của tổ chức y tế/giám định hợp pháp, Công an không tự xét nghiệm.<br><b>Giọng nói:</b> Công an thu nhận trực tiếp tại trụ sở.<br>Thời gian: 07 ngày làm việc.",
            keywords: ["adn", "giong noi", "sinh trac hoc"]
        },
        {
            text: "\"Giấy chứng nhận căn cước\" là gì?",
            answer: "Là giấy tờ cấp cho <b>người gốc Việt Nam chưa xác định được quốc tịch</b> đang sinh sống tại VN từ 06 tháng trở lên.<br>Thủ tục cấp tại Công an xã, miễn phí, thời gian 15 ngày.",
            keywords: ["nguoi goc viet", "giay chung nhan", "chua co quoc tich"]
        },
        {
            text: "Độ tuổi nào bắt buộc phải đi đổi Thẻ căn cước?",
            answer: "Bắt buộc đổi khi công dân đủ: <b>14 tuổi, 25 tuổi, 40 tuổi, 60 tuổi</b>.<br>Ngoài ra đổi khi thẻ hỏng, thay đổi thông tin...",
            keywords: ["doi the", "het han", "tuoi quy dinh", "14", "25", "40", "60"]
        },
        {
            text: "Trường hợp nào được Hủy và xác lập lại số định danh cá nhân?",
            answer: "Chỉ khi:<br>1. Xác định lại giới tính hoặc cải chính năm sinh.<br>2. Có sai sót về nơi sinh, năm sinh, giới tính do lỗi thu thập dữ liệu.<br>Thời gian: 15 ngày làm việc.",
            keywords: ["so dinh danh", "huy so", "sai sot", "dinh chinh"]
        },
        {
            text: "Tôi có thể kiểm tra thông tin người khác trong CSDL không?",
            answer: "<b>Được, nhưng có điều kiện.</b><br>Phải được người đó đồng ý (hoặc người giám hộ đồng ý). Nộp phiếu yêu cầu (Mẫu DC02) tại Công an xã và phải nộp phí khai thác.",
            keywords: ["khai thac", "tra cuu", "thong tin nguoi khac"]
        }
    ],
    'dinh_danh': [
        {
            text: "Đăng ký tài khoản định danh VNeID Mức 2 ở đâu? Cần mang gì?",
            answer: "<b>Bắt buộc đến Công an xã/phường.</b><br>Mang theo: Thẻ Căn cước gắn chip + Điện thoại chính chủ + Các giấy tờ muốn tích hợp (GPLX, Đăng ký xe...).",
            keywords: ["vneid muc 2", "dang ky", "o dau", "thu tuc"]
        },
        {
            text: "Cấp VNeID mức 2 cho trẻ dưới 14 tuổi?",
            answer: "Cha mẹ đưa trẻ đến Công an xã. Sử dụng số điện thoại của cha/mẹ để đăng ký tài khoản cho con.",
            keywords: ["tre em", "con nho", "duoi 14"]
        },
        {
            text: "Thời gian cấp tài khoản VNeID mức 2?",
            answer: "<b>03 ngày làm việc:</b> Nếu đã có thẻ Căn cước gắn chip.<br><b>07 ngày làm việc:</b> Nếu làm cùng lúc với cấp thẻ Căn cước.",
            keywords: ["thoi gian", "bao lau", "cap tai khoan"]
        },
        {
            text: "Mất điện thoại, muốn khóa VNeID/Căn cước điện tử ngay lập tức?",
            answer: "Yêu cầu khóa tại Công an xã hoặc tự khóa trên ứng dụng VNeID (bằng thiết bị khác). Hệ thống sẽ <b>thực hiện khóa ngay lập tức</b>.",
            keywords: ["khoa tai khoan", "mat dien thoai", "khoa gap"]
        },
        {
            text: "Chưa có Căn cước chip (dùng CMND cũ) có làm VNeID mức 2 được không?",
            answer: "<b>Được.</b><br>Nhưng phải làm thủ tục cấp Căn cước gắn chip <b>đồng thời</b> với đăng ký tài khoản định danh mức 2.",
            keywords: ["cmnd cu", "chua doi the", "muc 2"]
        },
        {
            text: "Muốn mở khóa Căn cước điện tử thì làm thế nào?",
            answer: "Đến Công an xã hoặc yêu cầu mở khóa trên ứng dụng VNeID. Hệ thống sẽ mở khóa <b>ngay lập tức</b> sau khi xác thực.",
            keywords: ["mo khoa", "bi khoa", "khoa can cuoc"]
        },
        {
            text: "Doanh nghiệp/Tổ chức đăng ký VNeID như thế nào?",
            answer: "Người đại diện pháp luật dùng VNeID cá nhân để đăng ký online, hoặc đến trực tiếp Trung tâm dữ liệu quốc gia về dân cư (C06).",
            keywords: ["doanh nghiep", "to chuc", "cong ty"]
        },
        {
            text: "Thời gian cấp VNeID cho tổ chức?",
            answer: "03 ngày (nếu thông tin đã có trong CSDL) hoặc 15 ngày (nếu cần xác minh).",
            keywords: ["thoi gian", "to chuc"]
        },
        {
            text: "Cơ quan tố tụng yêu cầu khóa VNeID thì mất bao lâu?",
            answer: "Tổng thời gian giải quyết là <b>03 ngày làm việc</b> (Công an xã -> Cục C06 -> Phê duyệt).",
            keywords: ["to tung", "toa an", "yeu cau khoa"]
        },
        {
            text: "Phí đăng ký, khóa/mở khóa VNeID là bao nhiêu?",
            answer: "<b>Hoàn toàn Miễn phí.</b>",
            keywords: ["phi", "tien", "le phi", "mien phi"]
        }
    ],
    'xe': [
        {
            text: "Đăng ký xe mới online toàn trình cần điều kiện gì?",
            answer: "1. Chủ xe là công dân VN có VNeID mức 2.<br>2. Xe sản xuất lắp ráp trong nước (có phiếu xuất xưởng điện tử).<br>👉 Nhận biển số, giấy tờ qua bưu điện. Nộp lại phiếu xuất xưởng bản giấy qua bưu điện.",
            keywords: ["dang ky xe", "online", "toan trinh", "xe moi"]
        },
        {
            text: "Thủ tục Sang tên đổi chủ (Mua bán xe) gồm những bước nào?",
            answer: "<b>Bước 1 (Chủ cũ):</b> Làm thủ tục <b>Thu hồi</b> biển số, đăng ký xe (giữ lại nộp cho Công an).<br><b>Bước 2 (Chủ mới):</b> Làm thủ tục <b>Sang tên</b> (cần chứng nhận thu hồi của chủ cũ).",
            keywords: ["sang ten", "mua ban", "thu hoi", "doi chu"]
        },
        {
            text: "Thời hạn sang tên xe là bao lâu? Quá hạn có bị phạt không?",
            answer: "Trong vòng <b>30 ngày</b> kể từ ngày làm giấy mua bán, chủ cũ phải làm thủ tục thu hồi. Quá hạn sẽ bị phạt.",
            keywords: ["qua han", "cham sang ten", "phat", "thoi han"]
        },
        {
            text: "Mất đăng ký xe hoặc biển số, xin cấp lại mất bao lâu?",
            answer: "<b>Xác minh:</b> 30 ngày.<br><b>Cấp lại:</b> 02 ngày sau khi xác minh xong.",
            keywords: ["mat giay to", "mat bien", "cap lai", "thoi gian"]
        },
        {
            text: "Sơn lại màu xe có cần mang xe đến công an không?",
            answer: "<b>Có.</b> Phải khai báo online lấy mã hồ sơ -> Mang xe đến Công an kiểm tra thực tế -> Cấp đổi đăng ký.",
            keywords: ["doi mau son", "son xe", "thay doi mau"]
        },
        {
            text: "Đăng ký xe tạm thời có giá trị bao lâu?",
            answer: "Xe di chuyển (từ kho, cảng): 15 ngày.<br>Xe chạy thử nghiệm: Tối đa 06 tháng.<br>Có thể làm <b>Online 100%</b> và nhận kết quả trong 8 giờ.",
            keywords: ["tam thoi", "xe moi mua", "thoi han"]
        },
        {
            text: "Xe hết niên hạn/hư hỏng không dùng được thì làm gì?",
            answer: "Phải làm thủ tục <b>Thu hồi</b> online trong thời hạn 07 ngày. Trả biển số qua bưu điện. Không mất phí.",
            keywords: ["xe nat", "het nien han", "thu hoi"]
        },
        {
            text: "Thời gian cấp biển số lần đầu là bao lâu?",
            answer: "<b>Trực tiếp:</b> Cấp ngay.<br><b>Online:</b> Không quá 08 giờ làm việc.",
            keywords: ["bao lau", "thoi gian", "bien so"]
        },
        {
            text: "Nhận giấy tờ xe tại nhà được không?",
            answer: "<b>Được.</b> Bạn có thể đăng ký dịch vụ bưu chính công ích để nhận kết quả tại nhà.",
            keywords: ["buu dien", "nhan tai nha", "tra ket qua"]
        }
    ],
    'xuat_nhap_canh': [
        {
            text: "Thời hạn phải báo mất hộ chiếu phổ thông?",
            answer: "Trong thời hạn <b>02 ngày làm việc</b> kể từ ngày phát hiện hộ chiếu phổ thông bị mất, bạn phải thực hiện thủ tục trình báo mất hộ chiếu.<br><br><b>Trường hợp bất khả kháng:</b> Nếu vì lý do bất khả kháng (như ốm đau, thiên tai, tai nạn...), thời hạn có thể dài hơn nhưng phải <b>giải thích cụ thể</b> trong đơn.",
            keywords: ["mat ho chieu", "trinh bao", "thoi han", "bao lau"]
        },
        {
            text: "Báo mất hộ chiếu ở đâu?",
            answer: "<b>Nơi nộp:</b> Công an cấp xã nơi gần nhất hoặc thuận lợi nhất (không bắt buộc về nơi thường trú).<br><b>Hình thức:</b> Trực tiếp, Online qua cổng DVC, hoặc qua bưu chính.",
            keywords: ["o dau", "online", "dia diem", "nop ho so"]
        },
        {
            text: "Sau bao lâu hộ chiếu bị hủy giá trị?",
            answer: "Sau 01 ngày làm việc kể từ khi nhận đơn, Công an xã báo lên Cục. Sau 01 ngày tiếp theo, Cục QLXNC sẽ hủy giá trị sử dụng của hộ chiếu.",
            keywords: ["huy ho chieu", "gia tri"]
        },
        {
            text: "Thời hạn khai báo tạm trú cho người nước ngoài?",
            answer: "<b>Thông thường:</b> Trong vòng <b>12 giờ</b> kể từ khi khách đến.<br><b>Vùng sâu, vùng xa:</b> Trong vòng <b>24 giờ</b>.",
            keywords: ["thoi han", "khai bao", "bao lau", "nguoi nuoc ngoai"]
        },
        {
            text: "Mất thẻ APEC (ABTC) báo trong bao lâu?",
            answer: "Trong thời hạn <b>48 giờ</b> (tính theo giờ) kể từ khi phát hiện mất thẻ.",
            keywords: ["the apec", "abtc", "doanh nhan", "mat the"]
        },
        {
            text: "Kết quả báo mất thẻ ABTC?",
            answer: "Công an xã thông báo đã chuyển đơn (Mẫu CV04). Sau khoảng 03 ngày, Cục QLXNC thông báo kết quả giải quyết (Mẫu CV05).",
            keywords: ["ket qua", "apec"]
        },
        {
            text: "Mất giấy thông hành biên giới?",
            answer: "Báo mất trong vòng <b>02 ngày làm việc</b>. Nộp tại Công an xã hoặc Online. Giấy thông hành sẽ bị hủy giá trị sau 01 ngày.",
            keywords: ["thong hanh", "bien gioi", "lao", "trung quoc"]
        },
        {
            text: "Lệ phí trình báo mất giấy tờ, khai báo tạm trú?",
            answer: "<b>Hoàn toàn Miễn phí.</b>",
            keywords: ["le phi", "tien", "chi phi", "mien phi"]
        },
        {
            text: "Đăng ký tài khoản khai báo tạm trú cho người nước ngoài ở đâu?",
            answer: "Truy cập trang <b>https://tbltkbtt.bocongan.gov.vn/</b> -> Chọn Đăng ký -> Điền thông tin -> Xác nhận.",
            keywords: ["tai khoan", "dang ky", "kbtt", "trang web"]
        },
        {
            text: "Lấy mã xác thực (Google Authenticator) để đăng nhập KBTT?",
            answer: "Tải app Google Authenticator -> Quét mã QR khi đăng nhập lần đầu. Các lần sau mở app lấy mã 6 số để đăng nhập.",
            keywords: ["google authenticator", "ma xac thuc", "token", "otp"]
        },
        {
            text: "Hệ thống KBTT có tự động lấy thông tin từ ảnh hộ chiếu không?",
            answer: "<b>Có.</b> Ấn nút 'Tải lên' và chọn ảnh hộ chiếu, hệ thống sẽ tự động điền thông tin. Bạn cần kiểm tra lại trước khi Lưu.",
            keywords: ["tu dong", "scan", "anh ho chieu"]
        },
        {
            text: "Nhập liệu nhanh cho đoàn khách đông người?",
            answer: "Sử dụng nút <b>'Thêm hồ sơ khác'</b> sau khi nhập xong khách đầu tiên để nhập liên tục mà không cần quay lại danh sách.",
            keywords: ["khach doan", "nhap nhanh", "dong nguoi"]
        },
        {
            text: "Xem báo cáo thống kê khách lưu trú?",
            answer: "Vào mục 'Thống kê theo quốc tịch' hoặc 'Thống kê tình trạng xử lý' để xem biểu đồ và xuất file Excel.",
            keywords: ["bao cao", "thong ke", "excel"]
        }
    ],
    'vu_khi': [
        {
            text: "Gia đình lưu giữ vũ khí thô sơ (đồ gia bảo) có phải khai báo không?",
            answer: "<b>Bắt buộc khai báo.</b><br>Theo Luật Quản lý vũ khí 2024, vũ khí thô sơ là đồ gia bảo, hiện vật trưng bày phải khai báo với Công an.",
            keywords: ["kiem co", "gia bao", "dao", "kiem", "trung bay"]
        },
        {
            text: "Nộp hồ sơ khai báo vũ khí thô sơ ở đâu?",
            answer: "1. <b>Trực tiếp:</b> Tại Công an xã/phường nơi cư trú.<br>2. <b>Trực tuyến:</b> Qua Cổng dịch vụ công.",
            keywords: ["o dau", "nop ho so", "online"]
        },
        {
            text: "Hồ sơ khai báo gồm những giấy tờ gì?",
            answer: "1. Tờ khai (ghi rõ thông tin cá nhân, lý do, thông tin vũ khí).<br>2. Giấy tờ chứng minh nguồn gốc (nếu có).<br>👉 Nếu là đồ gia bảo lâu đời không còn giấy tờ thì vẫn khai báo thông tin hiện có.",
            keywords: ["ho so", "giay to", "can nhung gi"]
        },
        {
            text: "Thời gian giải quyết và Lệ phí khai báo vũ khí?",
            answer: "<b>Thời hạn:</b> 03 ngày làm việc.<br><b>Lệ phí:</b> Miễn phí.",
            keywords: ["thoi gian", "bao lau", "le phi", "tien"]
        },
        {
            text: "Kết quả của thủ tục khai báo là gì?",
            answer: "Là <b>Thông báo xác nhận khai báo vũ khí thô sơ</b> (Mẫu VC21).<br>Lưu ý: Đây không phải là Giấy phép.",
            keywords: ["ket qua", "giay xac nhan", "giay phep"]
        },
        {
            text: "Mẫu đơn đề nghị khai báo?",
            answer: "Không có mẫu đơn cụ thể. Công dân tự viết Tờ khai nhưng phải đảm bảo đủ các thông tin: Nhân thân, Lý do, Thông tin vũ khí.",
            keywords: ["mau don", "to khai", "viet tay"]
        },
        {
            text: "Nộp hồ sơ qua bưu điện được không?",
            answer: "<b>Được.</b> Cán bộ sẽ thông báo bằng văn bản về thời gian trả kết quả hoặc lý do từ chối (nếu hồ sơ không đạt).",
            keywords: ["buu dien", "gui thu"]
        },
        {
            text: "Thông tin vũ khí sau khai báo được quản lý thế nào?",
            answer: "Được nhập vào <b>Hệ thống Cơ sở dữ liệu</b> quản lý vũ khí của Bộ Công an để quản lý chặt chẽ.",
            keywords: ["quan ly", "du lieu", "csdl"]
        }
    ],
    'kinh_doanh': [
        {
            text: "Nộp hồ sơ ANTT cho nhà nghỉ nhỏ, cửa hàng gas ở đâu?",
            answer: "Nộp tại <b>Công an cấp xã</b>.<br>Áp dụng cho: Nhà nghỉ < 10 phòng, Hộ kinh doanh khí (gas).",
            keywords: ["nha nghi", "gas", "karaoke nho", "o dau"]
        },
        {
            text: "Hồ sơ xin giấy ANTT gồm những gì?",
            answer: "1. Văn bản đề nghị (Mẫu 03).<br>2. Bản sao Đăng ký kinh doanh.<br>3. Giấy tờ PCCC (Biên bản kiểm tra hoặc Văn bản nghiệm thu).<br>4. Lý lịch tư pháp và Bản khai lý lịch của người đứng đầu.",
            keywords: ["ho so", "giay to", "can nhung gi"]
        },
        {
            text: "Thời gian và Lệ phí cấp giấy ANTT?",
            answer: "<b>Thời gian:</b> 05 ngày làm việc.<br><b>Lệ phí:</b> 300.000 đồng.",
            keywords: ["thoi gian", "le phi", "tien", "chi phi"]
        },
        {
            text: "Mất giấy ANTT, xin cấp lại thế nào?",
            answer: "Phải nộp phạt vi phạm hành chính về làm mất giấy tờ trước, sau đó nộp hồ sơ xin cấp lại (Mẫu 03 + Biên lai nộp phạt).",
            keywords: ["mat giay", "cap lai", "thu tuc"]
        },
        {
            text: "Đổi tên cơ sở hoặc người đứng đầu có cần xin cấp lại?",
            answer: "Làm thủ tục <b>Cấp đổi</b>. Nộp lại bản chính giấy cũ cùng tài liệu chứng minh thay đổi.",
            keywords: ["doi ten", "thay doi", "cap doi"]
        },
        {
            text: "Người nước ngoài đứng tên giấy ANTT được không?",
            answer: "<b>Được.</b> Hồ sơ thay Lý lịch tư pháp bằng Bản khai nhân sự (Mẫu 02b) + Hộ chiếu/Thẻ tạm trú.",
            keywords: ["nguoi nuoc ngoai", "tay", "dung ten"]
        },
        {
            text: "Giấy PCCC có cần làm trước không?",
            answer: "<b>Bắt buộc.</b> Phải hoàn thành thủ tục PCCC và có văn bản nghiệm thu hoặc biên bản kiểm tra an toàn PCCC trước khi nộp hồ sơ ANTT.",
            keywords: ["pccc", "phong chay", "bat buoc"]
        },
        {
            text: "Bị thu hồi giấy ANTT có xin lại được không?",
        },
        {
            text: "Lấy mã xác thực (Google Authenticator) để đăng nhập?",
            answer: "Để bảo mật, hệ thống yêu cầu xác thực 2 lớp qua ứng dụng <b>Google Authenticator</b>:<br><ul><li><b>Cài đặt lần đầu:</b> Khi đăng nhập lần đầu, hệ thống hiện mã QR. Bạn tải app Google Authenticator, quét mã QR này để lấy mã xác thực (token).</li><li><b>Đăng nhập các lần sau:</b><br>1. Nhập tên đăng nhập, mật khẩu, captcha.<br>2. Hệ thống yêu cầu 'Mã Authenticator'.<br>3. Mở app lấy mã 6 số nhập vào và nhấn 'Xác nhận'.</li></ul>",
            keywords: ["google authenticator", "ma xac thuc", "token", "otp"]
        },
        {
            text: "Hệ thống có tự động lấy thông tin từ ảnh hộ chiếu không?",
            answer: "Bạn <b>không nhất thiết phải gõ tay</b> toàn bộ thông tin.<br><b>Cách thực hiện:</b> Ấn nút <b>'Tải lên'</b> và chọn ảnh chụp trang nhân thân hộ chiếu.<br><b>Kết quả:</b> Hệ thống tự động nhận diện và điền thông tin (Số hộ chiếu, Họ tên, Ngày sinh, Giới tính, Quốc tịch...).<br><b>Lưu ý:</b> Sau khi điền tự động, bạn <b>cần kiểm tra lại</b> để đảm bảo chính xác trước khi Lưu.",
            keywords: ["tu dong", "trich xuat", "quét ảnh", "scan"]
        },
        {
            text: "Các thông tin bắt buộc khi khai báo tạm trú?",
            answer: "Sau khi tải ảnh hộ chiếu, bạn cần kiểm tra và điền đủ <b>các trường thông tin có dấu sao đỏ (*)</b> bắt buộc bao gồm:<br><ul><li>Số hộ chiếu</li><li>Quốc tịch</li><li>Họ và tên</li><li>Ngày sinh</li><li>Giới tính</li><li>Ngày đến cơ sở lưu trú</li><li>Ngày đi dự kiến</li><li>Số phòng</li></ul>Sau khi điền đủ, ấn nút <b>'Lưu thông tin'</b> để hoàn tất.",
            keywords: ["bat buoc", "thong tin", "truong nao"]
        },
        {
            text: "Cách nhập liệu nhanh cho đoàn khách đông người?",
            answer: "<b>Có.</b> Hệ thống hỗ trợ nhập liệu cho khách đoàn.<br>Thay vì ấn 'Lưu thông tin' rồi quay lại danh sách, sau khi nhập xong khách thứ nhất, bạn hãy ấn vào nút <b>'Thêm hồ sơ khác'</b>.<br>Chức năng này cho phép nhập liên tục nhiều hồ sơ tiếp theo mà không bị gián đoạn, tiết kiệm thời gian.",
            keywords: ["khach doan", "nhap nhanh", "dong nguoi"]
        },
        {
            text: "Xem báo cáo thống kê khách lưu trú?",
            answer: "Hệ thống cung cấp chức năng <b>'Báo cáo thống kê'</b>:<br>1. <b>Thống kê theo quốc tịch:</b> Xem biểu đồ Top 10 quốc tịch, lọc theo thời gian và tải file Excel.<br>2. <b>Thống kê theo tình trạng xử lý:</b> Xem số lượng hồ sơ theo trạng thái (Mới, Xác nhận, Từ chối...) và xuất file Excel lưu trữ.",
            keywords: ["bao cao", "thong ke", "excel"]
        },
        {
            text: "Thời hạn báo mất thẻ APEC (ABTC)?",
            answer: "Thời hạn báo mất thẻ ABTC <b>gấp hơn</b> so với hộ chiếu.<br>Trong thời hạn <b>48 giờ</b> (tính theo giờ, không phải ngày làm việc) kể từ khi phát hiện thẻ ABTC bị mất, doanh nhân phải thực hiện việc trình báo. Nếu có lý do bất khả kháng thì được kéo dài nhưng phải giải thích rõ.",
            keywords: ["the apec", "abtc", "doanh nhan", "mat the"]
        },
        {
            text: "Kết quả báo mất thẻ ABTC?",
            answer: "Bạn sẽ nhận được 02 thông báo theo trình tự:<br>1. Thông báo của Công an cấp xã về việc đã chuyển đơn trình báo lên Cục Quản lý xuất nhập cảnh (Mẫu CV04).<br>2. Sau khoảng <b>03 ngày làm việc</b> tiếp theo, Cục Quản lý xuất nhập cảnh sẽ gửi thông báo về việc giải quyết đơn trình báo mất thẻ (Mẫu CV05).",
            keywords: ["ket qua", "apec"]
        },
        {
            text: "Mất giấy thông hành biên giới?",
            answer: "Về cơ bản thủ tục tương tự như báo mất hộ chiếu:<br><ul><li><b>Thời hạn báo:</b> Trong vòng <b>02 ngày làm việc</b> kể từ khi phát hiện mất.</li><li><b>Nơi nộp:</b> Công an cấp xã nơi thuận lợi, Cổng dịch vụ công hoặc qua bưu chính.</li><li><b>Hồ sơ:</b> Sử dụng đơn trình báo mất giấy thông hành (Mẫu M02a).</li><li><b>Kết quả:</b> Giấy thông hành sẽ bị hủy giá trị sử dụng trong vòng 01 ngày làm việc sau khi cơ quan cấp nhận thông báo.</li></ul>",
            keywords: ["thong hanh", "bien gioi", "lao", "trung quoc"]
        },
        {
            text: "Lệ phí trình báo mất giấy tờ, khai báo tạm trú?",
            answer: "<b>Không.</b> Theo quy định hiện hành, tất cả các thủ tục thực hiện tại Công an cấp xã đều <b>không thu lệ phí</b>, cụ thể:<br><ul><li>Trình báo mất hộ chiếu: Không thu phí.</li><li>Khai báo tạm trú cho người nước ngoài: Không thu phí.</li><li>Trình báo mất thẻ ABTC: Không thu phí.</li><li>Trình báo mất giấy thông hành: Không thu phí.</li></ul>",
            keywords: ["le phi", "tien", "chi phi"]
        },
        {
            text: "Giấy tờ cần mang khi đi báo mất trực tiếp?",
            answer: "Khi đến nộp hồ sơ trực tiếp, bạn cần xuất trình một trong số các giấy tờ sau còn giá trị sử dụng để kiểm tra:<br><ul><li>Thẻ căn cước.</li><li>Căn cước công dân.</li><li>Căn cước điện tử.</li></ul>Quy định này áp dụng cho việc trình báo mất hộ chiếu và các giấy tờ xuất nhập cảnh khác.",
            keywords: ["giay to", "mang theo", "cccd"]
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
```

## js\utils\search_engine.js
```javascript

window.FaqSearchEngine = class FaqSearchEngine {
    constructor() {
        this.index = [];
        this.cache = new Map();
        this.MAX_CACHE_SIZE = 100;
        this.buildIndex();
    }
    buildIndex() {
        const categories = window.MAIN_CATEGORIES || [];
        const faqData = window.FAQ_DATA || {};
        categories.forEach(cat => {
            this.index.push({
                type: 'category',
                id: cat.id,
                text: cat.text,
                answer: null, 
                keywords: this.normalize(cat.keywords.join(' ')),
                normalizedText: this.normalize(cat.text),
                original: cat
            });
        });
        Object.keys(faqData).forEach(catId => {
            faqData[catId].forEach(q => {
                this.index.push({
                    type: 'question',
                    id: null,
                    catId: catId,
                    text: q.text,
                    answer: q.answer,
                    keywords: this.normalize(q.keywords ? q.keywords.join(' ') : ''),
                    normalizedText: this.normalize(q.text),
                    original: q
                });
            });
        });
    }
    normalize(str) {
        if (!str) return '';
        return str.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d");
    }
    search(query) {
        if (!query || query.trim().length < 2) return [];
        if (query.length > 200) query = query.substring(0, 200);
        if (this.cache.has(query)) {
            return this.cache.get(query);
        }
        const normalizedQuery = this.normalize(query);
        const queryTokens = normalizedQuery.split(' ');
        const results = [];
        for (const item of this.index) {
            let score = 0;
            if (item.normalizedText.includes(normalizedQuery)) score += 10;
            if (item.keywords.includes(normalizedQuery)) score += 8;
            for (const token of queryTokens) {
                if (item.normalizedText.includes(token)) score += 2;
                if (item.keywords.includes(token)) score += 1;
            }
            if (score > 0) {
                results.push({ ...item, score });
            }
        }
        const sortedResults = results.sort((a, b) => b.score - a.score).slice(0, 5);
        if (this.cache.size >= this.MAX_CACHE_SIZE) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(query, sortedResults);
        return sortedResults;
    }
}
```

## modules\an-ninh.html
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>An Ninh Trật Tự | CA Phường Phú Thọ</title>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <link rel="stylesheet" href="../styles/dvc-style.css">
</head>
<body class="dvc-page">
    <div class="dvc-header">
        <a href="../index.html" class="back-btn"><i class="fa-solid fa-arrow-left"></i></a>
        <div class="header-title">An Ninh Trật Tự</div>
        <i class="fa-solid fa-building-shield"></i>
    </div>
    <div class="dvc-container">
        <div class="breadcrumb">
            <i class="fa-solid fa-house"></i> / Dịch vụ công / Ngành nghề kinh doanh
        </div>
        <div class="proc-card active">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="true" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-magnifying-glass-chart"></i></div>
                    1. Cửa Hàng Tôi Có Cần Xin Giấy?
                    <span class="badge badge-new">Quan trọng</span>
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="tip-box">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <div>
                        <strong>Quy định:</strong> Các ngành nghề sau đây <strong>BẮT BUỘC</strong> phải có Giấy chứng
                        nhận đủ điều kiện về ANTT mới được hoạt động.
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-store"></i> Danh sách phổ biến tại Phường</div>
                    <ul class="checklist">
                        <li><strong>Lưu trú:</strong> Nhà nghỉ, Khách sạn, Homestay, Nhà cho người nước ngoài thuê.</li>
                        <li><strong>Dịch vụ in ấn:</strong> Photocopy màu, in xuất bản phẩm.</li>
                        <li><strong>Dịch vụ cầm đồ:</strong> Cầm cố tài sản, cho vay.</li>
                        <li><strong>Gas, Khí đốt:</strong> Cửa hàng bán lẻ gas.</li>
                        <li><strong>Karaoke, Vũ trường:</strong> Kinh doanh dịch vụ hát.</li>
                        <li><strong>Xoa bóp (Massage):</strong> (Trừ cơ sở của người mù/y học cổ truyền).</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="proc-card">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-file-signature"></i></div>
                    2. Thủ Tục Xin Cấp Mới
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="tip-box" style="background: #FEF3C7; border-color: #F59E0B; color: #92400E;">
                    <i class="fa-solid fa-fire-extinguisher"></i>
                    <div>
                        <strong>Mẹo:</strong> Bác phải làm xong thủ tục <strong>Phòng cháy chữa cháy (PCCC)</strong>
                        trước thì mới xin được giấy An ninh trật tự này nhé!
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-clipboard-check"></i> Hồ sơ cần chuẩn bị</div>
                    <ul class="checklist">
                        <li><strong>Đơn đề nghị cấp giấy</strong> (Mẫu số 03).</li>
                        <li><strong>Giấy phép kinh doanh</strong> (Bản sao công chứng).</li>
                        <li><strong>Giấy tờ PCCC:</strong> Biên bản kiểm tra an toàn PCCC hoặc Văn bản nghiệm thu.</li>
                        <li><strong>Lý lịch tư pháp</strong> của người đứng đầu (Bản khai Mẫu 02).</li>
                    </ul>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-clock"></i> Thời gian & Nơi nộp</div>
                    <ul class="checklist">
                        <li><strong>Nơi nộp:</strong> Công an Phường (Đối với hộ kinh doanh cá thể, nhà nghỉ nhỏ...).
                        </li>
                        <li><strong>Thời gian:</strong> 05 ngày làm việc.</li>
                        <li><strong>Lệ phí:</strong> 300.000đ.</li>
                    </ul>
                </div>
                <div class="btn-group">
                    <a href="#" class="btn btn-outline"><i class="fa-solid fa-download"></i> Tải Mẫu Đơn 03</a>
                    <a href="https://dichvucong.bocongan.gov.vn" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i
                            class="fa-solid fa-globe"></i> Nộp Trực Tuyến</a>
                </div>
            </div>
        </div>
        <div class="proc-card">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-rotate"></i></div>
                    3. Bị Mất hoặc Thay Đổi Thông Tin
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="section-block">
                    <div class="block-title">Các trường hợp cần làm lại</div>
                    <ul class="checklist">
                        <li>Bị mất, bị hư hỏng, rách nát.</li>
                        <li>Thay đổi tên cơ sở, người đứng đầu.</li>
                        <li>Thay đổi địa điểm kinh doanh.</li>
                    </ul>
                </div>
                <div class="tip-box">
                    <i class="fa-solid fa-circle-info"></i>
                    <div>Thời hạn giải quyết cấp đổi/cấp lại rất nhanh: Chỉ <strong>03 ngày làm việc</strong>.</div>
                </div>
                <div class="btn-group" style="grid-template-columns: 1fr;">
                    <a href="tel:02106288588" class="btn btn-primary"><i class="fa-solid fa-phone"></i> Gọi Hỏi Cán
                        Bộ</a>
                </div>
            </div>
        </div>
        <div class="footer-note">
            Cập nhật theo Nghị định 96/2016/NĐ-CP và Nghị định 56/2023/NĐ-CP.
        </div>
    </div>
    <script>
        function toggleCard(header) {
            const card = header.parentElement;
            const isActive = card.classList.toggle('active');
            header.setAttribute('aria-expanded', isActive);
        }
        function handleCardKeydown(event, header) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); 
                toggleCard(header);
            }
        }
    </script>
</body>
</html>
```

## modules\cu-tru.html
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Cư Trú & Định Danh | CA Phường Phú Thọ</title>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <link rel="stylesheet" href="../styles/dvc-style.css">
</head>
<body class="dvc-page">
    <div class="dvc-header">
        <a href="../index.html" class="back-btn"><i class="fa-solid fa-arrow-left"></i></a>
        <div class="header-title">Thủ Tục Cư Trú</div>
        <i class="fa-solid fa-user-shield"></i>
    </div>
    <div class="dvc-container">
        <div class="breadcrumb">
            <i class="fa-solid fa-house"></i> / Dịch vụ công / Đăng ký cư trú
        </div>
        <div class="section-block" style="background: #EFF6FF; border: 1px solid #BFDBFE; margin-bottom: 20px;">
            <div class="block-title" style="color: #1E40AF;"><i class="fa-solid fa-star"></i> Tải Biểu Mẫu & Nộp Hồ Sơ
            </div>
            <div class="btn-group">
                <a href="https://dichvucong.dancuquocgia.gov.vn" target="_blank" rel="noopener noreferrer" class="btn btn-primary"
                    style="grid-column: span 2;">
                    <i class="fa-solid fa-globe"></i> Nộp Hồ Sơ Trực Tuyến
                </a>
                <a href="../mau-ct01.doc" download class="btn btn-outline" style="background: white;">
                    <i class="fa-solid fa-download"></i> Tải Mẫu CT01
                </a>
                <a href="../mau-dc01.docx" download class="btn btn-outline" style="background: white;">
                    <i class="fa-solid fa-download"></i> Tải Mẫu DC01
                </a>
            </div>
        </div>
        <div class="proc-card active">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="true" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-house-user"></i></div>
                    1. Đăng Ký Thường Trú
                    <span class="badge badge-new">Phổ biến</span>
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="tip-box">
                    <i class="fa-solid fa-lightbulb"></i>
                    <div>
                        <strong>Mẹo:</strong> Nếu công dân đã có tài khoản <strong>VNeID Mức 2</strong>, công dân nên
                        làm Online
                        tại nhà (Chọn nút Nộp Hồ Sơ bên trên).
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-clipboard-check"></i> Giấy tờ cần chuẩn bị</div>
                    <ul class="checklist">
                        <li><strong>Thẻ CCCD gắn chip</strong> (Của tất cả người chuyển đến).</li>
                        <li><strong>Tờ khai CT01</strong> (Tải mẫu ở mục trên cùng).
                            <br><em style="font-size: 0.8rem; color: #666;">(Lưu ý: Nếu về ở với bố mẹ/vợ chồng, cần chữ
                                ký chủ hộ vào mục "Ý kiến chủ hộ")</em>
                        </li>
                        <li><strong>Giấy tờ nhà ở</strong>:
                            <br>- Có sổ đỏ: Mang bản chính đối chiếu.
                            <br>- Về ở với người thân: Không cần sổ, chỉ cần chủ hộ ký CT01.
                        </li>
                    </ul>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-money-bill-wave"></i> Lệ phí & Thời gian</div>
                    <div style="font-size: 0.9rem;">
                        <span class="badge badge-fee">Mới: 20.000đ</span>
                        <span class="badge badge-fee">Sửa đổi: 10.000đ</span>
                        <div style="margin-top: 6px;">Thời gian: <strong>07 ngày làm việc</strong></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="proc-card">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-suitcase"></i></div>
                    2. Đăng Ký Tạm Trú
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-clipboard-check"></i> Dành cho Sinh viên, Công nhân
                    </div>
                    <ul class="checklist">
                        <li><strong>Thẻ CCCD</strong></li>
                        <li><strong>Tờ khai CT01</strong> (Có ý kiến chủ trọ - Tải mẫu ở trên).</li>
                        <li><strong>Hợp đồng thuê nhà</strong> (Bản photo).</li>
                    </ul>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-clock"></i> Thông tin xử lý</div>
                    <ul class="checklist">
                        <li>Thời gian: <strong>03 ngày làm việc</strong></li>
                        <li>Lệ phí: <strong>15.000đ</strong></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="proc-card">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-bell"></i></div>
                    3. Thông Báo Lưu Trú
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="tip-box tip-green">
                    <i class="fa-solid fa-check-circle"></i>
                    <div>Thủ tục này <strong>không cần ra phường</strong>. Hãy chọn cách nhanh nhất bên dưới.</div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-list-ol"></i> 3 Cách thực hiện</div>
                    <div class="steps">
                        <div class="step-item">
                            <div class="step-num">1</div>
                            <div class="step-text"><strong>Qua App VNeID:</strong> Mở app → Chọn "Thông báo lưu trú" →
                                Quét QR hoặc nhập thông tin khách.</div>
                        </div>
                        <div class="step-item">
                            <div class="step-num">2</div>
                            <div class="step-text"><strong>Qua Zalo CSKV:</strong> Chụp ảnh CCCD khách gửi cho Cảnh sát
                                khu vực.</div>
                        </div>
                        <div class="step-item">
                            <div class="step-num">3</div>
                            <div class="step-text"><strong>Trực tiếp:</strong> Đến trụ sở Công an phường (24/7).</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="proc-card">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-file-invoice"></i></div>
                    4. Xin Xác Nhận Cư Trú (CT07)
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-question-circle"></i> Mục đích sử dụng</div>
                    <p style="font-size: 0.9rem; color: #4B5563; margin: 0 0 10px 0;">Thay thế cho Sổ hộ khẩu giấy cũ
                        để: Xin việc, đi học, vay vốn ngân hàng, mua bán đất...</p>
                    <ul class="checklist">
                        <li><strong>Cách 1:</strong> Đăng nhập Cổng Dịch vụ công (Nút ở trên cùng) → Yêu cầu xác nhận →
                            Nhận file PDF.
                        </li>
                        <li><strong>Cách 2:</strong> Ra Công an phường → Đọc số CCCD → Cán bộ in và đóng dấu.</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-note">
            Dữ liệu được cập nhật mới nhất theo Luật Cư trú 2020 & Luật Căn cước 2023.
        </div>
    </div>
    <script>
        function toggleCard(header) {
            const card = header.parentElement;
            const isActive = card.classList.toggle('active');
            header.setAttribute('aria-expanded', isActive);
        }
        function handleCardKeydown(event, header) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); 
                toggleCard(header);
            }
        }
    </script>
</body>
</html>
```

## modules\dang-ky-xe.html
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Đăng Ký Xe | CA Phường Phú Thọ</title>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <link rel="stylesheet" href="../styles/dvc-style.css">
</head>
<body class="dvc-page">
    <div class="dvc-header">
        <a href="../index.html" class="back-btn"><i class="fa-solid fa-arrow-left"></i></a>
        <div class="header-title">Thủ Tục Đăng Ký Xe</div>
        <i class="fa-solid fa-motorcycle"></i>
    </div>
    <div class="dvc-container">
        <div class="breadcrumb">
            <i class="fa-solid fa-house"></i> / Dịch vụ công / Đăng ký xe
        </div>
        <div class="proc-card active">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="true" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-file-circle-plus"></i></div>
                    1. Đăng Ký Xe Máy Mới
                    <span class="badge badge-new">Phổ biến</span>
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="tip-box">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <div>
                        <strong>Lưu ý:</strong> Công an Phường chỉ làm thủ tục cho <strong>xe lắp ráp trong
                            nước</strong> (Ví dụ: Honda Vision, Wave, AirBlade...).<br>
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-clipboard-check"></i> Giấy tờ cần chuẩn bị</div>
                    <ul class="checklist">
                        <li><strong>Thẻ CCCD gắn chip</strong> của chủ xe.</li>
                        <li><strong>Phiếu kiểm tra chất lượng xuất xưởng</strong> (Tờ giấy có viền hoa văn đỏ do Cửa
                            hàng bán xe đưa).</li>
                        <li><strong>Hóa đơn điện tử:</strong> Không cần in, nhưng phải nhớ Mã số hóa đơn để khai báo.
                        </li>
                        <li><strong>Chứng từ lệ phí trước bạ:</strong> Mã hồ sơ nộp thuế (Nộp qua App Ngân hàng hoặc
                            Momo).</li>
                    </ul>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-list-ol"></i> Quy trình 3 bước</div>
                    <div class="steps">
                        <div class="step-item">
                            <div class="step-num">1</div>
                            <div class="step-text"><strong>Nộp thuế & Khai hồ sơ:</strong> Đóng thuế trước bạ online.
                                Sau đó lên Cổng Dịch vụ công điền tờ khai đăng ký.</div>
                        </div>
                        <div class="step-item">
                            <div class="step-num">2</div>
                            <div class="step-text"><strong>Mang xe ra Phường:</strong> Đem xe + Hồ sơ gốc đến trụ sở để
                                cán bộ cà số khung, số máy.</div>
                        </div>
                        <div class="step-item">
                            <div class="step-num">3</div>
                            <div class="step-text"><strong>Bấm biển số:</strong> Bấm nút chọn biển ngẫu nhiên trên máy
                                tính và nhận giấy hẹn.</div>
                        </div>
                    </div>
                </div>
                <div class="btn-group" style="grid-template-columns: 1fr;">
                    <a href="https://dichvucong.bocongan.gov.vn" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i
                            class="fa-solid fa-globe"></i> Khai Đăng Ký Xe</a>
                </div>
            </div>
        </div>
        <div class="proc-card">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-file-contract"></i></div>
                    2. Bán Xe (Thu Hồi Biển)
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="tip-box tip-yellow">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <div>
                        Theo quy định <strong>Biển số định danh</strong>: Khi bán xe, bác phải giữ lại biển số và giấy
                        đăng ký (cà vẹt) để nộp lại cho Công an (gọi là thủ tục Thu hồi).<br>
                        <strong>Tuyệt đối không giao biển số cho người mua.</strong>
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-clipboard-list"></i> Hồ sơ nộp lại (Thu hồi)</div>
                    <ul class="checklist">
                        <li><strong>Giấy khai thu hồi</strong> (Kê khai trên Dịch vụ công).</li>
                        <li><strong>Giấy đăng ký xe (Cà vẹt)</strong> bản chính.</li>
                        <li><strong>2 Biển số xe</strong> (Trước và sau).</li>
                        <li><strong>Bản sao Hợp đồng mua bán xe</strong> (Công chứng).</li>
                    </ul>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-clock"></i> Thời hạn</div>
                    <p style="font-size: 0.9rem; margin: 0;">Phải làm thủ tục thu hồi trong vòng <strong>30
                            ngày</strong> kể từ khi bán xe. Quá hạn sẽ bị phạt từ 800k - 2 triệu đồng.</p>
                </div>
                <div class="btn-group">
                    <a href="#" class="btn btn-outline">Tải mẫu Thu hồi</a>
                    <a href="https://dichvucong.bocongan.gov.vn" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Nộp Hồ Sơ
                        Online</a>
                </div>
            </div>
        </div>
        <div class="footer-note">
            Cập nhật theo Thông tư 24/2023/TT-BCA về cấp, thu hồi đăng ký, biển số xe cơ giới.
        </div>
    </div>
    <script>
        function toggleCard(header) {
            const card = header.parentElement;
            const isActive = card.classList.toggle('active');
            header.setAttribute('aria-expanded', isActive);
        }
        function handleCardKeydown(event, header) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); 
                toggleCard(header);
            }
        }
    </script>
</body>
</html>
```

## modules\khieu-nai.html
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Khiếu Nại & Tố Cáo | CA Phường Phú Thọ</title>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <link rel="stylesheet" href="../styles/dvc-style.css">
</head>
<body class="dvc-page">
    <div class="dvc-header">
        <a href="../index.html" class="back-btn"><i class="fa-solid fa-arrow-left"></i></a>
        <div class="header-title">Khiếu Nại & Tố Cáo</div>
        <i class="fa-solid fa-scale-balanced"></i>
    </div>
    <div class="dvc-container">
        <div class="breadcrumb">
            <i class="fa-solid fa-house"></i> / Dịch vụ công / Khiếu nại - Tố cáo
        </div>
        <div class="proc-card active">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="true" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-file-circle-question"></i></div>
                    1. Khiếu Nại Quyết Định Hành Chính
                    <span class="badge badge-new">Phổ biến</span>
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="tip-box">
                    <i class="fa-solid fa-circle-info"></i>
                    <div>
                        <strong>Khi nào dùng?</strong> Khi công dân <strong>không đồng ý</strong> với quyết định xử phạt
                        (VD:
                        Phạt giao thông, phạt hành chính...) hoặc hành vi của cán bộ Công an đối với <strong>bản thân
                            mình</strong>.
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-clipboard-list"></i> Hồ sơ cần gửi</div>
                    <ul class="checklist">
                        <li><strong>Đơn khiếu nại:</strong> Ghi rõ ngày tháng, họ tên, địa chỉ và lý do không đồng ý.
                        </li>
                        <li><strong>Bằng chứng:</strong> Hình ảnh, video, giấy tờ chứng minh quyết định đó là sai.</li>
                        <li><strong>Giấy tờ tùy thân:</strong> Bản sao CCCD của người khiếu nại.</li>
                    </ul>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-user-shield"></i> Gửi cho ai?</div>
                    <p style="font-size: 0.9rem; margin: 0;">Gửi cho <strong>Trưởng Công an Phường</strong> (Nếu quyết
                        định do Công an Phường ra).<br>Trong vòng 10 ngày sẽ có thông báo thụ lý.</p>
                </div>
            </div>
        </div>
        <div class="proc-card">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-gavel"></i></div>
                    2. Tố Cáo Hành Vi Vi Phạm
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="tip-box" style="background: #FEF2F2; border-color: #DC2626; color: #991B1B;">
                    <i class="fa-solid fa-lock"></i>
                    <div>
                        <strong>Bảo mật danh tính:</strong> Thông tin người tố cáo được giữ <strong>bí mật tuyệt
                            đối</strong> theo Luật Tố cáo. Người dân yên tâm không bị lộ danh tính.
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title">Khi nào dùng?</div>
                    <p style="font-size: 0.9rem; margin: 0 0 10px 0;">Khi công dân phát hiện cán bộ, chiến sĩ có hành
                        vi:
                        Nhận hối lộ, sách nhiễu, gây phiền hà, vi phạm pháp luật...</p>
                    <div class="block-title"><i class="fa-solid fa-paper-plane"></i> Cách thức tố cáo</div>
                    <ul class="checklist">
                        <li><strong>Gửi đơn:</strong> Bỏ vào Hòm thư góp ý tại trụ sở hoặc gửi bưu điện.</li>
                        <li><strong>Trực tiếp:</strong> Đến phòng Tiếp dân gặp Lãnh đạo Công an phường.</li>
                        <li><strong>Nội dung:</strong> Phải ghi rõ họ tên người tố cáo (Đơn nặc danh thường khó được
                            giải quyết trừ khi có bằng chứng rất rõ ràng).</li>
                    </ul>
                </div>
                <div class="btn-group" style="grid-template-columns: 1fr;">
                    <a href="tel:02106288588" class="btn btn-primary"><i class="fa-solid fa-phone"></i> Gọi Đường Dây
                        Nóng</a>
                </div>
            </div>
        </div>
        <div class="proc-card">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-comments"></i></div>
                    3. Góp Ý (Thái độ phục vụ)
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="tip-box" style="background: #ECFDF5; border-color: #059669; color: #065F46;">
                    <i class="fa-regular fa-face-smile"></i>
                    <div>
                        Dành cho các vấn đề nhẹ nhàng hơn như: Thủ tục chậm, cán bộ hướng dẫn chưa kỹ, thái độ chưa niềm
                        nở...
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title">Kênh tiếp nhận nhanh</div>
                    <div class="steps">
                        <div class="step-item">
                            <div class="step-num">1</div>
                            <div class="step-text"><strong>Trực tiếp:</strong> Góp ý ngay với trực ban.</div>
                        </div>
                        <div class="step-item">
                            <div class="step-num">2</div>
                            <div class="step-text"><strong>Qua Zalo:</strong> Nhắn tin cho trang Zalo OA của Công an
                                Phường.</div>
                        </div>
                    </div>
                </div>
                <div class="btn-group" style="grid-template-columns: 1fr;">
                    <a href="https://www.facebook.com/488282367711287" target="_blank" rel="noopener noreferrer" class="btn btn-outline"><i
                            class="fa-brands fa-facebook"></i> Góp ý qua Fanpage</a>
                </div>
            </div>
        </div>
        <div class="footer-note">
            Căn cứ Luật Khiếu nại 2011, Luật Tố cáo 2018 và Thông tư 85/2020/TT-BCA.
        </div>
    </div>
    <script>
        function toggleCard(header) {
            const card = header.parentElement;
            const isActive = card.classList.toggle('active');
            header.setAttribute('aria-expanded', isActive);
        }
        function handleCardKeydown(event, header) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); 
                toggleCard(header);
            }
        }
    </script>
</body>
</html>
```

## modules\nguoi-nuoc-ngoai.html
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Người Nước Ngoài | CA Phường Phú Thọ</title>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <link rel="stylesheet" href="../styles/dvc-style.css">
    <style>
        .kbtt-banner {
            background: linear-gradient(135deg, #B91C1C 0%, #7F1D1D 100%);
            color: white;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 14px;
            box-shadow: 0 4px 15px rgba(185, 28, 28, 0.3);
            border: 2px solid #F59E0B;
        }
        .kbtt-banner-icon {
            width: 50px;
            height: 50px;
            background: rgba(255, 215, 0, 0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
            flex-shrink: 0;
            color: #FFD700;
        }
        .kbtt-banner h3 {
            margin: 0 0 4px 0;
            font-size: 1rem;
            font-weight: 700;
        }
        .kbtt-banner p {
            margin: 0;
            font-size: 0.85rem;
            opacity: 0.9;
        }
        .kbtt-detail-toggle {
            width: 100%;
            background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
            border: 2px solid #F59E0B;
            border-radius: 8px;
            padding: 12px 16px;
            font-family: inherit;
            font-size: 0.9rem;
            font-weight: 700;
            color: #92400E;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 12px;
            transition: all 0.3s ease;
        }
        .kbtt-detail-toggle:hover {
            background: linear-gradient(135deg, #FDE68A 0%, #FCD34D 100%);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }
        .kbtt-detail-toggle i {
            transition: transform 0.3s ease;
        }
        .kbtt-detail-toggle.open i {
            transform: rotate(180deg);
        }
        .kbtt-detail-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease;
        }
        .kbtt-detail-content.open {
            max-height: 3000px;
        }
        .ga-explain {
            background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%);
            border: 2px solid #22C55E;
            border-radius: 8px;
            padding: 16px;
            margin-top: 12px;
        }
        .ga-explain-title {
            font-size: 0.95rem;
            font-weight: 700;
            color: #15803D;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .ga-explain p {
            font-size: 0.88rem;
            color: #166534;
            margin: 0 0 10px 0;
            line-height: 1.6;
        }
        .ga-explain p:last-child {
            margin-bottom: 0;
        }
        .substep {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding: 10px 12px;
            background: white;
            border-radius: 6px;
            margin-bottom: 8px;
            border-left: 3px solid #22C55E;
        }
        .substep:last-child {
            margin-bottom: 0;
        }
        .substep-icon {
            width: 28px;
            height: 28px;
            background: #22C55E;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7rem;
            font-weight: 700;
            flex-shrink: 0;
        }
        .substep-text {
            font-size: 0.88rem;
            color: #374151;
            line-height: 1.5;
        }
        .substep-text strong {
            color: #15803D;
        }
        .kbtt-warning {
            background: #FEF2F2;
            border: 2px solid #EF4444;
            border-radius: 8px;
            padding: 12px 16px;
            margin-top: 12px;
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }
        .kbtt-warning i {
            color: #EF4444;
            font-size: 1.1rem;
            margin-top: 2px;
        }
        .kbtt-warning-text {
            font-size: 0.85rem;
            color: #991B1B;
            line-height: 1.5;
        }
        .pdf-links {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 16px;
        }
        @media (max-width: 480px) {
            .pdf-links {
                grid-template-columns: 1fr;
            }
        }
        .pdf-link {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px;
            background: white;
            border: 2px solid #E5E7EB;
            border-radius: 8px;
            text-decoration: none;
            color: #374151;
            font-size: 0.85rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .pdf-link:hover {
            border-color: #B91C1C;
            background: #FEF2F2;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(185, 28, 28, 0.15);
        }
        .pdf-link i {
            font-size: 1.3rem;
            color: #DC2626;
        }
        .step-highlight {
            background: linear-gradient(135deg, #FEF3C7, #FDE68A);
            border: 2px solid #F59E0B;
            border-radius: 8px;
            padding: 14px;
            margin-top: 8px;
        }
        .step-highlight .step-num {
            background: #F59E0B;
        }
    </style>
</head>
<body class="dvc-page">
    <div class="dvc-header">
        <a href="../index.html" class="back-btn"><i class="fa-solid fa-arrow-left"></i></a>
        <div class="header-title">Người Nước Ngoài & XNC</div>
        <i class="fa-solid fa-passport"></i>
    </div>
    <div class="dvc-container">
        <div class="breadcrumb">
            <i class="fa-solid fa-house"></i> / Dịch vụ công / Xuất nhập cảnh
        </div>
        <div class="kbtt-banner">
            <div class="kbtt-banner-icon">
                <i class="fa-solid fa-book-open-reader"></i>
            </div>
            <div>
                <h3>Hướng Dẫn Khai Báo Tạm Trú Người Nước Ngoài</h3>
                <p>Dành cho Cơ sở lưu trú — Thực hiện online, không cần ra Phường</p>
            </div>
        </div>
        <div class="proc-card active">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="true" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-earth-americas"></i></div>
                    1. Khai Báo Tạm Trú (Bắt Buộc)
                    <span class="badge badge-new">Ưu tiên</span>
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="tip-box" style="background: #FEF2F2; border-color: #DC2626; color: #991B1B;">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <div>
                        <strong>Quy định bắt buộc:</strong> Phải khai báo <strong>trong 12 giờ</strong> kể từ khi khách
                        nhận phòng.
                        Chậm trễ có thể bị phạt <strong>5 — 10 triệu đồng</strong> (Thông tư 53/2016/TT-BCA).
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-globe"></i> Bước 1: Truy cập hệ thống</div>
                    <div class="steps">
                        <div class="step-item">
                            <div class="step-num">1</div>
                            <div class="step-text">
                                Mở trình duyệt (Chrome, Safari, Cốc Cốc...) trên <strong>điện thoại hoặc máy
                                    tính</strong>.
                            </div>
                        </div>
                        <div class="step-item">
                            <div class="step-num">2</div>
                            <div class="step-text">
                                Gõ vào thanh địa chỉ: <strong style="color: #1D4ED8;">tbltkbtt.bocongan.gov.vn</strong>
                                <br><span style="font-size: 0.82rem; color: #6B7280;">💡 Hoặc quét mã QR trong tờ rơi
                                    hướng dẫn.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-right-to-bracket"></i> Bước 2: Đăng nhập tài khoản
                    </div>
                    <div class="steps">
                        <div class="step-item">
                            <div class="step-num">1</div>
                            <div class="step-text">Nhấn nút <strong>"Đăng nhập"</strong> trên trang web.</div>
                        </div>
                        <div class="step-item">
                            <div class="step-num">2</div>
                            <div class="step-text">
                                Nhập <strong>Tên đăng nhập</strong> + <strong>Mật khẩu</strong> đã đăng ký.
                                <br><span style="font-size: 0.82rem; color: #6B7280;">Nếu chưa có tài khoản → Nhấn "Đăng
                                    ký" để tạo mới.</span>
                            </div>
                        </div>
                        <div class="step-item">
                            <div class="step-num">3</div>
                            <div class="step-text">Nhập <strong>mã captcha</strong> (dãy ký tự trên hình) rồi nhấn
                                <strong>"Đăng nhập"</strong>.</div>
                        </div>
                    </div>
                </div>
                <div class="section-block step-highlight">
                    <div class="block-title" style="color: #92400E;"><i class="fa-solid fa-shield-halved"
                            style="color: #F59E0B;"></i> Bước 3 & 4: Xác thực bảo mật bằng Google Authenticator</div>
                    <div class="tip-box"
                        style="background: #FFFBEB; border-color: #F59E0B; color: #92400E; margin-bottom: 12px;">
                        <i class="fa-solid fa-lightbulb"></i>
                        <div>
                            <strong>Đây là bước BẮT BUỘC khi đăng nhập lần đầu.</strong> Hệ thống mới yêu cầu xác thực 2
                            lớp để bảo vệ
                            tài khoản của cơ sở lưu trú. Hãy đọc kỹ hướng dẫn bên dưới!
                        </div>
                    </div>
                    <div class="steps">
                        <div class="step-item">
                            <div class="step-num" style="background: #F59E0B;">3</div>
                            <div class="step-text">
                                <strong>Tải ứng dụng "Google Authenticator"</strong> về điện thoại:
                                <br>• Điện thoại <strong>iPhone</strong>: Mở <strong>App Store</strong> → tìm "Google
                                Authenticator" → Tải về
                                <br>• Điện thoại <strong>Android</strong>: Mở <strong>CH Play</strong> → tìm "Google
                                Authenticator" → Cài đặt
                            </div>
                        </div>
                        <div class="step-item">
                            <div class="step-num" style="background: #F59E0B;">4</div>
                            <div class="step-text">
                                <strong>Quét mã QR để xác thực:</strong>
                                <br>• Mở ứng dụng Google Authenticator trên điện thoại
                                <br>• Nhấn dấu <strong>+</strong> (góc dưới phải) → chọn <strong>"Quét mã QR"</strong>
                                <br>• Đưa camera điện thoại lên quét <strong>mã QR trên màn hình website</strong>
                                <br>• Ứng dụng sẽ hiện <strong>dãy 6 chữ số</strong> → Nhập dãy số này vào ô trên
                                website → Nhấn <strong>"Xác nhận"</strong>
                            </div>
                        </div>
                    </div>
                    <div class="kbtt-warning">
                        <i class="fa-solid fa-camera"></i>
                        <div class="kbtt-warning-text">
                            <strong>⚠️ RẤT QUAN TRỌNG:</strong> Hãy <strong>CHỤP ẢNH LẠI MÃ QR</strong> trên màn hình
                            website trước khi xác nhận!
                            Nếu đổi điện thoại hoặc xóa ứng dụng, bạn cần mã QR này để đăng nhập lại.
                        </div>
                    </div>
                    <button class="kbtt-detail-toggle" id="gaDetailToggle" onclick="toggleGADetail()">
                        <span><i class="fa-solid fa-circle-question"></i> &nbsp;Google Authenticator là gì? Ấn xem chi
                            tiết</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>
                    <div class="kbtt-detail-content" id="gaDetailContent">
                        <div class="ga-explain">
                            <div class="ga-explain-title">
                                <i class="fa-solid fa-lock"></i> Google Authenticator là gì?
                            </div>
                            <p>
                                Đây là <strong>ứng dụng BẢO MẬT MIỄN PHÍ</strong> của Google, giống như "ổ khóa thêm"
                                cho tài khoản của bạn.
                                Khi đăng nhập, ngoài mật khẩu, bạn cần nhập thêm <strong>mã số 6 chữ số</strong> từ ứng
                                dụng này.
                                Điều này giúp <strong>ngăn chặn người lạ</strong> đăng nhập vào tài khoản dù có biết mật
                                khẩu.
                            </p>
                            <p style="font-weight: 600; color: #15803D;">🔑 Nói đơn giản: Mật khẩu là chìa khóa thứ 1,
                                mã từ Google Authenticator là chìa khóa thứ 2.</p>
                            <div class="ga-explain-title" style="margin-top: 16px;">
                                <i class="fa-solid fa-mobile-screen-button"></i> Cách tải về điện thoại
                            </div>
                            <div class="substep">
                                <div class="substep-icon">1</div>
                                <div class="substep-text">
                                    Mở <strong>CH Play</strong> (Android) hoặc <strong>App Store</strong> (iPhone) trên
                                    điện thoại.
                                </div>
                            </div>
                            <div class="substep">
                                <div class="substep-icon">2</div>
                                <div class="substep-text">
                                    Gõ vào ô tìm kiếm: <strong>"Google Authenticator"</strong>
                                </div>
                            </div>
                            <div class="substep">
                                <div class="substep-icon">3</div>
                                <div class="substep-text">
                                    Nhấn <strong>"Cài đặt"</strong> (hoặc "Tải về") → đợi tải xong → mở ứng dụng.
                                </div>
                            </div>
                            <div class="ga-explain-title" style="margin-top: 16px;">
                                <i class="fa-solid fa-qrcode"></i> Cách sử dụng (Quét mã QR)
                            </div>
                            <div class="substep">
                                <div class="substep-icon">1</div>
                                <div class="substep-text">
                                    Mở ứng dụng <strong>Google Authenticator</strong> đã cài trên điện thoại.
                                </div>
                            </div>
                            <div class="substep">
                                <div class="substep-icon">2</div>
                                <div class="substep-text">
                                    Nhấn vào dấu <strong>+ (dấu cộng)</strong> ở góc dưới bên phải màn hình.
                                </div>
                            </div>
                            <div class="substep">
                                <div class="substep-icon">3</div>
                                <div class="substep-text">
                                    Chọn <strong>"Quét mã QR"</strong> → Camera mở lên → <strong>Đưa camera vào mã
                                        QR</strong> trên màn hình website.
                                </div>
                            </div>
                            <div class="substep">
                                <div class="substep-icon">4</div>
                                <div class="substep-text">
                                    Sau khi quét xong, ứng dụng sẽ hiện lên <strong>dãy 6 chữ số</strong> (ví dụ:
                                    <strong style="color: #B91C1C;">482 195</strong>).
                                    Dãy số này sẽ <strong>tự đổi mỗi 30 giây</strong>.
                                </div>
                            </div>
                            <div class="substep">
                                <div class="substep-icon">5</div>
                                <div class="substep-text">
                                    Quay lại website → <strong>Gõ 6 số</strong> vào ô yêu cầu → Nhấn <strong>"Xác
                                        nhận"</strong>. Hoàn tất!
                                </div>
                            </div>
                            <div class="ga-explain-title" style="margin-top: 16px;">
                                <i class="fa-solid fa-triangle-exclamation" style="color: #EF4444;"></i>
                                <span style="color: #B91C1C;">Lưu ý CỰC KỲ QUAN TRỌNG</span>
                            </div>
                            <p style="color: #991B1B; font-weight: 500;">
                                ❶ Mã 6 số thay đổi <strong>mỗi 30 giây</strong>. Nếu nhập chậm, hãy đợi mã mới rồi nhập
                                lại.
                            </p>
                            <p style="color: #991B1B; font-weight: 500;">
                                ❷ <strong>PHẢI CHỤP LẠI MÃ QR</strong> và lưu vào ảnh điện thoại. Nếu mất điện thoại
                                hoặc xóa ứng dụng, bạn cần mã QR này để khôi phục.
                            </p>
                            <p style="color: #991B1B; font-weight: 500;">
                                ❸ Mỗi tài khoản chỉ cần quét mã QR <strong>MỘT LẦN DUY NHẤT</strong> (lần đăng nhập đầu
                                tiên). Các lần sau chỉ cần mở ứng dụng và nhập 6 số.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-pen-to-square"></i> Bước 5: Cập nhật thông tin Cơ sở
                        lưu trú</div>
                    <div class="steps">
                        <div class="step-item">
                            <div class="step-num">1</div>
                            <div class="step-text">
                                Sau khi đăng nhập thành công, hệ thống yêu cầu <strong>cập nhật thông tin</strong> còn
                                thiếu (nếu tài khoản đã có từ hệ thống cũ).
                            </div>
                        </div>
                        <div class="step-item">
                            <div class="step-num">2</div>
                            <div class="step-text">
                                Bổ sung đầy đủ thông tin và <strong>tải lên ảnh Căn cước công dân (CCCD)</strong> còn
                                thời hạn → Nhấn <strong>"Lưu thông tin"</strong>.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-passport"></i> Bước 6: Nhập hồ sơ khai báo tạm trú
                    </div>
                    <div class="steps">
                        <div class="step-item">
                            <div class="step-num">1</div>
                            <div class="step-text">
                                Tại trang quản lý, chọn chức năng <strong>"Khai báo tạm trú"</strong>.
                            </div>
                        </div>
                        <div class="step-item">
                            <div class="step-num">2</div>
                            <div class="step-text">
                                <strong>Chụp ảnh trang hộ chiếu</strong> của khách nước ngoài rồi tải lên (upload).
                                <br><span style="font-size: 0.82rem; color: #059669;">✨ Hệ thống tự động đọc và điền
                                    thông tin từ ảnh hộ chiếu!</span>
                            </div>
                        </div>
                        <div class="step-item">
                            <div class="step-num">3</div>
                            <div class="step-text">
                                <strong>Kiểm tra lại</strong> các thông tin đã được tự động điền. Bổ sung các ô có dấu
                                <strong>*</strong> (bắt buộc).
                            </div>
                        </div>
                        <div class="step-item">
                            <div class="step-num">4</div>
                            <div class="step-text">
                                Nhấn <strong>"Lưu thông tin"</strong> → Hoàn tất khai báo!
                                <br><span style="font-size: 0.82rem; color: #6B7280;">💡 Nếu có nhiều khách, nhấn "Thêm
                                    hồ sơ khác" để nhập tiếp.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-group" style="grid-template-columns: 1fr;">
                    <a href="https://tbltkbtt.bocongan.gov.vn/" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i
                            class="fa-solid fa-globe"></i> Vào Trang Khai Báo Ngay</a>
                </div>
                <div class="pdf-links">
                    <a href="../TOROI_HD_KBTT.pdf" target="_blank" rel="noopener noreferrer" class="pdf-link">
                        <i class="fa-solid fa-file-pdf"></i>
                        <span>Xem Tờ rơi<br>hướng dẫn nhanh</span>
                    </a>
                    <a href="../KBTT_HD_Trang_CSLT_v2.0.pdf" target="_blank" rel="noopener noreferrer" class="pdf-link">
                        <i class="fa-solid fa-file-pdf"></i>
                        <span>Xem Hướng dẫn<br>chi tiết đầy đủ</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="proc-card">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-id-card"></i></div>
                    2. Trình Báo Mất Hộ Chiếu
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="tip-box">
                    <i class="fa-solid fa-circle-info"></i>
                    <div>
                        Áp dụng cho cả Công dân Việt Nam và Người nước ngoài bị mất hộ chiếu tại địa phương.
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-clipboard-list"></i> Quy trình tại Công an Phường
                    </div>
                    <ul class="checklist">
                        <li><strong>Bước 1:</strong> Đến trụ sở Công an Phường trình báo ngay khi phát hiện mất.</li>
                        <li><strong>Bước 2:</strong> Điền "Đơn trình báo mất tài sản/hộ chiếu" (Mẫu TK05).</li>
                        <li><strong>Bước 3:</strong> Cán bộ xác nhận, đóng dấu vào đơn.</li>
                        <li><strong>Bước 4:</strong> Dùng đơn này để xin cấp lại hộ chiếu mới (Tại Phòng XNC Tỉnh hoặc
                            Đại sứ quán).</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="proc-card">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-briefcase"></i></div>
                    3. Trình Báo Mất Thẻ Doanh Nhân APEC (ABTC)
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="tip-box" style="background: #FFFBEB; border-color: #F59E0B; color: #92400E;">
                    <i class="fa-solid fa-bell"></i>
                    <div>
                        Việc trình báo giúp hủy giá trị sử dụng của thẻ bị mất, tránh bị kẻ xấu lợi dụng danh nghĩa
                        doanh nhân.
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-list-ol"></i> Các bước thực hiện</div>
                    <div class="steps">
                        <div class="step-item">
                            <div class="step-num">1</div>
                            <div class="step-text"><strong>Chuẩn bị:</strong> Tờ khai trình báo mất thẻ ABTC (Mẫu X08) +
                                CCCD/Hộ chiếu.</div>
                        </div>
                        <div class="step-item">
                            <div class="step-num">2</div>
                            <div class="step-text"><strong>Nộp hồ sơ:</strong> Tại Công an Phường hoặc Cục Quản lý XNC.
                            </div>
                        </div>
                        <div class="step-item">
                            <div class="step-num">3</div>
                            <div class="step-text"><strong>Nhận kết quả:</strong> Thông báo về việc đã tiếp nhận đơn
                                trình báo.</div>
                        </div>
                    </div>
                </div>
                <div class="btn-group">
                    <a href="#" class="btn btn-outline">Tải mẫu đơn X08</a>
                </div>
            </div>
        </div>
        <div class="proc-card">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-ticket"></i></div>
                    4. Trình Báo Mất Giấy Thông Hành
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="section-block">
                    <div class="block-title">Quy định</div>
                    <p style="font-size: 0.9rem; margin-bottom: 10px;">
                        Người dân biên giới hoặc người du lịch sử dụng Giấy thông hành nếu bị mất phải trình báo ngay để
                        cơ quan chức năng hủy giá trị.
                    </p>
                    <ul class="checklist">
                        <li><strong>Thẩm quyền:</strong> Công an xã/phường nơi bị mất giấy.</li>
                        <li><strong>Thời hạn:</strong> Trong vòng 48 giờ kể từ khi phát hiện mất.</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="proc-card">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-address-card"></i></div>
                    5. Hướng Dẫn Xin Cấp Thẻ Tạm Trú
                    <span class="badge badge-info">Làm tại Tỉnh</span>
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="tip-box">
                    <i class="fa-solid fa-circle-info"></i>
                    <div>
                        <strong>Lưu ý:</strong> Công an Phường <strong>KHÔNG</strong> cấp thẻ này. Đây là hướng dẫn để
                        công dân chuẩn bị hồ sơ trước khi lên <strong>Phòng Quản lý XNC Công an Tỉnh Phú Thọ</strong>.
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-folder-open"></i> Hồ sơ cơ bản cần có</div>
                    <ul class="checklist">
                        <li><strong>Văn bản đề nghị:</strong> Mẫu NA6 (Cơ quan/Doanh nghiệp bảo lãnh) hoặc NA7 (Cá nhân
                            bảo lãnh).</li>
                        <li><strong>Tờ khai thông tin:</strong> Mẫu NA8 (Có dán ảnh).</li>
                        <li><strong>Hộ chiếu:</strong> Bản gốc và còn thời hạn.</li>
                        <li><strong>Giấy tờ chứng minh:</strong> Giấy phép lao động, Giấy Đăng ký kết hôn, Giấy khai
                            sinh... (Tùy trường hợp).</li>
                        <li><strong>Xác nhận tạm trú:</strong> (Đã khai báo online ở Mục 1).</li>
                    </ul>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-location-dot"></i> Nơi nộp hồ sơ</div>
                    <p style="font-size: 0.9rem; margin: 0;">
                        <strong>Phòng Quản lý Xuất nhập cảnh - Công an tỉnh Phú Thọ</strong><br>
                        (Địa chỉ: Trụ sở Công an thành phố Việt Trì (cũ))
                    </p>
                </div>
            </div>
        </div>
        <div class="footer-note">
            Căn cứ Luật Nhập cảnh, xuất cảnh, quá cảnh, cư trú của người nước ngoài tại Việt Nam.
        </div>
    </div>
    <script>
        function toggleCard(header) {
            const card = header.parentElement;
            const isActive = card.classList.toggle('active');
            header.setAttribute('aria-expanded', isActive);
        }
        function handleCardKeydown(event, header) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); 
                toggleCard(header);
            }
        }
        function toggleGADetail() {
            const btn = document.getElementById('gaDetailToggle');
            const content = document.getElementById('gaDetailContent');
            btn.classList.toggle('open');
            content.classList.toggle('open');
            const span = btn.querySelector('span');
            if (content.classList.contains('open')) {
                span.innerHTML = '<i class="fa-solid fa-circle-check"></i> &nbsp;Thu gọn hướng dẫn Google Authenticator';
            } else {
                span.innerHTML = '<i class="fa-solid fa-circle-question"></i> &nbsp;Google Authenticator là gì? Ấn xem chi tiết';
            }
        }
    </script>
</body>
</html>
```

## modules\vu-khi.html
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Vũ Khí & Pháo | CA Phường Phú Thọ</title>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <link rel="stylesheet" href="../styles/dvc-style.css">
</head>
<body class="dvc-page">
    <div class="dvc-header">
        <a href="../index.html" class="back-btn"><i class="fa-solid fa-arrow-left"></i></a>
        <div class="header-title">Vũ Khí & Pháo</div>
        <i class="fa-solid fa-person-military-rifle"></i>
    </div>
    <div class="dvc-container">
        <div class="breadcrumb">
            <i class="fa-solid fa-house"></i> / Dịch vụ công / Vũ khí & Pháo
        </div>
        <div class="proc-card active">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="true" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-hand-holding-heart"></i></div>
                    1. Giao Nộp Vũ Khí (Tự Nguyện)
                    <span class="badge badge-new">Ưu tiên</span>
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="tip-box" style="background: #ECFDF5; border-color: #059669; color: #065F46;">
                    <i class="fa-solid fa-shield-halved"></i>
                    <div>
                        <strong>Chính sách khoan hồng:</strong> Công dân tự giác giao nộp vũ khí, vật liệu nổ sẽ
                        <strong>không bị xử lý trách nhiệm</strong> và được hoan nghênh.
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-triangle-exclamation"></i> Các loại cần giao nộp ngay
                    </div>
                    <ul class="checklist">
                        <li><strong>Vũ khí thô sơ:</strong> Dao, kiếm, mã tấu, giáo, mác... (tự chế hoặc có sẵn).</li>
                        <li><strong>Vũ khí tự chế:</strong> Súng cồn, súng bắn bi, súng hơi...</li>
                        <li><strong>Công cụ hỗ trợ:</strong> Gậy cao su, bình xịt hơi cay, dùi cui điện... (nhặt được
                            hoặc mua trôi nổi).</li>
                        <li><strong>Pháo:</strong> Các loại pháo nổ, pháo bi (trừ pháo hoa Bộ Quốc phòng).</li>
                    </ul>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-person-walking-arrow-right"></i> Cách thức giao nộp
                    </div>
                    <div class="steps">
                        <div class="step-item">
                            <div class="step-num">1</div>
                            <div class="step-text"><strong>Mang đến trụ sở:</strong> Đem trực tiếp đến Công an phường
                                (24/7). Sẽ có cán bộ tiếp nhận kín đáo.</div>
                        </div>
                        <div class="step-item">
                            <div class="step-num">2</div>
                            <div class="step-text"><strong>Gọi điện (Nếu nguy hiểm):</strong> Nếu là bom, mìn, đạn dược
                                cũ → <strong>Tuyệt đối không tự ý di chuyển</strong>. Hãy gọi ngay cho Công an phường để
                                cán bộ xuống thu gom.</div>
                        </div>
                    </div>
                </div>
                <div class="btn-group" style="grid-template-columns: 1fr;">
                    <a href="tel:02106288588" class="btn btn-primary"><i class="fa-solid fa-phone"></i> Gọi Trực Ban Thu
                        Gom</a>
                </div>
            </div>
        </div>
        <div class="proc-card">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-scroll"></i></div>
                    2. Khai Báo Vũ Khí (Đồ Gia Bảo)
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="tip-box">
                    <i class="fa-solid fa-circle-info"></i>
                    <div>
                        <strong>Ai cần làm?</strong> Cá nhân sở hữu gươm, giáo, mác... là hiện vật trưng bày, đồ gia bảo
                        (đồ thờ cúng, di vật ông cha để lại) phải khai báo để được pháp luật bảo vệ.
                    </div>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-clipboard-list"></i> Hồ sơ & Thủ tục</div>
                    <ul class="checklist">
                        <li><strong>Bản kê khai:</strong> Kê khai số lượng, chủng loại, nguồn gốc (VD: Đồ ông nội để
                            lại).</li>
                        <li><strong>Ảnh chụp:</strong> Chụp ảnh rõ nét hiện vật.</li>
                        <li><strong>Nơi nộp:</strong> Nộp hồ sơ trực tiếp tại Công an phường hoặc qua Cổng dịch vụ công.
                        </li>
                    </ul>
                </div>
                <div class="section-block">
                    <div class="block-title"><i class="fa-solid fa-check-to-slot"></i> Kết quả</div>
                    <p style="font-size: 0.9rem; margin: 0;">Sau khi kiểm tra, Công an sẽ cấp <strong>Giấy xác nhận đăng
                            ký</strong>. Việc sở hữu này là hợp pháp.</p>
                </div>
                <div class="btn-group" style="grid-template-columns: 1fr;">
                    <a href="https://dichvucong.bocongan.gov.vn" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i
                            class="fa-solid fa-globe"></i> Khai Báo Online</a>
                </div>
            </div>
        </div>
        <div class="proc-card">
            <div class="proc-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="handleCardKeydown(event, this)">
                <div class="proc-title">
                    <div class="proc-icon"><i class="fa-solid fa-user-secret"></i></div>
                    3. Tố Giác Vi Phạm (Bảo Mật)
                </div>
                <i class="fa-solid fa-chevron-down chevron"></i>
            </div>
            <div class="proc-content">
                <div class="section-block">
                    <div class="block-title">Hành vi cần tố giác</div>
                    <ul class="checklist">
                        <li>Đốt pháo nổ trái phép trong khu dân cư.</li>
                        <li>Tàng trữ, buôn bán pháo lậu.</li>
                        <li>Chế tạo súng cồn, vũ khí tự chế.</li>
                        <li>Mang dao kiếm tụ tập gây rối.</li>
                    </ul>
                </div>
                <div class="tip-box" style="background: #FEF2F2; border-color: #DC2626; color: #991B1B;">
                    <i class="fa-solid fa-lock"></i>
                    <div>Thông tin người tố giác được <strong>bảo mật tuyệt đối</strong>.</div>
                </div>
                <div class="btn-group">
                    <a href="https://www.facebook.com/488282367711287" target="_blank" rel="noopener noreferrer" class="btn btn-outline"><i
                            class="fa-brands fa-facebook"></i> Nhắn tin Fanpage</a>
                    <a href="tel:02106288588" class="btn btn-primary"><i class="fa-solid fa-phone"></i> Gọi Ngay</a>
                </div>
            </div>
        </div>
        <div class="footer-note">
            Căn cứ Luật Quản lý, sử dụng vũ khí, vật liệu nổ và công cụ hỗ trợ 2024.
        </div>
    </div>
    <script>
        function toggleCard(header) {
            const card = header.parentElement;
            const isActive = card.classList.toggle('active');
            header.setAttribute('aria-expanded', isActive);
        }
        function handleCardKeydown(event, header) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); 
                toggleCard(header);
            }
        }
    </script>
</body>
</html>
```

## styles\dvc-style.css
```css

:root {
    --dvc-red: #B91C1C;
    --dvc-red-light: #FEF2F2;
    --dvc-yellow: #F59E0B;
    --dvc-blue: #1D4ED8;
    --dvc-green: #059669;
    --text-main: #374151;
    --text-light: #6B7280;
    --bg-body: #F3F4F6;
    --white: #FFFFFF;
    --radius: 8px;
}
* {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}
body.dvc-page {
    font-family: 'Be Vietnam Pro', sans-serif;
    background: var(--bg-body);
    color: var(--text-main);
    margin: 0;
    line-height: 1.5;
    padding-bottom: 40px;
}
.dvc-header {
    background: var(--dvc-red);
    color: white;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}
.back-btn {
    color: white;
    font-size: 1.2rem;
    margin-right: 16px;
    text-decoration: none;
}
.header-title {
    font-size: 1.1rem;
    font-weight: 700;
    text-transform: uppercase;
    flex: 1;
}
.dvc-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 16px;
}
.breadcrumb {
    font-size: 0.85rem;
    color: var(--text-light);
    margin-bottom: 16px;
    background: white;
    padding: 8px 12px;
    border-radius: var(--radius);
    display: inline-block;
    border: 1px solid #E5E7EB;
}
.proc-card {
    background: var(--white);
    border-radius: var(--radius);
    margin-bottom: 16px;
    border: 1px solid #E5E7EB;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}
.proc-header {
    padding: 16px;
    background: var(--white);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid transparent;
}
.proc-card.active .proc-header {
    border-bottom: 1px solid #E5E7EB;
    background: var(--dvc-red-light);
}
.proc-title {
    font-weight: 700;
    color: var(--dvc-red);
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}
.proc-icon {
    width: 32px;
    height: 32px;
    background: #FEE2E2;
    color: var(--dvc-red);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
}
.chevron {
    color: var(--text-light);
    transition: transform 0.3s;
}
.proc-card.active .chevron {
    transform: rotate(180deg);
}
.proc-content {
    padding: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease-out;
    background: #FAFAFA;
}
.proc-card.active .proc-content {
    padding: 16px;
    max-height: 8000px;
    transition: max-height 0.5s ease-in;
}
.section-block {
    margin-bottom: 20px;
    background: white;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #F3F4F6;
}
.block-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.block-title i {
    color: var(--dvc-yellow);
}
.checklist {
    list-style: none;
    padding: 0;
    margin: 0;
}
.checklist li {
    position: relative;
    padding-left: 24px;
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: #4B5563;
}
.checklist li::before {
    content: "\f00c";
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    position: absolute;
    left: 0;
    top: 2px;
    color: var(--dvc-red);
    font-size: 0.8rem;
}
.tip-box {
    background: #EFF6FF;
    border-left: 4px solid var(--dvc-blue);
    padding: 10px 14px;
    font-size: 0.85rem;
    color: #1E40AF;
    border-radius: 4px;
    margin-bottom: 16px;
    display: flex;
    gap: 10px;
}
.tip-box.tip-green {
    background: #ECFDF5;
    border-color: var(--dvc-green);
    color: #065F46;
}
.tip-box.tip-yellow {
    background: #FFFBEB;
    border-color: var(--dvc-yellow);
    color: #92400E;
}
.steps {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 10px;
}
.step-item {
    display: flex;
    gap: 12px;
    padding-bottom: 16px;
    position: relative;
}
.step-item:last-child {
    padding-bottom: 0;
}
.step-item:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 11px;
    top: 24px;
    bottom: 0;
    width: 2px;
    background: #E5E7EB;
}
.step-num {
    width: 24px;
    height: 24px;
    background: var(--dvc-red);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
    z-index: 1;
}
.step-text {
    font-size: 0.9rem;
}
.btn-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 16px;
}
.btn {
    padding: 10px;
    border-radius: 6px;
    text-align: center;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
}
.btn-primary {
    background: var(--dvc-red);
    color: white;
    border: 1px solid var(--dvc-red);
    box-shadow: 0 2px 5px rgba(185, 28, 28, 0.3);
}
.btn-primary:hover {
    background: #991B1B;
}
.btn-outline {
    background: white;
    color: var(--dvc-red);
    border: 1px solid var(--dvc-red);
}
.btn-outline:hover {
    background: var(--dvc-red-light);
}
.btn:active {
    transform: scale(0.98);
}
.badge {
    display: inline-block;
    padding: 2px 8px;
    font-size: 0.7rem;
    font-weight: 600;
    border-radius: 10px;
    margin-left: 8px;
}
.badge-new {
    background: #DC2626;
    color: white;
}
.badge-fee {
    background: #FEF3C7;
    color: #D97706;
    border: 1px solid #FCD34D;
}
.badge-info {
    background: #DBEAFE;
    color: #1E40AF;
}
.footer-note {
    text-align: center;
    font-size: 0.8rem;
    color: var(--text-light);
    margin-top: 20px;
}
@media (max-width: 480px) {
    .btn-group {
        grid-template-columns: 1fr;
    }
    .proc-title {
        font-size: 0.9rem;
    }
    .badge {
        display: block;
        margin: 6px 0 0 42px;
    }
}
```

