import Component from './Component';
import { $, $setAttribute } from '../utils/dom';

class LunchPickerApp extends Component {
  #theme: string = '모든 음식점';
  #category: TCategory = '한식';
  #sorting: TSortingOption = '이름순';

  handleSelectChange: () => void;
  handleCancelButtonClick: () => void;

  constructor() {
    super();
    this.handleSelectChange = (): void => this.#updateSelectType();
    this.handleCancelButtonClick = (): void => $setAttribute('lunch-picker-modal', 'open', 'false');
  }

  setEvent(): void {
    this.addEventListener('detailClick', this.#handleDetailClick as EventListener);
    this.addEventListener('selectChange', this.handleSelectChange);
    this.addEventListener('gnbButtonClick', this.#handleGnbButtonClick);
    this.addEventListener('cancelButtonClick', this.handleCancelButtonClick);
  }

  #handleDetailClick(event: CustomEvent<string>) {
    $setAttribute('lunch-picker-modal', 'type', 'detail');
    $setAttribute('lunch-picker-modal', 'open', 'true');
    $setAttribute('lunch-picker-modal', 'restaurantName', event.detail);
  }

  removeEvent(): void {
    this.removeEventListener('selectChange', this.handleSelectChange);
    this.removeEventListener('gnbButtonClick', this.#handleGnbButtonClick);
    this.removeEventListener('cancelButtonClick', this.handleCancelButtonClick);
  }

  #handleGnbButtonClick(): void {
    $setAttribute('lunch-picker-modal', 'type', 'add');
    $setAttribute('lunch-picker-modal', 'open', 'true');
  }

  #updateSelectType(): void {
    this.#theme = ($('.restaurant-theme-active') as HTMLButtonElement).value as TTheme;
    this.#category = ($('.category') as HTMLInputElement).value as TCategory;
    this.#sorting = ($('.sorting') as HTMLInputElement).value as TSortingOption;
    $setAttribute('restaurant-list', 'theme', this.#theme);
    $setAttribute('restaurant-list', 'category', this.#category);
    $setAttribute('restaurant-list', 'sorting', this.#sorting);
  }

  template() {
    return `
      <lunch-picker-header></lunch-picker-header>
      <section class="restaurant-theme-selector-container">
        <restaurant-theme-selector></restaurant-theme-selector>
      </section>
      <section class="restaurant-filter-container">
          <filter-box type="category"></filter-box>
          <filter-box type="sorting"></filter-box>
      </section>
      <restaurant-list category=${this.#category} sorting=${this.#sorting}></restaurant-list>
      <lunch-picker-modal open="false"></lunch-picker-modal>
      `;
  }
}

export default LunchPickerApp;
