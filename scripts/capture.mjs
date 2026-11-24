// Captures real screenshots of the live projects for the case studies.
// node scripts/capture.mjs <outDir> [slug ...]
// Raw PNGs go to <outDir>/<slug>/<name>.png for review; scripts/build-media.mjs
// turns the chosen ones into optimised AVIF/WebP in public/media.
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const targets = {
  gravity: { url: "https://team-gravity.vercel.app/", paths: ["/"], scrolls: [0, 900, 1800] },
  stressproof: { url: "https://stress-proof.vercel.app/", paths: ["/", "/dashboard", "/stress", "/claims", "/vault"], scrolls: [0] },
  "legal-timelock-network": { url: "https://rait-acm-kleos-poha-paglu.vercel.app/", paths: ["/"], scrolls: [0, 900, 1800, 2700] },
  samadhan: { url: "https://samadhan-4ac87.web.app/", paths: ["/", "/report", "/map", "/schemes", "/analyzer", "/dashboard"], scrolls: [0] },
  zyvora: { url: "https://zyvora-hvot.vercel.app/", paths: ["/"], scrolls: [0, 900, 1800, 2700] },
};

const [outDir, ...only] = process.argv.slice(2);
if (!outDir) throw new Error("usage: capture.mjs <outDir> [slug ...]");
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });

for (const [slug, t] of Object.entries(targets)) {
  if (only.length && !only.includes(slug)) continue;
  const dir = path.join(outDir, slug);
  await mkdir(dir, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: "no-preference" });
  const page = await ctx.newPage();
  let n = 0;
  for (const p of t.paths) {
    const url = new URL(p, t.url).toString();
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
      await page.waitForTimeout(5000);
      for (const y of t.scrolls) {
        await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
        await page.waitForTimeout(1800);
        const name = `s${String(++n).padStart(2, "0")}`;
        await page.screenshot({ path: path.join(dir, `${name}.png`) });
        console.log(`${slug}/${name}  ${url}  y=${y}  title="${await page.title()}"`);
      }
    } catch (e) {
      console.log(`${slug}  FAILED ${url}: ${String(e).slice(0, 160)}`);
    }
  }
  await ctx.close();
}
await browser.close();
