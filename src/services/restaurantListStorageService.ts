import { Irestaurant } from "../types/restaurant";

const RestaurantListStorageService = {
  getData() {
    const restaurantList = localStorage.getItem("restaurantList");
    if (restaurantList) {
      return JSON.parse(restaurantList);
    }
    return [];
  },

  setData(restaurant: Irestaurant) {
    const prevData = this.getData();

    const newData = [...prevData, restaurant];

    localStorage.setItem("restaurantList", JSON.stringify(newData));
  },
};

export default RestaurantListStorageService;
