import raw from "../../content/story.json";

export interface Ring {
  miles: number;
  label: string;
}
export interface EmpanadaStory {
  story: string;
  detail: string;
}
export interface Story {
  origin: string;
  whyArgentine: string;
  empanadas: Record<"beef" | "chicken" | "spinach", EmpanadaStory>;
  dailyBoard: string;
  hours: Record<string, string>;
  delivery: { rings: Ring[]; fee: string; minimum: string; time: string };
  location: { lat: number; lng: number };
  doorHandle: { x: number; y: number };
}

/** Marina's words and confirmed facts. Empty strings mean "not yet": the UI hides them. */
export const story: Story = raw as Story;

export const has = (s: string | undefined | null) => Boolean(s && s.trim());

export const hoursList = () =>
  Object.entries(story.hours ?? {}).filter(([, v]) => has(v)) as [string, string][];

export const empanadaChapters = () =>
  (["beef", "chicken", "spinach"] as const)
    .map((key) => ({ key, ...story.empanadas[key] }))
    .filter((c) => has(c.story));

/** Which story.json fields are still empty: printed at build for Kyle's next interview. */
export function emptyStoryFields(): string[] {
  const out: string[] = [];
  if (!has(story.origin)) out.push("origin");
  if (!has(story.whyArgentine)) out.push("whyArgentine");
  for (const k of ["beef", "chicken", "spinach"] as const) {
    if (!has(story.empanadas[k].story)) out.push(`empanadas.${k}.story`);
    if (!has(story.empanadas[k].detail)) out.push(`empanadas.${k}.detail`);
  }
  if (!has(story.dailyBoard)) out.push("dailyBoard");
  if (hoursList().length === 0) out.push("hours");
  for (const k of ["fee", "minimum", "time"] as const) {
    if (!has(story.delivery[k])) out.push(`delivery.${k}`);
  }
  story.delivery.rings.forEach((r, i) => {
    if (!has(r.label)) out.push(`delivery.rings[${i}].label`);
  });
  return out;
}
