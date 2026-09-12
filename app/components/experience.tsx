import { Tex } from "@/app/components/tex";
import { Reveal, SectionHeading } from "@/app/components/ui";
import { experience, timeline, today, type TimelineItem } from "@/app/lib/data";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24 sm:py-32">
      <SectionHeading
        index="03"
        tag="Theorems"
        title="Experience"
        kicker="Each role stated as a result, followed by its proof."
      />

      <Reveal>
        <div className="glass mb-16 rounded-3xl border border-line p-6 sm:p-8">
          <TimelineAxis />
        </div>
      </Reveal>

      <ol className="divide-y divide-line border-t border-line">
        {experience.map((job, i) => (
          <li key={job.index}>
            <Reveal delay={Math.min(i * 60, 200)}>
              <article className="grid gap-6 py-12 lg:grid-cols-[13rem_1fr] lg:gap-12">
                <div className="lg:pt-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Theorem {job.index}</p>
                  <p className="mt-3 font-mono text-xs text-chalk">{job.period}</p>
                  <p className="mt-1 text-xs text-chalk-faint">{job.location}</p>
                </div>

                <div>
                  <h3 className="font-display text-3xl italic leading-tight text-chalk sm:text-4xl">{job.role}</h3>
                  <p className="mt-2 text-sm text-chalk-dim">{job.org}</p>

                  <div className="mt-7">
                    <p className="font-display text-lg italic text-chalk-dim">Proof.</p>
                    <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-chalk-dim">
                      {job.bullets.map((bullet, k) => (
                        <li key={bullet} className="flex gap-4">
                          <span className="shrink-0 font-mono text-[11px] leading-[1.9] text-chalk-faint">({k + 1})</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-chalk-dim"
                        >
                          {tag}
                        </span>
                      ))}
                      <Tex tex={String.raw`\blacksquare`} className="ml-auto text-accent" />
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------ TimelineAxis */

const START = 2018;
const END = 2029; // the axis runs to Jan 2029
const TOTAL = (END - START) * 12;
const W = 1000;
const PAD_L = 12;
const PAD_R = 12;
const ROW = 26;
const TOP = 36;
const BOTTOM = 30;

function months(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return (y - START) * 12 + (m - 1);
}

const X = (mi: number) => PAD_L + (mi / TOTAL) * (W - PAD_L - PAD_R);

/** Fig. 3.1: every role and degree as a span on a real, proportional time axis. */
function TimelineAxis() {
  const rows: TimelineItem[] = [...timeline].sort((a, b) => a.start.localeCompare(b.start));
  const H = TOP + rows.length * ROW + BOTTOM;
  const years = Array.from({ length: END - START + 1 }, (_, i) => START + i);
  const nowX = X(months(today));

  return (
    <figure>
      <figcaption className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-chalk-faint">
        <span className="text-chalk-dim">Fig. 3.1 — Timeline, 2018 → 2028</span>
        <span className="flex items-center gap-2">
          <i aria-hidden className="h-2.5 w-2.5 rounded-[3px] bg-accent-deep" /> Work
        </span>
        <span className="flex items-center gap-2">
          <i aria-hidden className="h-2.5 w-2.5 rounded-[3px] bg-gold-deep" /> Education
        </span>
      </figcaption>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[760px]"
          role="img"
          aria-label="Timeline of work and education from 2018 to 2028"
        >
          {years.map((y) => {
            const x = X((y - START) * 12);
            return (
              <g key={y}>
                <line x1={x} x2={x} y1={TOP - 10} y2={H - BOTTOM + 6} stroke="var(--line)" strokeWidth="1" />
                <text x={x} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--chalk-faint)" className="font-mono">
                  {y}
                </text>
              </g>
            );
          })}

          <line x1={nowX} x2={nowX} y1={TOP - 18} y2={H - BOTTOM + 6} stroke="var(--chalk)" strokeOpacity="0.4" strokeWidth="1" />
          <text x={nowX + 7} y={TOP - 14} fontSize="10" fill="var(--chalk-dim)" letterSpacing="2" className="font-mono">
            NOW
          </text>

          {rows.map((item, r) => {
            const y = TOP + r * ROW + 5;
            const x1 = X(months(item.start));
            const x2 = Math.max(X(months(item.end) + 1), x1 + 6);
            const fill = item.kind === "work" ? "var(--accent-deep)" : "var(--gold-deep)";
            const fitsRight = x2 + 8 + item.label.length * 6.8 < W - PAD_R;
            return (
              <g key={`${item.label}-${item.start}`}>
                <title>{`${item.label}: ${item.detail}`}</title>
                <rect x={x1} y={y} width={x2 - x1} height={14} rx={4} fill={fill} />
                <text
                  x={fitsRight ? x2 + 8 : x1 - 8}
                  y={y + 11}
                  textAnchor={fitsRight ? "start" : "end"}
                  fontSize="11"
                  fill="var(--chalk-dim)"
                  className="font-mono"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
