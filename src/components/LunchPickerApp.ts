import Component from './core/Component';
import { $, $addEvent, $removeEvent, $setAttribute } from '../utils/dom';

class LunchPickerApp extends Component {
  setEvent() {
    $addEvent(this, 'lunch-picker-tab', 'updateRestaurantList', this.#updateRestaurantList);
    $addEvent(this, '.restaurant-filter-container', 'updateRestaurantList', this.#updateRestaurantList);
    $addEvent(this, 'restaurant-add-modal', 'updateRestaurantList', this.#updateRestaurantList);
  }

  removeEvent() {
    $removeEvent(this, 'lunch-picker-tab', 'lunch-picker-tab', this.#updateRestaurantList);
    $removeEvent(this, '.restaurant-filter-container', 'updateRestaurantList', this.#updateRestaurantList);
    $removeEvent(this, 'restaurant-add-modal', 'updateRestaurantList', this.#updateRestaurantList);
  }

  #updateRestaurantList = () => {
    const category = ($(this, '.category') as HTMLSelectElement)?.value;
    const sorting = ($(this, '.sorting') as HTMLSelectElement)?.value;
    const type = $(this, '.tab-item--checked').textContent;

    $setAttribute(this, 'restaurant-list', 'category', `${category}`);
    $setAttribute(this, 'restaurant-list', 'sorting', `${sorting}`);
    $setAttribute(this, 'restaurant-list', 'type', `${type}`);
  };

  template() {
    return `
      <lunch-picker-header></lunch-picker-header>
      <lunch-picker-tab></lunch-picker-tab>
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
