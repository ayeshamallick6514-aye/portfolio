// Subsets the Japanese display face to only the glyphs the site uses.
// Usage: node scripts/subset-jp-font.mjs <path-to-ShipporiMincho-ExtraBold.ttf>
import { readFile, writeFile } from "node:fs/promises";
import subsetFont from "subset-font";

const GLYPHS = "第一二三四五六七八章完作品連絡巻";
const src = process.argv[2];
if (!src) throw new Error("Pass the path to the source .ttf");
const out = new URL("../src/fonts/ShipporiMincho-ExtraBold.subset.woff2", import.meta.url);
const buf = await subsetFont(await readFile(src), GLYPHS, { targetFormat: "woff2" });
await writeFile(out, buf);
console.log(`wrote ${out.pathname} (${buf.length} bytes) for ${[...GLYPHS].length} glyphs`);
