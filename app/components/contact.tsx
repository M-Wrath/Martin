import { Tex } from "@/app/components/tex";
import { CopyButton, Reveal, SectionHeading, SpotlightCard } from "@/app/components/ui";
import { profile, testimonials } from "@/app/lib/data";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24 sm:py-32">
      <SectionHeading
        index="07"
        tag="Q.E.D."
        title="Contact"
        kicker="Quod erat demonstrandum. Two witnesses, then the conclusion."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 100} className="h-full">
            <SpotlightCard className="h-full">
              <figure className="flex h-full flex-col p-8">
                <span aria-hidden className="font-display text-6xl italic leading-none text-accent">
                  “
                </span>
                <blockquote className="-mt-4 font-display text-2xl italic leading-snug text-chalk sm:text-[1.7rem]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto pt-8 font-mono text-[11px] leading-relaxed text-chalk-dim">
                  <span className="text-chalk">{t.name}</span>
                  <br />
                  <span className="text-chalk-faint">{t.role}</span>
                </figcaption>
              </figure>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={150}>
        <div className="glass relative mt-5 overflow-hidden rounded-3xl border border-line px-8 py-16 text-center sm:px-16 sm:py-24">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -right-24 -z-10 h-[22rem] w-[22rem] rounded-full bg-gold/[0.07] blur-[110px]"
          />
          <Tex tex={String.raw`\therefore`} className="text-5xl text-accent" />
          <h3 className="mx-auto mt-6 max-w-2xl font-display text-4xl italic leading-tight text-chalk sm:text-5xl">
            {profile.status}
          </h3>
          <p className="mx-auto mt-5 max-w-md text-chalk-dim">
            Based in {profile.location}. The fastest way to reach me is email.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-3 rounded-full bg-chalk px-7 py-3.5 font-mono text-xs text-ink transition-transform hover:scale-[1.03]"
            >
              {profile.email}
            </a>
            <CopyButton text={profile.email} className="px-5 py-3.5 text-[11px]" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-[0.22em] text-chalk-dim">
            <a href={profile.github} target="_blank" rel="noreferrer noopener" className="transition-colors hover:text-accent">
              GitHub ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" className="transition-colors hover:text-accent">
              LinkedIn ↗
            </a>
            <a href={profile.cvHref} download className="transition-colors hover:text-accent">
              Download CV ↓
            </a>
          </div>

          <p className="mt-14 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-chalk-faint">
            <span>Q.E.D.</span>
            <Tex tex={String.raw`\blacksquare`} className="text-accent" />
          </p>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-chalk-faint">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
