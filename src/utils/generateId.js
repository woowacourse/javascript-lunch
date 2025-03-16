import { initialRestaurants } from "../data/initialRestaurants.ts";

export function generateId() {
  const maxId = Math.max(
    ...initialRestaurants.map((restaurant) => restaurant.id),
    0,
  );
  return maxId + 1;
}
