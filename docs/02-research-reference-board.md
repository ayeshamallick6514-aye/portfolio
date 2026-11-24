# 02 — Research and Reference Board

Researched 24 Nov 2026. Two evidence levels are used throughout:

- **Seen** — I loaded the live site in a browser and looked at it.
- **Read** — taken from a case study, award listing or documentation page. Not visually confirmed.

Nothing here is to be copied. Each entry ends with the principle we take and how it changes shape in our concept.

---

## A. Flagship studios (seen)

| Site | What is actually on screen | Principle we adapt | How it changes in our site |
|---|---|---|---|
| **bruno-simon.com** | The loader is a glowing ring drawn on a 3D ground grid; when it completes, a small diorama (car, tree, lantern, bench) rises inside the ring with a hand-lettered "click to start" and a sound icon. The palette shifts with time of day. | The loader is the first shot of the world, not a spinner. Invitation to play is hand-made and friendly. | Our preloader is a pencil test: the first frame of the hero being drawn. No separate loading screen. |
| **lusion.co** | Pale lavender page. One rounded frame holds a pile of glossy toy-like 3D shapes in blue, black and grey. Registration "+" marks along the frame. Pill buttons. Headline sits beside the logo in plain grotesk. | 3D lives inside an editorial layout instead of taking over the page. Three colours only. Print marks used as UI. | Our 3D sits inside "cut frames" with peg holes and crop marks from animation paper. |
| **dogstudio.co** | A dark, painterly 3D dog fills the screen. A very large high-contrast serif headline overlaps it. Leaves drift at several depths; thin red diagonal lines cut the frame. | Type and subject share depth — letters pass in front of and behind the centrepiece. | Hero title is one of the cel layers, so the character can sit between two lines of type. |
| **immersive-g.com** | Light grey plaster wall; birds emerge from it in bas-relief. Tiny serif type, a numeric loader, "click to enable sound". Almost no colour. | Restraint and material. One texture, carried everywhere. Sound is opt-in. | Our one material is animation paper on a lightbox. Sound is off until asked for. |
| **activetheory.net** | Near-black field with drifting particles, a glassy 3D logo as loader, and a two-item pill nav: Work — Contact. | The only permanent navigation is the two things a visitor wants. | Persistent nav shows Work and Contact; everything else lives in the cut list. |
| **resn.co.nz** | A faceted dark gem turning slowly, thin centred wordmark, one link: "view all projects". | One object can be the whole identity if it rewards touching. | Our one object is the cel stack. |
| **locomotive.ca** | Full-bleed blue-tinted photograph, oversized serif wordmark, small boxed labels ("OPS / DES / DEV"), nav written as a comma-separated sentence. | Navigation and labels as typography, not components. | Production stamps and boxed cut labels replace badges and chips. |

## B. Anime and manga language on the web

