import { DEFAULT_RESTAURANTS } from "../constants/options";

export function AddNewRestaurant({ restaurant }) {
  if (!GetRestaurantFromStorage()) {
    localStorage.setItem("restaurants", JSON.stringify([restaurant]));
    return;
  }
  const restaurants = GetRestaurantFromStorage();
  restaurants.push(restaurant);
  console.log(restaurants);
  localStorage.setItem("restaurants", JSON.stringify(restaurants));
}

export function GetAllRestaurants() {
  DEFAULT_RESTAURANTS.push(...GetRestaurantFromStorage());
  return DEFAULT_RESTAURANTS;
}

export function GetRestaurantFromStorage() {
  return JSON.parse(localStorage.getItem("restaurants"));
}

export function GetFavoriteRestaurant() {
  if (!JSON.parse(localStorage.getItem("favorite"))) {
    return [];
  }

  return JSON.parse(localStorage.getItem("favorite"));
}

export function SaveFavoriteRestaurant({ favoriteRestaurant }) {
  localStorage.setItem("favorite", JSON.stringify(favoriteRestaurant));
}
