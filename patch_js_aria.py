import re

with open("js/chatbot.js", "r", encoding="utf-8") as f:
    text = f.read()

# Replace:
# const icon = document.createElement('i');
# icon.className = iconClass;
search_str = """const icon = document.createElement('i');
        icon.className = iconClass;"""

replace_str = """const icon = document.createElement('i');
        icon.className = iconClass;
        icon.setAttribute('aria-hidden', 'true');"""

if search_str in text:
    text = text.replace(search_str, replace_str)
    with open("js/chatbot.js", "w", encoding="utf-8") as f:
        f.write(text)
    print("Updated js/chatbot.js ARIA attributes")
else:
    print("Not found in js/chatbot.js")
