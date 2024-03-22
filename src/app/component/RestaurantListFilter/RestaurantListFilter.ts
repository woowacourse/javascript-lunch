import { Category, SortOrder } from '../../enum/enums';
import { createOptionItems } from '../../util/createFormElement';
import { $ } from '../../util/domSelector';
import './RestaurantListFilter.css';

export default class RestaurantListFilter extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEvent();
  }

  show() {
    this.classList.remove('disabled');
  }

  hide() {
    this.classList.add('disabled');
  }

  private addEvent() {
    $('#category-filter').addEventListener('change', this.dispatchChangeCategoryEvent.bind(this));
    $('#sorting-filter').addEventListener('change', this.dispatchChangeSortOrder.bind(this));
  }

  private dispatchChangeCategoryEvent(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      this.dispatchEvent(
        new CustomEvent('changeCategory', {
          detail: event.target.value,
        }),
      );
    }
  }

  private dispatchChangeSortOrder(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      this.dispatchEvent(
        new CustomEvent('changeSortOrder', {
          detail: event.target.value,
        }),
      );
    }
  }

  private createFilterSelectBox(type: string): HTMLSelectElement {
    const selectBox = document.createElement('select');
    selectBox.name = type;
    selectBox.id = `${type}-filter`;
    selectBox.classList.add('restaurant-filter');
    return selectBox;
  }

  private render() {
    this.classList.add('restaurant-filter-container');

    const categorySelectBox = this.createFilterSelectBox('category');
    categorySelectBox.append(...createOptionItems({ type: Category, defaultOption: '전체' }));
    this.appendChild(categorySelectBox);

    const sortingSelectBox = this.createFilterSelectBox('sorting');
    sortingSelectBox.append(...createOptionItems({ type: SortOrder }));
    this.appendChild(sortingSelectBox);
  }
}

if (!customElements.get('restaurant-list-filter')) {
  customElements.define('restaurant-list-filter', RestaurantListFilter);
}
