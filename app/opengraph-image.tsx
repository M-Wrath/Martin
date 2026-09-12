import { ImageResponse } from "next/og";
import { profile } from "@/app/lib/data";

export const alt = `${profile.name} — portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Fetch a Google Font as TTF at build time (the old user-agent makes the CSS
 * API answer with truetype instead of woff2, which satori can't read).
 * Returns null on any failure so the image still renders with a fallback face.
 */
async function loadGoogleFont(family: string, italic: boolean): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:ital@${
      italic ? 1 : 0
    }&display=swap`;
    const css = await (
      await fetch(cssUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 6.1; rv:12.0) Gecko/20100101 Firefox/12.0",
        },
      })
    ).text();
    const match = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"](?:truetype|opentype|woff)['"]\)/);
    if (!match) return null;
    const res = await fetch(match[1]);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const serif = await loadGoogleFont("Instrument Serif", true);
  // Only pass `fonts` when we actually have one: an empty list disables the
  // renderer's built-in fallback face and fails the build.
  const options = serif
    ? {
        ...size,
        fonts: [{ name: "Instrument Serif", data: serif, style: "italic" as const, weight: 400 as const }],
      }
    : { ...size };
  const display = serif ? "Instrument Serif" : "serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#05070b",
          color: "#ece8de",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(108,211,242,0.18), transparent 55%), radial-gradient(circle at 10% 95%, rgba(242,189,99,0.12), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#6cd3f2",
          }}
        >
          <span>§ Portfolio</span>
          <span style={{ color: "#62656d" }}>2026</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: display,
              fontStyle: "italic",
              fontSize: 150,
              lineHeight: 0.95,
              letterSpacing: -4,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "#a3a39c",
              display: "flex",
              gap: 14,
            }}
          >
            <span style={{ fontFamily: display, fontStyle: "italic", color: "#ece8de" }}>M :=</span>
            <span>{"{ " + profile.roles.join(", ") + " }"}</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#62656d",
            letterSpacing: 3,
          }}
        >
          <span>{profile.email}</span>
          <div style={{ width: 18, height: 18, background: "#6cd3f2" }} />
        </div>
      </div>
    ),
    options
  );
}
