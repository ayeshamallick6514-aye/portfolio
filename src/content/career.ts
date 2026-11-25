import type { Layer } from "./projects";

export type Experience = {
  period: string;
  current?: boolean;
  role: string;
  org: string;
  meta: string;
  logo?: string;
  points: string[];
  shipped?: { label: string; detail: string }[];
  tags?: string[];
};

export const experience: Experience[] = [
  {
    period: "Apr 2026 — Present",
    current: true,
    role: "AI & Technology Intern / Project Coordinator",
    org: "BTG Venture",
    meta: "Six-month Internship",
    points: [
      "Project Mirror (AI-Powered KOL Intelligence Framework): Designed a privacy-aware enterprise intelligence architecture using Synthetic Archetype Generation to derive collective KOL behavioural insights.",
      "Proposed a comprehensive data pipeline incorporating PII removal, k-anonymity validation, feature extraction and LLM-based synthetic persona generation.",
      "Evaluated Thailand PDPA lawful bases, platform policies and privacy risks to develop a compliance-first approach to marketing intelligence.",
      "Coordinated a student team developing Salesforce CRM-based automotive lead management workflows, covering CRM configuration, Web-to-Lead capture, and project demonstrations.",
      "Completed Salesforce Trailhead learning modules and authored a Junior Developer Survival Playbook documenting learning paths, implementation workflows, and troubleshooting guidance.",
      "Conducted SEO/GEO audits across 3 platforms: TEDxOIST, GDG OIST, and AllAboutEVs. Contributed product research and UX planning for SheryAI.",
    ],
    shipped: [
      {
        label: "Project Mirror",
        detail:
          "AI-Powered KOL intelligence framework using synthetic archetype generation & Thailand PDPA compliance.",
      },
      {
        label: "Salesforce CRM",
        detail: "Configured automotive lead management workflows & Web-to-Lead capture.",
      },
      {
        label: "Developer Playbook",
        detail: "Authored developer survival playbook documenting paths & troubleshooting.",
      },
      {
        label: "SEO/GEO & AI UX",
        detail: "Audited TEDxOIST, GDG OIST, AllAboutEVs and led UX research for SheryAI.",
      },
    ],
    tags: [
      "Project Mirror",
      "KOL Intelligence",
      "Synthetic Archetypes",
      "Thailand PDPA",
      "Salesforce CRM",
      "AI Research",
    ],
  },
  {
    period: "Ongoing",
    role: "AI & Full Stack Engineer",
    org: "Open Source & Projects",
    meta: "Open to opportunities",
    points: [
      "Available for explainable AI systems, blockchain smart-contract auditing, GovTech architecture, and hackathon sprints.",
    ],
    tags: ["AI & RAG Systems", "Algorand Web3", "Security Auditing", "Full Stack Next.js"],
  },
];

export const education = {
  period: "Expected Aug 2028 (2024 — 2028)",
  degree: "B.Tech, Computer Science and Engineering (CGPA: 8.62/10)",
  school: "Oriental Institute of Science and Technology (OIST)",
  place: "Bhopal, Madhya Pradesh",
} as const;

export type Achievement = {
  rank: string;
  event: string;
  detail: string;
  project?: string;
  slug?: string;
  href?: string;
  note?: string;
};

export const achievements: Achievement[] = [
  {
    rank: "Team Lead",
    event: "Smart India Hackathon 2026",
    detail: "SIH 2026 · NTRO (Problem SIH26156) · Code4baddies",
    project: "LogAnchor-X",
    slug: "loganchor-x",
    note: "Cryptographic log integrity with SHA-256 hash chaining and Merkle trees.",
  },
  {
    rank: "Team Lead",
    event: "MPOnline Hackathon 2026",
    detail: "GovTech Interdepartmental Coordination · HackHer Squad",
    project: "UNITY",
    slug: "unity",
    note: "RAG-based policy intelligence, bilingual voice assistant, and GIS mapping.",
  },
  {
    rank: "Top 10 Team",
    event: "Bansal Group of Institutions Hackathon",
    detail: "BGI Hackathon",
    project: "Zyvora",
    slug: "zyvora",
    note: "AI personalized gifting platform with WebAR in-browser preview.",
  },
  {
    rank: "Testnet Launch",
    event: "Algorand Blockchain",
    detail: "Algorand Testnet · Autonomous AI Security",
    project: "VERITAS",
    slug: "veritas",
    note: "Explainable AVM smart-contract auditor with counterfactual repair and x402 payments.",
  },
  {
    rank: "Top 10 Team",
    event: "IDS Hackathon · CII Yi Yuva",
    detail: "Top 10 across all colleges in Bhopal · Team Leader, Hack Horizon",
    note: "Led team Hack Horizon to the Top 10 teams across all colleges in Bhopal at the IDS Hackathon under CII Yi Yuva.",
  },
  {
    rank: "Certified",
    event: "NPTEL Online Certification · IIT Madras",
    detail: "Introduction to Machine Learning (12-Week Course · 4 Credits)",
    note: "Funded by MoE, Govt. of India · IIT Madras & SWAYAM.",
  },
];

