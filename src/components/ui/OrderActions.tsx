"use client";

import { site, telHref, groupOrderSms } from "@/content/site";
import { track } from "@/lib/analytics";
import { orderUrl } from "@/lib/env";
import { Button } from "./Button";
import { useOrder } from "./OrderPanel";

type Size = "md" | "lg";

export function OrderDeliveryButton({ source, size = "lg", className = "" }: { source: string; size?: Size; className?: string }) {
  const { openPanel } = useOrder();
  if (orderUrl) {
    return (
      <Button asChild variant="primary" size={size} className={className}>
        <a href={orderUrl} target="_blank" rel="noopener" onClick={() => track("order_delivery_click", { source, target: "order_url" })}>
          Order delivery
        </a>
      </Button>
    );
  }
  return (
    <Button variant="primary" size={size} className={className} onClick={() => openPanel("delivery", source)}>
      Order delivery
    </Button>
  );
}

export function OrderPickupButton({ source, size = "lg", className = "" }: { source: string; size?: Size; className?: string }) {
  const { openPanel } = useOrder();
  if (orderUrl) {
    return (
      <Button asChild variant="secondary" size={size} className={className}>
        <a href={orderUrl} target="_blank" rel="noopener" onClick={() => track("order_pickup_click", { source, target: "order_url" })}>
          Order pickup
        </a>
      </Button>
    );
  }
  return (
    <Button variant="secondary" size={size} className={className} onClick={() => openPanel("pickup", source)}>
      Order pickup
    </Button>
  );
}

export function CallLink({ source, variant = "quiet", size = "lg", className = "", label }: { source: string; variant?: "quiet" | "secondary" | "primary"; size?: Size; className?: string; label?: string }) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={telHref} onClick={() => track("call_click", { source })}>
        {label ?? `Call ${site.phone.display}`}
      </a>
    </Button>
  );
}

/** Plain inline phone link for body copy. */
export function PhoneLink({ source, className = "", label }: { source: string; className?: string; label?: string }) {
  return (
    <a href={telHref} onClick={() => track("call_click", { source })} className={`underline decoration-trigo decoration-2 underline-offset-4 hover:text-verde ${className}`}>
      {label ?? `Call ${site.phone.display}`}
    </a>
  );
}

export function GroupOrderLink({ source, className = "" }: { source: string; className?: string }) {
  return (
    <Button asChild variant="primary" size="lg" className={className}>
      <a href={groupOrderSms} onClick={() => track("group_order_click", { source })}>
        Request a group order
      </a>
    </Button>
  );
}

export function DirectionsLink({ source, className = "" }: { source: string; className?: string }) {
  return (
    <Button asChild variant="primary" size="lg" className={className}>
      <a href={site.address.directionsUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("directions_click", { source })}>
        Get directions
      </a>
    </Button>
  );
}

export function MarketLink({ source }: { source: string }) {
  return (
    <a href={site.market.url} target="_blank" rel="noopener noreferrer" onClick={() => track("market_link_click", { source })} className="font-semibold underline decoration-trigo decoration-2 underline-offset-4 hover:text-verde">
      Shop the market online
    </a>
  );
}
