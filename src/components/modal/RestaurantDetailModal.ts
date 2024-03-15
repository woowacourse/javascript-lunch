import Modal from './Modal';
import RestaurantRepository from '../../domain/RestaurantRepository';
import { $addEvent } from '../../utils/dom';
import favoriteFilledIcon from '../../assets/favorite-icon-filled.png';
import favoriteLinedIcon from '../../assets/favorite-icon-lined.png';

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
    $addEvent(this, '.button--primary', 'click', () => this.updateModal(false));
    $addEvent(this, '.button--secondary', 'click', () => this.#removeRestaurant());
  }

  #removeRestaurant(): void {
    RestaurantRepository.removeRestaurant(this.#key);
    this.makeCustomEvent('updateRestaurantList');
  }

  #handleFavoriteIcon(isFavorite: boolean): string {
    return isFavorite
      ? `<img src=${favoriteFilledIcon} alt="즐겨찾기"></img>`
      : `<img src=${favoriteLinedIcon} alt="즐겨찾기"></img>`;
  }

  modalContent(): string {
    return `
        <div class="restaurant-detail-container">
        <button class="favorite__button">
            ${this.#handleFavoriteIcon(this.#restaurant.isFavorite)}
        </button>
        <category-icon category=${this.#restaurant.category}></category-icon>
        <h2 class="restaurant__name text-subtitle">${this.#restaurant.name}</h2>
        <span class="restaurant__distance text-body">캠퍼스부터 ${this.#restaurant.distance}분 내</span>
        <p class="restaurant__description text-body">${this.#restaurant.description || ''}</p>
        <p class="restaurant__reference text-body">${this.#restaurant.reference || ''}</p>
        </div>
        <div class="button-container">
            <button type="button" class="button button--secondary text-caption">삭제하기</button>
            <button type="button" class="button button--primary text-caption">닫기</button>
        </div>
    `;
  }
}

export default RestaurantDetailModal;
