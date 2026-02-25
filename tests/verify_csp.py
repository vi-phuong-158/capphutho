import sys
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        # Enable console logging
        page = browser.new_page()

        csp_violations = []
        page.on("console", lambda msg: csp_violations.append(msg.text) if "Content Security Policy" in msg.text else None)

        cwd = os.getcwd()
        url = f"file://{cwd}/index.html"
        print(f"Loading {url}")
        page.goto(url)

        # Check if meta tag exists
        meta_csp = page.locator('meta[http-equiv="Content-Security-Policy"]')
        count = meta_csp.count()
        print(f"Meta CSP tags found in index.html: {count}")

        if count == 0:
            print("FAILURE: CSP Meta tag missing in index.html")
            sys.exit(1)

        content = meta_csp.first.get_attribute("content")
        print(f"CSP Content: {content}")

        if "default-src 'self'" not in content:
            print("FAILURE: CSP Content missing 'default-src 'self''")
            sys.exit(1)

        # Check for violations
        if csp_violations:
            print("WARNING: CSP Violations found:")
            for v in csp_violations:
                print(f"- {v}")
        else:
            print("SUCCESS: No CSP violations logged on load.")

        # Check modules/cu-tru.html as sample
        mod_url = f"file://{cwd}/modules/cu-tru.html"
        print(f"Loading {mod_url}")
        page.goto(mod_url)
        meta_csp_mod = page.locator('meta[http-equiv="Content-Security-Policy"]')
        if meta_csp_mod.count() == 0:
             print("FAILURE: CSP Meta tag missing in modules/cu-tru.html")
             sys.exit(1)

        content_mod = meta_csp_mod.first.get_attribute("content")
        if "frame-src https://www.google.com" not in content_mod:
             print("FAILURE: CSP in modules/cu-tru.html missing frame-src")
             sys.exit(1)

        if "img-src 'self' data: https://cdn-icons-png.flaticon.com" not in content_mod:
             print("FAILURE: CSP in modules/cu-tru.html missing img-src details")
             sys.exit(1)

        print("SUCCESS: CSP Meta tags verified.")

if __name__ == "__main__":
    run()
