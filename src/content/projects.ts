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
    art: "waveform",
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
    art: "waveform",
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
    art: "waveform",
  },
  {
    slug: "carepilot-ai",
    kind: "case",
    index: "04",
    title: "CarePilot AI",
    kicker: "Explainable HealthTech Decision-Support System",
    oneLiner:
      "Confidence-aware health guidance from user-provided vitals, featuring uncertainty estimation, health-score simulation, and RAG retrieval.",
    role: "End-to-End Developer",
    status: "Live Demo",
    problem:
      "Healthcare AI tools frequently give uncalibrated, overconfident predictions without uncertainty bounds, leading to unsafe self-triage.",
    solution:
      "A clinically grounded decision-support system that evaluates patient vitals, models uncertainty bounds, simulates physiological trajectories, and retrieves peer-reviewed guidance using FAISS vector search.",
    contribution: [
      "Built and deployed the end-to-end health-tech application on Streamlit Cloud.",
      "Designed confidence-aware predictive pipelines with uncertainty estimation and health-score simulation.",
      "Engineered RAG-based semantic retrieval using FAISS and Sentence Transformers.",
    ],
    flowTitle: "Patient vitals to explainable guidance",
    flow: [
      { label: "Vitals Intake", detail: "Patient enters biometric vitals and symptoms" },
      { label: "Simulation", detail: "Machine learning model evaluates health score trajectory" },
      { label: "Uncertainty", detail: "Computes confidence score and safety guardrails" },
      { label: "RAG Retrieval", detail: "FAISS vectors retrieve curated clinical literature" },
      { label: "Guidance", detail: "Explainable summary generated with actionable alerts" },
    ],
    stack: [
      "Python",
      "Streamlit",
      "NumPy",
      "Scikit-learn",
      "FAISS",
      "Sentence Transformers",
    ],
    layers: ["ai", "data", "interface"],
    links: {
      live: "https://carepilot-ai-ctzktvvu9j4wb9dacnsjta.streamlit.app",
      repo: "https://github.com/ayeshamallick6514-aye/carepilot-ai",
    },
    result: "Deployed with a live interactive web demo on Streamlit Cloud.",
    art: "waveform",
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
  "carepilot-ai": {
    coverAlt:
      "CarePilot AI: Explainable health-tech decision-support system on Streamlit.",
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
