# Objection map (v3, "Fileteado")

The contract: every section names the rows it answers. Status mirrors `content/story.json` and `content/photos.json`.
Hidden = not rendered until the content exists. Stand-in photos carry the "Sample photo" caption until `isStock` is false.

| Customer question (their words) | Section | Answer on the page | Evidence | Status |
|---|---|---|---|---|
| "What is this place? A vitamin store?" | 3.1 Hero | Ribbon H1: "Argentinian food, organic and natural, inside Nature's Garden, Friendswood." Paper tag names the dishes | `door.jpg` → `counter.jpg` walk-in | Verified. Photos are stand-ins |
| "Do you deliver? How do I order now?" | 3.1 Hero, 3.9 sticky bar | Order delivery (gold) and Order pickup; Call in the header, footer and sticky bar; order panel says Call first | – | Verified |
| "Is this real? Is this a brand?" | 3.2 Wreath | 900 leaves assemble her wreath; wordmark in Bodoni italic | Static SVG wreath without WebGL or with reduced motion | Verified (logo) |
| "What's a lomito? What's on the menu? What does it cost?" | 3.3 La carta | Four sandwiches with plain descriptions and prices; empanadas $4.25 each; spinach marked vegetarian | `lomito.jpg`, `tray.jpg` (stand-ins) | Verified (printed menu) |
| "What's on the board today?" | 3.3 right panel | "Soups and salads change daily. Call for today's board." | `board.jpg` + `dailyBoard` once filled | Hidden until `dailyBoard` |
| "Is it authentic? Will it travel? Something for me?" | 3.4 Tres historias | Three stories in Marina's words with one practical detail each | Morphing empanada SVG | **Hidden**: all three `empanadas.*.story` empty |
| "Is it any good?" | 3.5 Guest book | Three real reviews, first name + initial, "Google review" tag | Named reviewers | Verified on the market's About page; confirm permission |
| "How does delivery work? How long? Fee? Minimum?" | 3.6 Delivery | Three steps on the ribbon; FAQ shows "How far" (rings) and "Order ahead for pickup" | – | Time, fee, minimum **hidden** until `story.delivery.*` |
| "Where exactly? Will you reach me? How do I get there?" | 3.7 Find us | Address inside the market, Leaflet map with 3 / 5 / 8-mile rings, Get directions, Call | Map rings, town labels | Rings from the brief; labels say "about N miles" until `rings[].label` |
| "When are you open?" | 3.7 Find us, footer | Hours block | – | **Hidden** until `story.hours`; "Call for today's hours" shows |
| "Why trust this? Same as the vitamin store?" | 3.8 Origin | `story.origin` at reading size; photo with "since 2001" ribbon; Shop the market online | `counter.jpg` / `marina.jpg` | **Hidden** until `origin` |
| "Can I order for the office?" | 3.9 Group orders | Empanadas by the dozen, $4.25 each, text or call | – | Verified price; dozen price not claimed |
