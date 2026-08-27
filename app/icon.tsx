import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// The Y from the site's pixel mark, on its own 5x5 grid so it survives at 16px.
const Y = [
  [1, 0, 0, 0, 1],
  [0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
];

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Y.map((row, r) => (
          <div key={r} style={{ display: "flex" }}>
            {row.map((on, c) => (
              <div
                key={c}
                style={{ width: 5, height: 5, background: on ? "#FFFFFF" : "transparent" }}
              />
            ))}
          </div>
        ))}
      </div>
    ),
    size,
  );
}
