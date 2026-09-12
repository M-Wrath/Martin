import { Tex } from "@/app/components/tex";
import { Reveal, SectionHeading, SpotlightCard, YearsChart } from "@/app/components/ui";
import { skillSets, skillYears } from "@/app/lib/data";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24 sm:py-32">
      <SectionHeading
        index="04"
        tag="Sets"
        title="Skills"
        kicker="Every category is a finite set. Membership is listed explicitly."
      />

      <div className="grid gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SpotlightCard className="h-full">
            <div className="flex h-full flex-col p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Fig. 4.1</p>
              <div className="mt-4">
                <Tex tex={String.raw`f(\text{language}) = \text{years of use}`} className="text-lg text-chalk" />
              </div>
              <p className="mt-2 text-sm text-chalk-dim">Per language, as listed on the CV.</p>
              <div className="mt-8">
                <YearsChart data={skillYears} />
              </div>
            </div>
          </SpotlightCard>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {skillSets.map((set, i) => (
            <Reveal key={set.name} delay={100 + Math.min(i * 60, 300)} className="h-full">
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-center gap-3">
                    <Tex tex={set.symbol} className="text-2xl text-accent" />
                    <h3 className="font-display text-xl italic text-chalk">{set.name}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2">
                    <Tex tex={String.raw`\{`} className="mr-1 text-lg text-chalk-faint" />
                    {set.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-line bg-ink-2/60 px-2 py-1 font-mono text-[11px] text-chalk-dim transition-colors group-hover:border-line-strong group-hover:text-chalk"
                      >
                        {item}
                      </span>
                    ))}
                    <Tex tex={String.raw`\}`} className="ml-1 text-lg text-chalk-faint" />
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
