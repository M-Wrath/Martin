import { Tex } from "@/app/components/tex";
import { Reveal, SectionHeading, SpotlightCard } from "@/app/components/ui";
import { awards, certifications, languages } from "@/app/lib/data";

export function Awards() {
  return (
    <section id="awards" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24 sm:py-32">
      <SectionHeading
        index="06"
        tag="Corollaries"
        title="Awards & Credentials"
        kicker="Consequences of the above: prizes, certificates and languages."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Reveal className="h-full">
          <SpotlightCard tone="gold" className="h-full">
            <div className="h-full p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Events & awards</p>
              <ol className="mt-6 divide-y divide-line">
                {awards.map((award) => (
                  <li key={award.index} className="py-5 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-chalk-faint">
                      <span>Corollary {award.index}</span>
                      <span>{award.year}</span>
                    </div>
                    <p className="mt-2 font-display text-xl italic leading-snug text-chalk">{award.name}</p>
                    {award.result && (
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                        {award.result}
                      </p>
                    )}
                    {award.detail && (
                      <p className="mt-2 text-[13px] leading-relaxed text-chalk-dim">{award.detail}</p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={100} className="h-full">
          <SpotlightCard className="h-full">
            <div className="h-full p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Certifications</p>
              <ul className="mt-6 space-y-4">
                {certifications.map((cert) => (
                  <li key={cert.issuer + cert.name} className="flex gap-3">
                    <Tex tex={String.raw`\vdash`} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
                        {cert.issuer}
                      </p>
                      <p className="mt-0.5 text-sm leading-snug text-chalk">{cert.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={200} className="h-full">
          <SpotlightCard className="h-full">
            <div className="h-full p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Languages</p>
              <ul className="mt-6 space-y-6">
                {languages.map((lang) => (
                  <li key={lang.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-xl italic text-chalk">{lang.name}</span>
                      <span className="text-right font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-dim">
                        {lang.level}
                      </span>
                    </div>
                    <div
                      role="img"
                      aria-label={`${lang.name}: ${lang.level}`}
                      className="mt-3 grid grid-cols-6 gap-1"
                    >
                      {Array.from({ length: 6 }, (_, k) => (
                        <span
                          key={k}
                          className={`h-1.5 rounded-full ${k < lang.cefr ? "bg-accent-deep" : "bg-line"}`}
                        />
                      ))}
                    </div>
                    <div className="mt-1.5 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-chalk-faint">
                      <span>A1</span>
                      <span>C2</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
