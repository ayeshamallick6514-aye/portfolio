import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import Loader from "@/components/chrome/Loader";
import ScrollFX from "@/components/chrome/ScrollFX";
import Tapes from "@/components/ui/Tapes";
import Work from "@/components/sections/Work";
import Stack from "@/components/sections/Stack";
import Story from "@/components/sections/Story";
import Statement from "@/components/sections/Statement";
import { Experience, Receipts, Services } from "@/components/sections/Career";
import { Contact, Credits } from "@/components/sections/Contact";

const stackTape = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "Docker",
  "Algorand",
];
const mottoTape = ["Full stack", "No fluff", "Real ship", "Open to freelance"];
const proofTape = [
  "SIH 2026 · Team Lead (NTRO)",
  "MPOnline 2026 · HackHer Squad",
  "BGI Hackathon · Top 10",
  "CII IDS Hackathon · Top 10",
  "Build What Moves India · Top 250",
  "Hack In Motion · Top 10",
  "NPTEL · IIT Madras · 4 Credits",
  "BTG Venture · AI & Tech Intern",
];
const hireTape = [
  "Open to freelance",
  "Full stack builds",
  "AI that ships",
  "APIs and DevOps",
  "MVP sprints",
];

// The home page's own address, for search engines (project pages set theirs).
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
      <Tapes a={stackTape} b={mottoTape} />
      <Work />
      <Tapes a={mottoTape} b={stackTape} tone="paper-ink" />
      <Stack />
      <Statement />
      <Story />
      <Experience />
      <Receipts />
      <Tapes a={proofTape} b={hireTape} tone="ink-paper" />
      <Services />
      <Contact />
      <Credits />
      <ScrollFX />
    </>
  );
}
