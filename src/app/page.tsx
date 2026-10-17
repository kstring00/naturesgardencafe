import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyOrderBar } from "@/components/layout/StickyOrderBar";
import { Hero } from "@/components/sections/Hero";
import { Menu } from "@/components/sections/Menu";
import { HowDelivery } from "@/components/sections/HowDelivery";
import { DozenOrders } from "@/components/sections/DozenOrders";
import { InsideNaturesGarden } from "@/components/sections/InsideNaturesGarden";
import { RepulgueDivider } from "@/components/ui/RepulgueDivider";
import { site } from "@/content/site";

/** Structured data: only facts we have. No hours, no ratings, no invented fields. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  servesCuisine: "Argentinian",
  telephone: site.phone.e164,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  hasMap: site.address.mapsUrl,
  containedInPlace: { "@type": "Store", name: site.market.name },
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
        <HowDelivery />
        <RepulgueDivider tone="dorado" />
        <DozenOrders />
        <InsideNaturesGarden />
      </main>
      <SiteFooter />
      <StickyOrderBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
