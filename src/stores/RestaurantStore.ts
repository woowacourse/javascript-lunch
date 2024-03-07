import type { RestaurantDetail } from "../domain/Restaurant/Restaurant.type";

const RestaurantStore = {
  get() {
    if (!localStorage.getItem("restaurantDetail")) {
      return [];
    }

    return JSON.parse(localStorage.getItem("restaurantDetail") ?? "");
  },

  set(restaurantDetail: RestaurantDetail) {
    const existingRestaurants = RestaurantStore.get();

    existingRestaurants.push(restaurantDetail);

    localStorage.setItem(
      "restaurantDetail",
      JSON.stringify(existingRestaurants)
    );
  },
};

export default RestaurantStore;
