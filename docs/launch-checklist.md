# Launch checklist

Status as of the demo build. ☐ items need Marina's content or a deploy.

## Message
- [x] Message clear within 5 seconds (H1 names the cuisine, the place, the town)
- [x] One main action: Order delivery is the only gold button in each section
- [x] Button wording matches what happens (demo panel explains itself; no fake checkout)

## Mobile
- [x] 375px: no sideways scroll (checked with headless Chromium)
- [x] Readable without zoom, 48px-minimum buttons
- [x] Sticky bottom bar: Order delivery + Call, shown once the hero buttons scroll away

## Speed
- [x] Fonts self-hosted, `font-display: swap`, two variable files only
- [x] GSAP + Lenis load after first paint (idle callback); Lenis desktop-only
- [x] All animation respects `prefers-reduced-motion`
- [x] No layout shift from fonts (`adjustFontFallback`)
- [ ] PageSpeed mobile above 80 on the deployed URL (run after deploy; cut effects if under)
- [ ] Hero photo: preloaded, AVIF/WebP via `next/image` (`priority` is set; waiting on the photo)

## Credibility
- [x] Real prices from the printed menu only
- [x] "Organic & natural" is the only health wording
- [ ] Real photos replace the illustrations
- [ ] Marina's story
- [ ] Remove `site.demo` flag (drops the footer label and the `noindex`)

## Search
- [x] Title: "Nature's Garden Cafe & Resto | Argentinian Food Delivery in Friendswood, TX"
- [x] Meta description with Argentinian food, empanadas, delivery, Friendswood
- [x] One H1, alt text on every image, Restaurant JSON-LD (no hours or ratings invented)
- [x] Favicon and share image (`/opengraph-image`)
- [ ] Set `NEXT_PUBLIC_SITE_URL` on Vercel so canonical and share tags use the real domain

## Plumbing
- [x] Clicks tracked: order_delivery, order_pickup, call, group_order, map, shop_link, with utm_source
- [x] 404 page, privacy policy, copyright 2026, no "lorem" anywhere
- [ ] Every link and button clicked on the deployed URL on a real phone
- [ ] HTTPS (automatic on Vercel)
- [ ] Vercel Analytics enabled in the project dashboard (custom events need the Pro plan)

## Handoff
- [ ] Connect Order delivery / Order pickup to the real ordering link (`OrderPanel.tsx`)
- [ ] Hours, delivery radius, provider, packaging, dozen pricing in `src/content/site.ts` / `menu.ts`
