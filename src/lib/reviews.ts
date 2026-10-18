export type Review = {
  name: string;
  company: string;
  country: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  product?: string; // product slug
  date?: string; // ISO date
};

/**
 * Real, verified buyer reviews only.
 * Add an entry here (with the buyer's permission) and the reviews carousel appears everywhere.
 * Do not add invented reviews.
 */
export const reviews: Review[] = [];
