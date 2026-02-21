
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Abort font requests to prevent timeout
    page.route("**/*.woff2", lambda route: route.abort())
    page.route("**/*.woff", lambda route: route.abort())
    page.route("**/*.ttf", lambda route: route.abort())
    page.route("**/css2?family=*", lambda route: route.abort())

    try:
        print("Navigating to http://0.0.0.0:3000")
        page.goto("http://0.0.0.0:3000")

        # Open chat
        print("Opening chat...")
        page.click(".chat-launcher")
        page.wait_for_selector("#chatWindow", state="visible")

        # Check initial options
        page.wait_for_selector(".option-btn")
        buttons = page.query_selector_all(".option-btn")
        print(f"Initial buttons: {len(buttons)}")

        if len(buttons) < 5:
             raise Exception("Not enough buttons in main menu")

        # Click a category (e.g., Cư trú)
        print("Clicking 'Cư trú'...")
        # Need to handle encoding or just pick the first one
        # The text might be " Cư trú" due to the space added in renderButton

        # Let's just click the first button
        buttons[0].click()

        # Wait for loading to finish and new options to appear
        # The loading uses setTimeout 500ms.
        print("Waiting for sub-menu...")
        page.wait_for_timeout(1000)

        # Verify sub-options appear
        buttons = page.query_selector_all(".option-btn")
        print(f"Sub-menu buttons: {len(buttons)}")

        # Take screenshot
        page.screenshot(path="verification_chatbot.png")
        print("Screenshot saved to verification_chatbot.png")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification_error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
