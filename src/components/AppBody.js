export default class AppBody {
  #categoryFilter;

  #sortingFilter;

  #restaurantList;

  constructor() {
    this.#categoryFilter = document.querySelector('#category-filter');
    this.#sortingFilter = document.querySelector('#sorting-filter');
    this.#restaurantList = document.querySelector('ul[is="app-restaurant-list"]');
  }

  get sortingFilter() {
    return this.#sortingFilter.value;
  }

  get categoryFilter() {
    return this.#categoryFilter.value;
  }

  set categoryFilter(value) {
    this.#categoryFilter.value = value;
  }

  set restaurants(restaurants) {
    this.#restaurantList.restaurants = restaurants;
  }
}
