import RestaurantManager from '../domain/RestaurantManager.ts';
import WebView from '../view/WebView';
import { RESTAURANT_FORM_EVENTS } from '../view/components/RestaurantForm';
import { SELECT_EVENTS } from '../view/components/Select';
import Tab from '../view/components/Tab';

export default class WebController {
  #webView;

  #restaurantManager;

  #allTab;

  #favoriteTab;

  constructor() {
    this.#webView = new WebView();
    this.#restaurantManager = new RestaurantManager();
  }

  start() {
    this.#syncLocalStorageAndDomain();
    this.#webView.restaurants = JSON.parse(window.localStorage.getItem('restaurants'));

    this.#addRestaurantSubmitEventListener();
    this.#addFilterOnchangeEventListener();

    this.#renderTabs();
  }

  #renderTabs() {
    this.#allTab = new Tab('.tab__item:first-child a', () => {
      this.#updateRestaurantList(this.#webView.categoryFilter, this.#webView.sortingFilter);
    });

    this.#favoriteTab = new Tab('.tab__item:last-child a', () => {
      this.#updateFavoriteRestaurantList();
    });
  }

  #syncLocalStorageAndDomain() {
    this.#restaurantManager.loadRestaurantsFromLocalStorage();
  }

  #updateLocalStorage() {
    this.#restaurantManager.updateLocalStorage();
  }

  #updateRestaurantList(category, option) {
    const result = this.#restaurantManager.filteredAndSortedByOptions(category, option);
    this.#webView.restaurants = result;
  }

  #updateFavoriteRestaurantList() {
    const favoriteRestaurants = this.#restaurantManager.restaurants.filter((restaurant) => restaurant.favorite);
    this.#webView.restaurants = favoriteRestaurants;
  }

  #addRestaurantSubmitEventListener() {
    document.addEventListener(RESTAURANT_FORM_EVENTS.submit, (e) => {
      const { formData } = e.detail;
      this.#restaurantManager.add(formData);
      this.#updateLocalStorage();
      this.#handleFormSubmitUpdateUI(formData.category);
    });
  }
  
  #handleFormSubmitUpdateUI(category) {
    if (this.#favoriteTab.isActive()) {
      this.#updateFavoriteRestaurantList();
    } else {
      this.#updateRestaurantList(category, this.#webView.sortingFilter);
      this.#webView.categoryFilter = category;
    }
  }

  #addFilterOnchangeEventListener() {
    document.querySelector('.restaurant-filter-container').addEventListener(SELECT_EVENTS.onchange, () => {
      if (this.#favoriteTab.isActive()) {
        this.#updateFavoriteRestaurantList();
      } else {
        this.#updateRestaurantList(this.#webView.categoryFilter, this.#webView.sortingFilter);
      }
    });
  }

  updateFavoriteStatus(restaurantName) {
    this.#restaurantManager.toggleFavorite(restaurantName);
    if (this.#favoriteTab.isActive()) {
      this.#updateFavoriteRestaurantList();
    } else {
      this.#updateRestaurantList(this.#webView.categoryFilter, this.#webView.sortingFilter);
    }
  }
}
