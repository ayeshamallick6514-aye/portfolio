// QA helper: capture an animation as a strip of frames.
// node scripts/frames.mjs <url> <out.png> --times 200,600,1000 [--loader] [--click "sel"]
//   [--hover "sel"] [--settle 1500] [--w 1440] [--h 900] [--scale 0.35] [--cols 4] [--y 0] [--sel "#id"]
import { chromium } from "@playwright/test";
import sharp from "sharp";

const args = process.argv.slice(2);
const [url, out] = args;
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i > -1 ? args[i + 1] : d; };
const flag = (k) => args.includes(`--${k}`);
const w = +opt("w", 1440), h = +opt("h", 900), scale = +opt("scale", 0.35), cols = +opt("cols", 4);
const times = opt("times", "200,600,1000,1500").split(",").map(Number);

const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
await ctx.addInitScript(({ loader, theme }) => {
  try {
    if (!loader) sessionStorage.setItem("dk-seen", "1");
    if (theme) localStorage.setItem("dk-theme", theme);
  } catch {}
}, { loader: flag("loader"), theme: opt("theme") });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));

const click = opt("click"), hover = opt("hover"), sel = opt("sel");
let t0;
if (click || hover) {
  await page.goto(url, { waitUntil: "networkidle" });
  if (sel) await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: "start" }), sel);
  if (+opt("y", 0)) await page.evaluate((y) => window.scrollTo(0, y), +opt("y", 0));
  await page.waitForTimeout(+opt("settle", 1500));
  if (hover) await page.hover(hover);
  if (click) await page.click(click, { noWaitAfter: true });
  t0 = Date.now();
} else {
  await page.goto(url, { waitUntil: "commit" });
  t0 = Date.now();
}
const tw = Math.round(w * scale), th = Math.round(h * scale), pad = 6;
const frames = [];
for (const t of times) {
  const wait = t - (Date.now() - t0);
  if (wait > 0) await page.waitForTimeout(wait);
  frames.push(await sharp(await page.screenshot()).resize(tw, th).png().toBuffer());
}
const rows = Math.ceil(frames.length / cols);
await sharp({ create: { width: cols * (tw + pad) + pad, height: rows * (th + pad) + pad, channels: 3, background: "#3a3a3a" } })
  .composite(frames.map((input, i) => ({ input, left: pad + (i % cols) * (tw + pad), top: pad + Math.floor(i / cols) * (th + pad) })))
  .png().toFile(out);
console.log(`url now: ${page.url()}`);
if (errors.length) console.log("CONSOLE ERRORS:\n" + [...new Set(errors)].slice(0, 8).join("\n"));
console.log(`saved ${out}`);
await browser.close();
