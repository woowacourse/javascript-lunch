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
    const existingRestaurantDetails = this.get();

    existingRestaurantDetails.push(restaurantDetail);

    localStorage.setItem(
      STORAGE_KEYS.restaurantDetail,
      JSON.stringify(existingRestaurantDetails)
    );
  },

  remove(restaurantName: string) {
    const existingRestaurantDetails = this.get();

    const filteredRestaurantsDetails = existingRestaurantDetails.filter(
      ({ name }) => name !== restaurantName
    );

    localStorage.setItem(
      STORAGE_KEYS.restaurantDetail,
      JSON.stringify(filteredRestaurantsDetails)
    );
  },
};

export default RestaurantStorage;
