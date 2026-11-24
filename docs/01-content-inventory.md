# 01 — Content Inventory

Everything the site is allowed to say. Sources, in priority order:

1. Your answers in chat (24 Nov 2026)
2. Resume PDF (`DOC-20260910-WA0015.pdf`)
3. GitHub profile README and public repo data (`dimcodes09`)

Rule: nothing goes on the site unless it is in this file. Anything marked **TBC** is unconfirmed and will ship as a clearly labelled editable placeholder, never as an invented fact.

---

## Identity

| Field | Value | Source |
|---|---|---|
| Name | Divyanshu Kubde | chat, resume |
| Title | Full Stack Developer (resume says "Full Stack Software Engineer") | chat, resume |
| Location | Bhopal, Madhya Pradesh, India | resume, README |
| Handle | dimcodes09 | chat |
| Status | Full Stack Developer Intern at My Dukan since 11 Sep 2026 (ongoing); available for freelance | chat |
| Philosophy | "Learn by building real things, not isolated tutorials." "Shipping > scrolling." "Full stack · no fluff · real ship." | README |
| Currently learning | Go, DevOps, CI/CD pipelines | README |

### Public contact (shown on site)

- Email: divyanshukubde8@gmail.com (already public on GitHub and the resume)
- GitHub: https://github.com/dimcodes09
- LinkedIn: https://www.linkedin.com/in/divyanshu-kubde-966740332/
- Instagram: https://www.instagram.com/divyanshu_kubde

No phone number, no home address, no other email goes on the site or into any external request.

---

## Summary (resume, lightly edited for voice)

Full stack developer specialising in scalable web applications, DevOps automation and AI-driven backend systems. Designs distributed architectures, REST APIs and CI/CD pipelines with Next.js, Node.js, Go and TypeScript. Works with Docker-based deployments, blockchain-based system design and AI integration.

---

## Featured projects (the four from the resume — these get full case studies)

### 1. Aawaz — AI Voice Fraud Detection Platform
- **Role:** Android + ML Engineer
- **Stack:** Kotlin, React Native, WebRTC, ONNX Runtime, RawTFNet-32, Python, FastAPI, Go, PostgreSQL, Redis
- **Repo:** https://github.com/dimcodes09/Aawaz (public)
- **Live:** none
- **Problem:** Voice-cloning scams impersonate real people on calls; detection has to be real-time and cannot store private audio.
- **Solution / contribution (resume):**
  - On-device detection pipeline: WebRTC remote-audio streams, Kotlin audio processing, RawTFNet-32 via ONNX Runtime, tuned for 16 kHz speech and real-time risk scoring.
  - Fine-tuned RawTFNet-32 on Hindi/Hinglish and modern regional TTS / voice-cloning attacks; built a real-vs-synthetic evaluation pipeline; exported the model for Android inference.
  - Privacy-first architecture: RAM-only audio processing, real-time risk aggregation, transaction interlocks that trigger step-up verification on high synthetic-voice risk.
  - Designed a future "Mode B" carrier-call protection layer (telephony conference/bridge, Go/WebSocket signalling, FastAPI + PostgreSQL + Redis enterprise API).
- **Extra detail available from the repo README:** 4 s analysis window with 1 s hop, 32 KB RAM ring buffer, inference kept in Kotlin so audio never crosses the JS bridge, VAD gate before scoring. README frames it as an SIH 2026 problem statement (PS26104).
- **Outcome:** **TBC** — no result stated anywhere.
- **Media:** none yet. Needs screenshots or a short screen recording from you; otherwise the case study leads with an original signal-chain diagram.

### 2. Samadhan — AI civic engagement platform
- **Role:** Full Stack Developer (Civic-Tech)
- **Stack:** React, TypeScript, Supabase, PostgreSQL, Edge Functions, NVIDIA NIM, Roboflow, OCR, Mapbox, SHA-256 audit trail
- **Repo:** https://github.com/dimcodes09/samadhan-Vibe2Ship — **currently private**, so the resume link 404s for visitors
- **Live:** https://samadhan-4ac87.web.app/ (from the repo's homepage field — **TBC** that you want it linked)
- **Problem:** Civic complaints (roads, garbage, streetlights, leaks) are slow, opaque and unverified.
- **Solution / contribution (resume):**
  - Citizens report, verify and resolve civic issues in real time with AI detection and community verification.
  - Built a Smart Document Locker, Government Scheme Readiness module and Digital Twin visualisation.
  - Real-time AI issue detection with NVIDIA NIM, Roboflow computer vision and an OCR pipeline; tamper-evident audit trail; Mapbox geospatial view.
- **Outcome:** **TBC** (repo name suggests a "Vibe2Ship" event — result unknown).

