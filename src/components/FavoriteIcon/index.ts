import './style.css';

import FavoriteTrueIcon from '../../assets/svg/favorite-icon-filled.svg';
import FavoriteFalseIcon from '../../assets/svg/favorite-icon-lined.svg';

import { RestaurantList } from '../../domains';
import { RestaurantListController } from '../../services';
import { getFavoriteAttributeValue } from '../../utils';

class FavoriteIcon extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const storeName = this.getAttribute('store-name');
    const favorite = this.getAttribute('favorite');

    const $btn = document.createElement('button');
    const $favoriteTrueImg = document.createElement('img');
    const $favoriteFalseImg = document.createElement('img');

    this.className = this.#getClassName(favorite);

    $favoriteTrueImg.className = 'favorite-true-img';
    $favoriteTrueImg.src = FavoriteTrueIcon;

    $favoriteFalseImg.className = 'favorite-false-img';
    $favoriteFalseImg.src = FavoriteFalseIcon;

    $btn.appendChild($favoriteTrueImg);
    $btn.appendChild($favoriteFalseImg);
    this.appendChild($btn);

    if (storeName) {
      this.addEventListener('click', (event) =>
        this.#handleClickForFavorite(event, storeName),
      );
    }
  }

  #getClassName(favorite: string | null) {
    return `favorite-${favorite === 'true' || 'false'}`;
  }

  #handleClickForFavorite(event: MouseEvent, storeName: string) {
    event.stopPropagation();

    const $favoriteIcon = event.currentTarget as HTMLElement | null;
    const restaurantList = new RestaurantList();

    if (!storeName) return;
    // 데이터 변경
    restaurantList.changeFavorite(storeName);
    // ui 변경
    if ($favoriteIcon instanceof HTMLElement) {
      this.#changeUIByChangingFavorite($favoriteIcon);
    }
  }

  #changeUIByChangingFavorite($favoriteIcon: HTMLElement) {
    const prevFavorite = $favoriteIcon.getAttribute('favorite');
    const changedFavorite = getFavoriteAttributeValue(
      !(prevFavorite === 'true'),
    );
    // 해당 즐겨찾기 아이콘 변경
    $favoriteIcon.setAttribute('favorite', changedFavorite);
    $favoriteIcon.setAttribute('class', this.#getClassName(changedFavorite));

    // 즐겨찾기 변경에 따른 음식점 목록 수정
    const $allRestaurantList = document.querySelector('.all-restaurant-list');

    if ($allRestaurantList) {
      RestaurantListController.injectAllRestaurantList(
        new RestaurantList().list,
      );
      return;
    }

    RestaurantListController.injectFavoriteRestaurantList();
  }
}

customElements.define('favorite-icon', FavoriteIcon);
