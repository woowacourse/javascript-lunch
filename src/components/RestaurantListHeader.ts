import type { Component, Category, SortBy } from '../type';
import { CATEGORIES } from '../utils/constants';

type RestaurantListHeaderState = {
  category: Category;
  sortBy: SortBy;
};

type RestaurantListHeaderProps = {
  $parent: HTMLElement;
  category: Category;
  sortBy: SortBy;
  onChangeCategory: (e: Event) => void;
  onChangeSortBy: (e: Event) => void;
};

class RestaurantListHeader implements Component<RestaurantListHeaderState> {
  $component: HTMLElement;
  state: RestaurantListHeaderState;
  onChangeCategory: (e: Event) => void;
  onChangeSortBy: (e: Event) => void;

  constructor({
    $parent,
    category,
    sortBy,
    onChangeCategory,
    onChangeSortBy,
  }: RestaurantListHeaderProps) {
    this.$component = document.createElement('div');
    this.state = {
      category,
      sortBy,
    };
    this.onChangeCategory = onChangeCategory;
    this.onChangeSortBy = onChangeSortBy;

    $parent.append(this.$component);
  }

  setState(newState: RestaurantListHeaderState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.$component.innerHTML = `
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

    const categorySelect = this.$component.querySelector('#category-filter');
    categorySelect?.addEventListener('change', this.onChangeCategory);

    const sortSelect = this.$component.querySelector('#sorting-filter');
    sortSelect?.addEventListener('change', this.onChangeSortBy);
  }
}

export default RestaurantListHeader;
