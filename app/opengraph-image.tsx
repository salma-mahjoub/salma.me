import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = siteConfig.description;
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#fafafa",
          color: "#18181b",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            borderBottom: "2px solid #18181b",
            display: "flex",
            fontFamily: "sans-serif",
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 0,
            marginBottom: 48,
            paddingBottom: 16,
            width: "100%",
          }}
        >
          Sm
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: 86,
              fontWeight: 700,
              letterSpacing: 0,
              lineHeight: 1,
            }}
          >
            Salma Mahjoub
          </div>
          <div
            style={{
              color: "#52525b",
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: 34,
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            Creative mobile and full-stack developer. Open to a PFE internship from January 2027.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
