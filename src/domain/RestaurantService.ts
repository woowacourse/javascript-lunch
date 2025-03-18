import { Restaurant } from "../shared/types";
import {
  GetAllRestaurantFromStorage,
  SetRestaurantInStorage,
} from "../utils/RestaurantStorage";

export function AddNewRestaurant({ restaurant }: { restaurant: Restaurant }) {
  if (!GetAllRestaurants()) {
    SetRestaurantInStorage([restaurant]);
    return;
  }
  const restaurants = GetAllRestaurants();
  restaurants.push(restaurant);
  SetRestaurantInStorage(restaurants);
}

export function GetAllRestaurants() {
  return GetAllRestaurantFromStorage();
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

  SetRestaurantInStorage(allRestaurants);
}

export function DeleteFavoriteRestaurantInStorage(restaurantName: string) {
  const allRestaurants = GetAllRestaurants();
  allRestaurants.forEach((restaurant: Restaurant) => {
    if (restaurant.nameValue === restaurantName) {
      restaurant.favorite = false;
    }
  });

  SetRestaurantInStorage(allRestaurants);
}

export function DeleteRestaurant(restaurantName: string | null) {
  const allRestaurants = GetAllRestaurants();

  const filteredRestaurants = allRestaurants.filter(
    (restaurant: Restaurant) => restaurant.nameValue !== restaurantName
  );

  SetRestaurantInStorage(filteredRestaurants);
}
