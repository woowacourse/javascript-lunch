import Restaurants from '../domains/Restaurants';

import Header from '../components/Header/Header';
import RestaurantFilter from '../components/RestaurantFilter/RestaurantFilter';
import AddRestaurantModal from '../components/AddRestaurantModal/AddRestaurantModal';
import Restaurant from '../components/Common/Restaurant/Restaurant';

import { $ } from '../utils/dom';

export default class LunchAppController {
  #restaurants;
  #header;
  #restaurantFilter;
  #addRestaurantmodal;

  constructor() {
    this.#restaurants = new Restaurants(localStorage);
    this.#header = new Header($('header'));
    this.#restaurantFilter = new RestaurantFilter(
      $('restaurant-filter-container'),
      this.#restaurants,
    );
    this.#addRestaurantmodal = new AddRestaurantModal($('add-restaurant-modal'), this.#restaurants);
  }

  init() {
    this.#header.render();
    this.#restaurantFilter.render();
    this.#renderRestaurants();
    this.#addRestaurantmodal.render();
  }

  #renderRestaurants() {
    $('restaurant-list').innerHTML = this.#restaurants.standardList.reduce(
      (prevRestaurantData, currentRestaurantData) =>
        prevRestaurantData + Restaurant(currentRestaurantData),
      '',
    );
  }
}
