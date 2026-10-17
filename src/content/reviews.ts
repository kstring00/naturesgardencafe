/**
 * Real reviews quoted on the market's existing About page (naturesgardencafe.com).
 * Attributed as shown there. Confirm with Marina before launch that we may reuse them.
 * Keep each under 25 words.
 */
export interface Review {
  quote: string;
  name: string;
  source: "Google review";
}

export const reviews: Review[] = [
  {
    quote:
      "The food was so good… I had a simple soup, salad, and sandwich but all three of them were so delicious.",
    name: "Austin A.",
    source: "Google review",
  },
  {
    quote:
      "The owners of the store are helpful and know their stuff… The food at their restaurant is healthy and yummy.",
    name: "Firehouse S.",
    source: "Google review",
  },
  {
    quote: "Much respect to the cook and owner. Real knowledgeable about the product he sells.",
    name: "Dav T.",
    source: "Google review",
  },
];
