# 04 — Experience Map

What a visitor sees, in order, and what each part is for. Read with doc 03 (creative direction).

> **Updated for direction v2 (manga page).** The sections, order, content and responsive rules below still hold. The styling words change: "cut" is now "chapter", cut frames are manga panels, the timecode rail is a left-edge progress line with chapter numbers, stamps are black ink tags, and the hero centrepiece is the giant name over a red brush slash with an original moving ink background (not a pull-apart cel stack). Additions from quicklive.tech: ink-fill name loader, crossed marquee tapes at chapter breaks, ghost chapter numbers, a theme control (Blood / Aged), and an optional 3D ring of project pages. Where this note and the text below disagree, this note and doc 03 win.

### Chapter list

| Chapter | Section |
|---|---|
| 00 | Loader |
| 01 | Opening (hero) |
| 02 | Selected work |
| 03 | The stack |
| 04 | Story |
| 05 | Experience (My Dukan internship, education) |
| 06 | Receipts (hackathons) |
| 07 | Services |
| 08 | Contact, then credits |

## Who is visiting and what they need

| Visitor | Time they give | Must find |
|---|---|---|
| Recruiter or hiring engineer | 30–60 seconds | Who, what stack, proof, a link to code |
| Freelance client | 2–3 minutes | What he can build for me, has he shipped, how to reach him |
| Hackathon peer or developer | Longer | How things were built, the repo |
| Design-curious visitor | As long as it is fun | Something to play with |

Rule that follows: **name, role, proof and contact are readable within five seconds, with JavaScript off.** Everything else is reward.

## Routes

| Route | Purpose |
|---|---|
| `/` | The film: one scroll, nine sections |
| `/work/aawaz` | Case study |
| `/work/samadhan` | Case study |
| `/work/legal-timelock-network` | Case study |
| `/work/zyvora` | Case study |
| `/404` | "Missing cut" page with a way back |

## Persistent interface

- **Top bar**: name mark (left); `Work`, `Contact` (right); line/colour switch; sound switch once sound exists.
- **Timecode rail** (desktop, right edge): cut number, timecode, section ticks. Click or arrow keys jump between sections.
- **Cut list** (menu overlay): all sections and projects laid out as a storyboard index. The full navigation for keyboard and mobile users.
- **Skip link**: first focusable element, jumps to main content.

## The film — section by section

### 0. Leader (preloader)
- **Purpose:** hide nothing. Show the first frame being drawn while assets arrive.
- **What happens:** the page's real headline is already painted as HTML. Over it, the hero's pencil rough draws on; a frame counter runs with actual load progress.
- **Limits:** capped at about 2 seconds; skipped on repeat visits and in reduced motion.

### 1. Opening — CUT 001 · Storyboard
- **Says:** who he is, what he builds, why to hire him.
- **Content:** name; "Full stack, frame by frame."; one support sentence; location and status ("Full Stack Developer Intern at My Dukan · open to freelance"); two CTAs.
- **Centrepiece:** the finished frame (character at the desk, lake and city beyond) that pulls apart into labelled cels.
- **Entrance:** pencil lines draw on (cel timing), title type sets itself from condensed to wide (camera timing), the stack gives one small breath apart and back so visitors learn it moves.
- **Reward:** drag or hold to separate the layers; each cel shows its layer name and the tools he uses there.
- **Mobile:** layers respond to touch drag and gently to device tilt; a "pull apart" button does the same for people who never drag.

### 2. Key frames — CUT 002 · Selected work
- **Says:** here are four things he actually built.
- **Layout:** a storyboard sheet. Four large panels, one per project, each with cut number, title, role, one-line problem, stack in mono, and status stamp (LIVE / REPO / AWARD).
- **Preview:** hovering or focusing a panel plays a short silent loop recorded from the real product. Aawaz, which has no live demo, shows its animated signal-chain diagram.
- **Interaction:** panel opens with "cut to" into the case study.
- **Mobile:** panels stack vertically; previews play when centred in view; tap opens.
- **Below the panels:** a single-line archive of other builds (CampusMart, FinNext, Campus Flow, HH Goa ID) with live links where they exist.

