import { CATEGORIES_WITH_ALL_KEYS, SORT_CRITERION_KEYS } from '@/constants/Condition';
import BaseComponent from '../BaseComponent';
import SelectBox from '../SelectBox/SelectBox';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { Category, SortCriteria } from '@/types/Restaurant';
import RestaurantList from '../RestaurantList/RestaurantList';

class FilterContainer extends BaseComponent {
  #selectCategoryBox: SelectBox;
  #selectSortBox: SelectBox;
  #restaurantList;

  constructor() {
    super();
    this.#selectCategoryBox = new SelectBox({
      optionValues: CATEGORIES_WITH_ALL_KEYS,
      name: 'category',
      classList: ['restaurant-filter'],
      id: 'category-filter',
    });

    this.#selectSortBox = new SelectBox({
      optionValues: SORT_CRITERION_KEYS,
      name: 'sorting',
      classList: ['restaurant-filter'],
      id: 'sorting-filter',
    });
    this.#restaurantList = document.querySelector('.restaurant-list-container') as RestaurantList;
  }

  render() {
    this.append(this.#selectCategoryBox);
    this.append(this.#selectSortBox);
  }

  setEvent() {
    this.addEventListener('change', () => {
      const restaurantDBService = new RestaurantDBService();

      const selectedCategory = this.querySelector('#category-filter') as HTMLSelectElement;
      const selectedSortCriteria = this.querySelector('#sorting-filter') as HTMLSelectElement;

      const newRestaurantList = restaurantDBService.getFromRestaurantList(
        selectedCategory.value as Category,
        selectedSortCriteria.value as SortCriteria,
      );

      this.#restaurantList.rerender(newRestaurantList);
    });
  }
}

customElements.define('filter-container', FilterContainer);
