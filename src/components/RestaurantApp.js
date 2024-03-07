import Component from './Component';
import RestaurantRepository from '../domain/RestaurantRepository';
import { $, $setAttribute, $getAttribute } from '../utils/dom';

class RestaurantApp extends Component {
  #restaurants;

  constructor() {
    super();
    this.#restaurants = RestaurantRepository.transformRestaurants('전체', '이름순');
  }

  render() {
    this.innerHTML = this.template();
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
      <filter-box-container></filter-box-container>
      <restaurant-list restaurants='${JSON.stringify(this.#restaurants)}'></restaurant-list>
      <restaurant-add-modal open="false"></restaurant-add-modal>
    `;
  }
}

export default RestaurantApp;
