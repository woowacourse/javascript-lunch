import { CATEGORY_FILTER, Restaurant } from "../../types/global";

const RestaurantListUtils = {
  add(restaurantList: Restaurant[], newRestaurant: Restaurant): Restaurant[] {
    return [...restaurantList, newRestaurant];
  },

  filterByCategory(
    restaurantList: Restaurant[],
    category: CATEGORY_FILTER
  ): Restaurant[] {
    if (category === "전체") return restaurantList;
    return restaurantList.filter(({ label }) => label === category);
  },

  sortByName(restaurantList: Restaurant[]): Restaurant[] {
    const resultList = [...restaurantList];
    return resultList.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  },

  sortByDistance(restaurantList: Restaurant[]): Restaurant[] {
    const resultList = [...restaurantList];
    return resultList.sort((a, b) => a.distance - b.distance);
  },
};

export default RestaurantListUtils;
