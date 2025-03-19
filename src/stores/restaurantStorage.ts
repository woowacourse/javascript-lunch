import { RestaurantItem } from "../types/restaurantItem.js";

const localStorage = {
  getItem: (key: string) => {
    const item = window.localStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  },
  setItem: <T>(key: string, value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
};

const restaurantStorage = {
  getRestaurantList: () => {
    const restaurantList = localStorage.getItem("restaurantList");

    if (!restaurantList) {
      return [];
    }

    return restaurantList;
  },

  setRestaurantList: (restaurantList: RestaurantItem[]): void => {
    localStorage.setItem("restaurantList", restaurantList);
  },
};

export default restaurantStorage;
