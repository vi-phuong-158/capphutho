import sys
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        # Use absolute path for file URL
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        print("Checking inputs in index.html...")

        # Check global search input
        global_input = page.locator("#globalSearchInput")
        maxlength_global = global_input.get_attribute("maxlength")

        # Check chat search input
        chat_input = page.locator("#chatSearchInput")
        maxlength_chat = chat_input.get_attribute("maxlength")

        print(f"Global Input MaxLength: {maxlength_global}")
        print(f"Chat Input MaxLength: {maxlength_chat}")

        if maxlength_global == "100" and maxlength_chat == "200":
            print("SUCCESS: Maxlength attributes are present and correct.")
            sys.exit(0)
        else:
            print("FAILURE: Maxlength attributes are missing or incorrect.")
            sys.exit(1)

if __name__ == "__main__":
    run()
