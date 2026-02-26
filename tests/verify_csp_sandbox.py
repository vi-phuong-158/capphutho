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

        print("Checking CSP and Sandbox in index.html...")

        # 1. Check CSP Meta Tag
        meta_csp = page.locator("meta[http-equiv='Content-Security-Policy']")
        if meta_csp.count() > 0:
            content = meta_csp.get_attribute("content")
            print(f"CSP Found: {content}")
            if "default-src 'self'" in content:
                print("SUCCESS: CSP default-src is correct.")
            else:
                print("FAILURE: CSP default-src is missing or incorrect.")
                sys.exit(1)

            # Check frame-src
            if "frame-src https://www.google.com" in content:
                print("SUCCESS: CSP frame-src allows Google Maps.")
            else:
                print("FAILURE: CSP frame-src missing or incorrect.")
                sys.exit(1)

        else:
            print("FAILURE: Content-Security-Policy meta tag is missing.")
            sys.exit(1)

        # 2. Check Iframe Sandbox
        iframe = page.locator("iframe[src*='google.com/maps']")
        if iframe.count() > 0:
            sandbox = iframe.get_attribute("sandbox")
            if sandbox:
                print(f"Sandbox Attribute Found: {sandbox}")
                required = ["allow-scripts", "allow-same-origin", "allow-popups", "allow-forms"]
                missing = [req for req in required if req not in sandbox]

                if not missing:
                    print("SUCCESS: Iframe sandbox has all required permissions.")
                else:
                    print(f"FAILURE: Iframe sandbox missing permissions: {missing}")
                    sys.exit(1)
            else:
                print("FAILURE: Iframe sandbox attribute is missing.")
                sys.exit(1)
        else:
            print("WARNING: Google Maps iframe not found.")
            sys.exit(1)

        print("ALL CHECKS PASSED.")
        sys.exit(0)

if __name__ == "__main__":
    run()
