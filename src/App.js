import Header from "./view/components/Header.js";
import RestaurantContainer from "./view/components/RestaurantContainer.js";
import Modal from "./view/components/Modal";
import FilterBar from "./view/components/FilterBar";
import { RestaurantList } from "./domain/RestaurantList";
import RestaurantRegistry from "./view/components/RestaurantRegistry.js";

export class App {
  constructor() {
    this.restaurantList = new RestaurantList();
    this.restaurantRegistry = new RestaurantRegistry();
    new Header();
    new FilterBar(this.restaurantList, this.restaurantRegistry);
    new RestaurantContainer();
    new Modal(this.restaurantList, this.restaurantRegistry);
  }
}
