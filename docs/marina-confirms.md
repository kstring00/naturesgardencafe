# What Marina still needs to give us

Everything below is a key in `content/story.json` (or a photo slot). Empty = hidden on the page. Nothing is guessed in the meantime.
The build prints this list every time (`npm run photos`).

**Story (her words; 2–4 sentences each)**
1. `origin`: how the café came to be → unlocks "Inside Nature's Garden"
2. `whyArgentine`: what makes it Argentine here, in Friendswood
3. `empanadas.beef.story` + `.detail`
4. `empanadas.chicken.story` + `.detail`
5. `empanadas.spinach.story` + `.detail` → any one story unlocks "Tres historias"
6. `dailyBoard`: how soups and salads change → unlocks the board panel with `board.jpg`

**Facts**
7. `hours` (e.g. `"Mon–Fri": "9:00–6:00"`) → footer, Find us, JSON-LD
8. `delivery.rings[].label` (e.g. "about 10 minutes") and confirm the 3 / 5 / 8-mile rings
9. `delivery.time`, `delivery.fee`, `delivery.minimum` → three FAQ rows
10. Permission to reuse the three Google reviews from the market's About page

**Photos (phone is fine; we grade them to match)**
11. `door.jpg`, `counter.jpg`, `hands.jpg`, `tray.jpg`, `lomito.jpg`, `milanesa.jpg`, `board.jpg`, and `marina.jpg` if she's comfortable.
    Put them in `public/photos/own/`, point `content/photos.json` at them, set `isStock: false`, run `npm run photos`.

Ready-to-send text:
> Hi Marina, the new site is ready to show you. I'd love 15 minutes to hear the story in your words: how the café started, and one line about each empanada. And three facts: hours, how far you deliver, and about how long it takes. Everything else is already in.
