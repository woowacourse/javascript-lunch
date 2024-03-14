import Component from './Component';
import { $, $setAttribute } from '../utils/dom';

class LunchPickerApp extends Component {
  #category: TCategory = '한식';
  #sorting: TSortingOption = '이름순';

  handleSelectChange: () => void;
  handleGnbButtonClick: () => void;
  handleCancelButtonClick: () => void;

  constructor() {
    super();
    this.handleSelectChange = (): void => this.#updateSelectType();
    this.handleGnbButtonClick = (): void => $setAttribute('restaurant-add-modal', 'open', 'true');
    this.handleCancelButtonClick = (): void => $setAttribute('restaurant-add-modal', 'open', 'false');
  }

  setEvent(): void {
    this.addEventListener('selectChange', this.handleSelectChange);
    this.addEventListener('gnbButtonClick', this.handleGnbButtonClick);
    this.addEventListener('cancelButtonClick', this.handleCancelButtonClick);
  }

  removeEvent(): void {
    this.removeEventListener('selectChange', this.handleSelectChange);
    this.removeEventListener('gnbButtonClick', this.handleGnbButtonClick);
    this.removeEventListener('cancelButtonClick', this.handleCancelButtonClick);
  }

  #updateSelectType(): void {
    this.#category = ($('.category') as HTMLInputElement).value as TCategory;
    this.#sorting = ($('.sorting') as HTMLInputElement).value as TSortingOption;
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
