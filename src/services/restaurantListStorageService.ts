import { Irestaurant } from "../types/restaurant";

const RestaurantListStorageService = {
  getData() {
    const restaurantList = localStorage.getItem("restaurantList");

    if (restaurantList) {
      return JSON.parse(restaurantList);
    }
    return [];
  },

  setData(restaurants: Irestaurant[]) {
    localStorage.setItem("restaurantList", JSON.stringify(restaurants));
  },
};

export default RestaurantListStorageService;
