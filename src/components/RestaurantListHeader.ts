import type { Component } from '../interface';
import type { Category, SortBy } from '../type';
import { CATEGORIES } from '../utils/constants';

type RestaurantListHeaderState = {
  category: Category;
  sortBy: SortBy;
  onChangeCategory: (e: Event) => void;
  onChangeSortBy: (e: Event) => void;
};

type RestaurantListHeaderProps = {
  $parent: HTMLElement;
  category: Category;
  sortBy: SortBy;
  onChangeCategory: (e: Event) => void;
  onChangeSortBy: (e: Event) => void;
};

class RestaurantListHeader implements Component<RestaurantListHeaderState> {
  $parent: HTMLElement;
  state: RestaurantListHeaderState;

  constructor({
    $parent,
    category,
    sortBy,
    onChangeCategory,
    onChangeSortBy,
  }: RestaurantListHeaderProps) {
    this.$parent = document.createElement('div');
    this.state = {
      category,
      sortBy,
      onChangeCategory,
      onChangeSortBy,
    };

    $parent.append(this.$parent);
  }

  setState(newState: RestaurantListHeaderState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.$parent.innerHTML = `
      <section class="restaurant-filter-container">
        <select name="category" id="category-filter" class="restaurant-filter">
          ${CATEGORIES.map(
            (category) => `
              <option value="${category}" ${
              this.state.category === category ? 'selected' : ''
            }>${category}</option>
            `
          ).join('')}
        </select>
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          <option value="name" ${this.state.sortBy === 'name' ? 'selected' : ''}>이름순</option>
          <option value="distance" ${
            this.state.sortBy === 'distance' ? 'selected' : ''
          }>거리순</option>
        </select>
      </section>
    `;

    const categorySelect = this.$parent.querySelector('#category-filter');
    categorySelect?.addEventListener('change', this.state.onChangeCategory);

    const sortSelect = this.$parent.querySelector('#sorting-filter');
    sortSelect?.addEventListener('change', this.state.onChangeSortBy);
  }
}

export default RestaurantListHeader;
