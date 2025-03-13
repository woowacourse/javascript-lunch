import RULES from "../constants/rules.js";
import { Restaurant, restaurants } from "./restaurants.ts";

export function filterAndSortRestaurants(
  category: string,
  sorting: string
): Restaurant[] {
  let filtered = [...restaurants];

  if (category !== RULES.ALL_CATEGORY) {
    filtered = filtered.filter((r) => r.category === category);
  }

  if (sorting === RULES.SORTING[1]) {
    filtered.sort((a, b) => a.distance - b.distance);
    return filtered;
  }

  filtered.sort((a, b) => a.name.localeCompare(b.name));
  return filtered;
}

export function getFavoriteRestaurants(): Restaurant[] {
  return restaurants.filter((r) => r.isFavorite);
}

export function getAllRestaurants(): Restaurant[] {
  return [...restaurants];
}

export function toggleFavorite(restaurantId: string) {
  const target = restaurants.find((r) => r.id === restaurantId);
  if (target) {
    target.isFavorite = !target.isFavorite;
  }
}

export function deleteRestaurant(restaurantId: string) {
  const index = restaurants.findIndex((r) => r.id === restaurantId);
  if (index !== -1) {
    restaurants.splice(index, 1);
  }
}

export function addRestaurant(newRestaurant: Restaurant) {
  restaurants.push(newRestaurant);
}
