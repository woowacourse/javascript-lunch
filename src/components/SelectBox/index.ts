import $template from './index.html';
import { store } from './../../store';
import { Category, SortFilter } from '../../types';
import { $ } from '../../utils/dom';

class SelectBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    const $filterContainer = $<HTMLElement>('.restaurant-filter-container');
    const $categorySelectBox = $<HTMLSelectElement>('#category-filter');
    const $sortSelectBox = $<HTMLSelectElement>('#sorting-filter');

    $filterContainer.addEventListener('change', () => {
      const categoryFilter = $categorySelectBox.value as Category;
      const sortFilter = $sortSelectBox.value as SortFilter;
      store.filterRestaurants(categoryFilter);
      store.sortRestaurants(sortFilter);
    });
  }

  render() {
    this.innerHTML = $template;
  }
}

export default SelectBox;
