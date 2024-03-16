import Restaurant, { RestaurantInfo } from "../domain/Restaurant";
import Restaurants from "../domain/Restaurants";
import localStore from "./localStorageStore";

const restaurantStore = {
  getRestaurants(): Restaurants {
    const restaurantInfos = localStore.getParsedItem("restaurants");

    if (!restaurantInfos) {
      return new Restaurants([]);
    }

    try {
      const restaurantsArray = (restaurantInfos as []).map(
        (restaurant) => new Restaurant(restaurant)
      );
      return new Restaurants(restaurantsArray);
    } catch {
      localStore.reset();
      alert("데이터 건들지 마세요!");
      return this.getRestaurants();
    }
  },

  setRestaurants(restaurants: Restaurants) {
    localStore.setItem("restaurants", restaurants.getDetails());
  },
};

export default restaurantStore;
