"use strict";
// Chụp ảnh giao diện thật của Cổng Thông Tin Số -> ./shots
const http = require("http");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const ROOT = __dirname;
const PORT = 8131;
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript",
  ".png": "image/png", ".jpg": "image/jpeg", ".mp4": "video/mp4", ".json": "application/json",
  ".doc": "application/msword", ".docx": "application/octet-stream", ".pdf": "application/pdf" };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p === "/") p = "/index.html";
    const file = path.join(ROOT, p);
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); res.end("404"); return;
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  }).listen(PORT);
}

(async () => {
  const outDir = path.join(ROOT, "shots");
  fs.mkdirSync(outDir, { recursive: true });
  const server = serve();
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"],
  });
  const base = `http://127.0.0.1:${PORT}`;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function newPage() {
    const page = await browser.newPage();
    await page.setViewport({ width: 430, height: 880, deviceScaleFactor: 2 });
    return page;
  }

  try {
    // 1) Trang chủ — header + lưới dịch vụ
    let page = await newPage();
    await page.goto(`${base}/index.html`, { waitUntil: "networkidle2", timeout: 30000 }).catch(() => {});
    await wait(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: path.join(outDir, "home.png") });
    await page.close();

    // 2) Trang module — Cư trú & Định danh
    page = await newPage();
    await page.goto(`${base}/modules/cu-tru.html`, { waitUntil: "networkidle2", timeout: 30000 }).catch(() => {});
    await wait(900);
    await page.screenshot({ path: path.join(outDir, "modules.png") });
    await page.close();

    // 3) Trợ lý ảo (mở chat window)
    page = await newPage();
    await page.goto(`${base}/index.html`, { waitUntil: "networkidle2", timeout: 30000 }).catch(() => {});
    await wait(1000);
    await page.evaluate(() => { if (window.toggleChat) window.toggleChat(); });
    await wait(900);
    await page.screenshot({ path: path.join(outDir, "chatbot.png") });
    await page.close();

    // 4) Thủ tục liên thông
    page = await newPage();
    await page.goto(`${base}/index.html#thu-tuc-lien-thong`, { waitUntil: "networkidle2", timeout: 30000 }).catch(() => {});
    await wait(1000);
    await page.evaluate(() => {
      const el = document.getElementById("thu-tuc-lien-thong");
      if (el) el.scrollIntoView({ block: "start" });
    });
    await wait(700);
    await page.screenshot({ path: path.join(outDir, "lienthong.png") });
    await page.close();

    console.log("Đã chụp:", fs.readdirSync(outDir).join(", "));
  } catch (e) {
    console.error("Lỗi chụp:", e.message);
  } finally {
    await browser.close();
    server.close();
  }
})();
