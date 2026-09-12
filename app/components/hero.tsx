import { HeroBackground } from "@/app/components/hero-background";
import { Tex } from "@/app/components/tex";
import { Counter } from "@/app/components/ui";
import { equations, profile, stats } from "@/app/lib/data";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Layers, back to front: aurora (WebGL) → left-side scrim for text contrast → bottom fade */}
      <HeroBackground className="absolute inset-0 -z-30" />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_58%_70%_at_16%_48%,rgba(5,7,11,0.88),rgba(5,7,11,0)_66%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-20 h-48 bg-gradient-to-b from-transparent to-ink" />

      <div className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 pb-28 pt-36">
        <p
          className="flex animate-fade-up items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-accent"
          style={{ animationDelay: "60ms" }}
        >
          <span aria-hidden className="h-px w-8 bg-accent/70" />
          <span className="flex items-baseline gap-2">
            Let <Tex tex="M" className="text-base normal-case tracking-normal text-chalk" /> be an engineer.
          </span>
        </p>

        <h1
          className="glow-text mt-8 animate-fade-up font-display text-[clamp(4rem,12.5vw,11rem)] italic leading-[0.88] tracking-[-0.02em] text-chalk"
          style={{ animationDelay: "160ms" }}
        >
          <span className="block">{profile.firstName}</span>
          <span className="block pl-[0.35em]">
            {profile.lastName}
            <span className="text-accent">.</span>
          </span>
        </h1>

        <div
          className="mt-10 flex max-w-2xl animate-fade-up flex-wrap items-center gap-x-3 gap-y-2 text-chalk-dim"
          style={{ animationDelay: "260ms" }}
        >
          <Tex tex={String.raw`M :=`} className="text-lg text-chalk" />
          <Tex tex={String.raw`\{`} className="text-xl text-accent" />
          {profile.roles.map((role, i) => (
            <span key={role} className="font-mono text-[13px] uppercase tracking-[0.18em]">
              {role}
              {i < profile.roles.length - 1 ? "," : ""}
            </span>
          ))}
          <Tex tex={String.raw`\}`} className="text-xl text-accent" />
        </div>

        <p
          className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-chalk-dim sm:text-lg"
          style={{ animationDelay: "340ms" }}
        >
          {profile.headline}
        </p>

        <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-3" style={{ animationDelay: "420ms" }}>
          <a
            href={profile.cvHref}
            download
            className="group inline-flex items-center gap-2 rounded-full bg-chalk px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-transform hover:scale-[1.03]"
          >
            Download CV
            <span aria-hidden className="transition-transform group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-chalk transition-colors hover:border-accent hover:text-accent"
          >
            Say hello
          </a>
          <div className="ml-2 flex items-center gap-4 font-mono text-xs text-chalk-dim">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              github/{profile.githubHandle}
            </a>
            <span aria-hidden className="text-chalk-faint">
              ·
            </span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              in/{profile.linkedinHandle}
            </a>
          </div>
        </div>

        <dl
          className="mt-20 grid max-w-3xl animate-fade-up grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-8 sm:grid-cols-4"
          style={{ animationDelay: "520ms" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">{stat.label}</dt>
              <dd className="font-display text-5xl italic text-chalk sm:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <p
        aria-hidden
        className="pointer-events-none absolute bottom-6 right-6 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-chalk-faint lg:flex"
      >
        <span>Fig. 0.1 — Aurora</span>
        <Tex
          tex={String.raw`I(\mathbf{x}, t) = \sum_i a_i\, e^{-\lVert \mathbf{x} - \mathbf{c}_i(t) \rVert^2 / \sigma_i^2}`}
          className="text-[11px] normal-case tracking-normal text-chalk-dim"
        />
      </p>
    </section>
  );
}

/** A slow marquee of typeset equations. Decorative: hidden from assistive tech. */
export function EquationTicker() {
  const items = [...equations, ...equations];

  return (
    <div aria-hidden className="mask-fade-x relative overflow-hidden border-y border-line bg-ink-2/70 py-5">
      <div className="flex w-max animate-marquee items-center gap-14 pr-14 hover:[animation-play-state:paused]">
        {items.map((eq, i) => (
          <span key={`${eq.name}-${i}`} className="flex items-center gap-4 whitespace-nowrap">
            <Tex tex={eq.tex} className="text-[15px] text-chalk-dim" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-chalk-faint">{eq.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
