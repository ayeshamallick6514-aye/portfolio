// Project content tailored from Ayesha Perveen's resume.

export type Layer =
  | "interface"
  | "api"
  | "data"
  | "ai"
  | "web3"
  | "ship"
  | "mobile";

export type FlowStep = { label: string; detail: string };

export type Project = {
  slug: string;
  kind: "case" | "brief";
  index: string;
  title: string;
  kicker: string;
  oneLiner: string;
  role: string;
  team?: string;
  award?: { rank: string; event: string };
  status: string;
  problem: string;
  solution: string;
  /** What Ayesha personally built. */
  contribution?: string[];
  /** Product highlights. */
  highlights?: string[];
  flowTitle: string;
  flow: FlowStep[];
  stack: string[];
  layers: Layer[];
  links: { live?: string; repo?: string };
  result: string;
  note?: string;
  /** Art used when no screenshot exists. */
  art?: "waveform";
};

export const projects: Project[] = [
  {
    slug: "veritas",
    kind: "case",
    index: "01",
    title: "VERITAS",
    kicker: "Autonomous AI Security Auditor on Algorand",
    oneLiner:
      "An explainable AVM smart-contract auditor with AST-based vulnerability analysis, counterfactual repair, and atomic payments.",
    role: "AI Security & Blockchain Developer",
    status: "Algorand Testnet",
    problem:
      "Smart contract vulnerabilities in Algorand AVM contracts lead to severe exploits, yet traditional audits are slow, expensive, and fail to provide explainable automated remediation.",
    solution:
      "An autonomous AI auditor that parses TEAL/AVM bytecode into ASTs, identifies security vulnerabilities, generates counterfactual patches, and settles audit fees via x402 payments and Algorand atomic transactions.",
    contribution: [
      "Developed an explainable AVM smart-contract auditor with AST-based vulnerability analysis and counterfactual repair.",
      "Integrated x402 payments and Algorand atomic transactions with Pera Wallet integration.",
      "Engineered an autonomous TypeScript CLI agent for automated code scanning, validation, and reporting.",
    ],
    flowTitle: "From contract to verified audit",
    flow: [
      { label: "Ingest", detail: "TEAL / AVM bytecode or PyTeal contract source" },
      { label: "AST Scan", detail: "Abstract Syntax Tree vulnerability analysis" },
      { label: "Repair", detail: "Counterfactual AI patch generation and explanation" },
      { label: "Settle", detail: "x402 payment settled via Pera Wallet atomic tx" },
      { label: "Verify", detail: "Autonomous CLI outputs certified cryptographic report" },
    ],
    stack: [
      "TypeScript",
      "React",
      "Vite",
      "Hono",
      "Algorand AVM",
      "x402",
      "Pera Wallet",
      "Explainable AI",
    ],
    layers: ["ai", "web3", "api", "interface"],
    links: {
      repo: "https://github.com/ayeshamallick6514-aye/VERITAS",
    },
    result: "Live on Algorand Testnet with autonomous CLI agent and counterfactual repair.",
  },
  {
    slug: "unity",
    kind: "case",
    index: "02",
    title: "UNITY",
    kicker: "AI-Enabled Governance Platform",
    oneLiner:
      "Interdepartmental GovTech coordination platform integrating RAG policy intelligence, bilingual voice assistance, and OCR grievance intake.",
    role: "Team Lead, HackHer Squad",
    award: { rank: "Hackathon Finalist", event: "MPOnline Hackathon 2026" },
    status: "Hackathon Finalist",
    problem:
      "Public administrative departments operate in isolated silos, causing grievance delays, policy misalignments, and opaque civic project tracking.",
    solution:
      "A unified GovTech platform bringing municipal and state departments together with bilingual voice assistance, OCR document intake, RAG policy intelligence, and GIS mapping for real-time accountability.",
    contribution: [
      "Led HackHer Squad as Team Lead in architecting and delivering the GovTech platform for MPOnline Hackathon 2026.",
      "Integrated RAG-based policy intelligence to answer citizen and administrative queries from official gazettes.",
      "Built bilingual voice assistance, OCR grievance intake pipelines, and GIS spatial mapping for real-time tracking.",
    ],
    flowTitle: "Citizen grievance to resolved action",
    flow: [
      { label: "Intake", detail: "Citizen reports grievance via text, voice, or OCR scan" },
      { label: "Classify", detail: "AI routes issue to appropriate civic department" },
      { label: "Policy RAG", detail: "Retrieves applicable guidelines and statutory bylaws" },
      { label: "Geo-Map", detail: "GIS visualization of department workload and hotspots" },
      { label: "Track", detail: "Real-time bilingual status notifications to citizens" },
    ],
    stack: [
      "React",
      "Vite",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "RAG",
      "OCR",
      "GIS",
    ],
    layers: ["ai", "data", "api", "interface"],
    links: {
      repo: "https://github.com/ayeshamallick6514-aye/UNITY",
    },
    result: "Developed and presented at MPOnline Hackathon 2026 by HackHer Squad.",
  },
  {
    slug: "loganchor-x",
    kind: "case",
    index: "03",
    title: "LogAnchor-X",
    kicker: "Cryptographic Log Integrity Framework",
    oneLiner:
      "Automated multi-format log parsing, SHA-256 hash chaining, append-only storage, and Merkle-tree tamper verification.",
    role: "Team Lead & Architecture, Code4baddies",
    award: { rank: "SIH Finalist", event: "Smart India Hackathon 2026 (NTRO, SIH26156)" },
    status: "SIH 2026 Finalist",
    problem:
      "Centralized server and network logs are vulnerable to retroactive tampering, deletion, and silent log modification during security breaches.",
    solution:
      "A high-throughput cryptographic log framework that ingests heterogeneous log formats, chains records with SHA-256 hashes in an append-only store, and constructs Merkle trees for instant zero-knowledge tamper proofs.",
    contribution: [
      "Led architecture and development of the multi-format log processing framework for NTRO problem statement SIH26156.",
      "Engineered automated parsing pipelines and sequential cryptographic hash chaining using SHA-256.",
      "Implemented append-only storage architecture with Merkle-tree audit proofs to guarantee absolute non-repudiation.",
    ],
    flowTitle: "Log stream to cryptographic proof",
    flow: [
      { label: "Capture", detail: "Heterogeneous multi-format log stream ingestion" },
      { label: "Parse", detail: "Normalized tokenization and structured field extraction" },
      { label: "Chain", detail: "Sequential SHA-256 hash chaining" },
      { label: "Merkle Tree", detail: "Batch root computation and cryptographic proofs" },
      { label: "Audit", detail: "Instant tamper detection and zero-trust verification" },
    ],
    stack: [
      "Java",
      "JavaScript",
      "HTML",
      "CSS",
      "SHA-256",
      "Merkle Trees",
      "Maven",
    ],
    layers: ["data", "api", "interface"],
    links: {
      repo: "https://github.com/ayeshamallick6514-aye/LogAnchor-X",
    },
    result: "Architected for the National Technical Research Organisation (NTRO) under SIH 2026.",
  },
  {
    slug: "halcyon-2000",
    kind: "case",
    index: "04",
    title: "Halcyon 2000",
    kicker: "Vision-AI Hand-Tracking & Interactive Vibe Check",
    oneLiner:
      "A retro-cybernetic, in-browser computer vision experience that tracks hand gestures and analyzes live interaction vibes.",
    role: "Full Stack & Creative Developer",
    status: "Live on Vercel",
    problem:
      "Most web interactions remain strictly bound to keyboards and mice, lacking tactile, expressive gesture-driven immersion.",
    solution:
      "A browser-based vision-AI application that leverages live hand-tracking camera feeds to deliver an engaging, responsive interactive experience with real-time feedback.",
    contribution: [
      "Engineered the in-browser computer vision pipeline with real-time hand landmark tracking.",
      "Designed the playful, retro pixel-aesthetic interface and fluid reactive UI state transitions.",
      "Optimized lightweight WebGL and client-side processing for high FPS across desktop and laptop cameras.",
    ],
    flowTitle: "From camera feed to interactive vibes",
    flow: [
      { label: "Vision Feed", detail: "Real-time webcam video stream capture" },
      { label: "Landmark Tracking", detail: "Machine vision tracks joint positions and gestures" },
      { label: "Gesture Analysis", detail: "Translates hand orientation and velocity into interactions" },
      { label: "Vibe Response", detail: "Generative audio-visual feedback responsive to gestures" },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Computer Vision",
      "Tailwind CSS",
      "Vercel",
    ],
    layers: ["ai", "interface", "ship"],
    links: {
      live: "https://halcyon-2000.vercel.app",
      repo: "https://github.com/ayeshamallick6514-aye/halcyon-2000",
    },
    result: "Live and deployed on Vercel with real-time hand-tracking capabilities.",
  },
  {
    slug: "zyvora",
    kind: "case",
    index: "05",
    title: "Zyvora",
    kicker: "AI-Powered Personalized Gifting Platform",
    oneLiner:
      "Describe the occasion, get a personalised gift hamper, and preview it in AR before you buy.",
    role: "Frontend Developer",
    award: { rank: "Top 10 Team", event: "Bansal Group of Institutions Hackathon" },
    status: "Live",
    problem:
      "Selecting meaningful gifts online typically requires sorting through hundreds of unrelated products without visualizing how they look together.",
    solution:
      "An AI-assisted gifting platform where users describe the recipient and occasion to receive tailored hamper recommendations, with interactive 3D and WebAR preview in the browser.",
    contribution: [
      "Built responsive frontend interfaces for personalized recommendations and custom hamper creation.",
      "Implemented WebAR-based 3D product visualization for seamless in-browser preview using Three.js.",
      "Designed fluid, accessible UI interactions using Next.js, React, Tailwind CSS, and Framer Motion.",
    ],
    flowTitle: "From occasion to hamper",
    flow: [
      { label: "Describe", detail: "The occasion, recipient persona, and budget" },
      { label: "Recommend", detail: "LLM recommendation engine curates matched items" },
      { label: "Compose", detail: "Assemble, swap, and personalize the hamper contents" },
      { label: "WebAR 3D", detail: "Preview products in 3D and augmented reality" },
      { label: "Checkout", detail: "Seamless hamper ordering and gift delivery flow" },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
    ],
    layers: ["interface", "ai", "api"],
    links: {
      live: "https://zyvora-hvot.vercel.app/",
      repo: "https://github.com/ayeshamallick6514-aye/Zyvora",
    },
    result: "Top 10 Team at the Bansal Group of Institutions Hackathon.",
  },
];

