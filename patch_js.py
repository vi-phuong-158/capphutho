with open("js/chatbot.js", "r", encoding="utf-8") as f:
    text = f.read()

search = """        // Securely create elements to prevent XSS
        const icon = document.createElement('i');
        icon.className = iconClass;

        btn.appendChild(icon);"""

replace = """        // Securely create elements to prevent XSS
        const icon = document.createElement('i');
        icon.className = iconClass;
        icon.setAttribute('aria-hidden', 'true');

        btn.appendChild(icon);"""

text = text.replace(search, replace)

search2 = """            const iconWrap = document.createElement('div');
            iconWrap.className = 'search-result-icon';
            const icon = document.createElement('i');

            const contentWrap = document.createElement('div');"""

replace2 = """            const iconWrap = document.createElement('div');
            iconWrap.className = 'search-result-icon';
            const icon = document.createElement('i');
            icon.setAttribute('aria-hidden', 'true');

            const contentWrap = document.createElement('div');"""

text = text.replace(search2, replace2)

with open("js/chatbot.js", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated js/chatbot.js")
