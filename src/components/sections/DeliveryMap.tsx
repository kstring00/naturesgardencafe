"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { motionAllowed } from "@/lib/motion";
import type { Ring } from "@/lib/story";

const TOWNS: { name: string; lat: number; lng: number; narrow?: boolean }[] = [
  { name: "Friendswood", lat: 29.541, lng: -95.222, narrow: true },
  { name: "League City", lat: 29.5075, lng: -95.0949 },
  { name: "Pearland", lat: 29.5636, lng: -95.286, narrow: true },
  { name: "Webster", lat: 29.5377, lng: -95.1183 },
];

const PIN_SVG = `<svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="#B9872A" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M32 58 C 18 54, 8 42, 8 26 C 8 18, 11 12, 15 8"/><path d="M11 44 C 4 42, 2 36, 3 30 C 9 32, 12 38, 11 44 Z" fill="#D9A441"/><path d="M9 32 C 4 28, 3 22, 6 16 C 11 19, 12 26, 9 32 Z" fill="#D9A441"/><path d="M18 52 C 11 52, 7 48, 6 42 C 12 42, 17 46, 18 52 Z" fill="#D9A441"/><path d="M32 58 C 46 54, 56 42, 56 26 C 56 18, 53 12, 49 8"/><path d="M53 44 C 60 42, 62 36, 61 30 C 55 32, 52 38, 53 44 Z" fill="#D9A441"/><path d="M55 32 C 60 28, 61 22, 58 16 C 53 19, 52 26, 55 32 Z" fill="#D9A441"/><path d="M46 52 C 53 52, 57 48, 58 42 C 52 42, 47 46, 46 52 Z" fill="#D9A441"/><circle cx="32" cy="32" r="5" fill="#B9872A" stroke="none"/></svg>`;

const MILE = 1609.34;

/**
 * Leaflet map on CARTO Positron tiles with three service rings that draw outward
 * once the map scrolls into view. Falls back to the Google embed if Leaflet fails.
 */
export function DeliveryMap({ center, rings }: { center: { lat: number; lng: number }; rings: Ring[] }) {
  const el = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    let map: import("leaflet").Map | undefined;
    let io: IntersectionObserver | undefined;
    let raf = 0;
    let cancelled = false;

    const start = async () => {
      try {
        const L = (await import("leaflet")).default;
        await import("leaflet/dist/leaflet.css");
        if (cancelled) return;

        const touch = matchMedia("(hover: none)").matches;
        const narrow = window.innerWidth < 640;
        map = L.map(node, {
          center: [center.lat, center.lng],
          zoom: narrow ? 10.5 : 11,
          zoomSnap: 0.5,
          zoomControl: false,
          scrollWheelZoom: false,
          dragging: !touch,
          attributionControl: true,
        });
        L.control.zoom({ position: "bottomright" }).addTo(map);
        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }).addTo(map);

        // Drag only after a tap on touch devices, so the page still scrolls.
        if (touch) {
          node.addEventListener("click", () => map?.dragging.enable(), { once: true });
        }

        // Pin: her wreath in gold.
        L.marker([center.lat, center.lng], {
          icon: L.divIcon({ html: PIN_SVG, className: "", iconSize: [44, 44], iconAnchor: [22, 40] }),
          keyboard: false,
          title: site.name,
        }).addTo(map);

        // Town labels, placed where the basemap already names them.
        for (const t of TOWNS) {
          if (narrow && !t.narrow) continue;
          L.marker([t.lat, t.lng], {
            icon: L.divIcon({ html: t.name, className: "town-label", iconSize: [90, 16], iconAnchor: [45, 8] }),
            interactive: false,
            keyboard: false,
          }).addTo(map);
        }

        // Rings, sorted largest first so the small ones draw on top.
        const sorted = [...rings].filter((r) => r.miles > 0).sort((a, b) => b.miles - a.miles);
        const opacities = [0.04, 0.07, 0.1];
        const circles = sorted.map((r, i) =>
          L.circle([center.lat, center.lng], {
            radius: 0,
            color: "#D9A441",
            weight: 1,
            fillColor: "#74ACDF",
            fillOpacity: opacities[i] ?? 0.05,
            interactive: false,
          }).addTo(map!),
        );
        // Labels sit at each ring's right edge, stepped so they never pile up.
        const stepLat = narrow ? [0.03, 0, -0.03] : [0.012, 0, -0.012];
        const labels = sorted.map((r, i) => {
          const text = r.label && r.label.trim() ? r.label : `about ${r.miles} miles`;
          const dLng = (r.miles * MILE) / (111320 * Math.cos((center.lat * Math.PI) / 180));
          return L.marker([center.lat + (stepLat[i] ?? 0), center.lng + dLng], {
            icon: L.divIcon({ html: text, className: "ring-label", iconSize: [110, 22], iconAnchor: narrow ? [116, 11] : [-6, 11] }),
            interactive: false,
            keyboard: false,
            opacity: 0,
          }).addTo(map!);
        });

        const finish = () => {
          circles.forEach((c, i) => c.setRadius((sorted[i]?.miles ?? 0) * MILE));
          labels.forEach((l) => l.setOpacity(1));
        };

        if (!motionAllowed()) {
          finish();
        } else {
          // Motion 3 of 4: rings grow 0 → target over 900ms, staggered.
          io = new IntersectionObserver(
            ([entry]) => {
              if (!entry?.isIntersecting) return;
              io?.disconnect();
              const t0 = performance.now();
              const step = (now: number) => {
                let done = true;
                circles.forEach((c, i) => {
                  const delay = i * 180;
                  const u = Math.min(1, Math.max(0, (now - t0 - delay) / 900));
                  const e = 1 - Math.pow(1 - u, 3);
                  c.setRadius((sorted[i]?.miles ?? 0) * MILE * e);
                  if (u >= 1) labels[i]?.setOpacity(1);
                  if (u < 1) done = false;
                });
                if (!done) raf = requestAnimationFrame(step);
              };
              raf = requestAnimationFrame(step);
            },
            { threshold: 0.4 },
          );
          io.observe(node);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    // Leaflet and its tiles load only once the map is within ~600px of the viewport.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        near.disconnect();
        void start();
      },
      { rootMargin: "600px 0px" },
    );
    near.observe(node);

    return () => {
      near.disconnect();
      cancelled = true;
      io?.disconnect();
      cancelAnimationFrame(raf);
      map?.remove();
    };
  }, [center.lat, center.lng, rings]);

  if (failed) {
    return (
      <div className="overflow-hidden rounded-sm border border-verde/70">
        <iframe
          src={site.address.embedUrl}
          title="Map to Nature's Garden Cafe"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[320px] w-full border-0 md:h-[480px]"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={el} className="h-[320px] w-full overflow-hidden rounded-sm border border-verde/70 bg-sombra md:h-[480px]" role="region" aria-label="Map of the delivery area around Nature's Garden Cafe" />
    </div>
  );
}
