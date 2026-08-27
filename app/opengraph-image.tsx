import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const alt = `${site.name} — ${site.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The share card mirrors the page: paper background, pixel-grid band, ink headline.
const BAND = ["#1c2541", "#3b5bd9", "#f5c518", "#e0492a", "#d8ff00"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFFFFF",
          color: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 2 }}>
          <span>{site.name.toUpperCase()}</span>
          <span style={{ color: "#8b8b8b" }}>{site.location.toUpperCase()}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 36 }}>
            {Array.from({ length: 26 }).map((_, i) => (
              <div key={i} style={{ width: 28, height: 28, background: BAND[i % BAND.length] }} />
            ))}
          </div>
          <div style={{ fontSize: 118, lineHeight: 1, letterSpacing: -4, textTransform: "uppercase" }}>
            Fullstack,
          </div>
          <div style={{ fontSize: 118, lineHeight: 1, letterSpacing: -4, textTransform: "uppercase" }}>
            engineered.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 26 }}>
          <span style={{ color: "#2a2a2a", maxWidth: 620 }}>
            React · Next.js · Node.js · Flutter
          </span>
          <span style={{ background: "#0A0A0A", color: "#fff", padding: "14px 26px", fontSize: 22 }}>
            {site.role.toUpperCase()}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
