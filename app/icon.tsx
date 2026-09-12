import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070b",
          color: "#ece8de",
          fontSize: 22,
          fontStyle: "italic",
          fontFamily: "Georgia, serif",
          borderRadius: 7,
        }}
      >
        M<span style={{ color: "#6cd3f2" }}>.</span>
      </div>
    ),
    { ...size }
  );
}
