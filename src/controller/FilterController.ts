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

  #bindEvents() {
    $<HTMLSelectElement>('#category-filter')?.addEventListener('change', (event) => {
      this.#onFilterChange('category', (event.target as HTMLSelectElement)?.value);
    });
    $<HTMLSelectElement>('#sorting-filter')?.addEventListener('change', (event) => {
      this.#onFilterChange('sort', (event.target as HTMLSelectElement)?.value);
    });
  }
}

export default FilterController;
