import { Label, Restaurant } from "../../types/global";

const RestaurantListUtils = {
  add(restaurantList: Restaurant[], newRestaurant: Restaurant): Restaurant[] {
    return [...restaurantList, newRestaurant];
  },

  filterByCategory(
    restaurantList: Restaurant[],
    category: Label
  ): Restaurant[] {
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
