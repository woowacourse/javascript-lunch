import {
  setItemToLocalStorage,
  getItemFromLocalStorage,
} from "./database/localStorage.js";
import { restaurants } from "./database/restaurants.js";
import { makeUniqueId } from "../utils/makeUniqueId.js";
import RESTAURANT_RULES from "../constants/rules.js";
import {
  filterByCategory,
  sortByOptions,
  sorting,
  SortOptions,
  CategoryFilterOptions,
} from "./utils/sortAndFilter.js";

export type Category = (typeof RESTAURANT_RULES.CATEGORIES)[number];

type Distance = (typeof RESTAURANT_RULES.DISTANCES)[number];

export interface RestaurantInfo {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

interface AdditionalInfo {
  id: string;
  isFavorite: boolean;
}

export interface RestaurantInfoWithAdditionalInfo
  extends RestaurantInfo,
    AdditionalInfo {}

const lunchRestaurantsService = {
  LUNCH_KEY: "lunchRestaurantList",

  initializeRestaurantList(
    restaurants: RestaurantInfo[]
  ): RestaurantInfoWithAdditionalInfo[] {
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

  saveRestaurants(restaurants: RestaurantInfoWithAdditionalInfo[]) {
    setItemToLocalStorage(this.LUNCH_KEY, restaurants);
  },

  addRestaurant(
    restaurants: RestaurantInfoWithAdditionalInfo[],
    newRestaurant: RestaurantInfo
  ) {
    const newRestaurantWithId = {
      ...newRestaurant,
      id: makeUniqueId(newRestaurant.name),
      isFavorite: false,
    };

    const newRestaurantList = [newRestaurantWithId, ...restaurants];
    this.saveRestaurants(newRestaurantList);
    return { newRestaurantList, newRestaurantWithId };
  },

  deleteRestaurant(
    restaurants: RestaurantInfoWithAdditionalInfo[],
    restaurantToDelete: RestaurantInfoWithAdditionalInfo
  ) {
    const newRestaurantList = restaurants.filter(
      ({ id }) => id !== restaurantToDelete.id
    );
    this.saveRestaurants(newRestaurantList);
    return newRestaurantList;
  },

  toggleFavoriteRestaurant(
    restaurants: RestaurantInfoWithAdditionalInfo[],
    restaurantId: string
  ) {
    const updatedRestaurants = restaurants.map((restaurant) =>
      restaurant.id === restaurantId
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    );
    this.saveRestaurants(updatedRestaurants);
    return updatedRestaurants;
  },

  filterAndSortRestaurants(
    restaurants: RestaurantInfoWithAdditionalInfo[],
    sortingOption: SortOptions = "name",
    categoryFilter: CategoryFilterOptions = "전체"
  ) {
    const sortByOption = sortByOptions[sortingOption];
    return sorting(filterByCategory(restaurants, categoryFilter), sortByOption);
  },
};

export default lunchRestaurantsService;
