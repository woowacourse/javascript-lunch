import RestaurantList from '../domain/restaurantList';
import { CategoryValues } from '../types/types';
import FilterComponent from './FilterComponent';

export default class SortFilterComponent extends FilterComponent {
  constructor() {
    super();
  }

  setEvent = (node: DocumentFragment, restaurantList: RestaurantList) => {
    console.log('실행디고잇어');
    const selectElement = node.querySelector('#category-filter') as HTMLSelectElement;
    selectElement.addEventListener('change', () => {
      const selectedCategory = selectElement.value as '이름순' | '거리순';
      console.log('selectedCategory', selectedCategory);
      restaurantList.setSort(selectedCategory);
    });
  };
}
