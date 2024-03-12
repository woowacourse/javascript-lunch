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
  #modal;

  constructor() {
    this.#restaurants = new Restaurants(localStorage);
    this.#header = new Header();
    this.#restaurantFilter = new RestaurantFilter(this.#restaurants);
    this.#modal = new AddRestaurantModal(this.#restaurants);
  }

  init() {
    this.#renderHeader();
    this.#renderRestaurantFilter();
    this.#renderRestaurants();
    this.#renderAddRestaurantModal();
  }

  #renderHeader() {
    $('header').innerHTML = this.#header.render();
  }

  #renderRestaurantFilter() {
    $('restaurant-filter-container').innerHTML = this.#restaurantFilter.render();
  }

  #renderRestaurants() {
    $('restaurant-list').innerHTML = this.#restaurants.standardList.reduce(
      (prevRestaurantData, currentRestaurantData) =>
        prevRestaurantData + Restaurant(currentRestaurantData),
      '',
    );
  }

  #renderAddRestaurantModal() {
    $('add-restaurant-modal').innerHTML = this.#modal.render();
  }
}
