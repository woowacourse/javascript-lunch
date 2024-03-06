import { RESTAURANT_CATEGORY } from '../domain/Restaurant';
import { SORT_CONDITION } from '../domain/RestaurantCatalog';

class WebController {
  run() {
    this.#renderDropdownOptions('category-select', RESTAURANT_CATEGORY);
    this.#renderDropdownOptions('sort-select', SORT_CONDITION);
  }

  #renderDropdownOptions(id, options) {
    const select = document.getElementById(id);
    select.addOptions(options);
  }
}

export default WebController;
