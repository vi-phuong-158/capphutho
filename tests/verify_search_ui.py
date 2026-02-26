
import os
import sys
from playwright.sync_api import sync_playwright

def test_search(page):
    # Load index.html
    cwd = os.getcwd()
    file_path = f"file://{cwd}/index.html"
    print(f"Loading {file_path}")
    page.goto(file_path)

    # Wait for search engine to be ready (it's synchronous, but good practice)
    page.wait_for_selector('#globalSearchInput')

    # Test Global Search
    print("Testing Global Search...")
    page.fill('#globalSearchInput', 'đăng ký thường trú')
    page.wait_for_selector('#globalSearchResults.active')

    # Check if results appear
    results = page.locator('.search-result-item')
    count = results.count()
    print(f"Found {count} results for 'đăng ký thường trú'")

    if count == 0:
        print("FAIL: No results found for global search")
        sys.exit(1)

    first_result = results.first.inner_text()
    print(f"First result: {first_result}")

    # Test Chatbot Search
    print("Testing Chatbot Search...")
    # Open chat
    page.click('.chat-launcher')
    page.wait_for_selector('#chatWindow', state='visible')

    # Type in chat input
    page.fill('#chatSearchInput', 'CCCD')
    # Trigger input event (Playwright fill does this, but debounce might delay)
    page.wait_for_timeout(500) # Wait for debounce

    # Check options
    options = page.locator('#chatOptions .option-btn')
    opt_count = options.count()
    print(f"Found {opt_count} options for 'CCCD'")

    if opt_count == 0:
        print("FAIL: No results found for chatbot search")
        sys.exit(1)

    first_option = options.first.inner_text()
    print(f"First option: {first_option}")

    print("PASS: UI Verification Successful")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_search(page)
        except Exception as e:
            print(f"Error: {e}")
            sys.exit(1)
        finally:
            browser.close()
