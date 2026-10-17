"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Ribbon } from "@/components/brand/Ribbon";
import { OrderDeliveryButton, OrderPickupButton } from "@/components/ui/OrderActions";
import { loadGsap, motionAllowed } from "@/lib/motion";
import type { Photo } from "@/lib/photos";

/**
 * Motion 1 of 4: the "walk in". The hero is pinned; as the visitor scrolls, the
 * storefront scales 1 → 1.18 and the counter photo opens from the door handle.
 * The ribbon holds still so the words stay while the room changes.
 */
export function HeroWalkIn({
  door,
  counter,
  doorHandle,
}: {
  door: Photo;
  counter: Photo | null;
  doorHandle: { x: number; y: number };
}) {
  const track = useRef<HTMLElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motionAllowed() || !counter) return;
    let kill: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const gsap = await loadGsap();
      if (cancelled || !track.current) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: track.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      tl.fromTo(doorRef.current, { scale: 1 }, { scale: 1.18, ease: "none" }, 0).fromTo(
        counterRef.current,
        { clipPath: `circle(0% at ${doorHandle.x}% ${doorHandle.y}%)` },
        { clipPath: `circle(120% at ${doorHandle.x}% ${doorHandle.y}%)`, ease: "none" },
        0.15,
      );
      kill = () => tl.scrollTrigger?.kill();
    })();
    return () => {
      cancelled = true;
      kill?.();
    };
  }, [counter, doorHandle.x, doorHandle.y]);

  const stock = door.isStock || counter?.isStock;

  return (
    <section
      ref={track}
      className="hero-track"
      aria-labelledby="hero-title"
      style={{ ["--door-x" as string]: `${doorHandle.x}%`, ["--door-y" as string]: `${doorHandle.y}%` }}
    >
      <div className="hero-stage">
        <div ref={doorRef} className="graded absolute inset-0 will-change-transform">
          <Image
            src={door.src}
            alt={door.alt}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={door.blurDataURL}
            className="object-cover"
            style={{ objectPosition: `${doorHandle.x}% ${doorHandle.y}%` }}
          />
        </div>
        {counter && (
          <div ref={counterRef} className="hero-counter graded">
            <Image
              src={counter.src}
              alt={counter.alt}
              fill
              loading="eager"
              sizes="100vw"
              placeholder="blur"
              blurDataURL={counter.blurDataURL}
              className="object-cover"
            />
          </div>
        )}
        {/* soft base so the paper tag and buttons always sit on something quiet */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-tinta/75 via-tinta/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 sm:pb-14 md:grid md:grid-cols-12 md:gap-8">
            <div className="md:col-span-9 lg:col-span-8">
              <Ribbon as="h1" id="hero-title" className="w-full max-w-4xl">
                <span className="display-italic block text-center text-tinta" style={{ fontSize: "clamp(1.35rem, 2.6vw, 2.5rem)", fontWeight: 640, textShadow: "0 1px 0 rgba(251,248,241,0.35)" }}>
                  Argentinian food, organic and natural, inside{" "}
                  <span className="whitespace-nowrap">Nature&rsquo;s Garden</span>, Friendswood.
                </span>
              </Ribbon>

              <p className="paper mt-4 inline-block max-w-xl rounded-sm border border-trigo px-4 py-3 text-base leading-snug text-tinta shadow-[2px_3px_0_0_var(--color-trigo)] sm:text-lg">
                Lomito, milanesa and fresh-baked empanadas, delivered or ready for pickup.
              </p>

              <div id="hero-actions" className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                <OrderDeliveryButton source="hero" />
                <OrderPickupButton source="hero" className="!border-blanco !bg-blanco !text-tinta hover:!bg-tinta hover:!text-blanco" />
              </div>

              {stock && (
                <p className="mt-4 inline-block rounded-full bg-blanco/85 px-2.5 py-1 text-[0.72rem] leading-none text-tinta-70">
                  Sample photo. Yours goes here.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
