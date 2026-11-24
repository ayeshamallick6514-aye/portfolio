// Prepares the original ink artwork for the site.
// Sources live in assets/art (generated with scripts/gen-art.mjs). Each is
// converted to greyscale, upscaled 2x with a contrast lift so the ink stays
// crisp, and written to public/art at several widths as AVIF and WebP.
// Sizes are recorded in src/content/art.json for the <Art> component.
import sharp from "sharp";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = "assets/art";
const OUT = "public/art";
const WIDTHS = [800, 1400, 2200];
await mkdir(OUT, { recursive: true });

const manifest = {};
let bytes = 0;
for (const file of (await readdir(SRC)).filter((f) => /\.(webp|png|jpe?g)$/.test(f)).sort()) {
  const name = file.replace(/\.\w+$/, "");
  const meta = await sharp(path.join(SRC, file)).metadata();
  const big = await sharp(path.join(SRC, file))
    .greyscale()
    .resize({ width: meta.width * 2, kernel: "lanczos3" })
    // push near-black to black and near-white to white: crisper line art
    .linear(1.22, -22)
    .sharpen({ sigma: 0.8 })
    .png()
    .toBuffer();
  const ratio = meta.height / meta.width;
  for (const w of WIDTHS) {
    const a = await sharp(big).resize({ width: w }).avif({ quality: 46, effort: 6 }).toFile(path.join(OUT, `${name}-${w}.avif`));
    const b = await sharp(big).resize({ width: w }).webp({ quality: 74 }).toFile(path.join(OUT, `${name}-${w}.webp`));
    bytes += a.size + b.size;
  }
  const top = WIDTHS[WIDTHS.length - 1];
  manifest[name] = { w: top, h: Math.round(top * ratio), widths: WIDTHS };
}
await writeFile("src/content/art.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`built ${Object.keys(manifest).length} artworks, ${(bytes / 1024 / 1024).toFixed(2)} MB total`);
