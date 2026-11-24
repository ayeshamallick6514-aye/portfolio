# 05 — Technical Architecture (as built)

Rewritten on 24 Nov 2026 to describe what is in the repository. Where this differs from the original plan, the reason is given.

## Stack

| Layer | Choice | Version | Why |
|---|---|---|---|
| Framework | Next.js, App Router, every page prerendered | 16.4.6 | Divyanshu's own main stack, so the site is itself evidence and he can maintain it |
| Language | TypeScript, strict | 5.x | Typed content catches missing fields at build time |
| UI | React | 19.3 | Required by Next |
| Styling | Tailwind CSS 4 for the token bridge, hand-written CSS for the art direction | 4.3 | The design is too bespoke for utility classes alone; tokens are CSS variables shared by CSS, GSAP and the shader |
| Scroll and timeline animation | GSAP with ScrollTrigger, SplitText, CustomEase | 3.15 | Scrubbed, choreographed motion; all plugins are free for commercial use |
| Smooth scroll | Lenis | 1.3 | Mouse and trackpad only; touch devices keep native scroll |
| Hero background | Hand-written WebGL fragment shader, no library | — | See "Changed from the plan" |
| Tests | Playwright and axe-core | 1.65 / 4.14 | Content, navigation and accessibility in one suite |

### Changed from the plan

- **No three.js or React Three Fiber.** The approved direction is flat ink on paper. The only GPU work is one full-screen fragment shader (halftone ink clouds), which is about 150 lines of raw WebGL. Adding three.js would have cost roughly 150 KB of JavaScript for nothing visible.
- **No Motion (Framer Motion), no Theatre.js, no CMS, no analytics.** Unchanged from the plan.
- **Custom page transition instead of the View Transitions API.** A small ink-wipe overlay works the same in every browser and can carry the impact frame.
- **The 3D ring of project pages was dropped.** Slanted manga panels with printed-to-colour screenshots carry the work section better.

## Next.js 16 specifics that shaped the code

Read from the documentation bundled in `node_modules/next/dist/docs`:

- `cacheComponents` and `partialPrefetching` are on (the scaffold default). Route segment options such as `dynamic` and `revalidate` no longer exist.
- `params` is a Promise. Case studies use `PageProps<"/work/[slug]">`, `generateStaticParams`, and `notFound()`.
- `ensureStatic = "navigation"` on the case-study route makes an unknown slug wait for the full render, so it returns a real 404 status rather than a 200 with a streamed shell.
- Client components that call `usePathname` sit inside `<Suspense>` in the root layout.
- No `new Date()` or `Math.random()` in server components.
- Theme and motion preference are restored by a small inline script in `<head>` before first paint; `<html>` carries `suppressHydrationWarning`.

## Rendering model

1. **HTML first.** Every section is a server component with real text. With JavaScript off the site is complete and readable, and a test proves it.
2. **The name is the loader.** On the first visit of a session the real `<h1>` is painted at first paint; a paper-coloured mask carrying its outline drains away while a counter rolls. Nothing covers the page, so Largest Contentful Paint happens at first paint.
3. **Motion second.** GSAP attaches after hydration. Headlines are split into lines only when they are about to scroll into view.
4. **WebGL last.** The shader starts after the loader hands over (or 400 ms after first paint on later visits), runs at 24 to 33 frames a second, and stops when the hero is off screen or the tab is hidden.

## Motion and accessibility rules in code

- **Motion preference** lives on `<html data-motion>`. It follows the operating system setting and can be switched from the top bar. With motion off: no smooth scroll, no reveals, no loader, no cursor trail, one still frame of the shader.
- **Reveals never use `visibility: hidden`.** Content waiting to animate is hidden with opacity or clip-path, so it can still take keyboard focus and be found with find-in-page. Focusing it scrolls it into view, which reveals it.
- **Impact frames** are a single frame, never repeated, and never red.
- **Colour contrast** for every text pair in every theme is at least 4.5:1, checked by `scripts/contrast.mjs` and by axe in the test suite.
- The chapter menu is a native `<dialog>`, so focus trapping and Escape come from the browser.
- The canvas, tapes, ghost numerals and the figure are `aria-hidden`; everything they show exists as text.

## Images

Screenshots of the live products are captured with Playwright (`scripts/capture.mjs`), stored in `assets/captures`, and built into AVIF and WebP at 640, 1100 and 1600 px (`scripts/build-media.mjs`). The `<Shot>` component renders a plain `<picture>` from a generated manifest, so there is no runtime image service. Fifteen shots total 2.5 MB across all sizes and formats.

In the work grid they are shown greyscale and multiplied onto the paper, like a printed page, and turn to full colour on hover or focus.

## Measured results (production build, 24 Nov 2026)

Lighthouse, run locally against `next start`, so network conditions are simulated rather than real:

| Page | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Home, phone | 100 | 100 | 100 | 100 | 0.9 s | 40 ms | 0.002 |
| Home, desktop | 100 | 100 | 100 | 100 | 0.2 s | 0 ms | 0.006 |
| Case study, phone | 100 | 100 | 100 | 100 | 0.8 s | 10 ms | 0 |
| Case study, desktop | 100 | 100 | 100 | 100 | 0.2 s | 0 ms | 0 |

Two findings along the way: the first loader design covered the page and pushed phone LCP to 3.9 s (performance 70), which is why the loader became the heading itself; and fonts swapping in shifted the hero by 0.05, fixed by preloading all four faces.

These numbers will be lower on a real phone over a real network. They have not been measured on a deployed URL yet.

## Artwork pipeline (added in the second pass)

- `scripts/gen-art.mjs` submits generic scene prompts to AI Horde with its anonymous key and saves the results. No account, no payment, no personal details in any prompt.
- Chosen originals live in `assets/art`. `scripts/build-art.mjs` converts them to greyscale, upscales 2x with a contrast lift so the ink stays crisp, and writes AVIF and WebP at 800, 1400 and 2200 px to `public/art`, recording sizes in `src/content/art.json`.
- `<Art>` renders a plain `<picture>` with an empty alt (the art is decoration). Black-on-white art is multiplied onto paper or the accent colour by CSS, so it takes on the theme.
- `<LivingArt>` (hero) draws the image with a second small WebGL shader: white becomes transparent, the ink takes the theme's ink colour, and the image is bent like cloth in wind at 12 steps a second. The plain image underneath is the fallback when WebGL is unavailable or motion is off.

Second-pass Lighthouse on the production build: home on a phone 96 / 100 / 100 / 100 (LCP 0.9 s, TBT 240 ms, CLS 0.003, 515 KB transferred); home on desktop and case studies 100 across the board. The 4-point drop on phones is the extra start-up script.

## Tests

`npm run test` builds the site, serves it, and runs 44 checks on a desktop and a phone profile (42 run, 2 are profile-specific skips):

- identity, all eight chapters, no console errors
- readable with JavaScript disabled
- loader plays once per session
- external links open safely in a new tab
- theme and motion preferences apply and persist
- skip link, panel-to-case-study navigation and back, phone menu
- unknown addresses return 404
- every case study shows its facts, links and loaded images with alt text
- axe: no WCAG A or AA violations on the home page and two case studies; contrast in the other three themes

## Privacy

- Personal details exist only in `src/content/` and `docs/`.
- Fonts are self-hosted by `next/font`; there are no third-party requests at runtime.
- No analytics, no trackers, no form that sends visitor data anywhere.
- Nothing has been pushed or deployed.
