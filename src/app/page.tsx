import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyOrderBar } from "@/components/layout/StickyOrderBar";
import { Hero } from "@/components/sections/Hero";
import { Menu } from "@/components/sections/Menu";
import { Reviews } from "@/components/sections/Reviews";
import { HowDelivery } from "@/components/sections/HowDelivery";
import { DozenOrders } from "@/components/sections/DozenOrders";
import { FindUs } from "@/components/sections/FindUs";
import { RepulgueDivider } from "@/components/ui/RepulgueDivider";
import { site } from "@/content/site";
import { isShown } from "@/content/types";
import { siteUrl } from "@/lib/env";

/** Structured data: only facts we have. No hours or ratings until confirmed. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  servesCuisine: "Argentinian",
  priceRange: "$$",
  telephone: site.phone.schema,
  hasMenu: `${siteUrl}/#menu`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  hasMap: site.address.mapsUrl,
  sameAs: [site.social.facebook, site.market.url].filter(Boolean),
  ...(isShown(site.hours)
    ? {
        openingHoursSpecification: site.hours.value.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.days,
          opens: h.open,
          closes: h.close,
        })),
      }
    : {}),
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <RepulgueDivider tone="dorado" />
        <Menu />
        <RepulgueDivider tone="oliva" flip />
        <Reviews />
        <HowDelivery />
        <RepulgueDivider tone="dorado" />
        <DozenOrders />
        <FindUs />
      </main>
      <SiteFooter />
      <StickyOrderBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
