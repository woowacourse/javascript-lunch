import RestaurantsList from './RestaurantsList';

class RestaurantFilter {
  constructor() {
    this.$target = document.querySelector('main');
    this.render();
  }

  template() {
    return `
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

  render() {
    if (!document.querySelector('.restaurant-filter-container')) {
      this.$target.insertAdjacentHTML('afterbegin', this.template());
    }
  }

  setEvent(onChangeFilterOption) {
    const $filters = document.querySelector('.restaurant-filter-container');

    $filters.addEventListener('change', e => {
      e.preventDefault();
      onChangeFilterOption();
    });
  }
}

export default RestaurantFilter;
