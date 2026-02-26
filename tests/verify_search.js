
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Mock window
const window = {};
global.window = window;

// Load files
const faqDbContent = fs.readFileSync(path.join(__dirname, '../js/data/faq_db.js'), 'utf8');
const searchEngineContent = fs.readFileSync(path.join(__dirname, '../js/utils/search_engine.js'), 'utf8');

// Execute files in context
vm.runInNewContext(faqDbContent, { window });
vm.runInNewContext(searchEngineContent, { window });

const FaqSearchEngine = window.FaqSearchEngine;
const engine = new FaqSearchEngine();

// Test cases
const testCases = [
    { query: "đăng ký thường trú", expectedKeyword: "thường trú" },
    { query: "CCCD", expectedKeyword: "CCCD" }, // Case insensitive check needed
    { query: "mất xe máy", expectedKeyword: "xe" },
    { query: "người nước ngoài", expectedKeyword: "người nước ngoài" },
    { query: "vneid", expectedKeyword: "VNeID" }
];

console.log("Running Search Verification...");

let passed = 0;
testCases.forEach(tc => {
    const results = engine.search(tc.query);
    if (results.length > 0) {
        const topResult = results[0];
        // Check if result contains relevant keywords or text
        const textMatch = topResult.text.toLowerCase().includes(tc.expectedKeyword.toLowerCase());
        const keywordMatch = topResult.keywords && topResult.keywords.includes(tc.expectedKeyword.toLowerCase());

        if (textMatch || keywordMatch) {
            console.log(`[PASS] Query: "${tc.query}" -> Top Result: "${topResult.text.substring(0, 50)}..."`);
            passed++;
        } else {
            console.error(`[FAIL] Query: "${tc.query}" -> Top Result: "${topResult.text.substring(0, 50)}..." (Expected: ${tc.expectedKeyword})`);
        }
    } else {
        console.error(`[FAIL] Query: "${tc.query}" -> No results found.`);
    }
});

if (passed === testCases.length) {
    console.log("All tests passed!");
    process.exit(0);
} else {
    console.error(`${passed}/${testCases.length} tests passed.`);
    process.exit(1);
}
