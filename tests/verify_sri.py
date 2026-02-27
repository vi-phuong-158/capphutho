import os
import re

def verify_sri(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check for FontAwesome link
    fa_link_pattern = re.compile(
        r'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"(.*?)>',
        re.DOTALL
    )

    match = fa_link_pattern.search(content)
    if not match:
        print(f"FAILURE: FontAwesome link not found in {file_path}")
        return False

    attrs = match.group(1)

    # Expected SRI hash
    expected_integrity = "sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="

    if f'integrity="{expected_integrity}"' not in attrs:
        print(f"FAILURE: Missing or incorrect integrity attribute in {file_path}")
        return False

    if 'crossorigin="anonymous"' not in attrs:
        print(f"FAILURE: Missing crossorigin attribute in {file_path}")
        return False

    print(f"SUCCESS: SRI verified for {file_path}")
    return True

def main():
    files_to_check = ['index.html']
    modules_dir = 'modules'
    if os.path.exists(modules_dir):
        for f in os.listdir(modules_dir):
            if f.endswith('.html'):
                files_to_check.append(os.path.join(modules_dir, f))

    all_passed = True
    for file_path in files_to_check:
        if not verify_sri(file_path):
            all_passed = False

    if all_passed:
        print("All files passed SRI verification.")
        exit(0)
    else:
        print("Some files failed SRI verification.")
        exit(1)

if __name__ == "__main__":
    main()
