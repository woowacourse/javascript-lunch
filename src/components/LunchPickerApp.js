import Component from './Component';
import { $, $addEvent, $removeEvent, $setAttribute } from '../utils/dom';

class LunchPickerApp extends Component {
  setEvent() {
    $addEvent('.restaurant-filter-container', 'updateRestaurantList', this.#updateRestaurantList);
    $addEvent('restaurant-add-modal', 'updateRestaurantList', this.#updateRestaurantList);
  }

  removeEvent() {
    $removeEvent('.restaurant-filter-container', 'updateRestaurantList', this.#updateRestaurantList);
    $removeEvent('restaurant-add-modal', 'updateRestaurantList', this.#updateRestaurantList);
  }

  #updateRestaurantList = () => {
    const category = $('.category').value || '전체';
    const sorting = $('.sorting').value || '이름순';

    $setAttribute('restaurant-list', 'category', `${category}`);
    $setAttribute('restaurant-list', 'sorting', `${sorting}`);
  };

  template() {
    return `
      <lunch-picker-header></lunch-picker-header>
      <section class="restaurant-filter-container">
          <filter-box type="category"></filter-box>
          <filter-box type="sorting"></filter-box>
      </section>
      <restaurant-list category="전체" sorting="이름순"></restaurant-list>
      <restaurant-add-modal open="false"></restaurant-add-modal>
    `;
  }
}

export default LunchPickerApp;
