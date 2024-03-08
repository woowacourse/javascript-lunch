import Component from './Component';
import RestaurantRepository from '../domain/RestaurantRepository';
import { $, $setAttribute } from '../utils/dom';
import { OPTION } from '../constants/Condition';

class RestaurantApp extends Component {
  #restaurants;

  constructor() {
    super();
    this.#restaurants = RestaurantRepository.transformRestaurants('전체', '이름순');
  }

  setEvent() {
    this.addEventListener('selectChange', () => this.#generateRestaurants());
    this.addEventListener('gnbButtonClick', () => $setAttribute('restaurant-add-modal', 'open', 'true'));
    this.addEventListener('cancelButtonClick', () => $setAttribute('restaurant-add-modal', 'open', 'false'));
    this.addEventListener('submitButtonClick', (event) => {
      this.#updateRestaurants(event.detail);
      $setAttribute('restaurant-add-modal', 'open', 'false');
    });
  }

  removeEvent() {
    this.removeEventListener('selectChange');
    this.removeEventListener('gnbButtonClick');
    this.removeEventListener('cancelButtonClick');
    this.removeEventListener('submitButtonClick');
  }

  #updateRestaurants(restaurant) {
    RestaurantRepository.addRestaurant(restaurant);
    this.#restaurants = this.#generateRestaurants();
  }

  #generateRestaurants() {
    const category = $('.category').value;
    const sorting = $('.sorting').value;

    this.#restaurants = RestaurantRepository.transformRestaurants(category, sorting);

    $setAttribute('restaurant-list', 'restaurants', `${JSON.stringify(this.#restaurants)}`);
  }

  template() {
    return `
      <custom-header></custom-header>
      <section class="restaurant-filter-container">
          <filter-box type="category" option='${JSON.stringify([OPTION.ALL, ...OPTION.CATEGORY])}'></filter-box>
          <filter-box type="sorting" option='${JSON.stringify(OPTION.SORTING)}'></filter-box>
      </section>
      <restaurant-list restaurants='${JSON.stringify(this.#restaurants)}'></restaurant-list>
      <restaurant-add-modal open="false"></restaurant-add-modal>
    `;
  }
}

export default RestaurantApp;
