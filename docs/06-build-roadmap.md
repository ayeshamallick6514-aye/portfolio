# 06 — Build Roadmap

How the site gets made, in order. Each stage ends at a **gate**: a thing that can be looked at and judged. Work does not move on until the gate is passed.

The ordering principle: **content and structure first, look second, spectacle third.** A beautiful hero on top of a broken page is worth nothing, and a finished plain page can always be made beautiful.

## Status on 24 Nov 2026

| Stage | State |
|---|---|
| 0 Discovery | Done |
| 1 Foundation | Done |
| 2 Look-dev | Done: colour and type chosen from live pages; moving hero built |
| 3 Opening | Done |
| 4 Work | Done: six project pages, real screenshots of five live products |
| 5 Rest of the film | Done: all eight chapters and credits |
| 6 Mobile cut | Done in emulation; **not yet checked on a physical phone** |
| 7 Test | Done: 42 automated checks pass; Lighthouse 100 across categories locally |
| 8 Critique | Two rounds done (see doc 05 for what changed) |
| 9 Ship | Not started. Needs a domain, a deployment target and a go-ahead |

A second pass on 24 Nov 2026 added original anime art and much stronger motion (see doc 03). All 42 checks still pass after it.

Still open: Safari and Firefox have not been run (tests use Chromium); a screen-reader pass has not been done by ear; the numbers are local, not from a deployed URL.

## Stage 0 — Discovery ✅ done (24 Nov 2026)

- Read the resume, README and public repos; recorded every usable fact and every gap (doc 01).
- Inspected the flagship reference sites live and gathered written sources (doc 02).
- Defined the concept, identity and motion language (doc 03), the section-by-section experience (doc 04) and the architecture (doc 05).

## Stage 1 — Foundation

- Initialise git locally (no remote, no push).
- Scaffold Next.js 16 + TypeScript + Tailwind 4; add ESLint, Prettier, Playwright.
- Write design tokens (colour, type scale, spacing, motion) as CSS variables.
- Self-host and subset the typefaces; run the type specimen test.
- Build the typed content layer from doc 01, with the TBC report.
- Build the layout shell: top bar, cut list, skip link, footer.

**Gate 1:** a plain but fully styled, content-complete site — every section and all four case studies as real HTML. Works with JavaScript off. Lighthouse accessibility and SEO at 100. Screenshots at five widths reviewed.

## Stage 2 — Look-dev: colour and type ✅ done early (24 Nov 2026)

Done before Stage 1 because the first palette was rejected. Outcome: manga-page direction, **Blood** default with **Aged** alternate, type stack confirmed (see doc 03 v2 and doc 02 sections H–I). The test page is `lookdev/index.html`.

What remains of look-dev is the **moving hero**: background footage route (shader, generated loop, or supplied footage), entrance animation, loader. It is the next thing built, and it is shown moving before the rest of the site is styled. The experiments table below is superseded for colour and type; its art-route idea now applies to the background footage.

## Stage 2 (original plan, kept for reference)

One screen only: the hero. Time-boxed experiments, each judged in a real browser:

| Experiment | Question it answers |
|---|---|
| Art route A — hand-authored vector cels | Can a silhouette-and-rim-light scene, drawn as SVG, carry the hero? |
| Art route B — generated illustration, cleaned and split into layers | Does it look better than A, stay original, and separate cleanly into cels? |
| Art route C — small toon-shaded 3D set | Does real geometry give a better pull-apart and stage-by-stage rendering? |
| Shader look | Pencil rough → ink → screentone → paint, as one adjustable pass |
| Type | Archivo width animation at hero size; pairing with the serif and mono |
| Palette | Paper, room, pencil blue, red — on real screens, light and dark surroundings |

No personal details go into any image prompt. Generated art is used only if it is original in subject and style and can be legally used; otherwise route A or C wins.

**Gate 2:** one hero frame, desktop and mobile, that I would put next to the reference board without embarrassment — shown to you with the reasoning for the route chosen. This is the main point where your taste should steer.

## Stage 3 — Opening sequence

- Persistent canvas, store, scroll controller (Lenis + GSAP), quality tiers.
- Cel stack: pull-apart interaction with drag, hold, keyboard and button.
- Leader/preloader tied to real load progress.
- Kinetic title, CTAs with magnetic behaviour, timecode rail.

