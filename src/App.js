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
import { RESTAURANT_LOCALSTORAGE_KEY, FOODCATEGORY_LOCALSTORAGE_KEY, 
  SORTBY_LOCALSTORAGE_KEY, FAVORITE_LOCALSTORAGE_KEY, 
  NUMBER__LOCALSTORAGE_KEY, ALL_CATEGORY_VALUE, 
  NAME_VALUE, FAVORITE_VALUE, FAVORITE_ENROLL } from "./utils/Constant";
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
    if (getRestaurantListFromLocalstorage(RESTAURANT_LOCALSTORAGE_KEY))
      localStorage.setItem(
        NUMBER__LOCALSTORAGE_KEY,
        getRestaurantListFromLocalstorage(RESTAURANT_LOCALSTORAGE_KEY).at(-1).id -
          getRestaurantListFromLocalstorage(RESTAURANT_LOCALSTORAGE_KEY).length +
          2
      );
    else localStorage.setItem(NUMBER__LOCALSTORAGE_KEY, 0);

    const restaurantFavoriteList =
      getRestaurantListFromLocalstorage(RESTAURANT_LOCALSTORAGE_KEY) ||
      [].map((restaurant) => {
        const idNumber = getRestaurantListFromLocalstorage(NUMBER__LOCALSTORAGE_KEY);
        localStorage.setItem(NUMBER__LOCALSTORAGE_KEY, idNumber + 1);
        const favoriteList = getRestaurantListFromLocalstorage(FAVORITE_LOCALSTORAGE_KEY);
        if (favoriteList.filter((val) => val.id === restaurant.id).length)
          restaurant[FAVORITE_VALUE] = FAVORITE_ENROLL;
        return restaurant;
      });
    localStorage.setItem(RESTAURANT_LOCALSTORAGE_KEY, stringifyJson(restaurantFavoriteList));
    localStorage.setItem(SORTBY_LOCALSTORAGE_KEY, NAME_VALUE);
    localStorage.setItem(FOODCATEGORY_LOCALSTORAGE_KEY, ALL_CATEGORY_VALUE);
    this.restaurantList.filterBySort(NAME_VALUE, ALL_CATEGORY_VALUE);
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
