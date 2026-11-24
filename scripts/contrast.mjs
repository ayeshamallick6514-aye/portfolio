// Prints WCAG contrast ratios for every theme's token pairs, read from globals.css.
import { readFile } from "node:fs/promises";
const css = await readFile("src/app/globals.css", "utf8");
const lum = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const mix = (a, b, t) => "#" + [0, 2, 4].map((i) => Math.round(parseInt(a.slice(1 + i, 3 + i), 16) * t + parseInt(b.slice(1 + i, 3 + i), 16) * (1 - t)).toString(16).padStart(2, "0")).join("");
let bad = 0;
for (const m of css.matchAll(/\[data-theme="(\w+)"\] \{([^}]+)\}/g)) {
  const t = Object.fromEntries([...m[2].matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((x) => [x[1], x[2]]));
  const pairs = [
    ["ink / paper", t.ink, t.paper], ["ink / paper-2", t.ink, t["paper-2"]],
    ["mute / paper", t.mute, t.paper], ["mute / paper-2", t.mute, t["paper-2"]],
    ["accent / paper", t.accent, t.paper], ["accent / paper-2", t.accent, t["paper-2"]],
    ["on-accent / accent", t["on-accent"], t.accent],
    ["mute-on-accent / accent", mix(t["on-accent"], t.accent, 0.9), t.accent],
    ["paper / ink", t.paper, t.ink], ["accent-hi / ink", t["accent-hi"], t.ink],
    ["mute-on-ink / ink", mix(t.paper, t.ink, 0.62), t.ink],
  ];
  console.log(`\n${m[1]}`);
  for (const [name, a, b] of pairs) {
    const r = ratio(a, b);
    if (r < 4.5) bad++;
    console.log(`  ${r < 4.5 ? "FAIL" : " ok "} ${r.toFixed(2).padStart(5)}  ${name}`);
  }
}
console.log(bad ? `\n${bad} pair(s) below 4.5:1` : "\nAll pairs pass WCAG AA for body text (4.5:1).");
process.exit(bad ? 1 : 0);
