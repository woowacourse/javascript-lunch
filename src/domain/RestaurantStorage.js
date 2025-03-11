import { DEFAULT_RESTAURANTS } from "../constants/options";

export function AddNewRestaurant({ restaurant }) {
  if (!GetRestaurantFromStorage()) {
    localStorage.setItem("restaurants", JSON.stringify([restaurant]));
    return;
  }
  const restaurants = GetRestaurantFromStorage();
  restaurants.push(restaurant);
  localStorage.setItem("restaurants", JSON.stringify(restaurants));
}

export function GetAllRestaurants() {
  DEFAULT_RESTAURANTS.push(...GetRestaurantFromStorage());
  return DEFAULT_RESTAURANTS;
}

export function GetRestaurantFromStorage() {
  return JSON.parse(localStorage.getItem("restaurants")) || [];
}

export function GetFavoriteRestaurant() {
  return JSON.parse(localStorage.getItem("favorite")) || [];
}

export function SaveFavoriteRestaurantInStorage(favoriteRestaurant) {
  if (!GetFavoriteRestaurant()) {
    localStorage.setItem("favorite", JSON.stringify([favoriteRestaurant]));

    return;
  }

  const allFavoriteRestaurant = GetFavoriteRestaurant();

  allFavoriteRestaurant.push(favoriteRestaurant);
  localStorage.setItem("favorite", JSON.stringify(allFavoriteRestaurant));
}

export function DeleteFavoriteRestaurantInStorage(favoriteRestaurant) {
  let favoriteRestaurants = JSON.parse(localStorage.getItem("favorite")) || [];

  const filteredRestaurants = favoriteRestaurants.filter(
    (restaurant) => restaurant.nameValue !== favoriteRestaurant.nameValue
  );

  localStorage.setItem("favorite", JSON.stringify(filteredRestaurants));
}
