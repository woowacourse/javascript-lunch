import { Icategory, Irestaurant, IrestaurantList } from "../types";
import Restaurant from "./Restauant";

class RestaurantList implements IrestaurantList {
  #restaurantList: Irestaurant[];

  constructor() {
    this.#restaurantList = [];
  }

  addRestaurant(restaurant: Irestaurant) {
    this.#restaurantList.push(Restaurant(restaurant));
  }

  sortByName() {
    return this.#restaurantList.sort();
  }

  sortByDistance() {
    return this.#restaurantList.sort((a, b) => a.distance - b.distance);
  }

  filterByCategory(category: Icategory) {
    return this.#restaurantList.filter(
      (restaurant) => restaurant.category === category,
    );
  }
}

export default RestaurantList;
