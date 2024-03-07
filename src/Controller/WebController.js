import { RESTAURANT_CATEGORY } from '../domain/Restaurant';
import RestaurantCatalog, { SORT_CONDITION } from '../domain/RestaurantCatalog';
import { eventController } from './eventController';

class WebController {
  #restaurantCatalog;

  run() {
    this.#restaurantCatalog = new RestaurantCatalog();

    const restaurantList = document.querySelector('.restaurant-list');
    restaurantList.setAttribute(
      'data-restaurants',
      JSON.stringify(this.#restaurantCatalog.getRestaurants().map((restaurant) => restaurant.getInfo())),
    );

    this.#renderDropdownOptions('category-select', RESTAURANT_CATEGORY);
    this.#renderDropdownOptions('sort-select', SORT_CONDITION);
    eventController(this.#restaurantCatalog);
  }

  #renderDropdownOptions(id, options) {
    const select = document.getElementById(id);
    select.addOptions(options);
  }
}

export default WebController;