### 3. Legal TimeLock Network (LTN)
- **Role:** Blockchain Developer
- **Stack:** Next.js, Solana Web3.js, IPFS (Pinata), PostgreSQL, Prisma, Node.js, Express.js, n8n, Gmail API
- **Live:** https://rait-acm-kleos-poha-paglu.vercel.app/
- **Repo:** not listed
- **Problem:** Legal and land documents rely on manual cross-checking and trust between parties.
- **Solution / contribution (resume):**
  - Solana-based verification platform producing immutable, tamper-evident timestamps and an auditable chain of custody for each document.
  - Citizens, advocates, banks and courts upload, verify and authenticate documents with on-chain proof and QR verification.
  - Automated multi-party notifications with n8n + Gmail API; IPFS storage via Pinata; Node/Express/PostgreSQL/Prisma backend.
- **Outcome:** Best Project, Kleos 4.0 (D Y Patil University).

### 4. Zyvora — AI gifting platform
- **Role:** Full Stack Developer
- **Stack:** Next.js, TypeScript, Node.js, Express.js, MongoDB, Groq API, WebAR (Three.js / R3F / WebXR per repo README), JWT auth
- **Live:** https://zyvora-hvot.vercel.app/
- **Repo:** https://github.com/dimcodes09/Zyvora (public)
- **Problem:** Choosing a gift means browsing hundreds of products manually.
- **Solution / contribution (resume):**
  - Personalised gift hampers with real-time updates and an LLM recommendation engine on the Groq API.
  - WebAR 3D product preview in the browser; Express/MongoDB backend with JWT auth and session management.
- **Outcome:** BGI Hackathon — Top 10 (README, confirmed in chat).
- **Positioning note:** README calls it "AI e-commerce"; resume calls it an "AI-driven gifting platform". Site uses the resume wording.

---

## Other builds (compact archive, only as support for achievements)

| Project | What it is | Links | Source |
|---|---|---|---|
| CampusMart | Reel-based campus marketplace; Next.js, Node.js, MongoDB, Socket.io, n8n, Groq | https://campus-mart-kappa.vercel.app · https://github.com/dimcodes09/Campus-Mart | README, repo |
| FinNext | Multi-agent AI finance platform (7 specialist agents); Next.js, TypeScript | none | README |
| Campus Flow | **TBC** — one-line description needed | https://campus-flow-three.vercel.app | resume, repo |
| HH Goa ID | Builder passport for Hacker House Goa 2026 | https://hh-goa-id-gilt.vercel.app | repo description |
| CI/CD Runner | Self-hosted mini GitHub Actions in Go + Docker (learning project) | none | README |
| GRAVITY | Space mission design game: pick the science, build a spacecraft in a 3D hangar, fly it, read why it worked. TypeScript monorepo; React, Three.js (react-three-fiber), Fastify, Socket.IO, PostgreSQL, Redis. Team Gravity. | https://team-gravity.vercel.app/ · https://github.com/KANISHQ09/Team-Gravity | project README (chat) |
| StressProof | Bonded verification protocol for AI-generated lending-market risk claims. Solidity/Foundry, Python/FastAPI, Next.js, Wagmi/Viem. Team Gravity. README states it is verified locally, with testnet deployment pending and synthetic demo data. | https://stress-proof.vercel.app/ · https://github.com/madhavansingh/StressProof | project README (chat) |

GRAVITY and StressProof are team projects hosted on teammates' accounts. **Your personal role in each is TBC** — they are listed as award projects only until you say what you built.

---

## Experience

| Role | Organisation | Dates | Details |
|---|---|---|---|
| Full Stack Developer Intern | My Dukan | 11 Sep 2026 – present | Deployed an app to the App Store; production-level Razorpay payment integration; mobile OTP login system. **TBC**: the app's name and whether My Dukan can be linked |
| Freelance | Independent | Available now | No client names, testimonials or metrics will be shown unless you supply them |

## Education

Bachelor of Technology, Computer Science and Engineering — Oriental Institute of Science and Technology, Bhopal — 2024 – 2028

---

## Achievements

Confirmed in chat on 24 Nov 2026:

| Event | Result | Project | Open point |
|---|---|---|---|
| TIT Srijan Hackathon | 2nd Runner-Up | CampusMart | — |
| Kleos 4.0 (D Y Patil University) | Best Project | Legal TimeLock Network | — |
| BGI Hackathon | Top 10 | Zyvora | — |
| NASA Space Apps Challenge 2026 | 2nd place, Bhopal zonal level | GRAVITY (Team Gravity) | Site must carry "independent project; not a NASA product" |
| HH Goa 2026 (Hacker House Goa) | Top 10 | StressProof (Team Gravity) | — |

