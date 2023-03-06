import { Category, Order } from '@res/constants/enum';
import Component from '@res/core/Component';
import { eventBus } from '@res/core/eventBus';
import IFilterOption from '@res/interfaces/IFilterOption';
import { $, newState, on } from '@res/utils/domUtils';

class FilterBar extends Component {
  #filterOption: IFilterOption;

  constructor(elem: HTMLElement) {
    super(elem);

    this.#filterOption = newState(
      { category: Category.All, order: Order.Name },
      () => {
        eventBus.dispatch('@change-filter', { ...this.#filterOption });
      }
    );

    this.render().setEvent();
  }

  setEvent() {
    const $categoryFilter = $<HTMLSelectElement>('#category-filter');
    const $sortingFilter = $<HTMLSelectElement>('#sorting-filter');

    on($categoryFilter, 'change', () => {
      this.#filterOption.category = $categoryFilter.value as Category;
    });

    on($sortingFilter, 'change', () => {
      this.#filterOption.order = $sortingFilter.value as Order;
    });

    return this;
  }

  template() {
    return `<select name="category" id="category-filter" class="restaurant-filter">
    <option value="${Category.All}">전체</option>
    <option value="${Category.Korean}">한식</option>
    <option value="${Category.Chinese}" >중식</option>
    <option value="${Category.Japanese}" >일식</option>
    <option value="${Category.Western}" >양식</option>
    <option value="${Category.Asian}">아시안</option>
    <option value="${Category.Etc}">기타</option>
  </select>

  <!-- 정렬 셀렉트 박스 -->
  <select name="sorting" id="sorting-filter"  class="restaurant-filter">
    <option value="${Order.Name}">이름순</option>
    <option value="${Order.Distance}">거리순</option>
  </select>`;
  }
}

export default FilterBar;
