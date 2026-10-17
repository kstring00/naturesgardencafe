import { fact, type Fact } from "./types";

export type Filling = "beef" | "chicken" | "spinach";

export interface MenuItem {
  slug: string;
  name: string;
  /** Price in US cents. Verified from the printed menu. */
  priceCents: number;
  description: string;
  /** Drop a cropped menu photo at /public/images/menu/<slug>.jpg and set this. */
  image: Fact<{ src: string; alt: string }>;
}

export interface EmpanadaFilling {
  filling: Filling;
  name: string;
  description: string;
}

const noPhoto = (what: string) =>
  fact<{ src: string; alt: string }>(
    null,
    "missing",
    `A real photo of the ${what}.`,
  );

/** Sandwiches, from the printed menu. Prices verified. */
export const sandwiches: MenuItem[] = [
  {
    slug: "lomito",
    name: "Lomito Steak Sandwich",
    priceCents: 2399,
    description:
      "Argentina's favorite sandwich. Thin-sliced steak on fresh bread.",
    image: noPhoto("Lomito"),
  },
  {
    slug: "milanesa",
    name: "Milanesa Sandwich",
    priceCents: 2199,
    description: "Crisp breaded cutlet, the home-style classic.",
    image: noPhoto("Milanesa"),
  },
  {
    slug: "chorizo",
    name: "Chorizo Sandwich",
    priceCents: 1950,
    description: "Grilled Argentine sausage on a fresh roll.",
    image: noPhoto("Chorizo sandwich"),
  },
  {
    slug: "pollo",
    name: "Grilled Chicken Sandwich",
    priceCents: 1850,
    description: "Grilled chicken, simply done.",
    image: noPhoto("Grilled Chicken Sandwich"),
  },
];

/** Empanadas: $4.25 each, three fillings shown on the printed menu. */
export const empanadas = {
  priceEachCents: 425,
  fillings: [
    {
      filling: "beef",
      name: "Beef",
      description: "The classic.",
    },
    {
      filling: "chicken",
      name: "Chicken",
      description: "Mild and savory.",
    },
    {
      filling: "spinach",
      name: "Spinach",
      description: "Vegetarian.",
    },
  ] satisfies EmpanadaFilling[],
  /** Dozen pricing is NOT confirmed. We only show the per-piece price. */
  dozenPrice: fact<number>(
    null,
    "assumed",
    "Is there a price break for a dozen? Minimum notice for large orders?",
  ),
};

/** Full menu is missing. The page says so honestly instead of inventing items. */
export const fullMenu = fact<string>(
  null,
  "missing",
  "The rest of the menu: soups, salads, desserts, drinks, with prices.",
);
