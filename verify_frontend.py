from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Block external requests to avoid timeouts
        def handle_route(route):
            if "fonts.googleapis.com" in route.request.url or "fonts.gstatic.com" in route.request.url or "cdnjs.cloudflare.com" in route.request.url:
                route.abort()
            else:
                route.continue_()

        # We need local JS files, so blocking all cdnjs might be bad if they are used.
        # The html uses cdnjs for font-awesome and pdf.js.
        # Let's only block fonts.

        def handle_route_safe(route):
             if "fonts.googleapis.com" in route.request.url or "fonts.gstatic.com" in route.request.url:
                route.abort()
             else:
                route.continue_()

        page.route("**/*", handle_route_safe)

        print("Navigating to page...")
        page.goto("http://localhost:3000/")

        # Wait for chat launcher and click it
        print("Opening chat...")
        page.click(".chat-launcher")

        # Wait for chat window to open
        page.wait_for_selector("#chatWindow", state="visible")

        # Type in search input
        print("Typing search query...")
        search_input = page.locator("#chatSearchInput")
        search_input.fill("ho chieu")

        # Wait for results. Since we added a 300ms debounce, we wait a bit longer to be sure.
        print("Waiting for debounce and results...")
        page.wait_for_timeout(1000)

        # Verify results appear (options container should have buttons)
        options = page.locator("#chatOptions button")
        count = options.count()
        print(f"Found {count} search results.")

        # Take screenshot
        page.screenshot(path="frontend_verification.png")
        print("Screenshot saved to frontend_verification.png")

        browser.close()

if __name__ == "__main__":
    run()
