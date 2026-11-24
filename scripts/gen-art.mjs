// Generates original manga-style art on AI Horde (aihorde.net): a free,
// community-run image service that needs no account (anonymous key) and adds
// no watermark. Prompts are generic scene descriptions; no personal details
// and no existing characters or series are named.
//
//   node scripts/gen-art.mjs <jobs.json> <outDir>
// jobs.json: [{ "name", "model", "prompt", "negative", "width", "height", "seed", "steps", "cfg" }]
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const API = "https://aihorde.net/api/v2";
const headers = { apikey: "0000000000", "Client-Agent": "portfolio-art:1.0:anonymous", "Content-Type": "application/json" };
const [jobsFile, outDir] = process.argv.slice(2);
const jobs = JSON.parse(await readFile(jobsFile, "utf8"));
await mkdir(outDir, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run(job) {
  const body = {
    prompt: `${job.prompt} ### ${job.negative ?? ""}`,
    params: {
      sampler_name: job.sampler ?? "k_euler_a", cfg_scale: job.cfg ?? 6, steps: job.steps ?? 26,
      width: job.width ?? 1216, height: job.height ?? 832, n: 1, karras: true, clip_skip: 2,
      ...(job.seed ? { seed: String(job.seed) } : {}),
    },
    nsfw: false, censor_nsfw: true, models: [job.model], r2: true, shared: false, slow_workers: true,
  };
  const sub = await fetch(`${API}/generate/async`, { method: "POST", headers, body: JSON.stringify(body) });
  const subJson = await sub.json();
  if (!sub.ok || !subJson.id) return console.log(`${job.name}: REFUSED ${sub.status} ${JSON.stringify(subJson).slice(0, 200)}`);
  const started = Date.now();
  for (;;) {
    await sleep(7000);
    const chk = await (await fetch(`${API}/generate/check/${subJson.id}`, { headers })).json().catch(() => ({}));
    if (chk.faulted) return console.log(`${job.name}: FAULTED`);
    if (chk.done) break;
    if (Date.now() - started > 14 * 60 * 1000) return console.log(`${job.name}: TIMEOUT (queue ${chk.queue_position}, wait ${chk.wait_time}s)`);
  }
  const st = await (await fetch(`${API}/generate/status/${subJson.id}`, { headers })).json();
  const g = st.generations?.[0];
  if (!g?.img) return console.log(`${job.name}: NO IMAGE ${JSON.stringify(st).slice(0, 200)}`);
  if (g.censored) return console.log(`${job.name}: censored by worker`);
  const img = await fetch(g.img);
  const file = path.join(outDir, `${job.name}.webp`);
  await writeFile(file, Buffer.from(await img.arrayBuffer()));
  console.log(`${job.name}: saved (${g.model}, seed ${g.seed}, ${Math.round((Date.now() - started) / 1000)}s)`);
}

await Promise.all(jobs.map((j, i) => sleep(i * 1500).then(() => run(j)).catch((e) => console.log(`${j.name}: ERROR ${String(e).slice(0, 160)}`))));