export const projectMeta: Record<
  string,
  {
    coverAlt: string;
    shots: {
      name: string;
      alt: string;
      caption: string;
      phone?: boolean;
    }[];
  }
> = {
  veritas: {
    coverAlt:
      "VERITAS: Autonomous AI Security Auditor on Algorand with AST vulnerability analysis.",
    shots: [],
  },
  unity: {
    coverAlt:
      "UNITY: AI-enabled governance platform for interdepartmental coordination and GIS mapping.",
    shots: [],
  },
  "loganchor-x": {
    coverAlt:
      "LogAnchor-X: Cryptographic log integrity framework with SHA-256 chaining and Merkle trees.",
    shots: [],
  },
  "halcyon-2000": {
    coverAlt:
      "Halcyon 2000: Vision-AI hand-tracking and interactive Vibe Check experience on Vercel.",
    shots: [],
  },
  zyvora: {
    coverAlt:
      "Zyvora home page: personalized gift hampers and WebAR 3D product previews.",
    shots: [
      {
        name: "arrivals",
        alt: "New arrivals banner on Zyvora with custom hampers and category tabs.",
        caption: "New arrivals",
      },
      {
        name: "gallery",
        alt: "A 3D carousel of gift hampers on the Zyvora platform.",
        caption: "The hamper carousel",
      },
    ],
  },
};

