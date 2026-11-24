// Single source of truth for personal facts, tailored from Ayesha Perveen's resume.

export const profile = {
  name: "Ayesha Perveen",
  first: "Ayesha",
  last: "Perveen",
  role: "AI & Software Engineer",
  location: "Bhopal, India",
  handle: "ayeshamallick6514-aye",
  email: "ayeshamallick6514@gmail.com",
  phone: "+91 7477095273",
  lede: "Engineering intelligent, verifiable systems across AI, security & blockchain,",
  ledeAccent: "and shipping with impact.",
  summary:
    "B.Tech Computer Science student at OIST Bhopal (CGPA: 8.62/10) with project experience in AI, software engineering, cybersecurity, and blockchain. Built applications involving explainable security auditing, RAG-based governance, cryptographic log integrity, and personalized health guidance. Currently AI & Technology Intern at BTG Venture.",
  now: "AI & Technology Intern, BTG Venture",
  status: "Open to opportunities & projects",
  coreStack: ["Python", "TypeScript", "React", "Next.js", "Node.js", "Java", "RAG & LLMs", "MongoDB"],
  learning: ["Algorand AVM", "Autonomous AI Agents", "Cryptographic Log Integrity"],
  philosophy: "Learn by building real, resilient systems: from explainable AI to cryptographic verification.",
  motto: "Code with integrity, ship with impact",
  links: {
    github: "https://github.com/ayeshamallick6514-aye",
    linkedin: "https://linkedin.com/in/ayesha-perveen-a83339309",
    instagram: "https://github.com/ayeshamallick6514-aye",
  },
} as const;

export const site = {
  title: "Ayesha Perveen — AI & Software Engineer",
  description:
    "Portfolio of Ayesha Perveen, an AI & Software Engineer from Bhopal, India. Autonomous AI security on Algorand, GovTech RAG platforms, cryptographic Merkle log integrity, and explainable HealthTech.",
  year: 2026,
  volume: "01",
} as const;

export type ChapterId =
  | "opening"
  | "work"
  | "stack"
  | "story"
  | "experience"
  | "receipts"
  | "services"
  | "contact";

export const chapters: Array<{
  id: ChapterId;
  no: string;
  jp: string;
  label: string;
  nav: string;
}> = [
  { id: "opening", no: "01", jp: "第一章", label: "Opening", nav: "Top" },
  { id: "work", no: "02", jp: "第二章", label: "Selected work", nav: "Work" },
  { id: "stack", no: "03", jp: "第三章", label: "The stack", nav: "Stack" },
  { id: "story", no: "04", jp: "第四章", label: "Story", nav: "About" },
  {
    id: "experience",
    no: "05",
    jp: "第五章",
    label: "Experience",
    nav: "Experience",
  },
  {
    id: "receipts",
    no: "06",
    jp: "第六章",
    label: "Receipts",
    nav: "Receipts",
  },
  {
    id: "services",
    no: "07",
    jp: "第七章",
    label: "Services",
    nav: "Services",
  },
  { id: "contact", no: "08", jp: "第八章", label: "Contact", nav: "Contact" },
];