### 3. The stack — CUT 003 · In-betweens
- **Says:** the full range of what he works with, organised by layer rather than as a logo wall.
- **Layout:** the cel stack returns, now seen side-on as five sheets: Interface, API and services, Data, AI and automation, Ship. Each sheet lists its technologies in mono.
- **Interaction:** selecting a sheet lifts it out and highlights which featured projects used it — capability tied to evidence.
- **Mobile:** an accordion of five sheets; same content, no 3D.

### 4. Story — CUT 004 · In-betweens
- **Says:** who the person is.
- **Layout:** a real storyboard page: picture column, action column, dialogue column. Four or five panels: Bhopal; B.Tech CSE at OIST (2024–2028); learning by building; hackathons; now.
- **Tone:** his own lines sit in the dialogue column in serif italic.
- **Motion:** panels ink in as they enter; nothing scrubs.

### 5. Production history — CUT 005 · Paint
- **Says:** where he works and studies.
- **Layout:** an exposure sheet used as a timeline. Rows: My Dukan (Full Stack Developer Intern, 11 Sep 2026 – present: App Store release, production Razorpay integration, mobile OTP login), freelance (available), education. A tape-yellow marker shows "now".

### 6. Receipts — CUT 006 · Camera
- **Says:** other people have judged this work and rated it.
- **Layout:** cut envelopes on the desk, one per hackathon. Each has the event, the project built, and a stamp with the result.
- **Interaction:** stamps land with a cel-timed thud as each envelope enters; hovering draws the director's red circle.
- **Honesty:** results use the exact confirmed wording; unconfirmed ones do not ship.

### 7. Commission — CUT 007 · Delivery
- **Says:** what a client can hire him for.
- **Layout:** four service lines as large type rows, each with a plain-language description and the relevant proof project. No prices, no fake client logos.
- **CTA:** "Start a project".

### 8. Next episode — CUT 008 · Contact
- **Says:** talk to him.
- **Layout:** styled as a next-episode preview card: "Next episode: your project." The frame is now fully painted and lit — the visual pay-off of the whole scroll.
- **Actions:** email (opens mail app, with a copy button and a confirmation), GitHub, LinkedIn, Instagram. Every link is real and labelled.
- **No form** in version one: a form needs a backend or a third-party service that would receive visitors' data. It can be added later if wanted.

### 9. Ending — credits
- **Layout:** a slow credits roll: role credits, then the colophon — typefaces, libraries, licences.
- **Last line:** back to top as "Replay".

## Case study template (`/work/[slug]`)

1. **Envelope header** — title, role, stack, links (live, repo), status stamps.
2. **The scene** — the problem, in two or three sentences.
3. **Key frames** — three or four annotated screens or diagrams showing the solution, with red-pencil callouts.
4. **My cut** — what he personally built.
5. **How it works** — one original architecture or flow diagram, animated on scroll.
6. **Result** — the real outcome: an award, a live link, or an honest "prototype".
7. **Next cut** — the next project, with the same "cut to" transition.

Each case study is server-rendered text first; visuals enhance it.

## Responsive intent

| | Desktop (≥1200) | Tablet (768–1199) | Mobile (<768) |
|---|---|---|---|
| Hero | Full WebGL cel stack, drag and hold | WebGL, simplified layers | Lightweight layered scene, touch and tilt, button fallback |
| Navigation | Top bar + timecode rail | Top bar + cut list | Top bar + cut list, thumb-reachable |
| Work | Storyboard grid with hover loops | Two-column | Single column, in-view autoplay |
| Stack | 3D sheets | 2D sheets | Accordion |
| Cursor effects | On | Off | Off |
| Scroll | Smooth, scrubbed camera | Smooth, fewer scrubs | Native scroll, entrance animations only |

Mobile is designed as its own cut of the film, not a shrunken desktop: shorter shots, no hover dependence, larger touch targets (minimum 44 px), and no scroll-hijacking.

## States that are easy to forget

- Loading, and loading on a slow connection
- WebGL unavailable or context lost → static illustrated frame
- JavaScript disabled → complete readable page
- Reduced motion → designed alternative
- Keyboard only → every interaction reachable, focus always visible
- Very wide (≥1920) and very short (landscape phone) viewports
- External link down → link still labelled honestly; nothing pretends to be live
