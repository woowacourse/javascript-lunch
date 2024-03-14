import Component from './Component';
import { $, $addEvent, $setAttribute } from '../utils/dom';

class LunchPickerApp extends Component {
  setEvent(): void {
    $addEvent(this, '#app', 'updateRestaurantList', this.#updateRestaurantList.bind(this));
    $addEvent(this, 'lunch-picker-header', 'click', this.#updateModal.bind(this));
  }

  #updateModal(): void {
    $setAttribute(this, 'restaurant-add-modal', 'open', 'true');
  }

  #updateRestaurantList(): void {
    const category = ($(this, '.category') as HTMLSelectElement)?.value;
    const sorting = ($(this, '.sorting') as HTMLSelectElement)?.value;
    const type = ($(this, '.tab-item--checked') as HTMLButtonElement)?.value;

    $setAttribute(this, 'restaurant-list', 'category', `${category}`);
    $setAttribute(this, 'restaurant-list', 'sorting', `${sorting}`);
    $setAttribute(this, 'restaurant-list', 'type', `${type}`);
  }

  template(): string {
    return `
      <div id="app">
        <lunch-picker-header></lunch-picker-header>
        <lunch-picker-tab></lunch-picker-tab>
        <section class="restaurant-filter-container">
            <filter-box type="category"></filter-box>
            <filter-box type="sorting"></filter-box>
        </section>
        <restaurant-list category="전체" sorting="이름순"></restaurant-list>
        <restaurant-add-modal open="false"></restaurant-add-modal>
      </div>
    `;
  }
}

export default LunchPickerApp;
