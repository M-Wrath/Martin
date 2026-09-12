"use client";

import { useEffect, useRef } from "react";

/**
 * An aurora: soft fields of light drifting across the dark sky.
 *
 *   I(x, t) = Σ_i aᵢ exp(−‖x − cᵢ(t)‖² / σᵢ²)
 *
 * Five blurred, tinted circles — each one a discretised 2-D Gaussian — wander
 * on independent loops (see the `aurora-a..d` keyframes in globals.css).
 * Cyan sits toward the upper right, gold lower and further right, so they
 * layer without curdling into a muddy blend, and the left side (behind the
 * name) stays dark. The whole field leans gently toward the pointer for a
 * little depth.
 *
 * Everything here is `transform`/`opacity`, so the compositor does all of it
 * off the main thread: the drift is pure CSS keyframes, and the pointer-lean
 * is a plain `pointermove` listener setting two CSS variables (rAF-throttled,
 * eased by a CSS transition) — reactive to real events, not a redraw loop.
 * Unlike a live per-pixel shader, none of this can spike CPU/GPU cost or
 * stall the page. `prefers-reduced-motion` freezes the drift via the global
 * rule in globals.css and this component skips the pointer listener too.
 */
export function HeroBackground({ className = "" }: { className?: string }) {
  const wanderRef = useRef<HTMLDivElement>(null);
  const leanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wander = wanderRef.current;
    const lean = leanRef.current;
    if (!wander || !lean) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const section = wander.closest("section") ?? document.body;
    let raf = 0;

    function apply(nx: number, ny: number) {
      raf = 0;
      lean!.style.setProperty("--px", nx.toFixed(3));
      lean!.style.setProperty("--py", ny.toFixed(3));
    }
    function onMove(e: PointerEvent) {
      const rect = section.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => apply(nx, ny));
    }
    function onLeave() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => apply(0, 0));
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wanderRef} aria-hidden className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        ref={leanRef}
        className="absolute inset-0 transition-transform duration-[900ms] ease-out will-change-transform"
        style={{ transform: "translate3d(calc(var(--px, 0) * 26px), calc(var(--py, 0) * 18px), 0)" }}
      >
        <div className="animate-aurora-a absolute left-[40%] top-[0%] h-[28rem] w-[34rem] rounded-full bg-accent/45 blur-[85px]" />
        <div
          className="animate-aurora-b absolute right-[-8%] top-[26%] h-[24rem] w-[30rem] rounded-full bg-gold/35 blur-[90px]"
          style={{ animationDelay: "-11s" }}
        />
        <div
          className="animate-aurora-c absolute right-[6%] top-[-10%] h-[20rem] w-[22rem] rounded-full bg-accent/40 blur-[70px]"
          style={{ animationDelay: "-5s" }}
        />
        <div
          className="animate-aurora-d absolute bottom-[-12%] right-[16%] h-[22rem] w-[28rem] rounded-full bg-gold/28 blur-[80px]"
          style={{ animationDelay: "-17s" }}
        />
        <div
          className="animate-aurora-a absolute bottom-[4%] left-[56%] h-[16rem] w-[20rem] rounded-full bg-accent/25 blur-[65px]"
          style={{ animationDelay: "-21s" }}
        />
      </div>
    </div>
  );
}
