import './RestaurantFilters.css';

import { SELECT_EVENTS } from '../Select/Select';

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

  get sort() {
    return this.#sortingFilter.value;
  }

  get category() {
    return this.#categoryFilter.value;
  }

  set category(category) {
    this.#categoryFilter.value = category;
  }

  connectedCallback() {
    this.#categoryFilter = this.querySelector('#category-filter');
    this.#sortingFilter = this.querySelector('#sorting-filter');

    this.addEventListener(SELECT_EVENTS.onchange, this.#handleSelectOnChange.bind(this));
  }

  #handleSelectOnChange() {
    this.dispatchEvent(
      new CustomEvent(RESTAURANT_FILTERS_EVENTS.filterChange, {
        bubbles: true,
        detail: {
          category: this.category,
          sort: this.sort,
        },
      }),
    );
  }
}
