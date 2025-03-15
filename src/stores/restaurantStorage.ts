import { RestaurantItem } from "../types/restaurantItem.js";

const restaurantStorage = {
  getRestaurantList: () => {
    const restaurantList = window.localStorage.getItem("restaurantList");
    return restaurantList ? JSON.parse(restaurantList) : [];
  },

  setRestaurantList: (restaurantList: RestaurantItem[]): void => {
    window.localStorage.setItem(
      "restaurantList",
      JSON.stringify(restaurantList)
    );
  },
};

export default restaurantStorage;
