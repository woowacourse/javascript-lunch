import Restaurants from '../domains/Restaurants';

import Header from '../components/Header/Header';
import BookmarkNavigation from '../components/BookmarkNavigation/BookmarkNavigation';
import RestaurantFilter from '../components/RestaurantFilter/RestaurantFilter';
import RestaurantList from '../components/RestaurantList/RestaurantList';
import ModalWrapper from '../components/Common/ModalWrapper/ModalWrapper';

import { $ } from '../utils/dom';

export default class LunchAppController {
  #restaurants;
  #header;
  #bookmarkNavigation;
  #restaurantFilter;
  #restaurantList;
  #modalWrapper;

  constructor() {
    this.#restaurants = new Restaurants(localStorage);
  }

  init() {
    this.#header = new Header($('header'), this.#restaurants);
    this.#bookmarkNavigation = new BookmarkNavigation($('restaurants-selector-container'));
    this.#restaurantFilter = new RestaurantFilter(
      $('restaurant-filter-container'),
      this.#restaurants,
    );
    this.#restaurantList = new RestaurantList($('restaurant-list-container'), this.#restaurants);
    this.#modalWrapper = new ModalWrapper($('modal'));
  }
}
