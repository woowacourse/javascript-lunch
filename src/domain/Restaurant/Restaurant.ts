import RestaurantStore from "../../stores/RestaurantStore";
import { RestaurantDetail } from "./Restaurant.type";

class Restaurant {
  private restaurants: RestaurantDetail[] = RestaurantStore.get();

  public getRestaurants() {
    return this.restaurants;
  }

  public addRestaurants(restaurantDetail: RestaurantDetail) {
    const existingRestaurants = RestaurantStore.get();

    existingRestaurants.push(restaurantDetail);

    localStorage.setItem(
      "restaurantDetail",
      JSON.stringify(existingRestaurants)
    );
  }
}

export default Restaurant;
