import type { Component } from '../../interface';
import type { Category, SortBy } from '../../type';
import { CATEGORIES } from '../../utils/constants';

type RestaurantFilterContainerState = {
  category: Category;
  sortBy: SortBy;
  onChangeCategory: (e: Event) => void;
  onChangeSortBy: (e: Event) => void;
};

type RestaurantFilterContainerProps = {
  $parent: HTMLElement;
  category: Category;
  sortBy: SortBy;
  onChangeCategory: (e: Event) => void;
  onChangeSortBy: (e: Event) => void;
};

class RestaurantFilterContainer implements Component<RestaurantFilterContainerState> {
  $target: HTMLElement;
  state: RestaurantFilterContainerState;

  constructor({
    $parent,
    category,
    sortBy,
    onChangeCategory,
    onChangeSortBy,
  }: RestaurantFilterContainerProps) {
    this.$target = document.createElement('div');
    this.state = {
      category,
      sortBy,
      onChangeCategory,
      onChangeSortBy,
    };

    $parent.append(this.$target);
  }

  setState(newState: RestaurantFilterContainerState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `
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

    const categorySelect = this.$target.querySelector('#category-filter');
    categorySelect?.addEventListener('change', this.state.onChangeCategory);

    const sortSelect = this.$target.querySelector('#sorting-filter');
    sortSelect?.addEventListener('change', this.state.onChangeSortBy);
  }
}

export default RestaurantFilterContainer;
