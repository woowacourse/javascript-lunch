// eslint-disable-next-line
import RestaurantManager from '../domain/RestaurantManager';

import WebView from '../view/WebView';
import { SELECT_EVENTS } from '../view/components/Select';
import { RESTAURANT_FORM_EVENTS } from '../view/components/RestaurantForm';

export default class WebController {
  #webView;

  #restaurantManger;

  constructor() {
    this.#webView = new WebView();
    this.#restaurantManger = new RestaurantManager();
  }

  start() {
    this.#syncLocalStorageAndDomain();
    this.#webView.restaurants = JSON.parse(window.localStorage.getItem('restaurants'));

    this.#addRestaurantSubmitEventListener();
    this.#addFilterOnchangeEventListener();
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
    this.#webView.restaurants = result;
  }

  #addRestaurantSubmitEventListener() {
    document.addEventListener(RESTAURANT_FORM_EVENTS.submit, (e) => {
      const { formData } = e.detail;

      this.#updateLocalStorage(formData);
      this.#syncLocalStorageAndDomain();
      this.#updateRestaurantList(formData.category, this.#webView.sortingFilter);
      this.#webView.categoryFilter = formData.category;
    });
  }

  #addFilterOnchangeEventListener() {
    document.querySelector('.restaurant-filter-container').addEventListener(SELECT_EVENTS.onchange, () => {
      this.#syncLocalStorageAndDomain();
      this.#updateRestaurantList(this.#webView.categoryFilter, this.#webView.sortingFilter);
    });
  }
}
