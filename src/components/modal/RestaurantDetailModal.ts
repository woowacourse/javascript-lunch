import Modal from './Modal';
import RestaurantRepository from '../../domain/RestaurantRepository';
import { $addEvent } from '../../utils/dom';

class RestaurantDetailModal extends Modal {
  static observedAttributes: string[] = ['key', 'open'];

  #key: number;
  #restaurant: IRestaurant;

  constructor() {
    super();

    const key = Number(this.getAttribute('key')) ?? 0;

    this.#key = key;
    this.#restaurant = RestaurantRepository.getRestaurant(key);
  }

  setEvent(): void {
    $addEvent(this, '.button--primary', 'click', this.#closeModal.bind(this));
    $addEvent(this, '.button--secondary', 'click', this.#removeRestaurant.bind(this));
  }

  #closeModal(): void {
    this.updateModal(false);
    this.makeCustomEvent('updateRestaurantList');
  }

  #removeRestaurant(): void {
    RestaurantRepository.removeRestaurant(this.#key);
    this.makeCustomEvent('updateRestaurantList');
  }

  modalContent(): string {
    const { category, name, distance, description, isFavorite, reference } = this.#restaurant;

    return `
      <div class="restaurant-detail-container">
        <favorite-button key=${this.#key} isFavorite=${isFavorite}></favorite-button>
        <category-icon category=${category}></category-icon>
        <h2 class="restaurant__name text-subtitle">${name}</h2>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${description || ''}</p>
        <a href="${reference || ''}">${reference || ''}</a>
      </div>
      <div class="button-container">
        <button type="button" class="button button--secondary text-caption">삭제하기</button>
        <button type="button" class="button button--primary text-caption">닫기</button>
      </div>
    `;
  }
}

export default RestaurantDetailModal;
