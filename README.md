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
Import the repo in Vercel. Set `NEXT_PUBLIC_SITE_URL` to the live URL (see `.env.example`).
Enable Analytics in the Vercel project; custom click events need the Pro plan.

## How the site is organized
```
src/
  app/            routes: page, layout, 404, privacy, favicon, share image
  components/
    sections/     Hero, Menu, HowDelivery, DozenOrders, InsideNaturesGarden
    layout/       SiteHeader, SiteFooter, StickyOrderBar (mobile)
    ui/           Button, OrderPanel (demo dialog), OrderActions, RepulgueDivider, CrimpIcon
    brand/        LeafMark, EmpanadaIllustration (stand-ins until real assets arrive)
    motion/       MotionProvider: all scroll effects in one place, loaded after first paint
  content/        site.ts, menu.ts: every fact carries verified / assumed / missing
  lib/            analytics (click tracking + utm), motion helpers, price formatting
docs/             objection map, 5-minute user test, launch checklist, content needed
public/images/    drop menu photos here (see public/images/menu/README.md)
```

### Honesty rules baked in
- A fact with status `missing` (or no value) is not rendered. No placeholders, no lorem.
- Prices and item names come from the printed menu only.
- The order buttons open a panel that says it is a demo. There is no fake checkout.
- Marina's personal number is never in the code; only the store line.

### Motion
Content is in the HTML from the start. CSS handles the hero reveal and the leaf draw-in;
GSAP scrubs the repulgue dividers, the delivery route and the hero parallax.
`prefers-reduced-motion` shows the final state. Lenis runs on desktop pointer devices only.
Components opt in with data attributes (`data-draw-path`, `data-parallax`, `data-route`).

## Next steps
See `docs/content-needed.md` for the ten things to get from Marina, in order.
