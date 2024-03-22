import { CATEGORIES_WITH_ALL_KEYS, SORT_CRITERION_KEYS } from '@/constants/Condition';
import { Category, CategoryOrAll, CategoryOrPlaceholder, SortCriteria } from '@/types/Restaurant';
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

  get() {
    return {
      category: this.#selectCategoryBox.get(),
      sortCriteria: this.#selectSortBox.get(),
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
