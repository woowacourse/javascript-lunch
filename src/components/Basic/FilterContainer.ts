import { CATEGORIES_WITH_ALL_KEYS, SORT_CRITERION_KEYS } from '@/constants/Condition';
import { Category, CategoryOrAll, SortCriteria } from '@/types/Restaurant';
import BaseComponent from '../BaseComponent';

import AllRestaurantApp from '../AllRestaurantApp';
import SelectBox from './SelectBox';

import './FilterContainer.css';
class FilterContainer extends BaseComponent {
  #selectCategoryBox: SelectBox<CategoryOrAll>;
  #selectSortBox: SelectBox<SortCriteria>;

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
  }

  render() {
    this.append(this.#selectCategoryBox);
    this.append(this.#selectSortBox);
  }

  get(): { category: Category; sortCriteria: SortCriteria } {
    return {
      category: this.#selectCategoryBox.value as Category,
      sortCriteria: this.#selectSortBox.value as SortCriteria,
    };
  }

  setEvent() {
    this.addEventListener('change', () => {
      (this.parentElement as AllRestaurantApp).render();
    });
  }
}

customElements.define('filter-container', FilterContainer);

export default FilterContainer;
