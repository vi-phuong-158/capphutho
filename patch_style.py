with open("index.html", "r", encoding="utf-8") as f:
    text = f.read()

# find exact block
search_block = """        .send-btn {
            color: #ce1908;
            font-size: 18px;
            background: none;
            border: none;
            cursor: pointer;
        }"""

start_idx = text.find(search_block)

if start_idx != -1:
    end_of_block = start_idx + len(search_block)

    # Check if we already injected our fix
    if "/* ===== ACCESSIBILITY ===== */" in text[end_of_block:end_of_block+200]:
        print("Already injected")
    else:
        injection = """

        /* ===== ACCESSIBILITY ===== */
        :focus-visible {
            outline: 3px solid var(--accent, #FFD700);
            outline-offset: 2px;
            border-radius: 4px;
        }

        .card:focus-visible,
        .search-input:focus-visible,
        .chat-input:focus-visible,
        .option-btn:focus-visible,
        button:focus-visible,
        .elder-mode-toggle:focus-visible,
        .chat-launcher:focus-visible {
            outline: 3px solid var(--accent);
            outline-offset: 2px;
        }

        .chat-launcher:focus-visible {
            border-radius: 50%;
            outline-offset: 10px;
        }

        .elder-mode-toggle:focus-visible {
            outline: 3px solid var(--primary-dark);
            outline-offset: 4px;
        }"""

        new_text = text[:end_of_block] + injection + text[end_of_block:]
        with open("index.html", "w", encoding="utf-8") as f:
            f.write(new_text)
        print("Success! Injected.")
else:
    print("Not found block.")
