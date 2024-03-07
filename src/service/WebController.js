// WebView, Domain을 중개하는

import RestaurantManager from '../domain/RestaurantManager';
import WebView from '../view/WebView';
import { RESTAURANT_FORM_EVENTS } from '../view/components/RestaurantForm';
import { SELECT_EVENTS } from '../view/components/Select';

export default class WebController {
  #webView;

  #restaurantManger;

  constructor() {
    this.#webView = new WebView();
    this.#restaurantManger = new RestaurantManager();
  }

  async start() {
    this.#syncLocalStorageAndDomain();

    document.addEventListener(RESTAURANT_FORM_EVENTS.submit, (e) => {
      const { formData } = e.detail;

      this.#updateLocalStorage(formData);

      this.#syncLocalStorageAndDomain();

      const categoryFilter = document.querySelector('#category-filter');
      const sortingFilter = document.querySelector('#sorting-filter');

      const result = this.#restaurantManger.filteredAndSortedByOptions(formData.category, sortingFilter.value);
      // console.log(result);
      categoryFilter.value = formData.category;
    });

    document.querySelector('.restaurant-filter-container').addEventListener(SELECT_EVENTS.onchange, (e) => {
      const categoryFilter = document.querySelector('#category-filter');
      const sortingFilter = document.querySelector('#sorting-filter');

      this.#syncLocalStorageAndDomain();

      const result = this.#restaurantManger.filteredAndSortedByOptions(categoryFilter.value, sortingFilter.value);
      // console.log(result);
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
}
