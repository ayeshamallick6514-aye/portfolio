// Turns raw project screenshots into optimised, responsive images.
//   node scripts/build-media.mjs <rawCaptureDir>   (first time: picks and stores sources)
//   node scripts/build-media.mjs                   (rebuild from assets/captures)
// Sources are kept in assets/captures/<slug>/<name>.png; output goes to
// public/media/<slug>/<name>-<width>.{avif,webp}; sizes are recorded in
// src/content/media.json for the <Shot> component.
import sharp from "sharp";
import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Which raw capture becomes which named shot.
const pick = {
  gravity: { cover: "s01", missions: "s02", process: "s03" },
  stressproof: { cover: "s01", command: "s02", simulation: "s03" },
  "legal-timelock-network": { cover: "s01", features: "s02", steps: "s04" },
  samadhan: { cover: "s01", map: "s03", analyzer: "s05" },
  zyvora: { cover: "s01", arrivals: "s02", gallery: "s04" },
};
const WIDTHS = [640, 1100, 1600];
const SRC = "assets/captures";
const raw = process.argv[2];

if (raw) {
  for (const [slug, names] of Object.entries(pick)) {
    await mkdir(path.join(SRC, slug), { recursive: true });
    for (const [name, file] of Object.entries(names)) {
      await copyFile(
        path.join(raw, slug, `${file}.png`),
        path.join(SRC, slug, `${name}.png`),
      );
    }
  }
}

const manifest = {};
let bytes = 0;
for (const slug of (await readdir(SRC)).sort()) {
  const dir = path.join(SRC, slug);
  const out = path.join("public/media", slug);
  await mkdir(out, { recursive: true });
  manifest[slug] = {};
  for (const file of (await readdir(dir))
    .filter((f) => f.endsWith(".png"))
    .sort()) {
    const name = file.replace(/\.png$/, "");
    const img = sharp(path.join(dir, file));
    const meta = await img.metadata();
    const ratio = meta.height / meta.width;
    // Never enlarge: a narrow source (a phone screenshot) stops at its own width.
    const widths = WIDTHS.filter((w) => w <= meta.width);
    if (
      !widths.length ||
      (meta.width < WIDTHS[WIDTHS.length - 1] &&
        widths[widths.length - 1] !== meta.width)
    )
      widths.push(meta.width);
    for (const w of widths) {
      const base = img.clone().resize({ width: w });
      const a = await base
        .clone()
        .avif({ quality: 52, effort: 6 })
        .toFile(path.join(out, `${name}-${w}.avif`));
      const b = await base
        .clone()
        .webp({ quality: 76 })
        .toFile(path.join(out, `${name}-${w}.webp`));
      bytes += a.size + b.size;
    }
    const top = widths[widths.length - 1];
    manifest[slug][name] = { w: top, h: Math.round(top * ratio), widths };
  }
}
await writeFile(
  "src/content/media.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  `built ${Object.values(manifest).reduce((n, m) => n + Object.keys(m).length, 0)} shots, ${(bytes / 1024 / 1024).toFixed(2)} MB total`,
);
