import { SELECT_EVENTS } from '../Select/Select';
import './RestaurantFilters.css';

export const RESTAURANT_FILTERS_EVENTS = {
  filterChange: 'filterChange',
};

export default class RestaurantFilters extends HTMLElement {
  #categoryFilter;

  #sortingFilter;

  constructor() {
    super();

    const template = document.querySelector('#template-restaurant-filter-container');
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }

  get sortingFilter() {
    return this.#sortingFilter.value;
  }

  get categoryFilter() {
    return this.#categoryFilter.value;
  }

  set categoryFilter(category) {
    this.#categoryFilter.value = category;
  }

  connectedCallback() {
    this.#categoryFilter = this.querySelector('#category-filter');
    this.#sortingFilter = this.querySelector('#sorting-filter');

    this.addEventListener(SELECT_EVENTS.onchange, this.#handleSelectOnChange.bind(this));
  }

  // 함수 라인 10줄 에러 off
  // eslint-disable-next-line
  #handleSelectOnChange(e) {
    this.dispatchEvent(
      new CustomEvent(RESTAURANT_FILTERS_EVENTS.filterChange, {
        bubbles: true,
        detail: {
          categoryFilter: this.categoryFilter,
          sortingFilter: this.sortingFilter,
        },
      }),
    );
  }
}
