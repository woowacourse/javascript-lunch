import './style.css';

import FavoriteTrueIcon from '../../assets/svg/favorite-icon-filled.svg';
import FavoriteFalseIcon from '../../assets/svg/favorite-icon-lined.svg';

import { RestaurantList } from '../../domains';
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

  #getAllFavoriteIconAboutStore(storeName: string) {
    const $allFavoriteIconAboutStore = [
      ...document.querySelectorAll('favorite-icon'),
    ]?.filter((el) => {
      const name = el.getAttribute('store-name');

      return name === storeName;
    });

    return $allFavoriteIconAboutStore;
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
      this.#changeUIByChangingFavorite($favoriteIcon, storeName);
    }
  }

  #changeUIByChangingFavorite($favoriteIcon: HTMLElement, storeName: string) {
    const prevFavorite = $favoriteIcon.getAttribute('favorite');
    const changedFavorite = getFavoriteAttributeValue(
      !(prevFavorite === 'true'),
    );
    const $allFavoriteIconAboutStore =
      this.#getAllFavoriteIconAboutStore(storeName);

    // 음식점 정보 모달에서 즐겨찾기 변경해도, 모든 음식점 또는 자주 가는 음식점 리스트 화면에서 즐겨찾기 아이콘도 변경되도록 함
    $allFavoriteIconAboutStore.forEach((el) => {
      el.setAttribute('favorite', changedFavorite);
      el.setAttribute('class', this.#getClassName(changedFavorite));

      // 자주 가는 목록이 열려있고  음식점 정보 모달 내에서 즐겨찾기를 취소했을대 적용
      if (document.querySelector('favorite-restaurant-list')) {
        this.#removeItemFromFavoriteList(el);
      }
    });
  }

  #removeItemFromFavoriteList($favoriteIcon: Element) {
    const $restaurantList = $favoriteIcon.closest('.restaurant-list');
    const $restaurantItem = $favoriteIcon.closest('restaurant-item');
    if (!$restaurantList || !$restaurantItem) return;

    $restaurantList?.removeChild($restaurantItem);

    if ($restaurantList?.childElementCount === 0) {
      $restaurantList.innerHTML = '<none-restaurant></none-restaurant>';
    }
  }
}

customElements.define('favorite-icon', FavoriteIcon);
