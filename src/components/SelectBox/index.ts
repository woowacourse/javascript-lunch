import $template from './index.html';
import { Category, SortFilter } from '../../types';
import { $ } from '../../utils/dom';

class SelectBox extends HTMLElement {
  $section: HTMLElement | null;
  constructor() {
    super();
    this.$section = null;
  }

  connectedCallback() {
    this.innerHTML = $template;
    this.$section = $<HTMLElement>('.restaurant-filter-container', this);
    console.log(this.$section);
  }

  open() {
    this.$section?.classList.add('filter--open');
  }

  hide() {
    this.$section?.classList.remove('filter--open');
  }

  addSelectBoxHandler(selectBoxHandler: CallableFunction) {
    const $filterContainer = $<HTMLElement>('.restaurant-filter-container', this);
    const $categorySelectBox = $<HTMLSelectElement>('#category-filter', this);
    const $sortSelectBox = $<HTMLSelectElement>('#sorting-filter', this);

    $filterContainer.addEventListener('change', () => {
      const categoryFilter = $categorySelectBox.value as Category;
      const sortFilter = $sortSelectBox.value as SortFilter;
      selectBoxHandler(categoryFilter, sortFilter);
    });
  }
}

export default SelectBox;
