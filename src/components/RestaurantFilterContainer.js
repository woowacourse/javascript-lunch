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
  setState;

  constructor(setState) {
    this.setState = setState;
    $('.restaurant-filter-container').innerHTML = html;

    $('#category-filter').addEventListener('change', this.onChangeCategory.bind(this));
    $('#sorting-filter').addEventListener('change', this.onChangeSortOption.bind(this));
  }

  onChangeCategory(e) {
    const category = e.target.value;

    this.setState({ filterCategory: category });
  }

  onChangeSortOption(e) {
    const sortOption = e.target.value;

    this.setState({ sortOption: sortOption });
  }

  hidden() {
    $('.restaurant-filter-container').classList.add('hidden');
  }

  visible() {
    $('.restaurant-filter-container').classList.remove('hidden');
  }
}
