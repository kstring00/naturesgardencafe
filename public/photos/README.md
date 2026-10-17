# Photos

Drop the three crops from the printed menu here, with exactly these names:

| File | Size | Used for |
|---|---|---|
| `empanadas.jpg` | 960×380 | Hero (organic mask), empanada card, share image |
| `sandwiches.jpg` | 670×460 | Sandwiches photo card |
| `logo.jpg` | 290×255 | Reference only (the lockup is drawn in SVG) |

The site checks for these files at build time. Missing file = illustrated fallback, never a broken image.
Dimensions are declared in `src/lib/photos.ts`; if a crop changes size, update them there.
Replace with real photos before launch.
