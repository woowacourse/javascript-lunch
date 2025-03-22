import RestaurantFilter from '../../../components/filter/RestaurantFilter';
import { SortOption } from '../../../../Domain/types/FilterOption';

class SortingFilter {
  private filter: RestaurantFilter<SortOption>;

  constructor(onChange?: (sortBy: SortOption) => void) {
    const sortingOptions = [
      { value: 'name' as SortOption, text: '이름순' },
      { value: 'distance' as SortOption, text: '거리순' },
    ];

    this.filter = new RestaurantFilter<SortOption>(sortingOptions, onChange);
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
