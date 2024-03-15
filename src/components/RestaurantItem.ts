import Component from './core/Component';
import { $addEvent, $setAttribute } from '../utils/dom';
import RestaurantRepository from '../domain/RestaurantRepository';

class RestaurantItem extends Component {
  #key: number;
  #restaurant: IRestaurant;

  constructor() {
    super();

    const key = Number(this.getAttribute('key')) ?? 0;

    this.#key = key;
    this.#restaurant = RestaurantRepository.getRestaurant(key);
  }

  setEvent(): void {
    $addEvent(this, 'favorite-button', 'click', this.#updateRestaurant.bind(this));
    $addEvent(this, '.restaurant__info', 'click', this.#openModal.bind(this));
  }

  #updateRestaurant(): void {
    this.#restaurant = RestaurantRepository.getRestaurant(this.#key);
    this.render();
  }

  #openModal(): void {
    $setAttribute(this, 'restaurant-detail-modal', 'open', 'true');
  }

  template(): string {
    const { category, name, distance, description, isFavorite } = this.#restaurant;

    return `
      <li class="restaurant">
        <category-icon category=${category}></category-icon>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          <p class="restaurant__description text-body">${description || ''}</p>
        </div>
        <favorite-button key=${this.#key} isFavorite=${isFavorite}></favorite-button>
      </li>
      <restaurant-detail-modal key=${this.#key} open="false"></restaurant-detail-modal>
    `;
  }
}

export default RestaurantItem;
