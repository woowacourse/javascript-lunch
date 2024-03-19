import Component from './components/_core/Component';
import { $, $addEvent, $setAttribute } from './utils/dom';

class LunchPickerApp extends Component {
  setEvent(): void {
    $addEvent(this, '#app', 'updateRestaurantList', this.#updateRestaurantList.bind(this));
  }

  #updateRestaurantList(): void {
    const category = $<HTMLSelectElement>(this, '.category').value;
    const sorting = $<HTMLSelectElement>(this, '.sorting').value;
    const type = $<HTMLButtonElement>(this, '.tab-item--checked').value;

    $setAttribute(this, 'restaurant-list', 'category', category);
    $setAttribute(this, 'restaurant-list', 'sorting', sorting);
    $setAttribute(this, 'restaurant-list', 'type', type);
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
