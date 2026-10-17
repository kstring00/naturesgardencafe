# Nature's Garden Cafe & Resto

One-page demo site for the organic Argentinian café inside Nature's Garden,
400 W Parkwood Ave #112, Friendswood, TX. Built as a pitch for adding delivery.

**Conversion:** tap *Order delivery* (main), *Order pickup* or *Call* (secondary),
*Request a group order* for empanadas by the dozen.

## Stack
Next.js 16 (App Router) · Tailwind CSS 4 · TypeScript · GSAP + ScrollTrigger · Lenis · Vercel Analytics.
Fonts (Fraunces, Instrument Sans) are self-hosted from `src/fonts/` under the OFL.

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

## Photos
Drop `empanadas.jpg`, `sandwiches.jpg` and `logo.jpg` into `public/photos/` (see the README there).
The build checks for them; missing files fall back to illustration, never a broken image.

## How the site is organized
```
src/
  app/            routes: page, layout, 404, privacy, favicon, share image
  components/
    sections/     Hero, Menu, Reviews, HowDelivery (+Faq), DozenOrders, FindUs
    layout/       SiteHeader, SiteFooter, StickyOrderBar (mobile)
    ui/           Button, OrderPanel (call-to-order dialog), OrderActions, MapCard, RepulgueDivider, CrimpIcon
    brand/        LogoLockup, LeafWreath, LeafCorner, EmpanadaIllustration (hero fallback)
    motion/       MotionProvider: all scroll effects in one place, loaded after first paint
  content/        site.ts, menu.ts, reviews.ts: every fact carries verified / assumed / missing
  lib/            env, photos (build-time existence check), analytics (+utm), motion, price formatting
docs/             objection map, 5-minute user test, launch checklist, what Marina must confirm
public/photos/    the three menu crops (see public/photos/README.md)
```

### Honesty rules baked in
- A fact with status `missing` (or no value) is not rendered. No placeholders, no lorem.
- Prices and item names come from the printed menu only.
- The order buttons open a call-to-order panel until `NEXT_PUBLIC_ORDER_URL` points at real ordering. No fake checkout.
- Marina's personal number is never in the code; only the store line.

### Motion
Content is in the HTML from the start. CSS handles the hero reveal and the leaf draw-in;
GSAP scrubs the repulgue dividers, the delivery route and the hero parallax.
`prefers-reduced-motion` shows the final state. Lenis runs on desktop pointer devices only.
Components opt in with data attributes (`data-draw-path`, `data-parallax`, `data-route`).

## Next steps
See `docs/marina-confirms.md` for what to get from Marina, in order.
