"use strict";
/* Render thật từ file .pptx đã build (đọc toạ độ/màu/ảnh trong XML) -> PNG preview.
   Chỉ hỗ trợ tập tính năng dùng trong build_pptx.js. Dùng để xem trước/kiểm tra. */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const JSZip = require("jszip");

const EMU = 914400, DPI = 96, S = DPI / EMU;
const dec = (t) => String(t).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&amp;/g, "&");
const esc = (t) => dec(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function attr(xml, re) { const m = xml.match(re); return m ? m[1] : null; }

function parseShape(sp) {
  const off = sp.match(/<a:off x="(-?\d+)" y="(-?\d+)"\/>/);
  const ext = sp.match(/<a:ext cx="(\d+)" cy="(\d+)"\/>/);
  if (!off || !ext) return null;
  const x = +off[1] * S, y = +off[2] * S, w = +ext[1] * S, h = +ext[2] * S;
  const prst = attr(sp, /<a:prstGeom prst="([^"]+)"/) || "rect";
  const noFill = /<a:noFill\/>/.test(sp.split("</a:prstGeom>")[1] || sp);
  const fill = attr(sp, /prstGeom[^>]*>.*?<a:solidFill><a:srgbClr val="([0-9A-Fa-f]{6})"/s);
  const ln = sp.match(/<a:ln w="(\d+)"[^>]*>(.*?)<\/a:ln>/s);
  let line = null;
  if (ln) { const lc = attr(ln[2], /<a:srgbClr val="([0-9A-Fa-f]{6})"/); const dash = /prstDash val="dash"/.test(ln[2]); if (lc) line = { c: lc, w: +ln[1] * S, dash }; }
  const radius = attr(sp, /<a:gd name="adj" fmla="val (\d+)"/);
  // text
  const paras = [];
  const tx = sp.match(/<p:txBody>(.*?)<\/p:txBody>/s);
  let anchor = "t";
  if (tx) {
    anchor = attr(tx[1], /<a:bodyPr[^>]*anchor="([a-z]+)"/) || "t";
    const ps = tx[1].match(/<a:p>.*?<\/a:p>/gs) || [];
    for (const pp of ps) {
      const algn = attr(pp, /<a:pPr[^>]*algn="([a-z]+)"/) || "l";
      const runs = pp.match(/<a:r>.*?<\/a:r>/gs) || [];
      const parts = runs.map((r) => ({
        t: (attr(r, /<a:t>(.*?)<\/a:t>/s) || ""),
        sz: +(attr(r, /sz="(\d+)"/) || 1800) / 100,
        b: /b="1"/.test(r),
        i: /i="1"/.test(r),
        c: attr(r, /<a:solidFill><a:srgbClr val="([0-9A-Fa-f]{6})"/) || "000000",
      }));
      const bullet = /<a:buChar/.test(pp);
      if (parts.length) paras.push({ algn, parts, bullet });
    }
  }
  return { type: "sp", x, y, w, h, prst, fill: noFill ? null : fill, line, radius: radius ? +radius / 100000 : 0, paras, anchor };
}

