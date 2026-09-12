import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { Nav } from "@/app/components/nav";
import { CursorGlow } from "@/app/components/ui";
import { profile } from "@/app/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const title = `${profile.name} — Automation, Data & Cybersecurity`;
const description =
  "Portfolio of Martin Sevov — IT administration & automation, MSc student in Cybersecurity & Resilience, BSc in Applied Informatics & Data Science.";

// TODO: once deployed, set `metadataBase` to the production URL so Open Graph
// image URLs resolve absolutely (e.g. new URL("https://martinsevov.com")).
export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name }],
  keywords: [
    "Martin Sevov",
    "IT Administration",
    "Automation",
    "Cybersecurity",
    "Data Science",
    "Portfolio",
  ],
  openGraph: {
    title,
    description,
    siteName: profile.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink font-sans text-chalk">
        <CursorGlow />
        <Nav />
        {children}
      </body>
    </html>
  );
}
