"use client";

import { track as vercelTrack } from "@vercel/analytics";

export type TrackedEvent =
  | "order_delivery"
  | "order_pickup"
  | "call"
  | "group_order"
  | "map"
  | "shop_link";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

/** Reads UTM params from the current URL (once) so each event carries its source. */
function utmProps(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) out[key] = v.slice(0, 100);
  }
  return out;
}

/**
 * Record a conversion-relevant click.
 * Custom events show up in Vercel Analytics once the project is deployed.
 */
export function track(event: TrackedEvent, props: Record<string, string> = {}) {
  try {
    vercelTrack(event, { ...utmProps(), ...props });
  } catch {
    // Analytics must never break the order button.
  }
}
