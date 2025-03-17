import { Restaurant } from "../models/restaurant.ts";
import { restaurantData } from "../mocks/restaurantData.ts";

const RESTAURANTS_KEY = "restaurants" as const;

export const saveRestaurantsToLocalStorage = (restaurants: Restaurant[]) => {
  if (!localStorage.getItem(RESTAURANTS_KEY)) {
    localStorage.setItem(RESTAURANTS_KEY, JSON.stringify(restaurantData));
  } else {
    localStorage.setItem(RESTAURANTS_KEY, JSON.stringify(restaurants));
  }
};

export const getRestaurantsFromLocalStorage = (): Restaurant[] => {
  const storedData = localStorage.getItem(RESTAURANTS_KEY);
  if (!storedData) {
    localStorage.setItem(RESTAURANTS_KEY, JSON.stringify(restaurantData));
    return restaurantData;
  }
  return JSON.parse(storedData);
};

export let currentRestaurantData: Restaurant[] = getRestaurantsFromLocalStorage();