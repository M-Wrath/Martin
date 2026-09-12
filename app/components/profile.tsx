import { Tex } from "@/app/components/tex";
import { CopyButton, Reveal, SectionHeading, SpotlightCard } from "@/app/components/ui";
import { profile } from "@/app/lib/data";

const rowClass = "grid grid-cols-[6rem_1fr] gap-4 py-3.5";
const keyClass = "pt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint";
const linkClass =
  "text-chalk underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

export function Profile() {
  return (
    <section id="profile" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24 sm:py-32">
      <SectionHeading
        index="01"
        tag="Definition"
        title="Profile"
        kicker="A definition, not a decoration: what the symbol M denotes throughout."
      />

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="h-full">
          <SpotlightCard className="h-full">
            <div className="relative h-full p-8 sm:p-10">
              <span aria-hidden className="corner-brackets pointer-events-none absolute inset-4" />
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                Definition 1.1 <span className="text-chalk-faint">(Martin)</span>
              </p>
              <p className="mt-7 font-display text-[1.6rem] italic leading-snug text-chalk sm:text-3xl">
                {profile.summaryLead}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-chalk-dim">
                {profile.summaryRest}
              </p>
              <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-5">
                <p className="font-mono text-[11px] text-chalk-faint">
                  Throughout this document, <Tex tex="M" className="text-chalk" /> denotes the author.
                </p>
                <Tex tex={String.raw`\blacksquare`} className="text-accent" />
              </div>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={120} className="h-full">
          <SpotlightCard tone="gold" className="h-full">
            <div className="h-full p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Coordinates</p>
              <dl className="mt-5 divide-y divide-line">
                <div className={rowClass}>
                  <dt className={keyClass}>Location</dt>
                  <dd className="text-sm text-chalk">{profile.location}</dd>
                </div>
                <div className={rowClass}>
                  <dt className={keyClass}>Currently</dt>
                  <dd className="text-sm text-chalk">{profile.currently}</dd>
                </div>
                <div className={rowClass}>
                  <dt className={keyClass}>Email</dt>
                  <dd className="flex flex-wrap items-center gap-3 text-sm">
                    <a href={`mailto:${profile.email}`} className={linkClass}>
                      {profile.email}
                    </a>
                    <CopyButton text={profile.email} />
                  </dd>
                </div>
                <div className={rowClass}>
                  <dt className={keyClass}>GitHub</dt>
                  <dd className="text-sm">
                    <a href={profile.github} target="_blank" rel="noreferrer noopener" className={linkClass}>
                      @{profile.githubHandle} ↗
                    </a>
                  </dd>
                </div>
                <div className={rowClass}>
                  <dt className={keyClass}>LinkedIn</dt>
                  <dd className="text-sm">
                    <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" className={linkClass}>
                      in/{profile.linkedinHandle} ↗
                    </a>
                  </dd>
                </div>
                <div className={rowClass}>
                  <dt className={keyClass}>Status</dt>
                  <dd className="flex items-start gap-2.5 text-sm text-chalk">
                    <span aria-hidden className="relative mt-1.5 flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                    {profile.status}
                  </dd>
                </div>
              </dl>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
