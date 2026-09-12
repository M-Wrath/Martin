import { Reveal, SectionHeading, SpotlightCard } from "@/app/components/ui";
import { profile, projects } from "@/app/lib/data";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24 sm:py-32">
      <SectionHeading
        index="05"
        tag="Lemmas"
        title="Projects"
        kicker="Smaller results, each useful on its own and in what came after."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.index} delay={Math.min(i * 70, 280)} className="h-full">
            <SpotlightCard className="h-full">
              <article className="flex h-full flex-col p-7">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em]">
                  <span className="text-accent">Lemma {project.index}</span>
                  <span className="text-chalk-faint">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 font-display text-[1.75rem] italic leading-tight text-chalk">
                  {project.name}
                </h3>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  {project.context}
                </p>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-chalk-dim">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-line px-2 py-1 font-mono text-[10px] text-chalk-dim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </SpotlightCard>
          </Reveal>
        ))}

        <Reveal delay={350} className="h-full">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex h-full min-h-[16rem] flex-col justify-between rounded-3xl border border-dashed border-line-strong p-7 transition-colors hover:border-accent"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-chalk-faint">Remark</span>
            <div>
              <p className="font-display text-[1.75rem] italic leading-tight text-chalk transition-colors group-hover:text-accent">
                More on GitHub <span aria-hidden>↗</span>
              </p>
              <p className="mt-2 font-mono text-xs text-chalk-dim">github.com/{profile.githubHandle}</p>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
