import Component from './Component';
import RestaurantRepository from '../domain/RestaurantRepository';
import favoriteFilledIcon from '../assets/favorite-icon-filled.png';
import favoriteLinedIcon from '../assets/favorite-icon-lined.png';

class RestaurantDetailModal extends Component {
  static observedAttributes = ['key', 'open'];

  #key: number;
  #restaurant: IRestaurant;

  constructor() {
    super();

    this.#key = Number(this.getAttribute('key')) || 0;
    this.#restaurant = RestaurantRepository.getRestaurant(this.#key) as IRestaurant;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    this.render();
    this.setEvent();

    if (newValue) {
      this.#updateModal(JSON.parse(newValue));
    }
  }

  setEvent() {
    this.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).classList.contains('button--primary')) {
        this.#updateModal(false);
      }

      if ((event.target as HTMLElement).classList.contains('button--secondary')) {
        this.#updateModal(false);
      }
    });
  }

  #updateModal(isOpen: boolean) {
    if (isOpen) {
      this.$('.modal').classList.add('modal--open');
    } else {
      this.$('.modal').classList.remove('modal--open');
    }
  }

  #handleFavoriteIcon(isFavorite: boolean) {
    return isFavorite
      ? `<img src=${favoriteFilledIcon} alt="즐겨찾기"></img>`
      : `<img src=${favoriteLinedIcon} alt="즐겨찾기"></img>`;
  }

  template() {
    return `
        <div class="modal">
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
        </div>
      `;
  }
}

export default RestaurantDetailModal;
