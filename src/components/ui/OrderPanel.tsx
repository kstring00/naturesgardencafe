"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { groupOrderSms, site, telHref } from "@/content/site";
import { track } from "@/lib/analytics";
import { Button } from "./Button";

export type OrderMode = "delivery" | "pickup";

interface OrderContextValue {
  openPanel: (mode: OrderMode, source: string) => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>");
  return ctx;
}

/** Customer-facing order panel. Until NEXT_PUBLIC_ORDER_URL exists, the phone is the real path. */
export function OrderProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<OrderMode>("delivery");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openPanel = useCallback((m: OrderMode, source: string) => {
    track(m === "delivery" ? "order_delivery_click" : "order_pickup_click", { source });
    setMode(m);
    const d = dialogRef.current;
    if (d && !d.open) d.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClick = (e: MouseEvent) => {
      if (e.target === d) d.close();
    };
    d.addEventListener("click", onClick);
    return () => d.removeEventListener("click", onClick);
  }, []);

  return (
    <OrderContext.Provider value={{ openPanel }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="order-panel-title"
        className="paper m-auto w-[min(92vw,30rem)] rounded-2xl border border-trigo p-0 text-tinta shadow-2xl"
      >
        <div className="p-7 sm:p-9">
          <p className="display-italic text-lg text-verde">{mode === "delivery" ? "Delivery" : "Pickup"}</p>
          <h2 id="order-panel-title" className="display mt-1 text-3xl sm:text-4xl">
            Order from Nature&rsquo;s Garden
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-tinta-70">
            Online ordering is on its way. For now, call and we&rsquo;ll have your order ready for pickup or
            delivery.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild variant="primary" size="lg">
              <a href={telHref} onClick={() => track("call_click", { source: "order_panel" })}>
                Call {site.phone.display}
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={groupOrderSms} onClick={() => track("group_order_click", { source: "order_panel" })}>
                Text a group order
              </a>
            </Button>
          </div>
          <button
            type="button"
            onClick={close}
            className="mt-5 text-sm text-tinta-70 underline decoration-trigo underline-offset-4 hover:text-tinta"
          >
            Back to the menu
          </button>
        </div>
      </dialog>
    </OrderContext.Provider>
  );
}
