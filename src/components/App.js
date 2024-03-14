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
    const { categoryFilter, sortingFilter } = this.#restaurantFilters;
    this.#syncLocalStorageAndDomain();
    this.#updateRestaurantList({
      category: categoryFilter,
      option: sortingFilter,
    });

    this.#addEventListeners();
  }

  // TODO: 이건 localStorage 서비스로 분리 가능할듯?
  // localStorage -> domain
  #syncLocalStorageAndDomain() {
    this.#restaurantManger.restaurants = JSON.parse(window.localStorage.getItem('restaurants'));
  }

  // domain -> localStorage
  #updateLocalStorage() {
    window.localStorage.setItem('restaurants', JSON.stringify(this.#restaurantManger.restaurants));
  }

  #updateRestaurantList({ category, option }, isBookmark) {
    const result = this.#restaurantManger.getList({ category, option }, isBookmark);
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
      const { formData } = e.detail;
      this.#restaurantManger.add(formData);
      this.#updateLocalStorage();

      this.#restaurantFilters.categoryFilter = formData.category;

      const { categoryFilter, sortingFilter } = this.#restaurantFilters;
      this.#updateRestaurantList({ category: categoryFilter, option: sortingFilter }, this.#bookmarkTab.isBookmark);
    });
  }

  #addFilterOnchangeEventListener() {
    document.addEventListener(RESTAURANT_FILTERS_EVENTS.filterChange, (e) => {
      const { categoryFilter, sortingFilter } = e.detail;
      this.#updateRestaurantList({ category: categoryFilter, option: sortingFilter }, this.#bookmarkTab.isBookmark);
    });
  }

  #addBookmarkTabChangeEventListener() {
    document.addEventListener(BOOKMARK_TAB_EVENTS.changeTab, () => {
      const { categoryFilter, sortingFilter } = this.#restaurantFilters;
      this.#updateRestaurantList({ category: categoryFilter, option: sortingFilter }, this.#bookmarkTab.isBookmark);
    });
  }

  #addRestaurantBookmarkOnchangeEventListener() {
    document.addEventListener(RESTAURANT_ITEM_EVENTS.bookmarkBtnClicked, (e) => {
      const { restaurant } = e.detail;
      this.#restaurantManger.update(restaurant);
      this.#updateLocalStorage();
    });
  }
}
