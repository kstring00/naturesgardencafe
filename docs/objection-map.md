# Objection map

Every row needs a visible answer on the page, or the section stays hidden until we have the content.
Status reflects the code in `src/content/`. Flip a `fact()` to `"verified"` with a value and the UI shows it.

| Concern (their words) | Where it arises | Answer on the page | Evidence beside it | Status |
|---|---|---|---|---|
| "What is this place? A health store or a restaurant?" | First screen | H1: "Argentinian food, organic & natural, in Friendswood." Eyebrow: "Argentinian Cuisine · inside Nature's Garden" | Leaf mark + illustrated empanada (swap for real photo: `site.heroImage`) | Verified (menu). Photo missing |
| "Do you deliver to me?" | Hero + delivery section | "delivered or ready for pickup" + Order delivery button; "Delivery around Friendswood" | Delivery area line: **hidden** (`site.delivery.areaLine`) | Assumed: confirm radius and provider |
| "What's on the menu and what does it cost?" | Menu section | 4 sandwiches + 3 empanada fillings with real prices | Item photos: **hidden** until dropped in (`menu.ts` → `image`) | Verified (partial menu). Full menu missing, page says so |
| "Is it actually authentic Argentinian?" | Menu intro | "Lomito, milanesa, chorizo and empanadas, the dishes every Argentine grows up on." | Marina's story: **hidden** (`site.story`) | Assumed: ask Marina her story |
| "Is it healthy / natural?" | Menu intro | Badge: "Organic & natural ingredients · baked fresh daily" (her menu wording) | Badge next to menu heading | Verified (menu wording) |
| "Will it still be good when it arrives?" | Delivery section, step 3 | "Empanadas were made for travel. They arrive ready to eat." | Packaging line: **hidden** (`site.delivery.packaging`) | Assumed: confirm packaging |
| "Can I order for my office / a group?" | After delivery | "Empanadas by the dozen" block with Request a group order (SMS) + call | $4.25 each (verified). Dozen price: **hidden** (`menu.ts` → `dozenPrice`) | Assumed: confirm dozen pricing |
| "When are you open?" | Footer | Hours | **Hidden** (`site.hours`) | Missing |
| "I'm here for supplements, not food." | Inside Nature's Garden section | "Here for supplements and groceries instead? That's the market, right next to us." + Visit the market | Links to Maps until the shop URL is known (`site.market.url`) | Shop URL missing |
