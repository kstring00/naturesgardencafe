import { fact } from "./types";

export type Filling = "beef" | "chicken" | "spinach";

export interface MenuItem {
  slug: string;
  name: string;
  /** Price in US cents. Verified from the printed menu. */
  priceCents: number;
  /** Plain English for people who don't know the dish. */
  description: string;
  tags?: ("vegetarian" | "gluten-free")[];
}

export interface EmpanadaFilling {
  filling: Filling;
  name: string;
  description: string;
  tags?: ("vegetarian" | "gluten-free")[];
}

/** Sandwiches, from the printed menu. Prices verified. */
export const sandwiches: MenuItem[] = [
  {
    slug: "lomito",
    name: "Lomito Steak Sandwich",
    priceCents: 2399,
    description:
      "Argentina's favorite sandwich: thin-sliced steak piled on fresh bread with the fixings.",
  },
  {
    slug: "milanesa",
    name: "Milanesa Sandwich",
    priceCents: 2199,
    description:
      "A thin breaded cutlet, fried crisp, served in fresh bread. Think of it as the Argentine schnitzel sandwich.",
  },
  {
    slug: "chorizo",
    name: "Chorizo Sandwich",
    priceCents: 1950,
    description: "Grilled Argentine sausage on a crusty roll, the classic you'd get at an asado.",
  },
  {
    slug: "pollo",
    name: "Grilled Chicken Sandwich",
    priceCents: 1850,
    description: "Grilled chicken breast on fresh bread, simply done.",
  },
];

/** Empanadas: $4.25 each, three fillings shown on the printed menu. */
export const empanadas = {
  priceEachCents: 425,
  intro:
    "A baked hand pie with a crimped edge. Argentina's favorite snack, lunch and party food.",
  fillings: [
    { filling: "beef", name: "Beef", description: "The classic." },
    { filling: "chicken", name: "Chicken", description: "Mild and savory." },
    { filling: "spinach", name: "Spinach", description: "Vegetarian.", tags: ["vegetarian"] },
  ] satisfies EmpanadaFilling[],
  /** Dozen pricing is NOT confirmed. We only show the per-piece price. */
  dozenPrice: fact<number>(null, "missing", "Is there a price break for a dozen? Minimum notice for large orders?"),
};

export const menuNotes = {
  partial: "Soups, salads and daily specials change with the day. Call for today's board.",
  callForMore: "Call for today's soups and salads",
};
