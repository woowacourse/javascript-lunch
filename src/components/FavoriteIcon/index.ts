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

    const favoriteIconEl = event.currentTarget as HTMLElement | null;
    const imgEl = favoriteIconEl?.querySelector('img');
    const restaurantList = new RestaurantList();

    if (storeName) {
      restaurantList.changeFavorite(storeName);
    }

    if (
      favoriteIconEl instanceof HTMLElement &&
      imgEl instanceof HTMLImageElement
    ) {
      const prevFavorite = favoriteIconEl.getAttribute('favorite');
      const changedFavorite = !(prevFavorite === 'true');

      favoriteIconEl.setAttribute(
        'favorite',
        getFavoriteAttributeValue(changedFavorite),
      );

      imgEl.src = FAVORITE_IMG[changedFavorite ? 'true' : 'false'];
    }
  }
}

customElements.define('favorite-icon', FavoriteIcon);
