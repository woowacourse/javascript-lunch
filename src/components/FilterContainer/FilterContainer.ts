import { CATEGORIES_WITH_ALL_KEYS, SORT_CRITERION_KEYS } from '@/constants/Condition';
import BaseComponent from '../BaseComponent';
import SelectBox from '../Basic/SelectBox/SelectBox';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { Category, CategoryOrAll, SortCriteria } from '@/types/Restaurant';
import RestaurantList from '../RestaurantList/RestaurantList';

import './FilterContainer.css';
class FilterContainer extends BaseComponent {
  #selectCategoryBox: SelectBox<CategoryOrAll>;
  #selectSortBox: SelectBox<SortCriteria>;
  #restaurantList: RestaurantList;

  constructor() {
    super();
    this.#selectCategoryBox = new SelectBox<CategoryOrAll>(CATEGORIES_WITH_ALL_KEYS, 'category');
    this.#selectSortBox = new SelectBox<SortCriteria>(SORT_CRITERION_KEYS, 'sorting');
    this.#restaurantList = document.querySelector('restaurant-list') as RestaurantList;
  }

  render() {
    this.append(this.#selectCategoryBox);
    this.append(this.#selectSortBox);
  }

  rerender() {
    const restaurantDBService = new RestaurantDBService();

    const selectedCategory = this.querySelector('select-box#category-filter') as HTMLSelectElement;
    const selectedSortCriteria = this.querySelector(
      'select-box#sorting-filter',
    ) as HTMLSelectElement;

    const newRestaurantList = restaurantDBService.getFromRestaurantList(
      selectedCategory.value as Category,
      selectedSortCriteria.value as SortCriteria,
    );

    this.#restaurantList.rerender(newRestaurantList);
  }

  setEvent() {
    this.addEventListener('change', () => {
      const restaurantDBService = new RestaurantDBService();

      const newRestaurantList = restaurantDBService.getFromRestaurantList(
        this.#selectCategoryBox.value as Category,
        this.#selectSortBox.value as SortCriteria,
      );

      this.#restaurantList.rerender(newRestaurantList);
    });
  }
}

customElements.define('filter-container', FilterContainer);

export default FilterContainer;