**Gate 3:** hero is complete in all three tiers; LCP under 2 s on a throttled mobile profile; keyboard walk-through passes.

## Stage 4 — Work

- Capture real media: screenshots and short loops from the live Zyvora, Legal TimeLock Network and Samadhan sites; build the Aawaz signal-chain diagram.
- Key frames storyboard section with previews.
- Case study template and the four case studies.
- "Cut to" transition between the film and case studies, and between case studies.

**Gate 4:** all four case studies read well on their own, every link works, transitions hold up on back/forward navigation.

## Stage 5 — The rest of the film

- The stack (interactive layer sheets tied to projects).
- Story (storyboard page).
- Production history (exposure-sheet timeline).
- Receipts (cut envelopes and stamps).
- Commission (services).
- Next episode (contact) and the credits roll.
- The stage-by-stage rendering shift across the whole scroll.

**Gate 5:** full scroll, top to bottom, feels like one piece with a clear visual arc from rough to finished.

## Stage 6 — Mobile cut and alternative modes

- Mobile-specific layouts, touch and tilt interactions, native scroll.
- Tier B and Tier C tuned by hand, not left as fallbacks.
- Reduced-motion version reviewed as a design in its own right.
- Line/colour switch. Optional sound.

**Gate 6:** the site on a real phone is something you would show first, not apologise for.

## Stage 7 — Test everything

| Area | How |
|---|---|
| Visual | Playwright screenshots of every route at 375, 768, 1024, 1440, 1920; reviewed one by one |
| Interaction | Every button, link, hover, drag, keyboard path and transition exercised in a real browser |
| Accessibility | axe automated checks; manual keyboard pass; screen-reader pass; contrast check |
| Performance | Lighthouse on the production build, mobile and desktop; frame-rate profile during scroll; bundle analysis against the budget |
| Browsers | Chrome, Safari, Firefox on desktop; Safari iOS and Chrome Android |
| Failure states | JavaScript off, WebGL off, slow network, reduced motion, context loss |
| Content | Every fact traced back to doc 01; every TBC either resolved or visibly marked |

**Gate 7:** all checks pass, with results written down — including anything that did not pass.

## Stage 8 — Critique and iterate (at least two rounds)

Each round: take fresh screenshots of every section, name the three weakest moments, fix them, re-shoot. Typical targets: a section that feels like a template, a transition whose timing is off, type that is nearly right, a mobile shot that is cramped. The round ends when the weakest section would have been the strongest one a round earlier.

## Stage 9 — Ship (only on your word)

- Open Graph image, favicons, metadata, structured data, sitemap.
- Final production build and report.
- Deployment and any push to GitHub happen only when you ask, to the place you name.

## Risks and how they are handled

| Risk | Likelihood | Response |
|---|---|---|
| The hero art does not reach the quality bar | Medium | Three routes are tried in Stage 2 before anything depends on it. Fallback is a strong typographic and line-art hero, which the concept supports. |
| WebGL hurts performance on mid-range phones | High if ignored | Tiers are built from Stage 3, not bolted on. Phones never get post-processing. |
| The metaphor becomes a costume and gets in the way | Medium | The five-second rule (name, role, proof, contact) is tested at every gate with the effects switched off. |
| Japanese or Devanagari text is wrong | Low | Fixed, short vocabulary; spelling confirmed with you before it ships. |
| Missing facts (My Dukan details, award wording) | Certain for now | Placeholders are tracked in one report and visibly marked; nothing is guessed. |
| Scope grows without end | Medium | Gates. Sound and the line/colour switch are explicitly optional. |
| Generated imagery resembles existing characters | Low–medium | Back-view original character, reviewed before use; routes A and C need no generation at all. |

## What I need from you, and when

| When | What |
|---|---|
| Any time before Stage 5 | Answers to the open questions in doc 01 (My Dukan details, award wording, NASA Space Apps details) |
| Before Stage 4 | Aawaz screenshots or a demo clip, if you have them |
| At Gate 2 | A look at the hero and a yes, no, or "more like this" |
| Before Stage 9 | Domain, deployment target, whether `docs/` should be in the repo |
