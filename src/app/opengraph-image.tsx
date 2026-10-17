import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";
import { getPhoto } from "@/lib/photos";

export const alt = `${site.name}: Argentinian food, organic and natural, in Friendswood, TX`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const root = process.cwd();

export default async function OpenGraphImage() {
  const [fraunces, instrument] = await Promise.all([
    readFile(join(root, "src/fonts/og/Fraunces-SemiBold.ttf")),
    readFile(join(root, "src/fonts/og/InstrumentSans-Medium.ttf")),
  ]);

  // Real empanada photo on the right when it exists; typographic card otherwise.
  const photo = getPhoto("empanadas");
  const photoData = photo
    ? `data:image/jpeg;base64,${(await readFile(join(root, "public", photo.src))).toString("base64")}`
    : null;

  const headline = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ fontFamily: "Fraunces", fontSize: photoData ? 76 : 92, lineHeight: 0.95, letterSpacing: -2 }}>
        Argentinian food,
      </div>
      <div style={{ fontFamily: "Fraunces", fontSize: photoData ? 76 : 92, lineHeight: 0.95, letterSpacing: -2 }}>
        organic &amp; natural,
      </div>
      <div
        style={{ fontFamily: "Fraunces", fontSize: photoData ? 76 : 92, lineHeight: 0.95, letterSpacing: -2, color: "#B9872A" }}
      >
        in Friendswood.
      </div>
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F6EFE3",
          color: "#2A2418",
          fontFamily: "Instrument Sans",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 64,
            width: photoData ? 720 : 1200,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="#4E5B31" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M32 58 C 18 54, 8 42, 8 26 C 8 18, 11 12, 15 8" />
              <path d="M11 44 C 4 42, 2 36, 3 30 C 9 32, 12 38, 11 44 Z" fill="#7A8F3C" />
              <path d="M9 32 C 4 28, 3 22, 6 16 C 11 19, 12 26, 9 32 Z" fill="#7A8F3C" />
              <path d="M18 52 C 11 52, 7 48, 6 42 C 12 42, 17 46, 18 52 Z" fill="#7A8F3C" />
              <path d="M32 58 C 46 54, 56 42, 56 26 C 56 18, 53 12, 49 8" />
              <path d="M53 44 C 60 42, 62 36, 61 30 C 55 32, 52 38, 53 44 Z" fill="#7A8F3C" />
              <path d="M55 32 C 60 28, 61 22, 58 16 C 53 19, 52 26, 55 32 Z" fill="#7A8F3C" />
              <path d="M46 52 C 53 52, 57 48, 58 42 C 52 42, 47 46, 46 52 Z" fill="#7A8F3C" />
            </svg>
            <div style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#4E5B31" }}>
              {site.name}
            </div>
          </div>
          {headline}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 26, color: "#5A5243" }}>
            <div>Lomito · Milanesa · Empanadas · Delivery &amp; pickup</div>
            <div>{site.phone.display}</div>
          </div>
        </div>
        {photoData && (
          <div style={{ display: "flex", width: 480, height: 630, padding: "40px 40px 40px 0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoData}
              alt=""
              width={440}
              height={550}
              style={{ objectFit: "cover", borderRadius: 220, border: "6px solid #D9A441" }}
            />
          </div>
        )}
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
