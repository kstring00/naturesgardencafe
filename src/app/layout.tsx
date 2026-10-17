import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { OrderProvider } from "@/components/ui/OrderPanel";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import "./globals.css";

const fraunces = localFont({
  src: "../fonts/Fraunces-Variable.woff2",
  variable: "--font-fraunces",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Times New Roman",
});

const instrument = localFont({
  src: "../fonts/InstrumentSans-Variable.woff2",
  variable: "--font-instrument",
  display: "swap",
  weight: "400 700",
  adjustFontFallback: "Arial",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.name} | Argentinian Food Delivery in Friendswood, TX`,
  description:
    "Argentinian food, organic and natural, in Friendswood, TX. Lomito, milanesa and fresh-baked empanadas for delivery or pickup from the café inside Nature's Garden.",
  keywords: [
    "Argentinian food",
    "empanadas",
    "delivery",
    "Friendswood",
    "lomito",
    "milanesa",
    "organic café",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: `${site.name} | Argentinian Food Delivery in Friendswood, TX`,
    description:
      "Lomito, milanesa and fresh-baked empanadas, delivered or ready for pickup in Friendswood.",
  },
  twitter: { card: "summary_large_image" },
  robots: site.demo ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#f6efe3",
  width: "device-width",
  initialScale: 1,
};

/** Runs before paint: turns motion on only when the visitor has not asked for reduced motion. */
const motionFlagScript = `(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.motion='on'}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlagScript }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#menu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-tinta focus:px-4 focus:py-2 focus:text-crema"
        >
          Skip to menu
        </a>
        <OrderProvider>
          <MotionProvider>{children}</MotionProvider>
        </OrderProvider>
        <Analytics />
      </body>
    </html>
  );
}
