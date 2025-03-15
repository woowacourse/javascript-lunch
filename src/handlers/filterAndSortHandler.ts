import { RestaurantItem } from "../types/restaurantItem.js";
import { FilterAndSortOptions } from "../types/filterAndSortOptions.js";
export const filterAndSortHandler = {
  filterByCategory: (
    restaurantList: RestaurantItem[],
    category: FilterAndSortOptions["category"]
  ) => {
    if (category === "전체") {
      return restaurantList;
    }
    return restaurantList.filter(
      (restaurant) => restaurant.category === category
    );
  },

  sortByOption: (
    restaurantList: RestaurantItem[],
    sortOption: FilterAndSortOptions["sortOption"]
  ) => {
    if (sortOption === "name") {
      return restaurantList.sort((a, b) => a.name.localeCompare(b.name));
    }

    return restaurantList.sort((a, b) => Number(a.dist) - Number(b.dist));
  },
};
