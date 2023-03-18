import Header from './UI/Header.js';
import RestaurantContainer from './UI/RestaurantContainer.js';
import Modal from './UI/Modal';
import FilterBar from './UI/FilterBar';
import { RestaurantList } from './domain/RestaurantList';
import RestaurantRegistry from './UI/RestaurantRegistry.js';
import { getRestaurantListFromLocalstorage, stringifyJson } from './utils/LocalStorage.js';
import { LOCALSTORAGE_KEY, LOCAL_INPUT, FORM_VALUE, FAVORITE_ICON } from './utils/Constant';
import ModalRestaurantDetail from './UI/ModalRestaurantDetail.js';
import RestaurantInventory from './UI/RestaurantInventory.js';

export class App {
  constructor() {
    this.restaurantList = new RestaurantList();
    this.restaurantRegistry = new RestaurantRegistry();
    this.header = new Header();
    this.modal = new Modal(this.restaurantList, this.restaurantRegistry);
    this.filter = new FilterBar(this.restaurantList, this.restaurantRegistry);
    this.restaurantInventory = new RestaurantInventory(this.restaurantRegistry);
    this.restaurantContainer = new RestaurantContainer();
    this.modalRestaurantDetail = new ModalRestaurantDetail(this.restaurantList, this.restaurantRegistry);

    const localRestaurants = getRestaurantListFromLocalstorage(LOCALSTORAGE_KEY.RESTAURANT) || [];
    this.collectedRender();
    this.initializeButtonEvents();
    if (localRestaurants.length !== 0) {
      const localRestaurantNextNumber = localRestaurants.at(-1).id + 1;
      localStorage.setItem(LOCALSTORAGE_KEY.NUMBER, localRestaurantNextNumber);
    } else {
      localStorage.setItem(LOCALSTORAGE_KEY.NUMBER, 0);
    }
    
    localStorage.setItem(LOCALSTORAGE_KEY.RESTAURANT, stringifyJson(localRestaurants));

    localStorage.setItem(LOCALSTORAGE_KEY.SORTBY, FORM_VALUE.NAME);
    localStorage.setItem(LOCALSTORAGE_KEY.FOODCATEGORY, LOCAL_INPUT.ALL_CATEGORY);
    this.restaurantList.filterBySort(FORM_VALUE.NAME, LOCAL_INPUT.ALL_CATEGORY);
  }

  isThereRestaurantInFavorites(favoriteList, restaurant) {
    return favoriteList.filter(val => val.id === restaurant.id).length;
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
