"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MenuItem } from "@/content/menu";
import { isShown } from "@/content/types";
import { formatPrice } from "@/lib/format";
import { motionAllowed } from "@/lib/motion";

/**
 * Editorial price list. On desktop, hovering an item with a photo floats that
 * photo beside the cursor. On mobile, photos sit inline. Without photos the list
 * is simply a clean carta; nothing is faked.
 */
export function MenuList({ items }: { items: MenuItem[] }) {
  const [active, setActive] = useState<MenuItem | null>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const [canFloat, setCanFloat] = useState(false);

  useEffect(() => {
    setCanFloat(
      motionAllowed() &&
        window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches &&
        items.some((i) => isShown(i.image)),
    );
  }, [items]);

  useEffect(() => {
    if (!canFloat) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.18;
      p.y += (p.ty - p.y) * 0.18;
      const el = floatRef.current;
      if (el) el.style.transform = `translate3d(${p.x + 24}px, ${p.y - 110}px, 0)`;
      raf = Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [canFloat]);

  return (
    <>
      <ul className="mt-6 divide-y divide-tinta/10">
        {items.map((item) => {
          const photo = isShown(item.image) ? item.image.value : null;
          return (
            <li
              key={item.slug}
              className="group py-6 first:pt-2"
              onPointerEnter={() => setActive(item)}
              onPointerLeave={() => setActive(null)}
            >
              <div className="flex items-start gap-5">
                {photo && (
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl lg:hidden">
                    <Image src={photo.src} alt={photo.alt} fill sizes="80px" className="object-cover" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline">
                    <h4 className="font-display text-item leading-tight transition-colors group-hover:text-oliva">
                      {item.name}
                    </h4>
                    <span className="leader" aria-hidden="true" />
                    <p className="price shrink-0 text-item">{formatPrice(item.priceCents)}</p>
                  </div>
                  <p className="mt-2 max-w-md text-base text-tinta-soft">{item.description}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {canFloat && (
        <div
          ref={floatRef}
          aria-hidden="true"
          className={`pointer-events-none fixed top-0 left-0 z-30 h-56 w-56 overflow-hidden rounded-[2rem] shadow-2xl transition-opacity duration-200 ${
            active && isShown(active.image) ? "opacity-100" : "opacity-0"
          }`}
        >
          {active && isShown(active.image) && (
            <Image src={active.image.value.src} alt="" fill sizes="224px" className="object-cover" />
          )}
        </div>
      )}
    </>
  );
}
