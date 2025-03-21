import { restaurantStore } from "../store/restaurantStore.ts";

export function generateId() {
  const restaurants = restaurantStore.getRestaurants();
  const maxId = Math.max(...restaurants.map((restaurant) => restaurant.id), 0);
  return maxId + 1;
}
