import { $ } from '../utils/dom';
import { STORAGE } from '../constants/rules';

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
    this.#element.addEventListener('click', this.#renderRestaurantList.bind(this));
  }

  #renderRestaurantList(event) {
    if (event.target.closest('#favorite-restaurants')) {
      this.#restaurants = this.#restaurantsInstance.favoriteList;
      this.#toggleFilteringSelectBox(false);
    } else {
      this.#restaurants = this.#restaurantsInstance.standardList;
      this.#toggleFilteringSelectBox(true);
    }

    this.#restaurantListInstance.updateRestaurantList(this.#restaurants);
  }

  #toggleFilteringSelectBox(isVisible) {
    const displayStyle = isVisible ? 'block' : 'none';
    const sortingElement = $(STORAGE.sorting);
    const categoryElement = $(STORAGE.category);

    sortingElement.style.display = displayStyle;
    categoryElement.style.display = displayStyle;
  }
}
export default TabBar;
