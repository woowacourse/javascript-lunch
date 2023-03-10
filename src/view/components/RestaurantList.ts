import actions from '../../hooks/actions';
import state from '../../hooks/store';
import { Restaurant } from '../../type/common';
import { $ } from '../../utils/querySelector';
import RestaurantItem from './RestaurantItem';
import Selector from './Selector';

class RestaurantList {
  #root;

  constructor($root: Element) {
    this.#root = $root;
  }

  #template() {
    return `
        <section class="restaurant-filter-container"></section>
        <!-- 음식점 목록 -->
        <section class="restaurant-list-container">
          <ul class="restaurant-list"></ul>
        </section>
    `;
  }

  #mounted() {
    new Selector({
      $target: $('.restaurant-filter-container'),
      info: {
        name: 'category',
        id: 'category-filter',
        options: [
          { value: '전체', name: '전체' },
          { value: '한식', name: '한식' },
          { value: '중식', name: '중식' },
          { value: '일식', name: '일식' },
          { value: '양식', name: '양식' },
          { value: '아시안', name: '아시안' },
          { value: '기타', name: '기타' },
        ],
      },
    }).render(state.categorySelector);

    new Selector({
      $target: $('.restaurant-filter-container'),
      info: {
        name: 'sorting',
        id: 'sorting-filter',
        options: [
          { value: 'name', name: '이름순' },
          { value: 'distance', name: '거리순' },
        ],
      },
    }).render(state.sortSelector);

    actions.getValue('restaurants')?.forEach((restaurant: Restaurant) => {
      new RestaurantItem($('.restaurant-list')).render(restaurant).setEvent();
    });
  }

  render() {
    this.#root.innerHTML = this.#template();
    this.#mounted();
  }
}

export default RestaurantList;
