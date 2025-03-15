import { initialRestaurants } from "../data/initialRestaurants.js";

export function generateId() {
  const maxId = Math.max(
    ...initialRestaurants.map((restaurant) => restaurant.id),
    0,
  );
  return maxId + 1;
}
