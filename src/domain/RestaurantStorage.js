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
  const defaultRestaurants = [...DEFAULT_RESTAURANTS];

  console.log("#@@@@", defaultRestaurants);

  const restaurantsFromStorage = GetRestaurantFromStorage();
  restaurantsFromStorage.forEach((restaurant) => {
    defaultRestaurants.forEach((defaultRestaurant) => {
      if (defaultRestaurant.nameValue === restaurant.nameValue) {
        if (defaultRestaurant.favorite !== restaurant.favorite) {
          defaultRestaurant.favorite = restaurant.favorite;
        }
      } else {
        defaultRestaurants.push(restaurant);
      }
    });
  });

  const favoriteRestaurants = GetFavoriteRestaurant();
  defaultRestaurants.forEach((restaurant) => {
    favoriteRestaurants.forEach((favoriteRestaurant) => {
      if (restaurant.nameValue === favoriteRestaurant.nameValue) {
        restaurant.favorite = true;
      }
    });
  });

  return defaultRestaurants;
}

function GetRestaurantFromStorage() {
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

export function DeleteFavoriteRestaurantInStorage(restaurantName) {
  const favoriteRestaurants =
    JSON.parse(localStorage.getItem("favorite")) || [];

  const filteredRestaurants = favoriteRestaurants.filter(
    (restaurant) => restaurant.nameValue !== restaurantName
  );

  localStorage.setItem("favorite", JSON.stringify(filteredRestaurants));

  return favoriteRestaurants.length === filteredRestaurants.length
    ? false
    : true;
}
