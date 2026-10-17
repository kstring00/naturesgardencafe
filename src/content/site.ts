import { fact } from "./types";

/**
 * Business facts for Nature's Garden Cafe & Resto.
 * Source: printed menu photo + Kyle's brief (Oct 2026).
 * Marina's personal cell is intentionally NOT here. Store line only.
 */
export const site = {
  name: "Nature's Garden Cafe & Resto",
  shortName: "Nature's Garden Cafe",
  cuisine: "Argentinian Cuisine",
  taglines: {
    mood: "Good food, good mood",
    fresh: "Baked fresh daily",
    organic: "Organic & natural",
  },

  phone: {
    display: "(281) 996-9596",
    e164: "+12819969596",
  },

  address: {
    line1: "400 W Parkwood Ave #112",
    city: "Friendswood",
    state: "TX",
    zip: "77546",
    /** Google Maps search link. Swap for the place URL once we have it. */
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Nature%27s+Garden+400+W+Parkwood+Ave+%23112+Friendswood+TX+77546",
  },

  /** The health market the café lives inside. */
  market: {
    name: "Nature's Garden",
    descriptor: "Friendswood's natural health market",
    since: 2001,
    /** Shop website. None found online yet; falls back to the Maps link. */
    url: fact<string>(null, "missing", "Does the market have a website we should link to?"),
  },

  delivery: {
    /** Short line shown next to the order button. */
    headline: "Delivery around Friendswood",
    areaLine: fact<string>(
      null,
      "assumed",
      "What radius do you deliver to? Friendswood only, or League City / Pearland / Clear Lake too?",
    ),
    provider: fact<string>(
      null,
      "assumed",
      "Who handles delivery: your register's online ordering, DoorDash, Uber Eats, your own driver?",
    ),
    packaging: fact<string>(
      null,
      "assumed",
      "How is food packed for delivery? Anything that keeps it warm we can say on the page?",
    ),
  },

  hours: fact<{ days: string; open: string; close: string }[]>(
    null,
    "missing",
    "Café hours for each day (and whether they differ from the market's hours).",
  ),

  story: fact<string>(
    null,
    "missing",
    "Marina's story in two or three sentences: where in Argentina, how she started cooking, why Friendswood.",
  ),

  /** Set once the real logo file is in /public/images. Until then the leaf mark is drawn in SVG. */
  logoSrc: fact<string>(null, "missing", "The logo as a vector or high-res PNG."),

  /** Set once a real hero photo exists. Until then the hero shows the illustrated empanada. */
  heroImage: fact<{ src: string; alt: string }>(
    null,
    "missing",
    "One real close-up photo of empanadas or a lomito, shot in daylight.",
  ),

  year: 2026,
  demo: true,
} as const;

export const groupOrderSms = (() => {
  const body = encodeURIComponent(
    "Hi! I'd like to order empanadas by the dozen for ",
  );
  // `?&body=` is the form that works on both iOS and Android.
  return `sms:${site.phone.e164}?&body=${body}`;
})();

export const telHref = `tel:${site.phone.e164}`;
