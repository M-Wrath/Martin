"use client";

/**
 * Shared client-side widgets: scroll reveal, counter, spotlight card, copy
 * button, cursor glow, section heading and the years-of-use chart.
 */

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import type { SkillYears } from "@/app/lib/data";

/* ------------------------------------------------------------------ Reveal */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[6px]"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------- Counter */

export function Counter({
  value,
  suffix = "",
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplay(value);
          return;
        }
        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setDisplay(Math.round(eased * value));
          if (progress < 1) rafRef.current = requestAnimationFrame(tick);
        }
        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ----------------------------------------------------------- SpotlightCard */

const TONES = {
  accent: "108, 211, 242",
  gold: "242, 189, 99",
} as const;

/** A card whose surface and border light up under the cursor. CSS variables only. */
export function SpotlightCard({
  children,
  className = "",
  tone = "accent",
}: {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof TONES;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rgb = TONES[tone];

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  const ringStyle: CSSProperties = {
    background: `radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(${rgb}, 0.55), transparent 65%)`,
    padding: "1px",
    WebkitMask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
    WebkitMaskComposite: "xor",
    mask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
    maskComposite: "exclude",
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`group relative overflow-hidden rounded-3xl border border-line glass transition-[border-color,transform] duration-500 hover:border-line-strong ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(560px circle at var(--mx, 50%) var(--my, 50%), rgba(${rgb}, 0.11), transparent 55%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={ringStyle}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------- CopyButton */

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard unavailable; the text is still selectable next to the button.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:border-accent hover:text-accent ${
        copied ? "border-accent text-accent" : "border-line-strong text-chalk-dim"
      } ${className}`}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* -------------------------------------------------------------- CursorGlow */

/** A soft cyan light that follows the pointer across the page. Fine pointers only. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let x = -1000;
    let y = -1000;
    const paint = () => {
      raf = 0;
      el.style.transform = `translate3d(${x - 320}px, ${y - 320}px, 0)`;
      el.style.opacity = "1";
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[2] h-[640px] w-[640px] rounded-full opacity-0 transition-opacity duration-700 will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(108,211,242,0.10) 0%, rgba(108,211,242,0.035) 32%, transparent 62%)",
        mixBlendMode: "screen",
      }}
    />
  );
}

/* ---------------------------------------------------------- SectionHeading */

export function SectionHeading({
  index,
  tag,
  title,
  kicker,
}: {
  index: string;
  tag: string;
  title: string;
  kicker?: string;
}) {
  return (
    <Reveal>
      <div className="relative mb-14 sm:mb-20">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-10 right-0 select-none font-display text-[10rem] italic leading-none text-chalk/[0.035] sm:-top-20 sm:text-[17rem]"
        >
          {index}
        </span>
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.32em] text-accent">
          <span>§ {index}</span>
          <span aria-hidden className="h-px w-12 bg-line-strong" />
          <span className="text-chalk-faint">{tag}</span>
        </div>
        <h2 className="mt-5 font-display text-[clamp(2.75rem,6.5vw,5rem)] italic leading-[0.95] tracking-tight text-chalk">
          {title}
        </h2>
        {kicker && <p className="mt-5 max-w-lg text-base leading-relaxed text-chalk-dim">{kicker}</p>}
      </div>
    </Reveal>
  );
}

/* -------------------------------------------------------------- YearsChart */

/**
 * f(language) = years of use. Single series, one hue, thin bars, value at the
 * tip, hover/focus tooltip, and a visually-hidden table for assistive tech.
 */
export function YearsChart({ data }: { data: SkillYears[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.years));

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <ol className="space-y-4" onPointerLeave={() => setActive(null)}>
        {data.map((d, i) => {
          const pct = (d.years / max) * 100;
          const isActive = active === i;
          const unit = d.years === 1 ? "yr" : "yrs";
          return (
            <li
              key={d.name}
              tabIndex={0}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              aria-label={`${d.name}: ${d.years} ${d.years === 1 ? "year" : "years"}`}
              className="relative grid grid-cols-[6.5rem_1fr_3.25rem] items-center gap-3 rounded-md outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <span className={`truncate font-mono text-xs transition-colors ${isActive ? "text-chalk" : "text-chalk-dim"}`}>
                {d.name}
              </span>
              <span className="relative h-3.5 border-l border-line-strong">
                <span
                  className="absolute inset-y-0 left-0 rounded-r-[4px] bg-accent-deep transition-[width,opacity] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    width: shown ? `${pct}%` : "0%",
                    transitionDelay: `${i * 80}ms`,
                    opacity: active === null || isActive ? 1 : 0.45,
                  }}
                />
              </span>
              <span className="font-mono text-xs tabular-nums text-chalk">
                {d.years} {unit}
              </span>
              {isActive && (
                <span
                  role="tooltip"
                  className="pointer-events-none absolute -top-9 left-[6.5rem] z-10 whitespace-nowrap rounded-md bg-chalk px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink shadow-lg"
                >
                  {d.name} · {d.years} {d.years === 1 ? "year" : "years"}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <table className="sr-only">
        <caption>Years of experience per programming language</caption>
        <thead>
          <tr>
            <th scope="col">Language</th>
            <th scope="col">Years</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.name}>
              <th scope="row">{d.name}</th>
              <td>{d.years}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
