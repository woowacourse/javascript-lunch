import './style.css';

import { RestaurantList } from '../../domains';

class FavoriteRestaurantList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const favoriteList = new RestaurantList().list.filter(
      (info) => info.favorite,
    );

    const $restaurantList = document.createElement('ul');
    $restaurantList.className = 'restaurant-list';
    const isFavoriteRestaurant = !!favoriteList[0];

    if (isFavoriteRestaurant) {
      favoriteList.forEach((info) => {
        const $item = document.createElement('restaurant-item');
        $item.setAttribute('name', info.name);

        $restaurantList.appendChild($item);
      });
    }

    if (!isFavoriteRestaurant) {
      $restaurantList.innerHTML = '<none-restaurant></none-restaurant>';
    }

    this.appendChild($restaurantList);
  }
}

customElements.define('favorite-restaurant-list', FavoriteRestaurantList);
