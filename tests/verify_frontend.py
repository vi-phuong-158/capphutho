
from playwright.sync_api import sync_playwright
import os

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load local index.html
        file_path = os.path.abspath("index.html")
        page.goto(f"file://{file_path}")

        # 1. Open Chat
        print("Clicking chat launcher...")
        page.click(".chat-launcher")
        page.wait_for_timeout(500) # Wait for animation

        # 2. Verify Aria Expanded
        expanded = page.get_attribute(".chat-launcher", "aria-expanded")
        print(f"Aria-expanded: {expanded}")

        # 3. Verify Focus
        focused_id = page.evaluate("document.activeElement.id")
        print(f"Focused Element ID: {focused_id}")

        # 4. Take Screenshot
        if not os.path.exists("verification"):
            os.makedirs("verification")

        screenshot_path = "verification/chat_open.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    run_verification()