export type StackLayer = {
  id: Layer | "languages";
  no: string;
  name: string;
  blurb: string;
  tech: string[];
};

export const stackLayers: StackLayer[] = [
  {
    id: "languages",
    no: "00",
    name: "Languages",
    blurb: "What I write in",
    tech: ["Python", "TypeScript", "JavaScript", "Java", "HTML", "CSS"],
  },
  {
    id: "interface",
    no: "01",
    name: "Interface",
    blurb: "What people touch",
    tech: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js", "Streamlit"],
  },
  {
    id: "api",
    no: "02",
    name: "API & Backend",
    blurb: "What answers",
    tech: ["Node.js", "Express.js", "Hono", "REST APIs", "Maven"],
  },
  {
    id: "data",
    no: "03",
    name: "Data & Storage",
    blurb: "What remembers",
    tech: ["MongoDB", "Mongoose", "Append-Only Store", "FAISS Vector DB"],
  },
  {
    id: "ai",
    no: "04",
    name: "AI & ML",
    blurb: "What thinks",
    tech: [
      "Generative AI",
      "RAG Architecture",
      "LLM Integration",
      "FAISS",
      "Sentence Transformers",
      "OCR Pipelines",
      "Explainable AI",
    ],
  },
  {
    id: "web3",
    no: "05",
    name: "Security & Web3",
    blurb: "What proves & protects",
    tech: [
      "Algorand AVM",
      "x402 Payments",
      "Pera Wallet",
      "SHA-256",
      "Merkle Trees",
      "Log Integrity",
    ],
  },
  {
    id: "ship",
    no: "06",
    name: "Tools & Ship",
    blurb: "What gets it live",
    tech: ["Docker", "AWS", "GCP", "Git", "GitHub", "Vercel", "Streamlit Cloud", "Postman"],
  },
];

export type Service = {
  no: string;
  title: string;
  body: string;
  proof: string;
};

export const services: Service[] = [
  {
    no: "01",
    title: "AI & RAG Systems",
    body: "Explainable clinical guidance, RAG policy intelligence, vector search with FAISS, and voice/OCR intake pipelines.",
    proof: "VERITAS · UNITY · Halcyon 2000",
  },
  {
    no: "02",
    title: "Full Stack Engineering",
    body: "End-to-end web applications with Next.js, React, Node.js, Express, Hono, and MongoDB from schema to deployment.",
    proof: "UNITY · Zyvora",
  },
  {
    no: "03",
    title: "Security & Cryptography",
    body: "AST-based smart contract auditing, SHA-256 cryptographic hash chaining, and Merkle-tree tamper verification.",
    proof: "VERITAS · LogAnchor-X",
  },
  {
    no: "04",
    title: "Hackathon & MVP Sprints",
    body: "Turn high-complexity technical problem statements into live, validated prototypes under strict deadlines.",
    proof: "SIH 2026 (NTRO) · MPOnline 2026 · BGI Hackathon",
  },
];

export const story = [
  {
    no: "1",
    head: "Bhopal",
    body: "I study Computer Science and Engineering at the Oriental Institute of Science and Technology (OIST), Bhopal. Class of 2028 with an 8.62/10 CGPA.",
  },
  {
    no: "2",
    head: "Verifiable Systems",
    body: "Whether it is explainable smart contract auditing on Algorand or cryptographic append-only logs for NTRO, I build systems that can be inspected, proven, and trusted.",
  },
  {
    no: "3",
    head: "Leadership under fire",
    body: "Hackathons are where I lead teams to build working software: captaining HackHer Squad at MPOnline Hackathon 2026, Code4baddies at Smart India Hackathon 2026, and leading Hack Horizon to the Top 10 at the CII IDS Hackathon.",
  },
  {
    no: "4",
    head: "Now",
    body: "AI & Technology Intern at BTG Venture, coordinating student developer workflows and building AI & CRM automation solutions.",
  },
] as const;
