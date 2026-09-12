# Martin Sevov — Portfolio

A single-page portfolio built with Next.js 16 (App Router), React 19, TypeScript
and Tailwind CSS v4, typeset like a mathematical paper.

- **Hero**: an ocean of 38,400 points computed on the GPU. A hand-written WebGL
  vertex shader lifts every point by a sum of travelling sine waves, projects it
  with a perspective camera and fades it into fog. Crests turn gold, troughs stay
  cyan, the pointer lifts the surface, a click sends a ripple.
- **Structure**: the page reads as a proof — §1 Definition (profile), §2 Axioms
  (education), §3 Theorems (experience, each ending in ∎), §4 Sets (skills),
  §5 Lemmas (projects), §6 Corollaries (awards), §7 Q.E.D. (contact).
- **Math**: every equation is real LaTeX rendered on the server with KaTeX
  (HTML + MathML, zero client JavaScript).
- **Data**: a proportional 2018–2028 timeline and a years-per-language chart,
  both generated from the content file.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

Everything on the page — profile text, work experience, education, skills,
projects, awards, certifications, languages, testimonials, the equation ticker
and contact links — lives in one typed file: [`app/lib/data.ts`](./app/lib/data.ts).
Update that file and every section re-renders; you should not need to touch
component JSX for a content change. Update `today` in that file when the CV
changes so the timeline's "now" marker stays right.

To replace the CV, drop the new PDF into `public/` and update `profile.cvHref`.

## Structure

- `app/layout.tsx` — fonts (Instrument Serif, Geist, Geist Mono), KaTeX CSS,
  metadata, nav and cursor glow
- `app/page.tsx` — composes the sections in order
- `app/lib/data.ts` — all page content
- `app/components/` — twelve files:
  - one per section: `hero` (also exports the equation ticker), `profile`,
    `education`, `experience` (includes the timeline figure), `skills`,
    `projects`, `awards`, `contact` (also exports the footer)
  - shared: `ui` (reveal, counter, spotlight card, copy button, cursor glow,
    section heading, years chart), `tex` (KaTeX), `nav`, `hero-background`
    (the WebGL wave field)
- `app/opengraph-image.tsx` — generated social-share image
- `app/icon.tsx`, `app/apple-icon.tsx` — generated favicon and app icon
- `app/not-found.tsx`, `app/robots.ts`

## Deploying

The easiest way to deploy is [Vercel](https://vercel.com/new). Once deployed,
set `metadataBase` in `app/layout.tsx` to the production URL so Open Graph
image URLs resolve absolutely.
