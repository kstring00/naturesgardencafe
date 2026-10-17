"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { site, telHref } from "@/content/site";
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

/**
 * Holds the "Order delivery / Order pickup" panel. The demo never fakes a
 * checkout: it explains what the button will connect to, and offers the phone.
 */
export function OrderProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<OrderMode>("delivery");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openPanel = useCallback((m: OrderMode, source: string) => {
    track(m === "delivery" ? "order_delivery" : "order_pickup", { source });
    setMode(m);
    const d = dialogRef.current;
    if (d && !d.open) d.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  // Click on the backdrop closes the dialog.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClick = (e: MouseEvent) => {
      if (e.target === d) d.close();
    };
    d.addEventListener("click", onClick);
    return () => d.removeEventListener("click", onClick);
  }, []);

  const title = mode === "delivery" ? "Order delivery" : "Order pickup";

  return (
    <OrderContext.Provider value={{ openPanel }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="order-panel-title"
        className="m-auto w-[min(92vw,30rem)] rounded-3xl border border-tinta/10 bg-crema p-0 text-tinta shadow-2xl backdrop:bg-tinta/50"
      >
        <div className="p-7 sm:p-9">
          <p className="eyebrow">{site.shortName}</p>
          <h2 id="order-panel-title" className="font-display mt-2 text-3xl leading-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 rounded-2xl border border-dashed border-dorado-deep/60 bg-dorado/10 px-4 py-3 text-sm leading-relaxed text-tinta-soft">
            <strong className="font-semibold text-tinta">Demo:</strong> this button connects to your
            delivery setup (your register&rsquo;s online ordering or a delivery service).
          </p>
          <p className="mt-5 text-base leading-relaxed">
            Hungry now? Call the café and we&rsquo;ll have it ready for{" "}
            {mode === "delivery" ? "delivery or pickup" : "pickup"}.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="primary">
              <a href={telHref} onClick={() => track("call", { source: "order_panel" })}>
                Call {site.phone.display}
              </a>
            </Button>
            <Button variant="secondary" onClick={close}>
              Close
            </Button>
          </div>
        </div>
      </dialog>
    </OrderContext.Provider>
  );
}
