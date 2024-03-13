import { RestaurantList } from '../../domains';

class FavoriteRestaurantList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const favoriteList = new RestaurantList().list.filter(
      (info) => info.favorite,
    );

    const $ul = document.createElement('ul');
    $ul.className = 'restaurant-list';

    if (favoriteList) {
      favoriteList.forEach((info) => {
        const $item = document.createElement('restaurant-item');
        $item.setAttribute('name', info.name);

        $ul.appendChild($item);
      });
    }

    if (!favoriteList) {
      const $noneStore = document.createElement('p');
      $noneStore.className = 'none-favorite-store';
      $noneStore.textContent = '자주 가는 음식점이 존재하지 않습니다.';

      $ul.appendChild($noneStore);
    }

    this.appendChild($ul);
  }
}

customElements.define('favorite-restaurant-list', FavoriteRestaurantList);
