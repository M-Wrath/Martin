"use client";

import { useEffect, useState } from "react";
import { profile } from "@/app/lib/data";

const sections = [
  { id: "profile", label: "Profile", index: "01" },
  { id: "education", label: "Education", index: "02" },
  { id: "experience", label: "Experience", index: "03" },
  { id: "skills", label: "Skills", index: "04" },
  { id: "projects", label: "Projects", index: "05" },
  { id: "awards", label: "Awards", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
];

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Reading progress + "scrolled" state, throttled to animation frames.
  useEffect(() => {
    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
        setScrolled(window.scrollY > 40);
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Highlight the section currently in the middle band of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Mobile menu: lock scroll, close on Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5">
        <div
          className="h-full origin-left bg-accent transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
        <nav
          aria-label="Primary"
          className={`flex items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ${
            scrolled
              ? "border-line-strong bg-ink/80 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.9)]"
              : "border-line bg-ink/50"
          }`}
        >
          <a
            href="#top"
            className="px-3 font-display text-xl italic leading-none text-chalk"
            aria-label="Back to top"
          >
            M<span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "location" : undefined}
                  className={`block rounded-full px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] transition-colors ${
                    active === s.id ? "bg-chalk/[0.08] text-chalk" : "text-chalk-dim hover:text-chalk"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={profile.cvHref}
            download
            className="ml-1 hidden rounded-full bg-chalk px-4 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-accent md:inline-block"
          >
            CV ↓
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-chalk md:hidden"
          >
            <span aria-hidden className="font-mono text-lg leading-none">
              {open ? "×" : "≡"}
            </span>
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-xl md:hidden"
      >
        <ul className="space-y-1">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-2 font-display text-4xl italic text-chalk transition-colors hover:text-accent"
              >
                <span className="font-mono text-xs not-italic tracking-[0.3em] text-accent">
                  § {s.index}
                </span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={profile.cvHref}
          download
          onClick={() => setOpen(false)}
          className="mt-10 inline-flex w-max items-center gap-2 rounded-full bg-chalk px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink"
        >
          Download CV ↓
        </a>
      </div>
    </>
  );
}
