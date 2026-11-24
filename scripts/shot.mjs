// QA helper: screenshot a page with headless Chromium.
// node scripts/shot.mjs <url> <out.png> [--w 1440] [--h 900] [--y 0] [--wait 1200]
//   [--loader] keep the opening loader   [--full] full-page   [--scale 0.6] downscale
//   [--theme aged] [--motion off] [--sel "#work"] scroll an element into view
import { chromium } from "@playwright/test";
import sharp from "sharp";

const args = process.argv.slice(2);
const [url, out] = args;
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i > -1 ? args[i + 1] : d; };
const flag = (k) => args.includes(`--${k}`);
const w = +opt("w", 1440), h = +opt("h", 900), y = +opt("y", 0), wait = +opt("wait", 1200), scale = +opt("scale", 0.6);

const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: opt("motion") === "off" ? "reduce" : "no-preference" });
const theme = opt("theme"), motion = opt("motion");
await ctx.addInitScript(({ loader, theme, motion }) => {
  try {
    if (!loader) sessionStorage.setItem("dk-seen", "1");
    if (theme) localStorage.setItem("dk-theme", theme);
    if (motion) localStorage.setItem("dk-motion", motion);
  } catch {}
}, { loader: flag("loader"), theme, motion });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(url, { waitUntil: "networkidle" });
const sel = opt("sel");
if (sel) await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: "start" }), sel);
if (y) await page.evaluate((yy) => window.scrollTo(0, yy), y);
await page.waitForTimeout(wait);
const clip = opt("clip"); // "x,y,w,h" in CSS pixels
if (clip) {
  const [x, y2, cw, ch] = clip.split(",").map(Number);
  const png = await page.screenshot({ clip: { x, y: y2, width: cw, height: ch } });
  await sharp(png).resize({ width: Math.round(cw * scale) }).png().toFile(out);
} else {
  const png = await page.screenshot({ fullPage: flag("full") });
  await sharp(png).resize({ width: Math.round(w * scale) }).png().toFile(out);
}
if (errors.length) console.log("CONSOLE ERRORS:\n" + [...new Set(errors)].slice(0, 8).join("\n"));
console.log(`saved ${out}`);
await browser.close();
