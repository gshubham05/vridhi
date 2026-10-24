import { ImageResponse } from "next/og";
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? "Spaces That Inspire. Structures That Last.").slice(0, 110);
  const kicker = (searchParams.get("kicker") ?? "Vridhi Construction").slice(0, 40);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#1c1b19",
        color: "#f7f3ea",
        padding: 72,
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#c3a46b",
        }}
      >
        {kicker}
      </div>
      <div style={{ display: "flex", fontSize: 72, lineHeight: 1.1, maxWidth: 980 }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28 }}>
        <div style={{ width: 64, height: 2, background: "#c3a46b" }} />
        Vridhi Construction · Dehradun
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