| Site | Evidence | What works | What we do with it |
|---|---|---|---|
| **utopiatokyo.com** | Seen | An entry gate warns about flashing effects and offers "Safe mode" or "Glitch effect". Inside: visible ruled grid, solid and outlined display type paired on one line, corner-bracket frames, a giant kanji as a section anchor, a grid/list toggle for a mask collection. | We take the safe-mode idea and the visible grid rules. We do **not** take the red-on-black cyberpunk palette — it is already owned, and it is the most common "anime site" look. |
| **Ponpon Mania** | Read ([case study](https://www.awwwards.com/ponpon-mania-a-comic-that-breathes-through-web-interaction.html)) | Black-and-white comic where colour is saved for a few beats. Panels are flat art layers rebuilt as planes in WebGL with small idle loops. | Colour is rationed: one hot accent, used for decisions and impact only. Flat art on planes is exactly what a cel is. |
| **Zentry (by Resn)** | Read ([case study](https://www.awwwards.com/zentry-case-study.html)) | High-energy "portal" masks done with DOM clip-path, not WebGL. Motion curves were defined before visual design. | Panel cuts and wipes are CSS clip-path first, shader second. Motion tokens are defined before any section is built. |
| **Ten Years Away** | Read ([Codrops](https://tympanus.net/codrops/2026/07/08/ten-years-away-designing-an-interactive-comic-for-studio375s-tenth-anniversary/)) | Camera drifts through comic panels; camera targets per chapter live in a data file. | Camera positions per section are data, so mobile and desktop can use different framings. |

### What makes anime-styled sites look amateur (and our rule against each)

| Pitfall | Our rule |
|---|---|
| Copyrighted characters, fan art, ripped sound | 100% original art. No existing character, logo, title font or audio. |
| Every effect on at once | One accent colour. One impact effect per screen. Screentone only in shadows. |
| Moiré or jagged halftone | Halftone is anti-aliased in the shader and scaled to device pixel ratio; turned off below a size threshold. |
| Flat default toon shading, same-width outlines | Shadows shift hue, not just brightness. Line weight varies with depth. |
| Decorative Japanese that is wrong | Japanese is limited to a short, checked list of real production terms, always paired with English. |
| Flashing with no safe option | Impact frames obey reduced-motion, never exceed three flashes a second, and can be turned off from the nav. |
| Display type used for paragraphs | Display face for titles only; a text face for reading. |

## C. Recent portfolio winners worth studying (read — Awwwards listings)

| Site | Why it is on the board |
|---|---|
| [jesperlandberg.com](https://www.awwwards.com/sites/jesper-landberg-portfolio) | Best balance of motion score and performance score in the 2026 set; GSAP + Three.js. |
| elliott.mangham.dev | Single page, no heavy 3D, still Site of the Day — proof that timing and type carry a portfolio. |
| bleibtgleich.com | Typography-led storytelling. |
| gianlucagradogna.com | Horizontal layout, clip animations, loading and page transitions as one system. |
| phantom.land | Infinite scroll combined with 3D gestures. |
| 197historiasilustradas.com | Illustration-led storytelling on Next.js + Three.js with a good performance score. |

To revisit visually during look-dev: Corentin Bernadou's portfolio (Swiss grid plus Figma-style rulers), "They Call Me Giulio" (cinematic, multiple render targets), "Sketching the Impossible" (a 3D portfolio with no 3D models).

## D. Techniques and where they come from

| Need | Technique | Source |
|---|---|---|
| Toon shading | `MeshToonMaterial` + gradient map; custom two-tone ramp with hue-shifted shadow | [three.js toon example](https://threejs.org/examples/webgl_materials_toon.html) |
| Outlines on meshes | Inverted hull | [drei Outlines](https://drei.docs.pmnd.rs/abstractions/outlines) |
| Pencil / ink lines over a scene | Sobel edge detection on depth + normals, with hand-drawn wobble and cross-hatch shadows | [Maxime Heckel — Moebius-style post-processing](https://blog.maximeheckel.com/posts/moebius-style-post-processing/) |
| Screentone | Dot grid with `fwidth` anti-aliasing, rotated per channel | [Maxime Heckel — Shades of Halftone](https://blog.maximeheckel.com/posts/shades-of-halftone/) |
| Speed lines, impact frames | Polar-angle posterised noise in a full-screen pass, driven by a short "impact" uniform. No good three.js tutorial exists; ported from shader references. | [reference shader](https://github.com/mirzabeig/anime-speed-lines) |
| Section and page transitions | Persistent canvas outside the swapped content; clip-path panel cuts in DOM; shader wipe between two render targets | [three.js transition example](https://threejs.org/examples/webgl_postprocessing_transition.html), [Next.js View Transitions](https://nextjs.org/docs/app/guides/view-transitions) |
| Scroll-driven camera | Lenis drives scroll; GSAP ticker drives Lenis; ScrollTrigger scrubs camera targets | [Lenis README](https://github.com/darkroomengineering/lenis) |
| Kinetic type | GSAP SplitText; variable-font width and weight axes | [SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/) |
| Magnetic buttons, cursor follow | `gsap.quickTo()` | GSAP docs |

## E. Tooling facts checked today

| Tool | Version | Note that affects our decision |
|---|---|---|
| Next.js | 16.4.6 | Turbopack is default. View Transitions work in the App Router through React's `<ViewTransition>`. |
| React | 19.3.1 | Inside React Three Fiber's supported range (`>=19 <19.4`). |
| three.js | 0.187.0 | WebGPU renderer exists and falls back to WebGL 2, but it does not support `ShaderMaterial` or `EffectComposer`. Every GLSL technique above needs the classic WebGL renderer. |
| React Three Fiber / drei | 9.8.2 / 10.7.9 | Stable. Fiber 10 (WebGPU-first) is still alpha. |
| postprocessing | 6.39.6 | Requires three below 0.188, so three is pinned. |
| GSAP | 3.15.1 | All plugins free for commercial use since April 2025. Free, not open source. |
| Lenis | 1.3.28 | Package is `lenis`; the old `@studio-freight/lenis` is deprecated. |
| Tailwind CSS | 4.3.5 | Stable. |
| TypeScript | 7.0.2 | — |
| Theatre.js | 0.7.2 (May 2024) | Stalled. Not used. |
| WebGPU support | about 89% of browsers | Safari on macOS is partial; Firefox is inconsistent. Not a safe sole target yet. |

## F. Performance practice we will follow

- A `<canvas>` cannot be the Largest Contentful Paint element. The hero headline is server-rendered HTML and paints first; WebGL starts after ([web.dev LCP](https://web.dev/articles/lcp)).
- Render on demand, cap device pixel ratio, step quality down automatically when frame rate drops ([R3F scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)).
- Bruno Simon's site ships a low preset on mobile that turns post-processing off and lowers shadow resolution ([case study](https://www.awwwards.com/brunos-portfolio-case-study.html)). We do the same, in three tiers.
- Compress geometry and textures in the build with gltf-transform ([CLI](https://gltf-transform.dev/cli)).

## G. Assets and licences

| Asset | Candidates | Licence |
|---|---|---|
| Display type | Archivo (width + weight axes), Anton, Big Shoulders Display | SIL OFL |
| Editorial serif | Instrument Serif | SIL OFL |
| Text | Inter, Geist | SIL OFL |
| Mono | JetBrains Mono, Martian Mono (width axis) | SIL OFL |
| Japanese accents | Zen Kaku Gothic New, Dela Gothic One | SIL OFL |
| Devanagari accent | Tiro Devanagari Hindi, Rozha One | SIL OFL |
| Textures, HDRIs | Poly Haven | CC0 |
| UI sound | Kenney interface sounds (to be re-checked at download) | CC0 |

Not usable: fonts lifted from anime title cards, "free for personal use" fonts, ripped anime audio or screenshots, fan-made UI kits based on a game or show.

## H. quicklive.tech (seen, 24 Nov 2026 — reference supplied by Divyanshu)

| What it does | What we take | What we leave |
|---|---|---|
| Loader: huge outlined wordmark that fills with a colour wave, rolling odometer percentage, "initializing environment…" line, a ribbon snaking across | Name in outline filled by rising ink; rolling page counter | Its length — it sat at 0% for several seconds |
| Hero: giant condensed caps, one word in a torn/slashed highlight; cursor-reactive 3D wall of blocks behind | Slashed word under a red brush stroke; halftone or panels reacting under the cursor | Neon yellow on black |
| Two crossed, tilted marquee tapes between sections | Black ink tapes with stack and status text | — |
| Section headers with a ghost number and a `// label` | Outlined chapter numbers behind headings | — |
| Numbered list rows, active bright and next dimmed, arrow at right | Projects and services lists | — |
| Five theme dots in the nav that recolour the site live | Blood / Aged switch, more accents later | — |
| Thin progress line on the left edge; ribbon trail following scroll | Progress line; ink brush trail | — |
| Ending: 3D ring of floating cards over a glowing floor | Project cards as a ring of manga pages | The glow |

## I. Look-dev findings (built and viewed locally, `lookdev/index.html`)

- Flat colour swatches were rejected twice as "AI-looking". Colour only reads correctly with real type, grain and ink texture, so every visual decision from now on is shown as a live page.
- Four dark-and-light colourways were tested (Oxblood, Field, Manga page, Cursed). Only the light **manga page** was liked.
- Five manga-page variants followed (Orange, Blood, Yellow, Aged, Indigo). **Blood** and **Aged** were chosen.
- Confirmed working together: Anton display type, outlined second word, Shippori Mincho vertical chapter mark, SVG grain, halftone corner, rough brush slash, black angled panels.
- Requested by Divyanshu: animation throughout and a moving anime-style background. Clips from the actual shows are ruled out for copyright; original footage is used instead.

## J. Honest gaps in this research

- Godly, SiteInspire and FWA could not be read by automated fetch, so section C leans on Awwwards.
- Codrops pages could not be fetched directly; those entries rest on search results and will be opened in the browser during look-dev.
- Dogstudio has no public technical write-up.
- Only the first screen or two of each flagship site was inspected. Deeper interaction study (page transitions, mobile behaviour) is scheduled in the look-dev phase, against the specific thing being built at that moment.