async function render(pptxPath, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const zip = await JSZip.loadAsync(fs.readFileSync(pptxPath));
  const slideNames = Object.keys(zip.files).filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n))
    .sort((a, b) => (+a.match(/\d+/)[0]) - (+b.match(/\d+/)[0]));
  const W = Math.round(13.3 * DPI), H = Math.round(7.5 * DPI);
  const outFiles = [];
  for (const name of slideNames) {
    const num = +name.match(/(\d+)\.xml/)[1];
    const xml = await zip.file(name).async("string");
    const rels = await zip.file(`ppt/slides/_rels/slide${num}.xml.rels`).async("string");
    const relMap = {};
    (rels.match(/<Relationship [^>]+>/g) || []).forEach((r) => {
      const id = attr(r, /Id="([^"]+)"/), tg = attr(r, /Target="([^"]+)"/);
      if (id && tg) relMap[id] = "ppt/" + tg.replace(/^\.\.\//, "");
    });
    const bgc = attr(xml, /<p:bg>.*?<a:srgbClr val="([0-9A-Fa-f]{6})"/s) || "FFFFFF";
    // collect elements in document order: iterate over <p:sp> and <p:pic>
    const items = [];
    const re = /<p:(sp|pic)>.*?<\/p:\1>/gs;
    let m;
    while ((m = re.exec(xml))) {
      const block = m[0];
      if (m[1] === "sp") { const s = parseShape(block); if (s) items.push(s); }
      else {
        const off = block.match(/<a:off x="(-?\d+)" y="(-?\d+)"\/>/);
        const ext = block.match(/<a:ext cx="(\d+)" cy="(\d+)"\/>/);
        const embed = attr(block, /r:embed="([^"]+)"/);
        if (off && ext && embed && relMap[embed]) {
          const buf = await zip.file(relMap[embed]).async("nodebuffer");
          items.push({ type: "pic", x: +off[1] * S, y: +off[2] * S, w: +ext[1] * S, h: +ext[2] * S, data: buf.toString("base64") });
        }
      }
    }
    // build SVG
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
    svg += `<rect width="${W}" height="${H}" fill="#${bgc}"/>`;
    for (const el of items) {
      if (el.type === "pic") { svg += `<image x="${el.x}" y="${el.y}" width="${el.w}" height="${el.h}" preserveAspectRatio="xMidYMid meet" href="data:image/png;base64,${el.data}"/>`; continue; }
      const rx = el.radius ? Math.min(el.w, el.h) * el.radius : (el.prst === "roundRect" ? 10 : 0);
      const fill = el.fill ? `#${el.fill}` : "none";
      const stroke = el.line ? `stroke="#${el.line.c}" stroke-width="${Math.max(1, el.line.w)}" ${el.line.dash ? `stroke-dasharray="${el.line.w * 3} ${el.line.w * 2}"` : ""}` : "";
      if (el.prst === "ellipse") svg += `<ellipse cx="${el.x + el.w / 2}" cy="${el.y + el.h / 2}" rx="${el.w / 2}" ry="${el.h / 2}" fill="${fill}" ${stroke}/>`;
      else svg += `<rect x="${el.x}" y="${el.y}" width="${el.w}" height="${el.h}" rx="${rx}" fill="${fill}" ${stroke}/>`;
      // text (approx wrap + valign)
      if (el.paras && el.paras.length) {
        const lines = [];
        for (const pa of el.paras) {
          const sz = pa.parts[0].sz, cw = sz * 0.52;
          const maxch = Math.max(4, Math.floor(el.w / cw));
          const text = pa.parts.map((p) => p.t).join("");
          const words = text.split(/(\s+)/);
          let cur = "";
          const wrapped = [];
          for (const wd of words) { if ((cur + wd).length > maxch && cur.trim()) { wrapped.push(cur.trimEnd()); cur = wd.trimStart(); } else cur += wd; }
          if (cur.trim()) wrapped.push(cur.trimEnd());
          wrapped.forEach((ln) => lines.push({ t: ln, sz, b: pa.parts[0].b, i: pa.parts[0].i, c: pa.parts[0].c, algn: pa.algn, bullet: pa.bullet }));
        }
        const lh = (lines[0] ? lines[0].sz : 14) * 1.25;
        const totalH = lines.length * lh;
        let ty = el.y;
        if (el.anchor === "ctr") ty = el.y + (el.h - totalH) / 2;
        else if (el.anchor === "b") ty = el.y + el.h - totalH;
        ty += (lines[0] ? lines[0].sz : 14);
        for (const ln of lines) {
          let tx2 = el.x + 4, anc = "start";
          if (ln.algn === "ctr") { tx2 = el.x + el.w / 2; anc = "middle"; }
          else if (ln.algn === "r") { tx2 = el.x + el.w - 4; anc = "end"; }
          const bl = ln.bullet ? "• " : "";
          svg += `<text x="${tx2}" y="${ty}" font-family="Segoe UI, DejaVu Sans, sans-serif" font-size="${ln.sz}" ${ln.b ? 'font-weight="700"' : ""} ${ln.i ? 'font-style="italic"' : ""} fill="#${ln.c}" text-anchor="${anc}">${esc(bl + ln.t)}</text>`;
          ty += lh;
        }
      }
    }
    svg += `</svg>`;
    const out = path.join(outDir, `slide${String(num).padStart(2, "0")}.png`);
    await sharp(Buffer.from(svg)).png().toFile(out);
    outFiles.push(out);
  }
  // montage 13 slides -> grid (cols x rows), scaled
  const tw = Math.round(W * 0.5), th = Math.round(H * 0.5), cols = 2, gap = 16;
  const rows = Math.ceil(outFiles.length / cols);
  const MW = cols * tw + (cols + 1) * gap, MH = rows * th + (rows + 1) * gap;
  const comps = [];
  for (let i = 0; i < outFiles.length; i++) {
    const r = Math.floor(i / cols), c = i % cols;
    const buf = await sharp(outFiles[i]).resize(tw, th).png().toBuffer();
    comps.push({ input: buf, left: gap + c * (tw + gap), top: gap + r * (th + gap) });
  }
  await sharp({ create: { width: MW, height: MH, channels: 3, background: "#222" } }).composite(comps).png()
    .toFile(path.join(outDir, "ALL.png"));
  console.log("Rendered", outFiles.length, "slides ->", outDir);
}

render(path.join(__dirname, "Thuyet-trinh-Cong-Thong-Tin-So.pptx"), path.join(__dirname, "_preview"))
  .catch((e) => { console.error(e); process.exit(1); });
