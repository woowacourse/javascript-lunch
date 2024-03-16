import Restaurants from '../domains/Restaurants';

import Header from '../components/Header/Header';
import BookmarkNavigation from '../components/BookmarkNavigation/BookmarkNavigation';
import RestaurantFilter from '../components/RestaurantFilter/RestaurantFilter';
import RestaurantList from '../components/RestaurantList/RestaurantList';

import { $ } from '../utils/dom';

export default class LunchAppController {
  #restaurants;
  #header;
  #bookmarkNavigation;
  #restaurantFilter;
  #restaurantList;

  constructor() {
    this.#restaurants = new Restaurants(localStorage);
  }

  init() {
    this.#header = new Header($('header'), this.#restaurants);
    this.#bookmarkNavigation = new BookmarkNavigation(
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
