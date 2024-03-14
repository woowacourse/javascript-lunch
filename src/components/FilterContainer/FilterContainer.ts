import { CATEGORIES_WITH_ALL_KEYS, SORT_CRITERION_KEYS } from '@/constants/Condition';
import BaseComponent from '../BaseComponent';
import SelectBox from '../Basic/SelectBox/SelectBox';
import { Category, CategoryOrAll, SortCriteria } from '@/types/Restaurant';
import RestaurantList from '../RestaurantList/RestaurantList';

import './FilterContainer.css';
import MainApp from '../MainApp';
class FilterContainer extends BaseComponent {
  #selectCategoryBox: SelectBox<CategoryOrAll>;
  #selectSortBox: SelectBox<SortCriteria>;
  #restaurantList: RestaurantList;

  constructor() {
    super();
    this.#selectCategoryBox = new SelectBox<CategoryOrAll>(
      CATEGORIES_WITH_ALL_KEYS,
      CATEGORIES_WITH_ALL_KEYS,
      'category',
    );

    this.#selectSortBox = new SelectBox<SortCriteria>(
      SORT_CRITERION_KEYS,
      SORT_CRITERION_KEYS,
      'sorting',
    );

    this.#restaurantList = document.querySelector('.restaurant-list')!;
  }

  render() {
    this.append(this.#selectCategoryBox);
    this.append(this.#selectSortBox);
  }

  get() {
    return { category: this.#selectCategoryBox.value, sortCriteria: this.#selectSortBox.value };
  }

  setEvent() {
    this.addEventListener('change', () => {
      (this.parentElement as MainApp).paint();
    });
  }
}

customElements.define('filter-container', FilterContainer);

export default FilterContainer;
