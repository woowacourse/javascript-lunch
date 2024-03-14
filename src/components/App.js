// styles
import './App.css';

// events
import { RESTAURANT_FORM_EVENTS } from './RestaurantForm/RestaurantForm';
import { RESTAURANT_FILTERS_EVENTS } from './RestaurantFilters/RestaurantFilters';

// domain
import RestaurantManager from '../domain/RestaurantManager';
import { BOOKMARK_TAB_EVENTS } from './BookmarkTab/BookmarkTab';

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
    this.#syncLocalStorageAndDomain();
    this.#restaurantList.restaurants = JSON.parse(window.localStorage.getItem('restaurants'));

    this.#addRestaurantSubmitEventListener();
    this.#addFilterOnchangeEventListenr();
    this.#addBookmarkTabChangeEventListener();
  }

  #addRestaurantSubmitEventListener() {
    document.addEventListener(RESTAURANT_FORM_EVENTS.submit, (e) => {
      const { formData } = e.detail;

      this.#updateLocalStorage(formData);
      this.#syncLocalStorageAndDomain();
      this.#restaurantFilters.categoryFilter = formData.category;
      this.#updateRestaurantList(this.#restaurantFilters.categoryFilter, this.#restaurantFilters.sortingFilter);
    });
  }

  #addFilterOnchangeEventListenr() {
    document.addEventListener(RESTAURANT_FILTERS_EVENTS.filterChange, (e) => {
      const { categoryFilter, sortingFilter } = e.detail;
      this.#syncLocalStorageAndDomain();
      this.#updateRestaurantList(categoryFilter, sortingFilter);
    });
  }

  #addBookmarkTabChangeEventListener() {
    document.addEventListener(BOOKMARK_TAB_EVENTS.changeTab, (e) => {
      const { isBookmark } = e.detail;
      console.log(isBookmark);
    });
  }

  #syncLocalStorageAndDomain() {
    this.#restaurantManger.restaurants = JSON.parse(window.localStorage.getItem('restaurants'));
  }

  #updateLocalStorage(restaurant) {
    const curData = window.localStorage.getItem('restaurants');
    if (curData) {
      const restaurants = JSON.parse(window.localStorage.getItem('restaurants'));
      restaurants.push(restaurant);
      window.localStorage.setItem('restaurants', JSON.stringify(restaurants));
    } else {
      window.localStorage.setItem('restaurants', JSON.stringify([restaurant]));
    }
  }

  #updateRestaurantList(category, option) {
    const result = this.#restaurantManger.filteredAndSortedByOptions(category, option);
    this.#restaurantList.restaurants = result;
  }
}
