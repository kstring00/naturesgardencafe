export interface MenuItem {
  slug: string;
  name: string;
  /** Price in US cents. From the printed menu. */
  priceCents: number;
  /** Plain English for people who don't know the dish. */
  description: string;
}

export interface Filling {
  key: "beef" | "chicken" | "spinach";
  name: string;
  vegetarian?: boolean;
}

export const sandwiches: MenuItem[] = [
  { slug: "lomito", name: "Lomito Steak Sandwich", priceCents: 2399, description: "Thin-sliced steak, lettuce and tomato on fresh bread." },
  { slug: "milanesa", name: "Milanesa Sandwich", priceCents: 2199, description: "Crisp breaded cutlet, the Argentine classic." },
  { slug: "chorizo", name: "Chorizo Sandwich", priceCents: 1950, description: "Grilled Argentine sausage on a fresh roll." },
  { slug: "pollo", name: "Grilled Chicken Sandwich", priceCents: 1850, description: "Grilled chicken breast on fresh bread." },
];

export const empanadas = {
  priceEachCents: 425,
  fillings: [
    { key: "beef", name: "Beef" },
    { key: "chicken", name: "Chicken" },
    { key: "spinach", name: "Spinach", vegetarian: true },
  ] satisfies Filling[],
};
