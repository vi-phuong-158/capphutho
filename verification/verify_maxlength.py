from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    try:
        page.goto("http://0.0.0.0:3000")

        # Verify Global Search Input
        global_input = page.locator("#globalSearchInput")
        max_len = global_input.get_attribute("maxlength")
        print(f"Global Search Input Max Length: {max_len}")

        if max_len != "100":
             print("FAIL: Global Search Input maxlength is not 100")
        else:
             print("PASS: Global Search Input maxlength is 100")

        # Verify Chat Search Input
        # Open chat
        page.locator(".chat-launcher").click()
        page.wait_for_selector("#chatWindow", state="visible")

        chat_input = page.locator("#chatSearchInput")
        chat_max_len = chat_input.get_attribute("maxlength")
        print(f"Chat Search Input Max Length: {chat_max_len}")

        if chat_max_len != "200":
             print("FAIL: Chat Search Input maxlength is not 200")
        else:
             print("PASS: Chat Search Input maxlength is 200")


        page.screenshot(path="verification/verification.png")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
