import { Restaurant } from "./restaurant.ts";
import { FILTER_OPTIONS } from "../constants/rules.js";

export function filterAndSortRestaurants(
  restaurants: Restaurant[],
  category: string,
  sorting: string
): Restaurant[] {
  let filteredRestaurants = [...restaurants];

  if (category !== FILTER_OPTIONS.ALL_CATEGORY) {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) => restaurant.category === category
    );
  }

  if (sorting === FILTER_OPTIONS.SORTING[1]) {
    filteredRestaurants.sort((a, b) => {
      const diff = a.distance - b.distance;
      return diff !== 0 ? diff : a.name.localeCompare(b.name, "ko");
    });
    return filteredRestaurants;
  }

  filteredRestaurants.sort((a, b) => a.name.localeCompare(b.name, "ko"));
  return filteredRestaurants;
}

export function getFavoriteRestaurants(
  restaurants: Restaurant[]
): Restaurant[] {
  return restaurants.filter((restaurant) => restaurant.isFavorite);
}
