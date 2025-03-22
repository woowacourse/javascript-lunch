import { CATEGORY_FILTER, Restaurant } from "../../types/global";

const RestaurantListUtils = {
  add(restaurantList: Restaurant[], newRestaurant: Restaurant) {
    return [...restaurantList, newRestaurant];
  },

  delete(restaurantList: Restaurant[], id: number) {
    return restaurantList.filter((restaurant) => restaurant.id !== id);
  },

  filterByCategory(
    restaurantList: Restaurant[],
    category: CATEGORY_FILTER
  ): Restaurant[] {
    if (category === "전체") return restaurantList;
    return restaurantList.filter(({ label }) => label === category);
  },

  sortById(restaurantList: Restaurant[]) {
    return restaurantList.sort((a, b) => a.id - b.id);
  },

  sortByName(restaurantList: Restaurant[]) {
    return restaurantList.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  },

  sortByDistance(restaurantList: Restaurant[]) {
    return restaurantList.sort((a, b) => a.distance - b.distance);
  },

  favoriteById(restaurantList: Restaurant[], id: number) {
    return restaurantList.map((restaurant) =>
      restaurant.id === id
        ? { ...restaurant, favorite: !restaurant.favorite }
        : restaurant
    );
  },

  getFavoriteList(restaurantList: Restaurant[]) {
    return restaurantList.filter(({ favorite }) => favorite);
  },
};

export default RestaurantListUtils;
