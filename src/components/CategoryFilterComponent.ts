import RestaurantList from '../domain/restaurantList';
import { CategoryValues } from '../types/types';
import FilterComponent from './FilterComponent';

export default class CategoryFilterComponent extends FilterComponent {
  constructor() {
    super();
  }

  setEvent(node: DocumentFragment, restaurantList: RestaurantList) {
    const selectElement = node.querySelector('#category-filter') as HTMLSelectElement;
    selectElement.addEventListener('change', () => {
      const selectedCategory = selectElement.value as CategoryValues;
      restaurantList.setCategory(selectedCategory);
    });
  }
}
