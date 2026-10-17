/**
 * Fixed business facts. Anything that depends on Marina's answers lives in content/story.json.
 * Marina's personal cell is intentionally NOT here. Store line only.
 */
const ADDRESS_QUERY = "400+W+Parkwood+Ave+%23112,+Friendswood,+TX+77546";

export const site = {
  name: "Nature's Garden Cafe & Resto",
  shortName: "Nature's Garden",
  cuisine: "Argentinian Cuisine",
  phone: {
    display: "(281) 996-9596",
    e164: "+12819969596",
    schema: "+1-281-996-9596",
  },
  address: {
    line1: "400 W Parkwood Ave #112",
    city: "Friendswood",
    state: "TX",
    zip: "77546",
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${ADDRESS_QUERY}`,
    embedUrl: `https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed`,
  },
  social: {
    facebook: "https://www.facebook.com/naturesgardencafe",
  },
  market: {
    name: "Nature's Garden",
    descriptor: "Friendswood's natural health market",
    since: 2001,
    url: "https://www.naturesgardencafe.com",
  },
  year: 2026,
} as const;

export const telHref = `tel:${site.phone.e164}`;

/** `?&body=` is the form that works on both iOS and Android. */
export const groupOrderSms = `sms:${site.phone.e164}?&body=${encodeURIComponent(
  "Hi! I'd like to order empanadas by the dozen for ",
)}`;
