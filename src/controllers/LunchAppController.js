import Restaurants from '../domains/Restaurants';

import Header from '../components/Header/Header';
import RestaurantNavigationMenu from '../components/RestaurantNavigationMenu/RestaurantNavigationMenu';
import RestaurantFilter from '../components/RestaurantFilter/RestaurantFilter';
import RestaurantList from '../components/RestaurantList/RestaurantList';

import { $ } from '../utils/dom';

export default class LunchAppController {
  #restaurants;
  #header;
  #restaurantNavigationMenu;
  #restaurantFilter;
  #restaurantList;

  constructor() {
    this.#restaurants = new Restaurants(localStorage);
  }

  init() {
    this.#header = new Header($('header'), this.#restaurants);
    this.#restaurantNavigationMenu = new RestaurantNavigationMenu(
      $('restaurants-selector-container'),
      this.#restaurants,
    );
    this.#restaurantFilter = new RestaurantFilter($('content'), this.#restaurants);
    this.#restaurantList = new RestaurantList($('restaurant-list'), {
      restaurants: this.#restaurants,
      standard: true,
    });
  }
}
