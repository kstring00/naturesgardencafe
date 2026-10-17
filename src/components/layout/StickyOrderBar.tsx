"use client";

import { useEffect, useState } from "react";
import { CallLink, OrderDeliveryButton } from "@/components/ui/OrderActions";

/**
 * Mobile-only bottom bar: Order delivery + Call. Appears once the hero's own
 * buttons have scrolled away, so there is never a doubled call to action.
 */
export function StickyOrderBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-actions");
    if (!hero) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVisible(!entry?.isIntersecting), {
      rootMargin: "-56px 0px 0px 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-tinta/10 bg-crema/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 ease-out md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex gap-3">
        <OrderDeliveryButton source="sticky_bar" size="md" magnetic={false} className="flex-1" />
        <CallLink source="sticky_bar" variant="secondary" size="md" label="Call" className="px-6" />
      </div>
    </div>
  );
}
