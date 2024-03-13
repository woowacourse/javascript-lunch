import './style.css';

import FavoriteTrueIcon from '../../assets/svg/favorite-icon-filled.svg';
import FavoriteFalseIcon from '../../assets/svg/favorite-icon-lined.svg';
import { RestaurantList } from '../../domains';
import { getFavoriteAttributeValue } from '../../utils';

const FAVORITE_IMG = {
  true: FavoriteTrueIcon,
  false: FavoriteFalseIcon,
};

class FavoriteIcon extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const storeName = this.getAttribute('store-name');
    const favorite = this.getAttribute('favorite');

    this.innerHTML = /* html */ `
    <button>
      <img src="${FAVORITE_IMG[favorite === 'true' ? 'true' : 'false']}" />
    </button>
  `;

    if (storeName) {
      this.addEventListener('click', (event) =>
        this.#handleClickForFavorite(event, storeName),
      );
    }
  }

  #handleClickForFavorite(event: MouseEvent, storeName: string) {
    event.stopPropagation();

    const $favoriteIcon = event.currentTarget as HTMLElement | null;
    const $img = $favoriteIcon?.querySelector('img');
    const restaurantList = new RestaurantList();

    if (storeName) {
      restaurantList.changeFavorite(storeName);
    }

    if (
      $favoriteIcon instanceof HTMLElement &&
      $img instanceof HTMLImageElement
    ) {
      const prevFavorite = $favoriteIcon.getAttribute('favorite');
      const changedFavorite = !(prevFavorite === 'true');

      $favoriteIcon.setAttribute(
        'favorite',
        getFavoriteAttributeValue(changedFavorite),
      );

      $img.src = FAVORITE_IMG[changedFavorite ? 'true' : 'false'];
    }
  }
}

customElements.define('favorite-icon', FavoriteIcon);