Added on 24 Nov 2026 (third pass), from chat:

| Event | Result | Project | Open point |
|---|---|---|---|
| MPOnline Hackathon | Top 20 | Samadhan | Described in chat as national level; one web listing calls it state level. Wording on the site follows the chat. |
| Build What Moves India (OpenAI and Varun Mayya) | Top 250 | Not stated | Which project was submitted |
| Hack In Motion (held on the Bhopal Metro) | Top 10 teams | Not stated | Which project; no public page found |

Receipt order on the site: NASA Space Apps, TIT Srijan, Kleos, Buildathon LNCT, HH Goa, BGI, MPOnline, Build What Moves India, Hack In Motion.

Selected work order on the site: Zyvora, Legal TimeLock Network, Aawaz, Samadhan, GRAVITY, StressProof.

Supplied images: Aawaz logo and two app screenshots (project page and work panel), the My Dukan logo (experience entry), and four personal photos used in the "Off the page" strip in the Story chapter. Only optimised copies are kept, in `public/photos`. A team photo was supplied but not used because it shows other people.

On the resume but not mentioned in your answer — **excluded until you say otherwise**:

- GDG OIST Project Competition — Top 10 Finalist — Campus Flow

Added on request (24 Nov 2026), using the resume wording:

- Buildathon LNCT — Top 6 Finalist (20 teams) — FinNext

---

## Skills (resume + README, de-duplicated)

| Layer | Technologies |
|---|---|
| Languages | TypeScript, JavaScript, Go, Kotlin, Python, Java |
| Frontend | React, Next.js, React Native, Tailwind CSS |
| Backend | Node.js, Express.js, Hono.js, FastAPI, REST APIs, WebRTC |
| Data | MongoDB, PostgreSQL, Prisma ORM, Supabase, Redis |
| AI & automation | Groq API, NVIDIA NIM, n8n, OCR pipelines, Roboflow computer vision, ONNX Runtime, RawTFNet-32 |
| Web3 | Solana Web3.js, IPFS (Pinata) |
| DevOps & cloud | Docker, Git, GitHub, CI/CD, Vercel, Render |

"MERN" and "Java" come from your brief; Java is not on the resume but you have a public `Java` repo.

---

## Services (derived only from demonstrated skills — no pricing, no client claims)

1. **Full stack product builds** — Next.js / MERN web apps from schema to deploy
2. **AI features that ship** — LLM recommendations, vision and OCR pipelines, n8n automations
3. **Backend, APIs and DevOps** — REST APIs, auth, Postgres/Mongo data layers, Docker, CI/CD
4. **MVP and hackathon sprints** — idea to working demo, fast

---

## How the site uses this (as built)

- **Six project pages.** GRAVITY and StressProof come first in the work chapter, in the same page format as the others but shorter, and they describe the product and credit Team Gravity rather than claiming personal contributions. The four resume projects follow with full case studies.
- **Samadhan** links to its live site only; the private repository is not linked.
- **Achievements shown:** the five confirmed in chat. GDG OIST and Buildathon LNCT are not shown.
- **Archive row:** CampusMart, FinNext, HH Goa ID and the CI/CD runner. Campus Flow is left out because there is no description for it.
- **Not on the site:** phone number, any photo, a resume download, any client name.

## Open questions (answer whenever convenient — none of these block the build)

1. **My Dukan:** the app's name, and can My Dukan be named and linked publicly?
2. **GRAVITY and StressProof:** what did you personally build in each? Should either become a fifth full case study? (GRAVITY is a strong fit — it is 3D and award-winning.)
3. ~~Kleos 4.0 wording~~ — answered: Best Project.
4. ~~NASA Space Apps / HH Goa details~~ — answered.
5. **GDG OIST and Buildathon LNCT:** keep or drop?
6. **Samadhan:** link the live site? Make the repo public, or hide the repo link?
7. **Aawaz:** was it a team build? Any screenshots or demo video?
8. **Team credit:** for hackathon projects, should case studies say "built with a team of N"?
9. **Photo:** do you want a real photo anywhere, or an original illustrated character only?
10. **Resume download** button on the site: yes or no?
11. **Domain** and where you want it deployed (Vercel is assumed).
12. **Name in Devanagari** for a small seal mark — is "दिव्यांशु कुबडे" the correct spelling?

---

## Privacy rules for this project

- Personal details stay in this folder and on the finished site only. They are never put into search queries, image-generation prompts, analytics, or third-party forms.
- Fonts, images and scripts are self-hosted. No trackers or analytics unless you ask for them.
- Nothing is pushed to GitHub or deployed until you say so. If the repo goes public, decide first whether `docs/` should be committed.
