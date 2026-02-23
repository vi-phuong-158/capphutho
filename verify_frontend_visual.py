
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load local index.html
        cwd = os.getcwd()
        file_url = f"file://{cwd}/index.html"
        page.goto(file_url)

        # Open Chatbot
        page.click(".chat-launcher")
        page.wait_for_selector("#chatWindow", state="visible")

        # Type message
        page.fill("#chatSearchInput", "xin chao")

        # Take screenshot BEFORE clicking
        page.screenshot(path="verification/before_click.png")

        # Click Send
        page.click("#chatSendBtn")

        # Wait for user message bubble
        page.wait_for_selector(".user-message")

        # Take screenshot AFTER clicking
        page.screenshot(path="verification/after_click.png")

        print("Screenshots saved to verification/")
        browser.close()

if __name__ == "__main__":
    run()
