"use client";

import { site, telHref, groupOrderSms } from "@/content/site";
import { track } from "@/lib/analytics";
import { Button } from "./Button";
import { Magnetic } from "./Magnetic";
import { useOrder } from "./OrderPanel";

type Size = "md" | "lg";

/** Main action. Magnetic on desktop, plain press on touch. */
export function OrderDeliveryButton({
  source,
  size = "lg",
  className = "",
  magnetic = true,
}: {
  source: string;
  size?: Size;
  className?: string;
  magnetic?: boolean;
}) {
  const { openPanel } = useOrder();
  const btn = (
    <Button variant="primary" size={size} className={className} onClick={() => openPanel("delivery", source)}>
      Order delivery
    </Button>
  );
  return magnetic ? <Magnetic>{btn}</Magnetic> : btn;
}

export function OrderPickupButton({
  source,
  size = "lg",
  className = "",
}: {
  source: string;
  size?: Size;
  className?: string;
}) {
  const { openPanel } = useOrder();
  return (
    <Button variant="secondary" size={size} className={className} onClick={() => openPanel("pickup", source)}>
      Order pickup
    </Button>
  );
}

export function CallLink({
  source,
  variant = "ghost",
  size = "lg",
  className = "",
  label,
}: {
  source: string;
  variant?: "ghost" | "secondary" | "primary";
  size?: Size;
  className?: string;
  label?: string;
}) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={telHref} onClick={() => track("call", { source })}>
        {label ?? `Call ${site.phone.display}`}
      </a>
    </Button>
  );
}

export function GroupOrderLink({ source, className = "" }: { source: string; className?: string }) {
  return (
    <Button asChild variant="primary" size="lg" className={className}>
      <a href={groupOrderSms} onClick={() => track("group_order", { source })}>
        Request a group order
      </a>
    </Button>
  );
}
