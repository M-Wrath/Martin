import katex from "katex";

type TexProps = {
  /** LaTeX source. Use String.raw at call sites to avoid double escaping. */
  tex: string;
  display?: boolean;
  className?: string;
};

/**
 * Server-rendered KaTeX. Emits HTML + MathML (MathML is what screen readers
 * announce), so equations cost zero client JavaScript.
 */
export function Tex({ tex, display = false, className }: TexProps) {
  const html = katex.renderToString(tex, {
    throwOnError: false,
    displayMode: display,
    output: "htmlAndMathml",
    strict: "ignore",
  });

  if (display) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
