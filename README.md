# Ayesha Perveen — Portfolio

**A portfolio that reads like a manga volume.** Bone paper, heavy black ink, one accent colour, and motion timed like an anime cut. Every project is a chapter.

I'm an AI & Software Engineer from Bhopal, India. This is the site I built to showcase my work across explainable AI security on Algorand, GovTech RAG platforms, cryptographic log integrity, and production engineering.

## What's inside

The site is one long page in eight chapters, plus a full page for each project.

| Chapter | What it shows |
|---|---|
| 01 Opening | Name, role, current role at BTG Venture, and living ink illustration |
| 02 Selected work | VERITAS, UNITY, LogAnchor-X, Halcyon 2000, Zyvora |
| 03 Stack | Seven layers, from languages to shipping, that stack as you scroll |
| 04 Story | Manga panels and authentic off-the-page photos |
| 05 Experience | AI & Technology Internship at BTG Venture, education at OIST Bhopal |
| 06 Receipts | SIH 2026, MPOnline 2026, CII Yi IDS Hackathon, NPTEL IIT Madras |
| 07 Services | What I build: AI & RAG, Full Stack, Security & Web3, MVP sprints |
| 08 Contact | Email and social links |

Each project page covers the problem, the answer, what I built, how it flows, real screenshots and the result.

## Highlights

- **The name is the loader.** The heading is painted on the first frame and fills with ink while the page loads, so nothing blocks the content.
- **The hero art moves.** A small WebGL shader ripples the figure's coat in the wind at 12 steps a second, like hand-drawn animation.
- **Scroll does the storytelling.** The stack layers pile up, an eye close-up cuts in, receipts drop into place, and project panels tilt toward the pointer.
- **Four colourways.** Blood (default), Aged, Indigo and Moss share one system of paper, ink and a single accent. The choice is remembered.
- **Motion is optional.** A switch in the top bar turns all animation off, and the site follows the system's reduced-motion setting.
- **It works without JavaScript.** Every section is server-rendered text first; animation is layered on top.

## Built with

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, every page prerendered), React 19, TypeScript |
| Styling | Hand-written CSS with design tokens, Tailwind CSS 4 as the token bridge |
| Motion | GSAP (ScrollTrigger, SplitText), Lenis smooth scroll |
| Graphics | Two hand-written WebGL fragment shaders, no 3D library |
| Images | AVIF and WebP at several widths, built ahead of time with sharp |
| Tests | Playwright and axe-core |

## Quality

- **Tests:** 42 automated checks on a desktop and a phone profile cover content, navigation, the loader, themes, 404s, a JavaScript-off run and accessibility.
- **Accessibility:** no WCAG A or AA violations reported by axe, and every text pair in every theme meets 4.5:1 contrast.
- **Performance:** Lighthouse on a local production build last scored 96 for performance on a phone profile and 100 for accessibility, best practices and SEO. Desktop and project pages scored 100 across the board.

## Run it locally

You need Node.js 20.9 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run check` | Lint, type-check and run the tests |
| `npm run test` | Playwright tests only (builds and serves on port 3100 itself) |
| `npm run media` | Rebuild project screenshots from `assets/captures` |
| `node scripts/build-art.mjs` | Rebuild the ink artwork from `assets/art` |
| `node scripts/contrast.mjs` | Print contrast ratios for every theme |

## Project layout

```
src/
  content/        every fact on the site: profile, projects, career
  app/            layout, home page, /work/[slug] project pages, 404, sitemap, robots
  components/
    hero/         name, brush stroke, ink shader, intro animation
    sections/     chapters 02 to 08
    chrome/       top bar, menu, loader, page transition, cursor, scroll effects
    ui/           chapter headings, tapes, screenshots, artwork, photo strip
  styles/         hero, section and project-page CSS (tokens are in app/globals.css)
  lib/            GSAP setup, motion and theme preferences, site address
assets/           source screenshots and artwork
public/           optimised images, fonts and the social preview image
scripts/          image builds, contrast check, screenshot helpers
tests/            Playwright suite
docs/             research, creative direction, architecture and roadmap
```

### Editing content

Everything the site says comes from `src/content/`. Change a project, a result or a job there and every page that uses it updates. Nothing is hard-coded in components.

## Deploying

The site deploys to Vercel with default settings: import the repository and press **Deploy**. The sitemap, canonical links and social preview image pick up the Vercel domain on their own (see `src/lib/site-url.ts`).

For a custom domain, set the environment variable `NEXT_PUBLIC_SITE_URL` to that address and redeploy.

## Design notes

The look borrows craft from manga and anime (dense ink, wide quiet frames, impact cuts) without copying any series. The full reasoning is in [`docs/`](docs/README.md): the research board, the creative direction, the section-by-section experience map and the technical architecture.

## Credits

- **Typefaces:** Anton, Archivo, Instrument Serif, JetBrains Mono and Shippori Mincho, all under the SIL Open Font License.
- **Motion:** GSAP and Lenis.
- **Illustrations:** original ink pieces generated for this site on AI Horde with an anime-trained model. None depicts an existing character.
- **Screenshots:** taken from my own live projects.

The code is here to read and learn from. The written content, photos and project media are personal; please don't reuse them.

## Contact

- GitHub: [ayeshamallick6514-aye](https://github.com/ayeshamallick6514-aye)
- LinkedIn: [ayesha-perveen-a83339309](https://linkedin.com/in/ayesha-perveen-a83339309)
- Email: [ayeshamallick6514@gmail.com](mailto:ayeshamallick6514@gmail.com)
