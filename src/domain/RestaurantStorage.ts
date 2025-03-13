import { Restaurant } from "../shared/types";

export function AddNewRestaurant({ restaurant }: { restaurant: Restaurant }) {
  if (!GetAllRestaurants()) {
    localStorage.setItem("restaurants", JSON.stringify([restaurant]));
    return;
  }
  const restaurants = GetAllRestaurants();
  restaurants.push(restaurant);
  localStorage.setItem("restaurants", JSON.stringify(restaurants));
}

export function GetAllRestaurants() {
  const data = localStorage.getItem("restaurants") || "[]";
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

  localStorage.setItem("restaurants", JSON.stringify(allRestaurants));
}

export function DeleteFavoriteRestaurantInStorage(restaurantName: string) {
  const allRestaurants = GetAllRestaurants();
  allRestaurants.forEach((restaurant: Restaurant) => {
    if (restaurant.nameValue === restaurantName) {
      restaurant.favorite = false;
    }
  });

  localStorage.setItem("restaurants", JSON.stringify(allRestaurants));
}

export function DeleteRestaurant(restaurantName: string | null) {
  const allRestaurants = GetAllRestaurants();

  const filteredRestaurants = allRestaurants.filter(
    (restaurant: Restaurant) => restaurant.nameValue !== restaurantName
  );

  localStorage.setItem("restaurants", JSON.stringify(filteredRestaurants));
}
