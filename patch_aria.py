with open("index.html", "r", encoding="utf-8") as f:
    text = f.read()

search1 = '<img src="Icon.png" alt="Chatbot Icon">'
replace1 = '<img src="Icon.png" alt="" aria-hidden="true">'
text = text.replace(search1, replace1)

search2 = '<button class="close-chat" onclick="toggleChat()" aria-label="Đóng hộp thoại chat">&times;</button>'
replace2 = '<button class="close-chat" onclick="toggleChat()" aria-label="Đóng hộp thoại chat"><span aria-hidden="true">&times;</span></button>'
text = text.replace(search2, replace2)

search3 = """<button class="send-btn" id="chatSendBtn" aria-label="Gửi tin nhắn">
                <i class="fa-solid fa-paper-plane"></i>
            </button>"""
replace3 = """<button class="send-btn" id="chatSendBtn" aria-label="Gửi tin nhắn">
                <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
            </button>"""
text = text.replace(search3, replace3)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated index.html ARIA attributes")
