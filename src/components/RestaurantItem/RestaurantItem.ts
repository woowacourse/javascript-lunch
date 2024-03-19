import Component from '../_core/Component';
import RestaurantRepository from '../../domain/RestaurantRepository';
import { $addEvent, $setAttribute } from '../../utils/dom';

import './RestaurantItem.css';

class RestaurantItem extends Component {
  #key: number;
  #restaurant: IRestaurant;
  #modalState = false;

  constructor() {
    super();

    this.#key = Number(this.getAttribute('key')) ?? 0;
    this.#restaurant = RestaurantRepository.getRestaurant(this.#key);
  }

  setEvent(): void {
    $addEvent(this, '.restaurant__info', 'click', this.#openModal.bind(this));
    $addEvent(this, 'favorite-button', 'updateRestaurant', this.#updateRestaurant.bind(this));
    $addEvent(this, 'restaurant-detail-modal', 'updateRestaurant', this.#updateRestaurant.bind(this));
  }

  reRender(): void {
    this.render();
    this.#updateModalState();
  }

  #updateRestaurant(): void {
    this.#restaurant = RestaurantRepository.getRestaurant(this.#key);
    this.reRender();
  }

  #updateModalState(): void {
    $setAttribute(this, 'restaurant-detail-modal', 'open', `${this.#modalState}`);
  }

  #openModal(): void {
    this.#modalState = true;
    this.#updateModalState();
  }

  template(): string {
    const { key, category, name, distance, description, isFavorite } = this.#restaurant;

    return `
      <li class="restaurant">
        <category-icon category=${category}></category-icon>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          <p class="restaurant__description text-body">${description || ''}</p>
        </div>
        <favorite-button key=${key} isFavorite=${isFavorite}></favorite-button>
      </li>
      <restaurant-detail-modal key=${key} open="false"></restaurant-detail-modal>
    `;
  }
}

export default RestaurantItem;
