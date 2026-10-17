# Launch checklist (v3 report)

Measured on the production build in headless Chromium and Lighthouse 12 (mobile preset, 4× CPU throttle) against
`next start` on the sandbox machine. ☐ items need the deployed URL or Marina's content.

## Lighthouse, mobile
| Category | Score | Notes |
|---|---|---|
| Performance | 94 | FCP 0.9 s, LCP 2.9 s, TBT 130 ms, CLS 0, Speed Index 1.5 s |
| Accessibility | 100 | |
| Best practices | 96 | the only deduction is console errors from map tiles blocked in the sandbox |
| SEO | 66 | only `is-crawlable`: `noindex` is on while `NEXT_PUBLIC_SITE_MODE=demo`. Flip to `live` at launch |

LCP is the hero storefront photo. On Vercel the optimized image is cached at the edge, so the deployed number should be lower than the local one.

## JS budgets (gzipped)
| Bundle | Size | Budget |
|---|---|---|
| First load (all scripts on `/`) | 199 KB | ≤ 220 KB |
| Three wreath chunk (lazy) | 128 KB | ≤ 180 KB |
| Leaflet chunk (lazy, loads 600px before the map) | 41 KB | – |

## Message
- [x] Message clear in 5 seconds: the ribbon H1 names cuisine, organic and natural, the market and the town
- [x] One main action per view: hero has one gold button; the header's Order button appears only after the hero; sticky bar on mobile
- [x] Zero ALL-CAPS tracked labels, zero middle-dot strings, zero arrows glued to buttons (grep of `src/` and the built HTML)

## Mobile
- [x] 375px: no sideways scroll (scrollWidth = innerWidth)
- [x] Thumb-sized buttons (48px minimum)
- [x] Sticky bar never covers the last section (footer has bottom padding); bar is `inert` while hidden
- [x] Pamphlet swipes with a peeking edge and a "1 / 3" counter; map drag enabled on tap

## Images
- [x] `npm run photos` writes ≤ 1600px JPEGs and blur placeholders; `next/image` serves AVIF/WebP
- [x] Hero `priority`; counter eager; everything else lazy
- [x] Every stand-in carries "Sample photo. Yours goes here." (7 stock slots, 5 visible captions on the page today)
- [ ] Replace stand-ins with Marina's photos (`public/photos/own/`, set `isStock: false`)

## Copy and honesty
- [x] © 2026, privacy link, zero "lorem", zero "demo", zero "confirm" visible
- [x] Empty `story.json` fields hide their sections: Tres historias and Origin are hidden today
- [x] Health wording stays "organic and natural"; prices from the printed menu only

## Search
- [x] Unique title and description with service and city; exactly one H1 (the ribbon); H1 → H2 → H3 rhythm
- [x] Alt text on every image; favicon; share image uses `tray.jpg`
- [x] Canonical and OG URLs point at `NEXT_PUBLIC_SITE_URL` (default `https://naturesgardencafe.vercel.app`)
- [x] Restaurant JSON-LD with geo, hasMenu, sameAs; `openingHours` appears once `story.hours` is filled
- [ ] Validate JSON-LD in the Rich Results test on the deployed URL

## Links, keys, motion
- [x] Every link and button exercised in headless Chromium; order panel opens and closes; 404 works
- [x] Keyboard: visible focus on buttons, carousel arrows, map controls and links; hidden header button and sticky bar are `inert`
- [x] Four motions only (hero walk-in, ribbon draw, map rings, wreath assembly) plus the pamphlet fold and empanada morph; all respect `prefers-reduced-motion`
- [x] WebGL unavailable or reduced motion → static SVG wreath
- [ ] `tel:` / `sms:` on a real phone; HTTPS (automatic on Vercel)

## Handoff
- [ ] Set `NEXT_PUBLIC_ORDER_URL` when Marina has an ordering page
- [ ] Enable Vercel Analytics (custom events need Pro)
- [ ] Fill `content/story.json` (see `docs/marina-confirms.md`); the build prints the empty fields
