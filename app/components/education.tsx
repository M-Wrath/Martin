import { Reveal, SectionHeading, SpotlightCard } from "@/app/components/ui";
import { education } from "@/app/lib/data";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24 sm:py-32">
      <SectionHeading
        index="02"
        tag="Axioms"
        title="Education"
        kicker="The foundations everything below is derived from."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {education.map((entry, i) => (
          <Reveal key={entry.index} delay={i * 100} className="h-full">
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                  Axiom {entry.index}
                </p>
                <h3 className="mt-6 font-display text-2xl italic leading-tight text-chalk sm:text-[1.7rem]">
                  {entry.degree}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-chalk-dim">{entry.org}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-chalk-faint">
                  {entry.period}
                  <br />
                  {entry.location}
                </p>
                {entry.note && (
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-gold">
                    {entry.note}
                  </p>
                )}
                {entry.courses && (
                  <ul className="mt-6 space-y-1.5 border-t border-line pt-5 text-[13px] leading-relaxed text-chalk-dim">
                    {entry.courses.map((course) => (
                      <li key={course} className="flex gap-2.5">
                        <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-accent/60" />
                        {course}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
