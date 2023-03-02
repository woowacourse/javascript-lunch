import $template from './index.html';
import { store } from './../../store';
import { Category } from '../../types';

class SelectBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    const $categorySelectBox = this.querySelector('#category-filter') as HTMLSelectElement;

    $categorySelectBox.addEventListener('change', () => {
      const categoryFilter = $categorySelectBox.value as Category;
      store.filterRestaurants(categoryFilter);
    });
  }

  render() {
    this.innerHTML = $template;
  }
}

export default SelectBox;
