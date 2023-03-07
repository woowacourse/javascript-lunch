import $template from './index.html';
import { Category, SortFilter } from '../../types';
import { $ } from '../../utils/dom';

class SelectBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = $template;
  }

  addSelectBoxHandler(selectBoxHandler: CallableFunction) {
    const $filterContainer = $<HTMLElement>('.restaurant-filter-container');
    const $categorySelectBox = $<HTMLSelectElement>('#category-filter');
    const $sortSelectBox = $<HTMLSelectElement>('#sorting-filter');

    $filterContainer.addEventListener('change', () => {
      const categoryFilter = $categorySelectBox.value as Category;
      const sortFilter = $sortSelectBox.value as SortFilter;
      selectBoxHandler(categoryFilter, sortFilter);
    });
  }
}

export default SelectBox;
