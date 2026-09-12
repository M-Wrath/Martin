import Link from "next/link";
import { Tex } from "@/app/components/tex";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-40 text-center">
      <Tex tex={String.raw`\nexists`} className="text-6xl text-accent" />
      <h1 className="mt-8 font-display text-4xl italic text-chalk sm:text-5xl">
        This page does not exist.
      </h1>
      <p className="mt-4 max-w-md text-chalk-dim">
        Proof: the router searched the whole domain and found nothing. Contradiction.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full border border-line-strong px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-chalk transition-colors hover:border-accent hover:text-accent"
      >
        ← Back to the proof
      </Link>
    </main>
  );
}
