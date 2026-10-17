"use client";

import { site } from "@/content/site";
import { track } from "@/lib/analytics";

export function MarketLink() {
  return (
    <a
      href={site.market.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("market_link_click", { source: "find_us" })}
      className="font-semibold underline decoration-dorado decoration-2 underline-offset-4 hover:text-oliva"
    >
      Shop the market online
    </a>
  );
}
