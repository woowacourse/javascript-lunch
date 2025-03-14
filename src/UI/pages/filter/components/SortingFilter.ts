import RestaurantFilter from '../../../components/filter/RestaurantFilter';

class SortingFilter {
  private filter: RestaurantFilter;

  constructor(onChange?: (sortBy: string) => void) {
    const sortingOptions = [
      { value: 'name', text: '이름순' },
      { value: 'distance', text: '거리순' },
    ];

    this.filter = new RestaurantFilter(sortingOptions, onChange);
    this.filter.getElement().id = 'sorting-filter';
    this.filter.getElement().name = 'sorting';
  }

  getElement(): HTMLSelectElement {
    return this.filter.getElement();
  }

  getValue(): string {
    return this.filter.getValue();
  }
}

export default SortingFilter;
