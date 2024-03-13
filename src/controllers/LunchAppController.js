import Restaurants from '../domains/Restaurants';

import Header from '../components/Header/Header';
import RestaurantFilter from '../components/RestaurantFilter/RestaurantFilter';
import RestaurantList from '../components/RestaurantList/RestaurantList';
import AddRestaurantModal from '../components/AddRestaurantModal/AddRestaurantModal';

import { $ } from '../utils/dom';

export default class LunchAppController {
  #restaurants;
  #header;
  #restaurantFilter;
  #restaurantList;
  #addRestaurantmodal;

  constructor() {
    this.#restaurants = new Restaurants(localStorage);
    this.#header = new Header($('header'));
    this.#restaurantFilter = new RestaurantFilter(
      $('restaurant-filter-container'),
      this.#restaurants,
    );
    this.#restaurantList = new RestaurantList($('restaurant-list-container'), this.#restaurants);
    this.#addRestaurantmodal = new AddRestaurantModal($('add-restaurant-modal'), this.#restaurants);
  }

  init() {
    this.#header.render();
    this.#restaurantFilter.render();
    this.#restaurantList.render();
    this.#addRestaurantmodal.render();
  }
}
