import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Photos cropped from the printed menu live in /public/photos.
 * Dimensions are fixed here so <Image> can reserve space (no layout shift).
 * If a file is missing, the section falls back to illustration instead of a broken image.
 * Server-only: call from server components or route handlers.
 */
export const PHOTOS = {
  empanadas: {
    file: "empanadas.jpg",
    width: 960,
    height: 380,
    alt: "Golden baked empanadas with crimped edges on a wooden board",
  },
  sandwiches: {
    file: "sandwiches.jpg",
    width: 670,
    height: 460,
    alt: "Argentine sandwiches: lomito steak and milanesa on fresh bread",
  },
  logo: {
    file: "logo.jpg",
    width: 290,
    height: 255,
    alt: "Nature's Garden Cafe & Resto logo",
  },
} as const;

export type PhotoKey = keyof typeof PHOTOS;

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export function getPhoto(key: PhotoKey): Photo | null {
  const p = PHOTOS[key];
  const onDisk = join(process.cwd(), "public", "photos", p.file);
  if (!existsSync(onDisk)) return null;
  return { src: `/photos/${p.file}`, width: p.width, height: p.height, alt: p.alt };
}
