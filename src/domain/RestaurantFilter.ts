import { CATEGORY, SORTINGWAY } from "../constant/variables";
import { CategoryType, RestaurantInfo, SortingWayType } from "../types/restaurant";

const RestaurantFilter = {
  categorizeRestaurants(category: CategoryType, restaurants: RestaurantInfo[]): RestaurantInfo[] {
    if (category === CATEGORY.ALL) return restaurants;
    return [...restaurants].filter((restaurant) => restaurant.category === category);
  },

  sortRestaurants(sortingWay: SortingWayType, restaurants: RestaurantInfo[]): RestaurantInfo[] {
    if (sortingWay === SORTINGWAY.DISTANCE) return [...restaurants].sort((a, b) => a.distance - b.distance);

    return [...restaurants].sort((a, b) => (a.name > b.name ? 1 : -1));
  },
};

export default RestaurantFilter;
