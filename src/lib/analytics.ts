"use client";

import { track as vercelTrack } from "@vercel/analytics";

export type TrackedEvent =
  | "order_delivery_click"
  | "order_pickup_click"
  | "call_click"
  | "group_order_click"
  | "directions_click"
  | "market_link_click";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

/** Reads UTM params from the current URL so each event carries its source. */
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

/** Record a conversion-relevant click. Shows up as a custom event in Vercel Analytics. */
export function track(event: TrackedEvent, props: Record<string, string> = {}) {
  try {
    vercelTrack(event, { ...utmProps(), ...props });
  } catch {
    // Analytics must never break the order button.
  }
}
