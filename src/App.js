import Header from "./UI/Header.js";
import RestaurantContainer from "./UI/RestaurantContainer.js";
import Modal from "./UI/Modal";
import FilterBar from "./UI/FilterBar";
import { RestaurantList } from "./domain/RestaurantList";
import RestaurantRegistry from "./UI/RestaurantRegistry.js";

export class App {
  constructor() {
    this.restaurantList = new RestaurantList();
    this.restaurantRegistry = new RestaurantRegistry();
    new Header();
    new FilterBar(this.restaurantList, this.restaurantRegistry);
    new RestaurantContainer();
    new Modal(this.restaurantList, this.restaurantRegistry);
    JSON.parse(localStorage.getItem("restaurants")).forEach((restaurant) => {
      this.restaurantRegistry.appendRestaurant(restaurant);
    });
  }
}
