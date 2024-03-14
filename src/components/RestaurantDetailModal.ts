import Component from './Component';
import RestaurantRepository from '../domain/RestaurantRepository';
import { $, $addEvent } from '../utils/dom';
import favoriteFilledIcon from '../assets/favorite-icon-filled.png';
import favoriteLinedIcon from '../assets/favorite-icon-lined.png';

class RestaurantDetailModal extends Component {
  static observedAttributes: string[] = ['key', 'open'];

  #key: number;
  #restaurant: IRestaurant;

  constructor() {
    super();

    const key = Number(this.getAttribute('key')) ?? 0;

    this.#key = key;
    this.#restaurant = RestaurantRepository.getRestaurant(key);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    this.render();

    if (newValue) {
      this.#updateModal(JSON.parse(newValue));
    }
  }

  setEvent(): void {
    $addEvent(this, '.button--primary', 'click', () => this.#updateModal(false));
    $addEvent(this, '.button--secondary', 'click', () => this.#removeRestaurant());
  }

  #updateModal(isOpen: boolean): void {
    if (isOpen) {
      ($(this, 'dialog') as HTMLDialogElement).showModal();
    } else {
      ($(this, 'dialog') as HTMLDialogElement).close();
    }
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

  template(): string {
    return `
        <dialog>
            <div class="modal-backdrop"></div>
            <div class="modal-container">
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
            </div>
        </dialog>
      `;
  }
}

export default RestaurantDetailModal;
