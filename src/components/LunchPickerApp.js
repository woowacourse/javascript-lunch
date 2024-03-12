import Component from './Component';
import { $, $setAttribute } from '../utils/dom';

class LunchPickerApp extends Component {
  #category;
  #sorting;

  setEvent() {
    this.addEventListener('selectChange', () => this.#updateSelectType());
    this.addEventListener('gnbButtonClick', () => $setAttribute('restaurant-add-modal', 'open', 'true'));
    this.addEventListener('cancelButtonClick', () => $setAttribute('restaurant-add-modal', 'open', 'false'));
  }

  removeEvent() {
    this.removeEventListener('selectChange');
    this.removeEventListener('gnbButtonClick');
    this.removeEventListener('cancelButtonClick');
  }

  #updateSelectType() {
    this.#category = $('.category').value;
    this.#sorting = $('.sorting').value;
    $setAttribute('restaurant-list', 'category', this.#category);
    $setAttribute('restaurant-list', 'sorting', this.#sorting);
  }

  template() {
    return `
      <lunch-picker-header></lunch-picker-header>
      <section class="restaurant-filter-container">
          <filter-box type="category"></filter-box>
          <filter-box type="sorting"></filter-box>
      </section>
      <restaurant-list category=${this.#category} sorting=${this.#sorting}></restaurant-list>
      <restaurant-add-modal open="false"></restaurant-add-modal>
    `;
  }
}

export default LunchPickerApp;
