import { Restaurant } from "../types";

const RESTAURANTS = "restaurants";

export function getRestaurantsFromLocalStorage(): Restaurant[] {
  const restaurants = localStorage.getItem(RESTAURANTS);
  if (restaurants === null) {
    return [];
  }

  return JSON.parse(restaurants);
}

export function setRestaurantsToLocalStorage(restaurants: Restaurant[]) {
  localStorage.setItem(RESTAURANTS, JSON.stringify(restaurants));
}
