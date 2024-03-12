import Component from './Component';
import RestaurantRepository from '../domain/RestaurantRepository';
import { $addEvent, $setAttribute } from '../utils/dom';

class RestaurantItem extends Component {
  #key: number;
  #restaurant: IRestaurant;

  constructor() {
    super();

    this.#key = Number(this.getAttribute('key')) || 0;
    this.#restaurant = RestaurantRepository.getRestaurant(this.#key) as IRestaurant;
  }

  setEvent(): void {
    $addEvent('.restaurant', 'click', this.#openModal);
  }

  #openModal = () => $setAttribute('restaurant-detail-modal', 'open', 'true');

  template() {
    return `
      <li class="restaurant">
        <category-icon category=${this.#restaurant.category}></category-icon>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${this.#restaurant.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${this.#restaurant.distance}분 내</span>
          <p class="restaurant__description text-body">
            ${this.#restaurant.description || ''}
          </p>
      </div>
      </li>
    `;
  }
}

export default RestaurantItem;
