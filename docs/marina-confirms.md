# Marina must confirm

Each item unlocks a hidden part of the page. Nothing is guessed in the meantime.

**Before the pitch**
1. Delivery area: Friendswood only, or League City / Pearland / Clear Lake too? → `site.delivery.typicalAreas`
2. Who delivers: register's online ordering, DoorDash, Uber Eats, own driver? → `site.delivery.provider` + `NEXT_PUBLIC_ORDER_URL`
3. Café hours, each day → `site.hours`

**Before launch**
4. Delivery time (e.g. "35–50 minutes") → `site.delivery.timing`
5. Minimum order and delivery fee → `site.delivery.minimumAndFee`
6. Pickup ready time (e.g. "about 20 minutes") → `site.delivery.pickupReadyTime`
7. Dozen pricing and notice needed for large orders → `empanadas.dozenPrice`
8. Gluten-free options we can name → `site.glutenFree`
9. Permission to reuse the three Google reviews from the market's About page → `src/content/reviews.ts`
10. How delivery orders are packed → `site.delivery.packaging`
11. Her story in two or three sentences → `site.story`
12. The full menu with prices → `src/content/menu.ts`
13. Real photos (hero, sandwiches, empanadas) → `public/photos/`

Ready-to-send text:
> Hi Marina, the site is ready to show you. Three quick things so it's accurate: how far you deliver, who you'd use for delivery (your register's online ordering or a service), and your café hours. Everything else can wait until after you've seen it.
