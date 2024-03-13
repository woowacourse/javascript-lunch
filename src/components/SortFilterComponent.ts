import RestaurantList from '../domain/restaurantList';
import { SortingValues } from '../types/types';
import FilterComponent from './FilterComponent';

export default class SortFilterComponent extends FilterComponent {
  constructor() {
    super();
  }

  setEvent = (node: DocumentFragment, restaurantList: RestaurantList) => {
    const selectElement = node.querySelector('#category-filter') as HTMLSelectElement;
    selectElement.addEventListener('change', () => {
      const selectedCategory = selectElement.value as SortingValues;
      restaurantList.setSort(selectedCategory);
    });
  };
}
