import Header from "./UI/Header.js";
import RestaurantContainer from "./UI/RestaurantContainer.js";
import Modal from "./UI/Modal";
import FilterBar from "./UI/FilterBar";
import { RestaurantList } from "./domain/RestaurantList";
import RestaurantRegistry from "./UI/RestaurantRegistry.js";
import { getRestaurantListFromLocalstorage } from "./utils/LocalStorage.js";

export class App {
  constructor() {
    this.restaurantList = new RestaurantList();
    this.restaurantRegistry = new RestaurantRegistry();
    this.header = new Header();
    this.modal = new Modal(this.restaurantList, this.restaurantRegistry);
    this.filter = new FilterBar(this.restaurantList, this.restaurantRegistry);
    this.restaurantContainer = new RestaurantContainer();

    this.collectedRender();
    this.initializeButtonEvents();

    getRestaurantListFromLocalstorage().forEach(
      (restaurant) => {
        this.restaurantRegistry.appendRestaurant(restaurant);
      }
    );
    localStorage.setItem("sort", "name");
    localStorage.setItem("foodCategory", "전체")
    this.restaurantList.filterBySort("name", "전체")
  }

  collectedRender() {
    this.header.render();
    this.modal.render();
    this.filter.render();
    this.restaurantContainer.render();
  }

  initializeButtonEvents() {
    this.header.initializeButtonEvents();
    this.modal.initializeButtonEvents();
    this.filter.initializeButtonEvents();
  }
}
