import { ImageResponse } from "next/og";

export const alt = "Saan Market — contemporary Thai home and lifestyle goods";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#FCFBF7",
          color: "#0B1736",
          display: "flex",
          height: "100%",
          padding: "68px",
          position: "relative",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "68%" }}>
          <div style={{ color: "#2457E6", display: "flex", fontSize: 24, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase" }}>Saan Market</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95 }}>Useful objects for everyday rituals.</div>
            <div style={{ color: "#536079", display: "flex", fontSize: 28, lineHeight: 1.35 }}>A fictional storefront for contemporary Thai home and lifestyle goods.</div>
          </div>
          <div style={{ color: "#536079", display: "flex", fontSize: 22 }}>Frontend portfolio project · Fixture-backed · Simulated checkout</div>
        </div>
        <div style={{ alignItems: "center", background: "#253B80", display: "flex", height: "100%", justifyContent: "center", marginLeft: "auto", position: "relative", width: "25%" }}>
          <div style={{ background: "#F1DED2", borderRadius: 999, display: "flex", height: 180, transform: "translate(-28px, 36px)", width: 180 }} />
          <div style={{ background: "#C98B6D", display: "flex", height: 112, position: "absolute", right: 38, top: 80, transform: "rotate(-8deg)", width: 112 }} />
        </div>
      </div>
    ),
    size,
  );
}
