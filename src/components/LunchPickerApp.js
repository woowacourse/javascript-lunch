import Component from './Component';
import { $, $setAttribute } from '../utils/dom';

class LunchPickerApp extends Component {
  #category;
  #sorting;

  constructor() {
    super();
    this.handleSelectChange = () => this.#updateSelectType();
    this.handleGnbButtonClick = () => $setAttribute('restaurant-add-modal', 'open', 'true');
    this.handleCancelButtonClick = () => $setAttribute('restaurant-add-modal', 'open', 'false');
  }

  setEvent() {
    this.addEventListener('selectChange', this.handleSelectChange);
    this.addEventListener('gnbButtonClick', this.handleGnbButtonClick);
    this.addEventListener('cancelButtonClick', this.handleCancelButtonClick);
  }

  removeEvent() {
    this.removeEventListener('selectChange', this.handleSelectChange);
    this.removeEventListener('gnbButtonClick', this.handleGnbButtonClick);
    this.removeEventListener('cancelButtonClick', this.handleCancelButtonClick);
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
