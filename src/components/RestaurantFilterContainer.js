import { $ } from '../utils/dom';

import { FILTER_CATEGORIES } from '../constants';

const html = `
    <select name="category" id="category-filter" class="restaurant-filter">
      ${FILTER_CATEGORIES.reduce(
        (options, category) => options + `<option value=${category}>${category}</option>`,
        ''
      )}
    </select>

    <!-- 정렬 셀렉트 박스 -->
    <select name="sorting" id="sorting-filter" class="restaurant-filter">
      <option value="name">이름순</option>
      <option value="distance">거리순</option>
    </select>
`;

export default class RestaurantFilterContainer {
  renderFilteredItems;

  constructor(renderFilteredItems) {
    this.renderFilteredItems = renderFilteredItems;
    $('.restaurant-filter-container').innerHTML = html;
    this.registerEvent();
  }

  registerEvent() {
    $('.restaurant-filter-container').addEventListener(
      'change',
      this.renderFilteredItems.bind(this)
    );
  }
}
