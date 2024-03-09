import { Restaurant } from "../types";

const RESTAURANTS = "restaurants";

export function getRestaurantsFromLocalStorage(): Restaurant[] {
  if (!localStorage.getItem(RESTAURANTS)) {
    localStorage.setItem(RESTAURANTS, JSON.stringify([]));
  }

  const restaurants = localStorage.getItem(RESTAURANTS) as string;

  return JSON.parse(restaurants);
}

export function setRestaurantsToLocalStorage(newRestuarant: Restaurant) {
  const newRestaurants = [...getRestaurantsFromLocalStorage(), newRestuarant];
  localStorage.setItem(RESTAURANTS, JSON.stringify(newRestaurants));
}
