import {
  setItemToLocalStorage,
  getItemFromLocalStorage,
} from "../database/localStorage.js";
import { restaurants } from "../database/restaurants.js";
import { makeUniqueId } from "../utils/makeUniqueId.js";
import sortAndFilter from "./utils/sortAndFilter.js";

const lunchRestaurantsService = {
  LUNCH_KEY: "lunchRestaurantList",

  initializeRestaurantList(restaurants) {
    return restaurants.map((restaurant) => ({
      ...restaurant,
      id: makeUniqueId(restaurant.name),
      isFavorite: false,
    }));
  },

  getRestaurants() {
    return (
      getItemFromLocalStorage(this.LUNCH_KEY) ??
      this.initializeRestaurantList(restaurants)
    );
  },

  saveRestaurants(restaurants) {
    setItemToLocalStorage(this.LUNCH_KEY, restaurants);
  },

  addRestaurant(restaurants, newRestaurant) {
    const newRestaurantWithId = {
      ...newRestaurant,
      id: makeUniqueId(newRestaurant.name),
      isFavorite: false,
    };

    const newRestaurantList = [newRestaurantWithId, ...restaurants];
    this.saveRestaurants(newRestaurantList);
    return { newRestaurantList, newRestaurantWithId };
  },

  deleteRestaurant(restaurants, restaurantToDelete) {
    const newRestaurantList = restaurants.filter(
      ({ id }) => id !== restaurantToDelete.id
    );
    this.saveRestaurants(newRestaurantList);
    return newRestaurantList;
  },

  toggleFavoriteRestaurant(restaurants, restaurantId) {
    const updatedRestaurants = restaurants.map((restaurant) =>
      restaurant.id === restaurantId
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    );
    this.saveRestaurants(updatedRestaurants);
    return updatedRestaurants;
  },

  filterAndSortRestaurants(restaurants, sortingOption, categoryFilter) {
    return sortAndFilter(restaurants, sortingOption, categoryFilter);
  },
};

export default lunchRestaurantsService;
