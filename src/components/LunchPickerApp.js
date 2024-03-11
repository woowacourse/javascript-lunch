import Component from './Component';
import RestaurantRepository from '../domain/RestaurantRepository';
import { $, $setAttribute } from '../utils/dom';
import { OPTION } from '../constants/Condition';

class LunchPickerApp extends Component {
  #restaurants;

  constructor() {
    super();
    this.#restaurants = RestaurantRepository.transformRestaurants('전체', '이름순');
  }

  setEvent() {
    this.addEventListener('change', (event) => {
      if (event.target.classList.contains('category') || event.target.classList.contains('sorting')) {
        this.#generateRestaurants();
      }
    });

    this.addEventListener('click', (event) => {
      if (event.target.closest('.gnb__button')) {
        $setAttribute('restaurant-add-modal', 'open', 'true');
      }

      if (event.target.classList.contains('button--primary')) {
        this.#restaurants = this.#generateRestaurants();
        $setAttribute('restaurant-add-modal', 'open', 'false');
      }

      if (event.target.classList.contains('button--secondary')) {
        $setAttribute('restaurant-add-modal', 'open', 'false');
      }
    });
  }

  removeEvent() {
    this.removeEventListener('selectChange');
    this.removeEventListener('gnbButtonClick');
    this.removeEventListener('cancelButtonClick');
    this.removeEventListener('submitButtonClick');
  }

  #generateRestaurants() {
    const category = $('.category').value;
    const sorting = $('.sorting').value;

    this.#restaurants = RestaurantRepository.transformRestaurants(category, sorting);

    $setAttribute('restaurant-list', 'restaurants', `${JSON.stringify(this.#restaurants)}`);
  }

  template() {
    return `
      <lunch-picker-header></lunch-picker-header>
      <section class="restaurant-filter-container">
          <filter-box type="category" option='${JSON.stringify([OPTION.ALL, ...OPTION.CATEGORY])}'></filter-box>
          <filter-box type="sorting" option='${JSON.stringify(OPTION.SORTING)}'></filter-box>
      </section>
      <restaurant-list restaurants='${JSON.stringify(this.#restaurants)}'></restaurant-list>
      <restaurant-add-modal open="false"></restaurant-add-modal>
    `;
  }
}

export default LunchPickerApp;
