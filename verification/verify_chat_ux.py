from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        # 1. Screenshot initial state
        page.screenshot(path="verification/1_initial.png")

        # 2. Open Chat
        page.click(".chat-launcher")
        page.wait_for_timeout(200) # Wait for animation and focus

        # Verify focus
        focused_id = page.evaluate("document.activeElement.id")
        print(f"Focused element ID: {focused_id}")

        # Highlight focused element for screenshot
        page.evaluate("document.activeElement.style.border = '4px solid blue'")

        page.screenshot(path="verification/2_chat_open_focused.png")

        # 3. Close Chat
        page.click(".chat-launcher")
        page.wait_for_timeout(200)

        # Verify focus return
        focused_class = page.evaluate("document.activeElement.className")
        print(f"Focused element Class: {focused_class}")

        page.evaluate("document.activeElement.style.border = '4px solid green'")
        page.screenshot(path="verification/3_chat_closed_focused.png")

if __name__ == "__main__":
    run()
