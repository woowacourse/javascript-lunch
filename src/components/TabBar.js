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
    const isFavoriteTab = event.target.closest('#favorite-restaurants') !== null;

    this.#restaurants = isFavoriteTab
      ? this.#restaurantsInstance.favoriteList
      : this.#restaurantsInstance.standardList;

    this.#toggleFilteringSelectBox(!isFavoriteTab);
    this.#toggleTabActive(isFavoriteTab);

    this.#restaurantListInstance.updateRestaurantList(this.#restaurants);
  }

  #toggleFilteringSelectBox(isVisible) {
    const displayStyle = isVisible ? 'block' : 'none';
    const sortingElement = $(STORAGE.sorting);
    const categoryElement = $(STORAGE.category);

    sortingElement.style.display = displayStyle;
    categoryElement.style.display = displayStyle;
  }

  #toggleTabActive(isFavoriteTab) {
    const favoriteTab = $('favorite-restaurants');
    const allTab = $('all-restaurants');

    favoriteTab.classList.toggle('active', isFavoriteTab);
    allTab.classList.toggle('active', !isFavoriteTab);
  }
}

export default TabBar;
