import { Component, Category, SortBy } from '../type';

type RestaurantListHeaderState = {
  category: Category;
  sortBy: SortBy;
};

class RestaurantListHeader implements Component<RestaurantListHeaderState> {
  $component: HTMLElement;
  state: RestaurantListHeaderState;

  constructor($parent: HTMLElement, state: RestaurantListHeaderState) {
    this.$component = document.createElement('div');
    this.state = state;
  }

  setState(newState: RestaurantListHeaderState) {
    this.state = newState;

    this.render();
  }

  render() {
    this.$component.innerHTML = `
      <section class="restaurant-filter-container">
        <select name="category" id="category-filter" class="restaurant-filter">
          <option value="전체">전체</option>
          <option value="한식">한식</option>
          <option value="중식">중식</option>
          <option value="일식">일식</option>
          <option value="양식">양식</option>
          <option value="아시안">아시안</option>
          <option value="기타">기타</option>
        </select>
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          <option value="name">이름순</option>
          <option value="distance">거리순</option>
        </select>
      </section>
    `;
  }
}

export default RestaurantListHeader;
