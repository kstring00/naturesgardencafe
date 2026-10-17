"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MenuItem } from "@/content/menu";
import { formatPrice } from "@/lib/format";
import { motionAllowed } from "@/lib/motion";
import type { Photo } from "@/lib/photos";

/**
 * Editorial price list with dotted leaders. On desktop, the group photo sits beside
 * the list and lifts gently while an item is hovered. On mobile the photo sits inline
 * (rendered by the parent). Without a photo the list is simply a clean carta.
 */
export function MenuList({ items, photo }: { items: MenuItem[]; photo: Photo | null }) {
  const [hovering, setHovering] = useState(false);
  const [lift, setLift] = useState(false);
  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setLift(motionAllowed() && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-8">
      <ul className="mt-6 divide-y divide-regla">
        {items.map((item) => (
          <li
            key={item.slug}
            className="group py-6 first:pt-2"
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={() => setHovering(false)}
          >
            <div className="flex items-baseline">
              <p className="font-display text-item leading-tight transition-colors group-hover:text-oliva">
                <strong className="font-medium">{item.name}</strong>
              </p>
              <span className="leader hidden sm:block" aria-hidden="true" />
              <p className="price ml-4 shrink-0 text-item sm:ml-0">{formatPrice(item.priceCents)}</p>
            </div>
            <p className="mt-2 max-w-md text-base text-tinta-soft">{item.description}</p>
          </li>
        ))}
      </ul>

      {photo && (
        <figure
          ref={figureRef}
          className={`photo-card sticky top-28 mt-8 hidden self-start transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block ${
            lift && hovering ? "-translate-y-2 rotate-[-1deg]" : ""
          }`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="14rem"
            className="aspect-[670/460] w-full object-cover"
          />
        </figure>
      )}
    </div>
  );
}
