import { CATEGORY, SORT } from "../constants";
import "../types/restaurant";

const RestaurantFilter = {
  categorizeRestaurants(category: Category, restaurants: RestaurantInfo[]): RestaurantInfo[] {
    if (category === CATEGORY.ALL) return restaurants;
    return restaurants.filter((restaurant) => restaurant.category === category);
  },

  sortRestaurants(sortingWay: SortingWay, restaurants: RestaurantInfo[]): RestaurantInfo[] {
    if (sortingWay === SORT.NAME) {
      return [...restaurants].sort((a, b) => (a.name > b.name ? 1 : -1));
    }
    if (sortingWay === SORT.DISTANCE) {
      return [...restaurants].sort((a, b) => a.distance - b.distance);
    }

    return restaurants;
  },
};

export default RestaurantFilter;
