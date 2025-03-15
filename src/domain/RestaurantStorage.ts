import { Restaurant } from "../shared/types";

const STORAGE_KEY = "restaurants";

export function AddNewRestaurant({ restaurant }: { restaurant: Restaurant }) {
  if (!GetAllRestaurants()) {
    localStorage.setItem(`${STORAGE_KEY}`, JSON.stringify([restaurant]));
    return;
  }
  const restaurants = GetAllRestaurants();
  restaurants.push(restaurant);
  localStorage.setItem(`${STORAGE_KEY}`, JSON.stringify(restaurants));
}

export function GetAllRestaurants() {
  const data = localStorage.getItem(`${STORAGE_KEY}`) || "[]";
  return JSON.parse(data) as Restaurant[];
}

export function SaveFavoriteRestaurantInStorage(
  favoriteRestaurant: Restaurant
) {
  const allRestaurants = GetAllRestaurants();
  allRestaurants.forEach((restaurant: Restaurant) => {
    if (restaurant.nameValue === favoriteRestaurant.nameValue) {
      restaurant.favorite = favoriteRestaurant.favorite;
    }
  });

  localStorage.setItem(`${STORAGE_KEY}`, JSON.stringify(allRestaurants));
}

export function DeleteFavoriteRestaurantInStorage(restaurantName: string) {
  const allRestaurants = GetAllRestaurants();
  allRestaurants.forEach((restaurant: Restaurant) => {
    if (restaurant.nameValue === restaurantName) {
      restaurant.favorite = false;
    }
  });

  localStorage.setItem(`${STORAGE_KEY}`, JSON.stringify(allRestaurants));
}

export function DeleteRestaurant(restaurantName: string | null) {
  const allRestaurants = GetAllRestaurants();

  const filteredRestaurants = allRestaurants.filter(
    (restaurant: Restaurant) => restaurant.nameValue !== restaurantName
  );

  localStorage.setItem(`${STORAGE_KEY}`, JSON.stringify(filteredRestaurants));
}
