/**
 * Build-time photo pipeline.
 * Reads content/photos.json, writes web-sized JPEGs (max 1600px wide) to public/photos/,
 * generates a tiny blur placeholder per photo, and writes content/photos.generated.json.
 * Prints which slots are still stock stand-ins.
 *
 *   npm run photos
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const slots = JSON.parse(readFileSync(join(root, "content/photos.json"), "utf8"));
const outDir = join(root, "public/photos");
mkdirSync(outDir, { recursive: true });

const MAX_WIDTH = 1600;
const generated = {};
const stock = [];
const missing = [];

for (const [slot, spec] of Object.entries(slots)) {
  if (slot.startsWith("_")) continue;
  const source = spec.source ? join(root, "public/photos", spec.source) : null;
  if (!source || !existsSync(source)) {
    missing.push(slot);
    continue;
  }

  let img = sharp(source).rotate();
  const meta = await img.metadata();
  if (spec.crop) {
    const c = spec.crop;
    img = img.extract({
      left: Math.round(meta.width * c.left),
      top: Math.round(meta.height * c.top),
      width: Math.round(meta.width * c.width),
      height: Math.round(meta.height * c.height),
    });
  }
  img = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });

  const outFile = join(outDir, `${slot}.jpg`);
  const info = await img.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(outFile);
  const blur = await img.clone().resize({ width: 16 }).jpeg({ quality: 40 }).toBuffer();

  generated[slot] = {
    src: `/photos/${slot}.jpg`,
    width: info.width,
    height: info.height,
    alt: spec.alt,
    isStock: Boolean(spec.isStock),
    credit: spec.credit || null,
    blurDataURL: `data:image/jpeg;base64,${blur.toString("base64")}`,
  };
  if (spec.isStock) stock.push(slot);
}

writeFileSync(
  join(root, "content/photos.generated.json"),
  JSON.stringify(generated, null, 2) + "\n",
);

console.log(`photos: ${Object.keys(generated).length} written to public/photos/`);
if (stock.length) console.log(`still stock stand-ins: ${stock.join(", ")}`);
if (missing.length) console.log(`no file yet (section hides): ${missing.join(", ")}`);

// Story fields still empty (so Kyle knows what to ask Marina).
const story = JSON.parse(readFileSync(join(root, "content/story.json"), "utf8"));
const empty = [];
const walk = (obj, path) => {
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("_")) continue;
    const p = path ? `${path}.${k}` : k;
    if (typeof v === "string") { if (!v.trim()) empty.push(p); }
    else if (Array.isArray(v)) v.forEach((item, i) => walk(item, `${p}[${i}]`));
    else if (v && typeof v === "object") { if (Object.keys(v).length === 0) empty.push(p); else walk(v, p); }
  }
};
walk(story, "");
if (empty.length) console.log(`story.json still empty: ${empty.join(", ")}`);
