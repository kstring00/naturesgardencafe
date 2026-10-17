import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyOrderBar } from "@/components/layout/StickyOrderBar";
import { HeroWalkIn } from "@/components/sections/HeroWalkIn";
import { WreathMoment } from "@/components/sections/WreathMoment";
import { Pamphlet } from "@/components/sections/Pamphlet";
import { TresHistorias } from "@/components/sections/TresHistorias";
import { GuestBook } from "@/components/sections/GuestBook";
import { DeliveryRibbon } from "@/components/sections/DeliveryRibbon";
import { FindUs } from "@/components/sections/FindUs";
import { Origin } from "@/components/sections/Origin";
import { GroupOrders } from "@/components/sections/GroupOrders";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/env";
import { getPhoto } from "@/lib/photos";
import { hoursList, story } from "@/lib/story";

const hours = hoursList();

/** Structured data: only facts we have. Hours appear once story.json carries them. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  servesCuisine: "Argentinian",
  priceRange: "$$",
  telephone: site.phone.schema,
  hasMenu: `${siteUrl}/#carta`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: story.location.lat, longitude: story.location.lng },
  hasMap: site.address.mapsUrl,
  sameAs: [site.social.facebook, site.market.url],
  ...(hours.length ? { openingHours: hours.map(([d, h]) => `${d} ${h}`) } : {}),
};

export default function HomePage() {
  const door = getPhoto("door");
  const counter = getPhoto("counter");
  return (
    <>
      <SiteHeader />
      <main id="main">
        {door && <HeroWalkIn door={door} counter={counter} doorHandle={story.doorHandle} />}
        <WreathMoment />
        <Pamphlet />
        <TresHistorias />
        <GuestBook />
        <DeliveryRibbon />
        <FindUs />
        <Origin />
        <GroupOrders />
      </main>
      <SiteFooter />
      <StickyOrderBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
