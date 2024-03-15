import Component from './core/Component';
import { $addEvent } from '../utils/dom';
import RestaurantRepository from '../domain/RestaurantRepository';
import favoriteFilledIcon from '../assets/favorite-icon-filled.png';
import favoriteLinedIcon from '../assets/favorite-icon-lined.png';

class FavoriteButton extends Component {
  #key: number;
  #isFavorite: boolean;

  constructor() {
    super();

    this.#key = Number(this.getAttribute('key')) ?? 0;
    this.#isFavorite = JSON.parse(this.getAttribute('isFavorite') ?? 'false');
  }

  setEvent(): void {
    $addEvent(this, '.favorite__button', 'click', this.#toggleFavorite.bind(this));
  }

  #toggleFavorite(): void {
    RestaurantRepository.toggleFavoriteRestaurant(this.#key);
    this.#isFavorite = !this.#isFavorite;
    this.render();
  }

  template(): string {
    return `
      <button class="favorite__button">
        <img src=${this.#isFavorite ? favoriteFilledIcon : favoriteLinedIcon} alt="즐겨찾기">
      </button>`;
  }
}

export default FavoriteButton;
