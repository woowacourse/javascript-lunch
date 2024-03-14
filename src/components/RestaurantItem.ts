import Component from './Component';
import RestaurantRepository from '../domain/RestaurantRepository';
import favoriteFilledIcon from '../assets/favorite-icon-filled.png';
import favoriteLinedIcon from '../assets/favorite-icon-lined.png';

class RestaurantItem extends Component {
  #key: number;
  #restaurant: IRestaurant;

  constructor() {
    super();

    this.#key = Number(this.getAttribute('key')) || 0;
    this.#restaurant = RestaurantRepository.getRestaurant(this.#key) as IRestaurant;
  }

  reRender(): void {
    this.#restaurant = RestaurantRepository.getRestaurant(this.#key) as IRestaurant;
    this.connectedCallback();
  }

  setEvent(): void {
    this.$addEvent(`.favorite__button__${this.#key}`, 'click', () => this.#toggleFavorite());
    this.$addEvent(`.restaurant__info__${this.#key}`, 'click', () => this.#openModal());
  }

  #openModal() {
    this.$setAttribute(`.restaurant__${this.#key} > restaurant-detail-modal`, 'open', 'true');
  }

  #toggleFavorite() {
    RestaurantRepository.toggleFavoriteRestaurant(this.#key);
    this.reRender();
  }

  #handleFavoriteIcon(isFavorite: boolean) {
    console.log(isFavorite);
    return isFavorite
      ? `<img src=${favoriteFilledIcon} alt="즐겨찾기"></img>`
      : `<img src=${favoriteLinedIcon} alt="즐겨찾기"></img>`;
  }

  template() {
    return `
      <div class="restaurant restaurant__${this.#key}">
        <category-icon category=${this.#restaurant.category}></category-icon>
        <div class="restaurant__info restaurant__info__${this.#key}">
          <h3 class="restaurant__name text-subtitle">${this.#restaurant.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${this.#restaurant.distance}분 내</span>
          <p class="restaurant__description text-body">
            ${this.#restaurant.description || ''}
          </p>
        </div>
        <button class="favorite__button favorite__button__${this.#key}">
          ${this.#handleFavoriteIcon(this.#restaurant.isFavorite)}
        </button>
        <restaurant-detail-modal key=${this.#key} open="false"></restaurant-detail-modal>
      </div>
    `;
  }
}

export default RestaurantItem;
