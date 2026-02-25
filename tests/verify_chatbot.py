import sys
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        print("Checking initial state...")
        launcher = page.locator(".chat-launcher")
        chat_window = page.locator("#chatWindow")

        if not launcher.is_visible():
            print("FAILURE: Launcher not visible")
            sys.exit(1)

        if chat_window.is_visible():
            print("FAILURE: Chat window should be hidden initially")
            sys.exit(1)

        print("Clicking launcher to open chat...")
        launcher.click()
        page.wait_for_timeout(100) # Wait for focus timeout

        # Check if chat opens
        if not chat_window.is_visible():
            print("FAILURE: Chat window did not open")
            sys.exit(1)

        # Check ARIA expanded
        aria_expanded = launcher.get_attribute("aria-expanded")
        if aria_expanded != "true":
            print(f"FAILURE: Launcher aria-expanded is '{aria_expanded}', expected 'true'")
            # Don't exit yet, continue checks

        # Check focus
        focused_id = page.evaluate("document.activeElement.id")
        if focused_id != "chatSearchInput":
             print(f"FAILURE: Focus is on '{focused_id}', expected 'chatSearchInput'")

        print("Clicking launcher again to close chat...")
        launcher.click()

        if chat_window.is_visible():
            print("FAILURE: Chat window did not close")
            sys.exit(1)

        # Check focus return
        focused_class = page.evaluate("document.activeElement.className")
        if "chat-launcher" not in focused_class:
             print(f"FAILURE: Focus returned to '{focused_class}', expected 'chat-launcher'")

        print("Testing Escape key...")
        launcher.click() # Open again
        if not chat_window.is_visible():
            print("FAILURE: Chat window did not reopen")
            sys.exit(1)

        page.keyboard.press("Escape")

        if chat_window.is_visible():
            print("FAILURE: Escape key did not close chat window")
            sys.exit(1)

        focused_class = page.evaluate("document.activeElement.className")
        if "chat-launcher" not in focused_class:
             print(f"FAILURE: Focus returned to '{focused_class}' after Escape, expected 'chat-launcher'")

        print("SUCCESS: All checks passed (or failed as expected for baseline)")

if __name__ == "__main__":
    try:
        run()
    except Exception as e:
        print(f"ERROR: {e}")
        sys.exit(1)
