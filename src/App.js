import Header from "./UI/Header.js";
import RestaurantContainer from "./UI/RestaurantContainer.js";
import Modal from "./UI/Modal";
import FilterBar from "./UI/FilterBar";
import { RestaurantList } from "./domain/RestaurantList";
import RestaurantRegistry from "./UI/RestaurantRegistry.js";
import {
  getRestaurantListFromLocalstorage,
  stringifyJson,
} from "./utils/LocalStorage.js";
import { RESTAURANT } from "./utils/Constant";
import ModalRestaurantDetail from "./UI/ModalRestaurantDetail.js";
import RestaurantInventory from "./UI/RestaurantInventory.js";

export class App {
  constructor() {
    this.restaurantList = new RestaurantList();
    this.restaurantRegistry = new RestaurantRegistry();
    this.header = new Header();
    this.modal = new Modal(this.restaurantList, this.restaurantRegistry);
    this.filter = new FilterBar(this.restaurantList, this.restaurantRegistry);
    this.restaurantInventory = new RestaurantInventory(this.restaurantRegistry);
    this.restaurantContainer = new RestaurantContainer();
    this.modalRestaurantDetail = new ModalRestaurantDetail(
      this.restaurantList,
      this.restaurantRegistry
    );

    this.collectedRender();
    this.initializeButtonEvents();
    if (getRestaurantListFromLocalstorage(RESTAURANT))
      localStorage.setItem(
        "number",
        getRestaurantListFromLocalstorage(RESTAURANT).at(-1).id -
          getRestaurantListFromLocalstorage(RESTAURANT).length +
          2
      );
    else localStorage.setItem("number", 0);

    const restaurantFavoriteList =
      getRestaurantListFromLocalstorage(RESTAURANT) ||
      [].map((restaurant) => {
        const idNumber = getRestaurantListFromLocalstorage("number");
        localStorage.setItem("number", idNumber + 1);
        const favoriteList = getRestaurantListFromLocalstorage("favorite");
        if (favoriteList.filter((val) => val.id === restaurant.id).length)
          restaurant["favorite"] = "./favorite-icon-filled.png";
        return restaurant;
      });
    localStorage.setItem("restaurants", stringifyJson(restaurantFavoriteList));
    localStorage.setItem("sort", "name");
    localStorage.setItem("foodCategory", "전체");
    this.restaurantList.filterBySort("name", "전체");
  }

  collectedRender() {
    this.header.render();
    this.modal.render();
    this.filter.render();
    this.restaurantInventory.render();
    this.restaurantContainer.render();
    this.modalRestaurantDetail.render();
  }

  initializeButtonEvents() {
    this.header.initializeButtonEvents();
    this.modal.initializeButtonEvents();
    this.filter.initializeButtonEvents();
    this.modalRestaurantDetail.initializeButtonEvents();
    this.restaurantInventory.initializeButtonEvents();
  }
}
