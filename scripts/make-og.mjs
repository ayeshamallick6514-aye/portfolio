// Renders the social preview image (public/og.jpg) from the live hero.
// Run with the site already serving: node scripts/make-og.mjs [baseUrl]
import { chromium } from "@playwright/test";
import sharp from "sharp";

const base = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await ctx.addInitScript(() => sessionStorage.setItem("dk-seen", "1"));
const page = await ctx.newPage();
await page.goto(base, { waitUntil: "networkidle" });
await page.addStyleTag({ content: ".topbar,.rail,.tapes,nextjs-portal{display:none!important}.hero{min-height:630px!important;padding-top:2.5rem!important;padding-bottom:2.5rem!important}" });
await page.waitForTimeout(2500);
const png = await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } });
await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile("public/og.jpg");
console.log("wrote public/og.jpg");
await browser.close();
