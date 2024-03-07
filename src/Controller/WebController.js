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
    this.#renderDropdownOptions('add-category-select', RESTAURANT_CATEGORY);
  }

  // TODO: 리팩터링, 메서드의 위치 -> component로?
  #renderDropdownOptions(id, options) {
    const select = document.getElementById(id);
    select.addOptions(options);
    select.catalog = this.#restaurantCatalog;
  }
}

export default WebController;
