import { FilterType } from '../types/types';
import { $ } from '../util/selector';
import RestaurantFilterView from '../view/RestaurantFilterView';

class FilterController {
  #onFilterChange;

  constructor(onFilterChange: (type: FilterType, value: string) => void) {
    this.#onFilterChange = onFilterChange;
  }

  render() {
    RestaurantFilterView.render();
    this.#bindEvents();
  }

  remove() {
    RestaurantFilterView.remove();
  }

  #bindEvents() {
    const categoryFilter = $<HTMLSelectElement>('#category-filter');
    const sortingFilter = $<HTMLSelectElement>('#sorting-filter');

    categoryFilter?.addEventListener('change', this.#handleCategoryChange);
    sortingFilter?.addEventListener('change', this.#handleSortChange);
  }

  #handleCategoryChange = (event: Event) => {
    this.#onFilterChange('category', (event.target as HTMLSelectElement).value);
  };

  #handleSortChange = (event: Event) => {
    this.#onFilterChange('sort', (event.target as HTMLSelectElement).value);
  };
}

export default FilterController;
