import { FILTER_CATEGORY, SORT_CONDITION } from '../data/Constants';
import { FilterCategory, SortCondition } from '../domain/RestaurantList';
import { Component } from '../type/Component';

class RestaurantFilterBar implements Component {
  $target: Element;

  constructor(parent: Element) {
    this.$target = document.createElement('section');
    this.$target.classList.add('restaurant-filter-container');
    parent.insertAdjacentElement('beforeend', this.$target);
  }

  template() {
    return `
        <select name="category" id="category-filter" class="restaurant-filter">${FILTER_CATEGORY.map(
          (category) => `<option value="${category}">${category}</option>`,
        ).join('')}
        </select>
        <select name="sorting" id="sorting-filter" class="restaurant-filter">${SORT_CONDITION.map(
          (condition) => `<option value="${condition}">${condition}순</option>`,
        ).join('')}
        </select>`;
  }

  render(): void {
    this.$target.insertAdjacentHTML('beforeend', this.template());
  }

  show() {
    this.$target.classList.remove('hide');
  }

  hide() {
    this.$target.querySelectorAll('select').forEach((select) => {
      select.selectedIndex = 0;
    });
    this.$target.classList.add('hide');
  }

  getCategory() {
    return (this.$target.querySelector('#category-filter') as HTMLInputElement)
      .value as FilterCategory;
  }

  getSortCondition() {
    return (this.$target.querySelector('#sorting-filter') as HTMLInputElement)
      .value as SortCondition;
  }

  setEventHandler(elementName: 'filter', handler: () => void): void {
    ['#category-filter', '#sorting-filter'].forEach((id) => {
      this.$target.querySelector(id)?.addEventListener('change', handler.bind(this));
    });
  }
}

export default RestaurantFilterBar;
