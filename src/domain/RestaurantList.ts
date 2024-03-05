import { Restaurant } from "../types";

class RestaurantList {
  private restaurants: Restaurant[];

  constructor(restaurants: Restaurant[]) {
    this.restaurants = restaurants;
  }

  get getRestaurants(): Restaurant[] {
    return [...this.restaurants];
  }
}

export default RestaurantList;
