import { FILTER_CATEGORY, SORT_CONDITION } from '../data/Constants';
import { FilterCategory, SortCondition } from '../domain/RestaurantList';
import { Component } from '../type/Component';

class RestaurantFilterBar implements Component {
  $target: Element;

  constructor(parent: Element) {
    parent.insertAdjacentHTML('beforeend', this.template());
    this.$target = parent.lastElementChild!;
  }

  template = () => `
    <section class="restaurant-filter-container">
      <select name="category" id="category-filter" class="restaurant-filter">${FILTER_CATEGORY.map(
        (category) => `<option value="${category}">${category}</option>`,
      ).join('')}
      </select>
      <select name="sorting" id="sorting-filter" class="restaurant-filter">${SORT_CONDITION.map(
        (condition) => `<option value="${condition}">${condition}순</option>`,
      ).join('')}
      </select>
    </section>`;

  show = () => {
    this.$target.classList.remove('hide');
  };

  hide = () => {
    this.$target.querySelectorAll('select').forEach((select) => {
      select.selectedIndex = 0;
    });
    this.$target.classList.add('hide');
  };

  getCategory = () =>
    (this.$target.querySelector('#category-filter') as HTMLInputElement).value as FilterCategory;

  getSortCondition = () =>
    (this.$target.querySelector('#sorting-filter') as HTMLInputElement).value as SortCondition;

  setSelectChangeHandler = (
    handler: (category: FilterCategory, sortCondition: SortCondition) => void,
  ) => {
    ['#category-filter', '#sorting-filter'].forEach((id) => {
      this.$target.querySelector(id)?.addEventListener('change', (event) => {
        event.preventDefault();

        handler(this.getCategory(), this.getSortCondition());
      });
    });
  };
}

export default RestaurantFilterBar;
