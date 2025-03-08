import Component from '../core/Component.js';

export default class RestaurantDetail extends Component {
  template() {
    return `
      <div class="restaurant-filter-container">
        <select name="filter" id="filter" class="restaurant-filter">
          <option value="">전체</option>
          <option value="한식">한식</option>
          <option value="중식">중식</option>
          <option value="일식">일식</option>
          <option value="양식">양식</option>
          <option value="아시안">아시안</option>
          <option value="기타">기타</option>
        </select>

        <select name="sort" id="sort">
          <option value="이름순">이름순</option>
          <option value="거리순">거리순</option>
        </select>
      </div>
    `;
  }
}
