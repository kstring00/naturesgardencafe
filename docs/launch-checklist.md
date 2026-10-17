# Launch checklist (v2 report)

Checked against the production build in headless Chromium. ☐ needs the deployed URL or Marina's content.

## Message
- [x] Message clear within 5 seconds: H1 names cuisine, organic & natural, Friendswood; sub-line names the café inside Nature's Garden
- [x] One main action per view: hero has one gold button; the header's Order button appears only after the hero scrolls away; sticky bar on mobile
- [x] Button wording matches what happens; order panel is customer-facing with Call first

## Mobile
- [x] 375px: no sideways scroll
- [x] Readable without zoom; 48px-minimum buttons
- [x] Sticky bar doesn't cover content (footer has bottom padding)

## Speed
- [x] Hero photo via `next/image` with `priority` (preload), AVIF/WebP; other photos lazy
- [x] Map iframe `loading="lazy"`
- [x] GSAP + Lenis load after first paint; Lenis desktop-only; reduced motion = final state
- [x] Fonts self-hosted, `font-display: swap`, three variable files (Fraunces, Fraunces italic, Instrument Sans)
- [x] Image dimensions declared, no CLS from fonts (`adjustFontFallback`)
- [ ] PageSpeed mobile ≥ 80 on the deployed URL (run after deploy; cut effects if under)

## Credibility
- [x] Real prices from the printed menu only; plain-English description per item
- [x] "Organic & natural" is the only health wording; spinach marked Vegetarian
- [x] Three real reviews, attributed, "Google review" label
- [ ] Marina confirms review permission, hours, delivery area/time/fee, dozen price, gluten-free

## Search
- [x] Title and description with service and city; one H1 (with `aria-label` so split lines read as a sentence)
- [x] Heading rhythm: H1 → section H2s → group H3s; item names are `<p><strong>`
- [x] Alt text on every image; favicon; share image (renders the empanada photo when present)
- [x] Canonical and OG URLs use `NEXT_PUBLIC_SITE_URL` (default `https://naturesgardencafe.vercel.app`)
- [x] Restaurant JSON-LD: name, url, image, servesCuisine, priceRange, telephone, hasMenu, address, sameAs. No hours until confirmed
- [x] Robots `noindex` while `NEXT_PUBLIC_SITE_MODE` is `demo`; set `live` at launch
- [ ] Validate JSON-LD in Google's Rich Results test on the deployed URL

## Plumbing
- [x] Events: order_delivery_click, order_pickup_click, call_click, group_order_click, directions_click (+ market_link_click), with utm_source
- [x] 404 page, privacy policy, © 2026, zero "lorem", zero "demo" wording
- [x] Every link and button clicked in headless Chromium; dialog opens/closes
- [ ] `tel:` / `sms:` tested on a real phone; HTTPS (automatic on Vercel)
- [ ] Drop the three photos into `public/photos/` and push (illustration shows until then)

## Handoff
- [ ] Set `NEXT_PUBLIC_ORDER_URL` when Marina has an ordering page; Order buttons link straight to it
- [ ] Enable Vercel Analytics (custom events need Pro)