export const gallery = projectMeta;

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

export type ArchiveItem = {
  title: string;
  blurb: string;
  tags: string[];
  href?: string;
  note?: string;
};

export const archive: ArchiveItem[] = [
  {
    title: "Project Mirror — KOL Intelligence",
    blurb:
      "Enterprise intelligence architecture using Synthetic Archetype Generation, PII removal, k-anonymity validation, and Thailand PDPA compliance to derive collective KOL behavioural insights.",
    tags: ["Synthetic Archetypes", "k-Anonymity", "Thailand PDPA", "LLM Personas"],
    note: "BTG Venture",
  },
  {
    title: "SheryAI Product & UX Planning",
    blurb: "Product research and UX planning for SheryAI, alongside creator-intelligence and platform-compliance research.",
    tags: ["Product Research", "UX Planning", "AI Intelligence"],
    note: "BTG Venture",
  },
  {
    title: "Junior Developer Survival Playbook",
    blurb: "Comprehensive guide documenting learning paths, implementation workflows, and Salesforce CRM troubleshooting.",
    tags: ["Salesforce", "Technical Writing", "Workflows"],
    note: "BTG Venture",
  },
  {
    title: "Platform SEO/GEO Audits",
    blurb: "Conducted SEO/GEO audits across 3 platforms: TEDxOIST, GDG OIST, and AllAboutEVs.",
    tags: ["SEO", "GEO", "Audits"],
    note: "TEDxOIST · GDG OIST · AllAboutEVs",
  },
  {
    title: "Salesforce Automotive CRM",
    blurb: "Automotive lead management workflows covering CRM configuration, Web-to-Lead capture, and demos.",
    tags: ["Salesforce", "CRM", "Lead Capture"],
    note: "BTG Venture",
  },
];
