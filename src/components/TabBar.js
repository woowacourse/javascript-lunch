import { $ } from '../utils/dom';

class TabBar {
  #element;
  #restaurantsInstance;
  #restaurantListInstance;
  #restaurants;

  constructor({ targetId, restaurantsInstance, restaurantListInstance }) {
    this.#element = $(targetId);
    this.#restaurantsInstance = restaurantsInstance;
    this.#restaurantListInstance = restaurantListInstance;
    this.#restaurants = this.#restaurantsInstance.standardList;

    this.#initEventListeners();
  }

  #initEventListeners() {
    return this.#element.addEventListener('click', this.#renderRestaurantList.bind(this));
  }

  #renderRestaurantList(event) {
    if (event.target.closest('#favorite-restaurants')) {
      this.#restaurants = this.#restaurantsInstance.favoriteList;
    } else if (event.target.closest('#all-restaurants')) {
      this.#restaurants = this.#restaurantsInstance.standardList;
    }

    this.#restaurantListInstance.updateRestaurantList(this.#restaurants);
  }
}
export default TabBar;
