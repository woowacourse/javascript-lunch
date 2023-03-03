import CategoryComboBox from './CategoryComboBox';
import SortComboBox from './SortComboBox';

class RestaurantFilter {
  #template;

  constructor() {
    this.#template = `<section class="restaurant-filter-container"></section>`;

    document.body.insertAdjacentHTML('beforeend', this.#template);
  }
}

export default RestaurantFilter;
