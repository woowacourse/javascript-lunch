import Component from '../Component';

export default class Selector extends Component {
  constructor($target) {
    super($target);

    this.addEvent('change', (event) => {
      this.filteredBySelect(event);
    });
  }

  template() {
    return `
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
    `;
  }

  filteredBySelect(event) {
    if (event.target.id === 'category-filter') {
      this.restaurantManager.filterRestaurantList(event.target.value);
    }

    if (event.target.id === 'sorting-filter') {
      this.restaurantManager.checkRestaurantListFiltered(event.target.value);
    }
  }
}
