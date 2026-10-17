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
  const [bodoni, hanken] = await Promise.all([
    readFile(join(root, "src/fonts/og/BodoniModa-Italic.ttf")),
    readFile(join(root, "src/fonts/og/HankenGrotesk-Medium.ttf")),
  ]);
  const tray = getPhoto("tray");
  const photo = tray ? `data:image/jpeg;base64,${(await readFile(join(root, "public", tray.src))).toString("base64")}` : null;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FBF8F1", color: "#1F1B14", fontFamily: "Hanken Grotesk" }}>
        {photo && (
          <div style={{ display: "flex", width: 560, height: 630, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="" width={560} height={630} style={{ objectFit: "cover", width: 560, height: 630 }} />
          </div>
        )}
        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", padding: "56px 64px", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#4E5B31" }}>
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="#4E5B31" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M32 58 C 18 54, 8 42, 8 26 C 8 18, 11 12, 15 8" />
              <path d="M11 44 C 4 42, 2 36, 3 30 C 9 32, 12 38, 11 44 Z" fill="#7A8F3C" />
              <path d="M9 32 C 4 28, 3 22, 6 16 C 11 19, 12 26, 9 32 Z" fill="#7A8F3C" />
              <path d="M32 58 C 46 54, 56 42, 56 26 C 56 18, 53 12, 49 8" />
              <path d="M53 44 C 60 42, 62 36, 61 30 C 55 32, 52 38, 53 44 Z" fill="#7A8F3C" />
              <path d="M55 32 C 60 28, 61 22, 58 16 C 53 19, 52 26, 55 32 Z" fill="#7A8F3C" />
            </svg>
            <span>Nature&rsquo;s Garden Cafe &amp; Resto</span>
          </div>
          <div
            style={{
              display: "flex",
              background: "#74ACDF",
              border: "3px solid #D9A441",
              padding: "18px 28px",
              fontFamily: "Bodoni Moda",
              fontSize: 44,
              lineHeight: 1.08,
            }}
          >
            Argentinian food, organic and natural, inside Nature&rsquo;s Garden, Friendswood.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 24, color: "#5A5243" }}>
            <span>Lomito, milanesa and fresh-baked empanadas.</span>
            <span>Delivery and pickup. {site.phone.display}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bodoni Moda", data: bodoni, weight: 600, style: "italic" },
        { name: "Hanken Grotesk", data: hanken, weight: 500, style: "normal" },
      ],
    },
  );
}
