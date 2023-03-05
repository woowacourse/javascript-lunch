import { Category, SortFilter } from '../../types';
import { store } from './../../store';
import $template from './index.html';

class SelectBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    const $filterContainer = this.querySelector('.restaurant-filter-container') as HTMLElement;
    const $categorySelectBox = this.querySelector('#category-filter') as HTMLSelectElement;
    const $sortSelectBox = this.querySelector('#sorting-filter') as HTMLSelectElement;

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
