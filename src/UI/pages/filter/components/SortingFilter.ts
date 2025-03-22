import RestaurantFilter from '../../../components/filter/RestaurantFilter';
import { SortOption } from '../../../../Domain/types/FilterOptionType';
import { SORTING_LIST } from '../../../../Domain/constants/FilterOption';

class SortingFilter {
  private filter: RestaurantFilter<SortOption>;

  constructor(onChange?: (sortBy: SortOption) => void) {
    this.filter = new RestaurantFilter<SortOption>(SORTING_LIST, onChange);
    this.filter.getElement().id = 'sorting-filter';
    this.filter.getElement().name = 'sorting';
  }

  getElement(): HTMLSelectElement {
    return this.filter.getElement();
  }

  getValue(): SortOption {
    return this.filter.getValue();
  }
}

export default SortingFilter;
