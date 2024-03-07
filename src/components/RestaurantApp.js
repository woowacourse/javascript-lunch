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
    $setAttribute('restaurant-list', 'restaurants', `${JSON.stringify(this.#restaurants)}`);
    $setAttribute('restaurant-add-modal', 'open', 'false');

    this.addEventListener('selectChange', () => {
      this.#generateRestaurantsBySelection();
    });

    this.addEventListener('gnbButtonClick', () => {
      $setAttribute('restaurant-add-modal', 'open', 'true');
    });

    this.addEventListener('submitButtonClick', (event) => {
      RestaurantRepository.addRestaurant(event.detail);

      this.#restaurants = this.#generateRestaurantsBySelection();
      $setAttribute('restaurant-list', 'restaurants', `${JSON.stringify(this.#restaurants)}`);
      $setAttribute('restaurant-add-modal', 'open', 'false');
    });

    this.addEventListener('cancelButtonClick', () => {
      $setAttribute('restaurant-add-modal', 'open', 'false');
    });
  }

  #generateRestaurantsBySelection() {
    const category = $('.category').value;
    const sorting = $('.sorting').value;

    this.#restaurants = RestaurantRepository.transformRestaurants(category, sorting);

    $setAttribute('restaurant-list', 'restaurants', `${JSON.stringify(this.#restaurants)}`);
  }

  template() {
    return `
      <custom-header></custom-header>
      <filter-box-container></filter-box-container>
      <restaurant-list></restaurant-list>
      <restaurant-add-modal></restaurant-add-modal>
    `;
  }
}

export default RestaurantApp;
