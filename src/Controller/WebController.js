import { RESTAURANT_CATEGORY } from '../domain/Restaurant';
import RestaurantCatalog, { SORT_CONDITION } from '../domain/RestaurantCatalog';

class WebController {
  #restaurantCatalog;

  run() {
    this.#restaurantCatalog = new RestaurantCatalog();

    const restaurantList = document.querySelector('.restaurant-list');
    restaurantList.setAttribute(
      'data-restaurants',
      JSON.stringify(this.#restaurantCatalog.getRestaurants().map((restaurant) => restaurant.getInfo())),
    );

    this.#renderDropdownOptions('category-select', ['전체', ...RESTAURANT_CATEGORY]);
    this.#renderDropdownOptions('sort-select', SORT_CONDITION);
  }

  #renderDropdownOptions(id, options) {
    const select = document.getElementById(id);
    select.addOptions(options);
    select.catalog = this.#restaurantCatalog;
  }
}

export default WebController;
