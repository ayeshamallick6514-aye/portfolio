import type { Metadata, Viewport } from "next";
import { siteUrl } from "@/lib/site-url";
import { Suspense } from "react";
import {
  Anton,
  Archivo,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import { profile, site } from "@/content/profile";
import TopBar from "@/components/chrome/TopBar";
import SmoothScroll from "@/components/chrome/SmoothScroll";
import PageTransition from "@/components/chrome/PageTransition";
import InkTrail from "@/components/chrome/InkTrail";
import ProgressRail from "@/components/chrome/ProgressRail";
import Cursor from "@/components/chrome/Cursor";
import "./globals.css";

// All four Latin faces appear in the first screen, so all four are preloaded;
// that also keeps the hero from shifting when they swap in.
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Subset to the sixteen glyphs the site uses (see scripts/subset-jp-font.mjs).
const jp = localFont({
  src: "../fonts/ShipporiMincho-ExtraBold.subset.woff2",
  weight: "800",
  variable: "--font-shippori",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  // See src/lib/site-url.ts: custom domain, else the Vercel domain, else local.
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s — ${profile.name}`,
  },
  description: site.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.links.github }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Full Stack Developer",
    "Next.js developer",
    "TypeScript",
    "Node.js",
    "Go",
    "MERN",
    "Freelance developer India",
    "Bhopal",
  ],
  openGraph: {
    type: "website",
    title: site.title,
    description: site.description,
    siteName: profile.name,
    locale: "en_IN",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${profile.name}, ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ECE7DC",
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint: restores theme and motion preference, marks JS as
// available, and decides whether the opening loader plays (first visit of a
// session, on the home page, with motion allowed).
const bootScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("dk-theme"),m=localStorage.getItem("dk-motion");if(t&&["blood","aged","indigo","moss"].indexOf(t)>-1)d.setAttribute("data-theme",t);if(!m)m=matchMedia("(prefers-reduced-motion: reduce)").matches?"off":"on";d.setAttribute("data-motion",m);d.classList.add("js");if(m==="on"&&location.pathname==="/"&&!sessionStorage.getItem("dk-seen"))d.setAttribute("data-loading","");setTimeout(function(){if(!window.__dkfx)d.classList.add("fx-fallback")},7000);setTimeout(function(){d.removeAttribute("data-loading")},9000)}catch(e){}})()`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhopal",
    addressCountry: "IN",
  },
  sameAs: [
    profile.links.github,
    profile.links.linkedin,
    profile.links.instagram,
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "RAG Architecture",
    "Blockchain Security",
    "Algorand AVM",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Java",
    "Node.js",
    "MongoDB",
    "Cryptographic Verification",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="blood"
      data-motion="on"
      suppressHydrationWarning
      className={`${anton.variable} ${archivo.variable} ${serif.variable} ${mono.variable} ${jp.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Suspense fallback={null}>
          <TopBar />
          <ProgressRail />
          <SmoothScroll />
          <PageTransition />
          <InkTrail />
          <Cursor />
        </Suspense>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
