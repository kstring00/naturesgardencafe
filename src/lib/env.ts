/** Public, build-time configuration. Everything here is safe to ship to the browser. */

const fallbackUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://naturesgardencafe.vercel.app";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl).replace(/\/$/, "");

/** "demo" (default) = noindex. "live" = indexable. */
export const siteMode = process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "demo";

/** Real online-ordering page, once Marina has one. Empty = show the call panel. */
export const orderUrl = process.env.NEXT_PUBLIC_ORDER_URL?.trim() || null;
