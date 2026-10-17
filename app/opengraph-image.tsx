import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Daniyal Malik, full-stack engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f1efe8",
          color: "#141412",
          fontFamily: "ui-monospace, Menlo, monospace",
          padding: 72,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 3, color: "#6b675c", borderBottom: "3px solid #141412", paddingBottom: 16 }}>
          <span>STATEMENT OF ACCOUNT · NO. 0001</span>
          <span>DANIYALMLK.GITHUB.IO</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>Daniyal Malik</div>
          <div style={{ fontSize: 30, color: "#4a473f", maxWidth: 900, lineHeight: 1.3 }}>
            Full-stack engineer. Ledgers, billing, pricing, authorization: the parts of a product where a wrong number is a bug.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, borderTop: "3px solid #141412", paddingTop: 16 }}>
          <span>9 open-source finance libraries · output attached, not described</span>
          <span style={{ fontWeight: 600 }}>all accounts reconciled</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
