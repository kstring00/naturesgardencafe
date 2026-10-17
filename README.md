# Nature's Garden Cafe & Resto

One-page demo site for the organic Argentinian café inside Nature's Garden,
400 W Parkwood Ave #112, Friendswood, TX. Built as a pitch for adding delivery.

**Conversion:** tap *Order delivery* (main), *Order pickup* or *Call* (secondary),
*Request a group order* for empanadas by the dozen.

## Stack
Next.js 16 (App Router), Tailwind CSS 4, TypeScript, GSAP + ScrollTrigger, Lenis (desktop), Three (lazy, the wreath),
Embla (guest book), Leaflet on CARTO tiles (map), sharp (photo pipeline), Vercel Analytics.
Fonts (Bodoni Moda, Hanken Grotesk) are self-hosted from `src/fonts/` under the OFL.

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck + production build
```

## Deploy
Import the repo in Vercel. Environment variables (see `.env.example`):

| Variable | Now | At launch |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://naturesgardencafe.vercel.app` | the real domain |
| `NEXT_PUBLIC_SITE_MODE` | `demo` (noindex) | `live` |
| `NEXT_PUBLIC_ORDER_URL` | unset (Order buttons open the call panel) | her Toast / Square / DoorDash page |

Enable Analytics in the Vercel project; custom click events need the Pro plan.

## Photos and story
- `content/photos.json` maps each slot (door, counter, hands, tray, lomito, milanesa, board, marina) to a source file
  under `public/photos/`. `npm run photos` (also runs before every build) writes 1600px web sizes, blur placeholders
  and `content/photos.generated.json`, and prints which slots are still stock stand-ins.
- Stand-ins come from Unsplash (credits in `content/credits.json`) and render with a "Sample photo. Yours goes here."
  caption until `isStock` is false.
- `content/story.json` holds Marina's words and confirmed facts. Empty fields hide their sections. The build prints
  the empty ones.

## How the site is organized
```
content/          story.json (Marina's words), photos.json (slots), credits.json, photos.generated.json (built)
scripts/photos.mjs  sharp pipeline: resize, blur placeholders, stock + empty-field report
src/
  app/            routes: page, layout, 404, privacy, favicon, share image (uses tray.jpg)
  components/
    sections/     HeroWalkIn, WreathMoment, Pamphlet (+PamphletFold), TresHistorias (+HistoriasPinned),
                  GuestBook, DeliveryRibbon (+RibbonDraw), FindUs (+DeliveryMap), Origin, GroupOrders
    three/        WreathCanvas (loader + static fallback), WreathScene (plain Three, lazy)
    layout/       SiteHeader, SiteFooter, StickyOrderBar
    ui/           Button, OrderPanel, OrderActions, Photo (grade + sample caption)
    brand/        Ribbon, CornerRibbon, LogoLockup, LeafWreath
    motion/       MotionProvider (Lenis on desktop only)
  content/        site.ts (fixed facts), menu.ts, reviews.ts
  lib/            env, story, photos, empanada (crimp paths), analytics (+utm), motion, format
docs/             objection map, user test, launch checklist, what Marina must confirm
public/photos/    stock/ (Unsplash originals), own/ (Marina's), generated web sizes
```

### The four motions, and no others
1. Hero walk-in (scroll-scrubbed): `HeroWalkIn`
2. Delivery ribbon draws itself (once): `RibbonDraw`
3. Map rings draw outward (once): `DeliveryMap`
4. The wreath assembling (once): `WreathScene`
Plus two interactive reveals tied to scroll: the pamphlet fold and the empanada morph. Everything else is static.
`prefers-reduced-motion` renders finished states.

### Honesty rules baked in
- Empty `story.json` fields hide their sections. No placeholders, no lorem, no "Marina will confirm" copy.
- Stand-in photos are captioned as samples until a real file replaces them.
- Prices and item names come from the printed menu only.
- The order buttons open a call-to-order panel until `NEXT_PUBLIC_ORDER_URL` points at real ordering. No fake checkout.
- Marina's personal number is never in the code; only the store line.

## Next steps
See `docs/marina-confirms.md` for what to get from Marina, in order.
