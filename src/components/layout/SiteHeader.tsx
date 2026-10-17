"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoLockup } from "@/components/brand/LogoLockup";
import { CallLink, OrderDeliveryButton } from "@/components/ui/OrderActions";

/** Fixed header: transparent over the hero, blanco blur once the hero buttons scroll away. */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const target = document.getElementById("hero-actions");
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry?.isIntersecting), {
      rootMargin: "-72px 0px 0px 0px",
    });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "bg-blanco/85 shadow-[0_1px_0_0_var(--color-sombra)] backdrop-blur-[8px]"
          : "bg-gradient-to-b from-tinta/45 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-4">
        <Link href="/" className="rounded-lg">
          <LogoLockup size="md" tone={scrolled ? "dark" : "light"} />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3" aria-label="Quick actions">
          <div className="hidden sm:block">
            <CallLink source="header" size="md" className={scrolled ? "" : "!text-blanco hover:!text-trigo"} />
          </div>
          <div className="sm:hidden">
            <CallLink source="header" size="md" label="Call" className={scrolled ? "" : "!text-blanco hover:!text-trigo"} />
          </div>
          <div
            className={`hidden transition-opacity duration-300 md:block ${scrolled ? "opacity-100" : "opacity-0"}`}
            inert={!scrolled}
          >
            <OrderDeliveryButton source="header" size="md" />
          </div>
        </nav>
      </div>
    </header>
  );
}
