// 컴포넌트들을 저장하고 관리하는

export default class WebView {
  #categoryFilter;

  #sortingFilter;

  #restaurantList;

  constructor() {
    this.#categoryFilter = document.querySelector('#category-filter');
    this.#sortingFilter = document.querySelector('#sorting-filter');
    this.#restaurantList = document.querySelector('ul[is="app-restaurant-list"]');
  }

  set restaurants(restaurants) {
    this.#restaurantList.restaurants = restaurants;
  }
}
