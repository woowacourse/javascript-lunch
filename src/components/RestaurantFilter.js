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
<<<<<<< HEAD
    if (!document.querySelector('.restaurant-filter-containe')) {
=======
    if (!document.querySelector('.restaurant-filter-container')) {
>>>>>>> step2-test
      this.$target.insertAdjacentHTML('afterbegin', this.template());
    }
  }

<<<<<<< HEAD
  setEvent(renderRestaurantsList) {
=======
  setEvent(onChangeFilterOption) {
>>>>>>> step2-test
    const $filters = document.querySelector('.restaurant-filter-container');

    $filters.addEventListener('change', e => {
      e.preventDefault();
<<<<<<< HEAD
      renderRestaurantsList();
=======
      onChangeFilterOption();
>>>>>>> step2-test
    });
  }
}

export default RestaurantFilter;
