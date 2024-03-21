import Component from '../_core/Component';
import RestaurantRepository from '../../domain/RestaurantRepository';
import { $addEvent } from '../../utils/dom';
import favoriteFilledIcon from '../../assets/favorite-icon-filled.png';
import favoriteLinedIcon from '../../assets/favorite-icon-lined.png';

import './FavoriteButton.css';

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
    this.makeCustomEvent('updateRestaurant');
  }

  template(): string {
    return `
      <button class="favorite__button" type="button">
        ${
          this.#isFavorite
            ? `<img src=${favoriteFilledIcon} alt="즐겨찾기">`
            : `<img src=${favoriteLinedIcon} alt="즐겨찾기 해제">`
        }
      </button>
    `;
  }
}

export default FavoriteButton;
