import generated from "../../content/photos.generated.json";
import credits from "../../content/credits.json";

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
  isStock: boolean;
  credit: string | null;
  blurDataURL: string;
}

export type PhotoSlot = "door" | "counter" | "hands" | "tray" | "lomito" | "milanesa" | "marina" | "board";

const photos = generated as Partial<Record<PhotoSlot, Photo>>;

/** A web-sized photo for a slot, or null when no file exists yet (the section hides). */
export const getPhoto = (slot: PhotoSlot): Photo | null => photos[slot] ?? null;

export const stockSlots = () =>
  (Object.entries(photos) as [PhotoSlot, Photo][]).filter(([, p]) => p.isStock).map(([k]) => k);

export const creditFor = (key: string | null) =>
  key ? (credits as Record<string, { name: string; platform: string; url: string }>)[key] ?? null : null;
