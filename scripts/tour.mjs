// QA helper: scroll a page viewport by viewport and save contact sheets.
// node scripts/tour.mjs <url> <outPrefix> [--w 1440] [--h 900] [--motion off] [--theme x]
//   [--cols 2] [--per 4] [--scale 0.5] [--max 40]
import { chromium } from "@playwright/test";
import sharp from "sharp";

const args = process.argv.slice(2);
const [url, prefix] = args;
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i > -1 ? args[i + 1] : d; };
const w = +opt("w", 1440), h = +opt("h", 900), cols = +opt("cols", 2), per = +opt("per", 4), scale = +opt("scale", 0.5), max = +opt("max", 40);
const theme = opt("theme"), motion = opt("motion");

const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: motion === "off" ? "reduce" : "no-preference" });
await ctx.addInitScript(({ theme, motion }) => {
  try {
    sessionStorage.setItem("dk-seen", "1");
    if (theme) localStorage.setItem("dk-theme", theme);
    if (motion) localStorage.setItem("dk-motion", motion);
  } catch {}
}, { theme, motion });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
const steps = Math.min(max, Math.ceil(total / h));
console.log(`page height ${total}px, ${steps} viewports`);
const tw = Math.round(w * scale), th = Math.round(h * scale), pad = 8;
const shots = [];
for (let i = 0; i < steps; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * h);
  await page.waitForTimeout(motion === "off" ? 250 : 1100);
  shots.push(await sharp(await page.screenshot()).resize(tw, th).png().toBuffer());
}
for (let s = 0; s * per < shots.length; s++) {
  const group = shots.slice(s * per, s * per + per);
  const rows = Math.ceil(group.length / cols);
  await sharp({ create: { width: cols * (tw + pad) + pad, height: rows * (th + pad) + pad, channels: 3, background: "#3a3a3a" } })
    .composite(group.map((input, i) => ({ input, left: pad + (i % cols) * (tw + pad), top: pad + Math.floor(i / cols) * (th + pad) })))
    .png().toFile(`${prefix}-${s}.png`);
}
if (errors.length) console.log("CONSOLE ERRORS:\n" + [...new Set(errors)].slice(0, 8).join("\n"));
console.log(`sheets: ${Math.ceil(shots.length / per)}`);
await browser.close();
