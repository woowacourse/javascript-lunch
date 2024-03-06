import RestaurantStore from "../../stores/RestaurantStore";
import { RestaurantDetail } from "./Restaurant.type";

class Restaurant {
  private restaurants: RestaurantDetail[] = RestaurantStore.get();

  public getRestaurants() {
    return this.restaurants;
  }

  public addRestaurant(restaurantDetail: RestaurantDetail) {
    RestaurantStore.set(restaurantDetail);
  }
}

export default Restaurant;
