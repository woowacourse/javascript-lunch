import RestaurantList from '../domain/restaurantList';
import FilterComponent from './FilterComponent';

export default class SortFilterComponent extends FilterComponent {
  constructor() {
    super();
  }

  setEvent = (node: DocumentFragment, restaurantList: RestaurantList) => {
    const selectElement = node.querySelector('#category-filter') as HTMLSelectElement;
    selectElement.addEventListener('change', () => {
      const selectedCategory = selectElement.value as '이름순' | '거리순';
      restaurantList.setSort(selectedCategory);
    });
  };
}
