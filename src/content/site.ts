import { fact } from "./types";

/**
 * Business facts for Nature's Garden Cafe & Resto.
 * Sources: printed menu photo, Kyle's brief, the market's existing site.
 * Marina's personal cell is intentionally NOT here. Store line only.
 */
const ADDRESS_QUERY = "400+W+Parkwood+Ave+%23112,+Friendswood,+TX+77546";

export const site = {
  name: "Nature's Garden Cafe & Resto",
  shortName: "Nature's Garden",
  cuisine: "Argentinian Cuisine",
  taglines: {
    mood: "Good food, good mood",
    fresh: "Baked fresh daily",
    organic: "Organic & natural",
  },

  phone: {
    display: "(281) 996-9596",
    e164: "+12819969596",
    /** Schema.org style. */
    schema: "+1-281-996-9596",
  },

  address: {
    line1: "400 W Parkwood Ave #112",
    suite: "Suite 112",
    city: "Friendswood",
    state: "TX",
    zip: "77546",
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${ADDRESS_QUERY}`,
    embedUrl: `https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed`,
  },

  social: {
    facebook: "https://www.facebook.com/naturesgardencafe",
    /** No Instagram yet. Add the URL here when Marina opens one. */
    instagram: null as string | null,
  },

  /** The health market the café lives inside. */
  market: {
    name: "Nature's Garden",
    descriptor: "Friendswood's natural health market",
    since: 2001,
    url: "https://www.naturesgardencafe.com",
  },

  delivery: {
    headline: "Delivery around Friendswood",
    /** Typical area. Marked "typical" on the page until Marina confirms the radius. */
    typicalAreas: fact<string[]>(
      ["Friendswood", "League City", "Pearland", "Clear Lake"],
      "assumed",
      "Exact delivery radius: is it Friendswood only, or League City / Pearland / Clear Lake too?",
    ),
    provider: fact<string>(null, "missing", "Who delivers: register's online ordering, DoorDash, Uber Eats, own driver?"),
    timing: fact<string>(null, "missing", "How long does delivery usually take? (e.g. 35–50 minutes)"),
    minimumAndFee: fact<string>(null, "missing", "Is there an order minimum or a delivery fee?"),
    packaging: fact<string>(null, "assumed", "How is food packed for delivery? Anything that holds heat we can say?"),
    /** Confirmed: you can call ahead for pickup. */
    pickupAhead: fact<string>("Yes. Call and we'll have it ready.", "verified"),
    pickupReadyTime: fact<string>(null, "missing", "How long until a pickup order is usually ready? (e.g. about 20 minutes)"),
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

  glutenFree: fact<string>(null, "missing", "Anything gluten-free on the menu we can name?"),

  year: 2026,
} as const;

export const telHref = `tel:${site.phone.e164}`;

/** `?&body=` is the form that works on both iOS and Android. */
export const groupOrderSms = `sms:${site.phone.e164}?&body=${encodeURIComponent(
  "Hi! I'd like to order empanadas by the dozen for ",
)}`;
