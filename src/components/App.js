// styles
import './App.css';

// events
import { RESTAURANT_FORM_EVENTS } from './RestaurantForm/RestaurantForm';
import { RESTAURANT_FILTERS_EVENTS } from './RestaurantFilters/RestaurantFilters';

// domain
import RestaurantManager from '../domain/RestaurantManager';
import { BOOKMARK_TAB_EVENTS } from './BookmarkTab/BookmarkTab';
import { RESTAURANT_ITEM_EVENTS } from './RestaurantItem/RestaurantItem';

export default class App {
  #restaurantFilters;

  #bookmarkTab;

  #restaurantList;

  #restaurantManger;

  constructor() {
    this.#restaurantFilters = document.querySelector('app-restaurant-filters');
    this.#bookmarkTab = document.querySelector('app-bookmark-tab');
    this.#restaurantList = document.querySelector('#restaurant-list');
    this.#restaurantManger = new RestaurantManager();
  }

  async start() {
    const { category, sort } = this.#restaurantFilters;
    this.#loadDataFromLocalStorage();
    this.#updateRestaurantList({
      category,
      sort,
    });

    this.#addEventListeners();
  }

  #loadDataFromLocalStorage() {
    this.#restaurantManger.restaurants = JSON.parse(window.localStorage.getItem('restaurants'));
  }

  #updateDataToLocalStorage() {
    window.localStorage.setItem('restaurants', JSON.stringify(this.#restaurantManger.restaurants));
  }

  #updateRestaurantList({ category, sort }, isBookmark) {
    const result = this.#restaurantManger.getList({ category, sort }, isBookmark);
    this.#restaurantList.restaurants = result;
  }

  #addEventListeners() {
    this.#addRestaurantSubmitEventListener();
    this.#addFilterOnchangeEventListener();
    this.#addBookmarkTabChangeEventListener();
    this.#addRestaurantBookmarkOnchangeEventListener();
  }

  #addRestaurantSubmitEventListener() {
    document.addEventListener(RESTAURANT_FORM_EVENTS.submit, (e) => {
      this.#restaurantManger.add(e.detail.formData);
      this.#updateDataToLocalStorage();

      this.#restaurantFilters.category = e.detail.formData.category;
      const { category, sort } = this.#restaurantFilters;
      this.#updateRestaurantList({ category, sort }, this.#bookmarkTab.isBookmark);
    });
  }

  #addFilterOnchangeEventListener() {
    document.addEventListener(RESTAURANT_FILTERS_EVENTS.filterChange, (e) => {
      const { category, sort } = e.detail;
      this.#updateRestaurantList({ category, sort }, this.#bookmarkTab.isBookmark);
    });
  }

  #addBookmarkTabChangeEventListener() {
    document.addEventListener(BOOKMARK_TAB_EVENTS.changeTab, () => {
      const { category, sort } = this.#restaurantFilters;
      this.#updateRestaurantList({ category, sort }, this.#bookmarkTab.isBookmark);
    });
  }

  #addRestaurantBookmarkOnchangeEventListener() {
    document.addEventListener(RESTAURANT_ITEM_EVENTS.isBookmarkChanged, (e) => {
      const { restaurant } = e.detail;
      this.#restaurantManger.update(restaurant);
      this.#updateDataToLocalStorage();
    });
  }
}
