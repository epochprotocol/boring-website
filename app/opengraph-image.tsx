import { ImageResponse } from "next/og";
import { POSITIONING, TAGLINE } from "@/lib/site";

export const alt = `Epoch — ${TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// The site builds with `output: export`, so the image must be prerendered at
// build time rather than generated per request.
export const dynamic = "force-static";

/**
 * Flat 1200x630 canvas in the site's own ledger language: black field,
 * hairline rules, monospace eyebrow, wordmark, tagline. No gradients, no
 * shadows — the card should read as a page from the same document as the
 * site, not a banner ad.
 *
 * The mark's three shade steps are hardcoded here because CSS variables do
 * not resolve inside an ImageResponse canvas.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Epoch mark, 48x48 viewBox scaled to 64. */}
          <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
            <polygon
              fill="#f4f6f8"
              points="20.74,9.7 27.17,9.7 29.57,13.92 27.65,17.47 20.64,18.14 18.34,13.92"
            />
            <polygon
              fill="#c8cdd4"
              points="15.26,19.2 21.31,19.49 29.57,33.98 26.88,38.69 21.12,38.78 17.57,32.74"
            />
            <polygon
              fill="#f4f6f8"
              points="26.76,19.2 32.81,19.49 41.07,33.98 38.38,38.69 32.62,38.78 29.07,32.74"
            />
            <polygon
              fill="#9aa1ab"
              points="9.6,28.99 15.26,28.99 18.14,33.89 15.84,37.92 9.6,38.78 6.82,33.89"
            />
          </svg>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 22,
              letterSpacing: "0.14em",
              color: "#848b96",
            }}
          >
            <span>{POSITIONING.toUpperCase()}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 600,
              color: "#f4f6f8",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Epoch
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              color: "#c0c5cd",
              marginTop: 24,
              lineHeight: 1.3,
            }}
          >
            {TAGLINE}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            borderTop: "1px solid rgba(255, 255, 255, 0.18)",
            paddingTop: 28,
            fontSize: 24,
            letterSpacing: "0.08em",
            color: "#848b96",
          }}
        >
          <span>EPOCHPROTOCOL.XYZ</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
