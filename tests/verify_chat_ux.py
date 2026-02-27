
from playwright.sync_api import sync_playwright
import os

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the local index.html file
        file_path = os.path.abspath("index.html")
        page.goto(f"file://{file_path}")

        # 1. Verify initial state
        launcher = page.locator(".chat-launcher")
        chat_window = page.locator("#chatWindow")

        print(f"Initial chat window visible: {chat_window.is_visible()}")

        # Check aria-expanded on launcher (should be present and false initially, or missing)
        aria_expanded = launcher.get_attribute("aria-expanded")
        print(f"Launcher aria-expanded initial: {aria_expanded}")

        # 2. Click to open
        launcher.click()
        page.wait_for_timeout(500) # Wait for animation/js

        print(f"Chat window visible after click: {chat_window.is_visible()}")

        # Check focus - should be on input
        focused_element = page.evaluate("document.activeElement.id")
        print(f"Focused element ID after open: {focused_element}")

        # Check aria-expanded
        aria_expanded = launcher.get_attribute("aria-expanded")
        print(f"Launcher aria-expanded after open: {aria_expanded}")

        # 3. Press Escape to close
        page.keyboard.press("Escape")
        page.wait_for_timeout(500)

        print(f"Chat window visible after Escape: {chat_window.is_visible()}")

        # 4. Check focus restoration
        focused_element = page.evaluate("document.activeElement.className")
        print(f"Focused element class after close: {focused_element}")

        browser.close()

if __name__ == "__main__":
    run_test()
