// QA helper: tile every PNG in a folder into one contact sheet.
// node scripts/sheet.mjs <dir> <out.png> [cols] [cellWidth]
import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";
const [dir, out, colsArg, wArg] = process.argv.slice(2);
const files = (await readdir(dir)).filter((f) => f.endsWith(".png")).sort();
const cols = +(colsArg ?? 4), W = +(wArg ?? 420), pad = 6;
const first = await sharp(path.join(dir, files[0])).metadata();
const H = Math.round((W * first.height) / first.width);
const rows = Math.ceil(files.length / cols);
const comps = await Promise.all(files.map(async (f, i) => ({
  input: await sharp(path.join(dir, f)).resize(W, H, { fit: "cover", position: "top" }).png().toBuffer(),
  left: pad + (i % cols) * (W + pad), top: pad + Math.floor(i / cols) * (H + pad),
})));
await sharp({ create: { width: cols * (W + pad) + pad, height: rows * (H + pad) + pad, channels: 3, background: "#333" } }).composite(comps).png().toFile(out);
console.log(files.join(" "));
