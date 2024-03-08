import { STORAGE_KEYS } from "./constant";

import type { RestaurantDetail } from "../domain/Restaurant/Restaurant.type";
import type { CustomStorage } from "./type";

const RestaurantStorage: CustomStorage<RestaurantDetail[], RestaurantDetail> = {
  get() {
    const restaurantDetails = localStorage.getItem(
      STORAGE_KEYS.restaurantDetail
    );

    if (!restaurantDetails) return [];

    return JSON.parse(restaurantDetails);
  },

  set(restaurantDetail: RestaurantDetail) {
    const existingRestaurants = RestaurantStorage.get();

    existingRestaurants.push(restaurantDetail);

    localStorage.setItem(
      STORAGE_KEYS.restaurantDetail,
      JSON.stringify(existingRestaurants)
    );
  },
};

export default RestaurantStorage;
