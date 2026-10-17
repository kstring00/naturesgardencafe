"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoLockup } from "@/components/brand/LogoLockup";
import { CallLink, OrderDeliveryButton } from "@/components/ui/OrderActions";
import { site } from "@/content/site";

/**
 * Fixed header. Transparent over the hero; once the hero's own buttons scroll away it
 * gains a crema blur and (on desktop) shows Order delivery, so each view has one main action.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-actions");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry?.isIntersecting), {
      rootMargin: "-72px 0px 0px 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled ? "bg-crema/90 shadow-[0_1px_0_0_var(--color-regla)] backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-4">
        <Link href="/" aria-label={`${site.name} home`} className="rounded-lg">
          <LogoLockup draw size="md" />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3" aria-label="Quick actions">
          <div className="hidden sm:block">
            <CallLink source="header" size="md" label={`Call ${site.phone.display}`} />
          </div>
          <div className="sm:hidden">
            <CallLink source="header" size="md" label="Call" />
          </div>
          <div
            className={`hidden transition-[opacity,transform] duration-300 md:block ${
              scrolled ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
            }`}
            inert={!scrolled}
          >
            <OrderDeliveryButton source="header" size="md" magnetic={false} />
          </div>
        </nav>
      </div>
    </header>
  );
}
