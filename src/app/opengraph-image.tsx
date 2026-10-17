import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name}: Argentinian food, organic and natural, in Friendswood, TX`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [fraunces, instrument] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/og/Fraunces-SemiBold.ttf")),
    readFile(join(process.cwd(), "src/fonts/og/InstrumentSans-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#F6EFE3",
          color: "#2A2418",
          fontFamily: "Instrument Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#4E5B31" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 60 C 32 44, 33 30, 36 8" />
            <path d="M31 48 C 20 48, 12 40, 10 30 C 20 30, 29 36, 31 48 Z" fill="#7A8F3C" />
            <path d="M33 34 C 24 32, 18 24, 18 14 C 27 16, 33 24, 33 34 Z" fill="#7A8F3C" />
            <path d="M33 44 C 44 44, 52 36, 54 26 C 44 26, 35 32, 33 44 Z" fill="#7A8F3C" />
            <path d="M35 30 C 44 28, 50 20, 50 10 C 41 12, 35 20, 35 30 Z" fill="#7A8F3C" />
          </svg>
          <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: "#4E5B31" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Fraunces", fontSize: 92, lineHeight: 0.95, letterSpacing: -2 }}>
            Argentinian food,
          </div>
          <div style={{ fontFamily: "Fraunces", fontSize: 92, lineHeight: 0.95, letterSpacing: -2 }}>
            organic &amp; natural,
          </div>
          <div style={{ fontFamily: "Fraunces", fontSize: 92, lineHeight: 0.95, letterSpacing: -2, color: "#B9872A" }}>
            in Friendswood.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#5A5243" }}>
          <div>Lomito · Milanesa · Empanadas · Delivery &amp; pickup</div>
          <div>{site.phone.display}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
        { name: "Instrument Sans", data: instrument, weight: 500, style: "normal" },
      ],
    },
  );
}
