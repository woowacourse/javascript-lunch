// events
import { SELECT_EVENTS } from './Select';
import { RESTAURANT_FORM_EVENTS } from './RestaurantForm';

// domain
import RestaurantManager from '../domain/RestaurantManager';

// styles
import './App.css';

export default class App {
  #categoryFilter;

  #sortingFilter;

  #restaurantList;

  #restaurantManger;

  constructor() {
    this.#categoryFilter = document.querySelector('#category-filter');
    this.#sortingFilter = document.querySelector('#sorting-filter');
    this.#restaurantList = document.querySelector('#restaurant-list');
    this.#restaurantManger = new RestaurantManager();
  }

  async start() {
    this.#syncLocalStorageAndDomain();
    this.#restaurantList.restaurants = JSON.parse(window.localStorage.getItem('restaurants'));

    this.#addRestaurantSubmitEventListener();
    this.#addFilterOnchangeEventListenr();
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

  #addRestaurantSubmitEventListener() {
    document.addEventListener(RESTAURANT_FORM_EVENTS.submit, (e) => {
      const { formData } = e.detail;

      this.#updateLocalStorage(formData);
      this.#syncLocalStorageAndDomain();
      this.#updateRestaurantList(formData.category, this.#sortingFilter.value);
      this.#categoryFilter.value = formData.category;
    });
  }

  #addFilterOnchangeEventListenr() {
    document.querySelector('.restaurant-filter-container').addEventListener(SELECT_EVENTS.onchange, () => {
      this.#syncLocalStorageAndDomain();
      this.#updateRestaurantList(this.#categoryFilter.value, this.#sortingFilter.value);
    });
  }
}
