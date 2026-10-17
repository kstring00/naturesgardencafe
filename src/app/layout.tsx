import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { OrderProvider } from "@/components/ui/OrderPanel";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import { siteMode, siteUrl } from "@/lib/env";
import "./globals.css";

const bodoni = localFont({
  src: [
    { path: "../fonts/BodoniModa-Variable.woff2", weight: "400 900", style: "normal" },
    { path: "../fonts/BodoniModa-Italic.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-bodoni",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const hanken = localFont({
  src: "../fonts/HankenGrotesk-Variable.woff2",
  variable: "--font-hanken",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

const title = `${site.name} | Argentinian Food Delivery in Friendswood, TX`;
const description =
  "Argentinian food, organic and natural, in Friendswood, TX. Lomito, milanesa and fresh-baked empanadas for delivery or pickup from the café inside Nature's Garden.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["Argentinian food", "empanadas", "delivery", "Friendswood", "lomito", "milanesa", "organic café"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title,
    description: "Lomito, milanesa and fresh-baked empanadas, delivered or ready for pickup in Friendswood.",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: siteMode === "demo" ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f1",
  width: "device-width",
  initialScale: 1,
};

/** Runs before paint: records the visitor's motion preference for CSS and the motion layer. */
const motionFlagScript = `(function(){try{document.documentElement.dataset.motion=matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'on'}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${hanken.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlagScript }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#carta"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-tinta focus:px-4 focus:py-2 focus:text-blanco"
        >
          Skip to the menu
        </a>
        <OrderProvider>
          <MotionProvider>{children}</MotionProvider>
        </OrderProvider>
        <Analytics />
      </body>
    </html>
  );
}
