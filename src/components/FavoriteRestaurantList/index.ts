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

    this.#addEventToFavoriteIconInFavoriteList();
  }

  #addEventToFavoriteIconInFavoriteList() {
    const $favoriteIcon = this.querySelectorAll('favorite-icon');

    $favoriteIcon?.forEach(($el) => {
      $el.addEventListener('click', (event) =>
        this.#handleClickToRemoveFromDisplay(event),
      );
    });
  }

  #handleClickToRemoveFromDisplay(event: Event) {
    event.stopPropagation();

    const { currentTarget } = event;

    if (!(currentTarget instanceof HTMLElement)) return;
    const $restaurant = currentTarget.closest('restaurant-item');
    const favorite = currentTarget.getAttribute('favorite');

    if (favorite !== 'false' || !$restaurant) return;
    const $restaurantList = this.querySelector('.restaurant-list');

    $restaurantList?.removeChild($restaurant);

    if ($restaurantList?.childElementCount === 0) {
      $restaurantList.innerHTML = '<none-restaurant></none-restaurant>';
    }
  }
}

customElements.define('favorite-restaurant-list', FavoriteRestaurantList);
