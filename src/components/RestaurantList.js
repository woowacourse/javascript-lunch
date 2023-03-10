import { $, dispatchCustomEvent } from '../utils/dom';

customElements.define(
  'restaurant-list',
  class RestaurantList extends HTMLElement {
    constructor() {
      super();
    }

    render(restaurants) {
      this.innerHTML = /* html */ `
      <ul class="restaurant-list">
      ${restaurants
        .map(
          (restaurant) => /* html */ `
          <restaurant-list-item
            data-id="${restaurant.id}"
            category="${restaurant.category}"
            restaurantName="${restaurant.name}"
            distance="${restaurant.distance}"
            description="${restaurant.description}"
            link="${restaurant.link}"
            isFavorite="${restaurant.isFavorite}"
          ></restaurant-list-item>
        `
        )
        .join('')}
      </ul>`;
    }

    connectedCallback() {
      this.addEventListener('click', (e) => this.handleListItemClick(e));
      this.addEventListener('click', (e) => this.handleFavoriteButtonClick(e));
    }

    handleListItemClick(e) {
      if (this.isFavoriteButtonClicked(e.target)) return;

      const item = this.getListItem(e.target);

      if (!item) return;

      dispatchCustomEvent($('.restaurant-list-container'), {
        eventType: 'openRestaurantDetailModal',
        data: item.dataset.id,
      });
    }

    handleFavoriteButtonClick(e) {
      if (!this.isFavoriteButtonClicked(e.target)) return;

      const item = this.getListItem(e.target);

      if (!item) return;

      dispatchCustomEvent($('body'), {
        eventType: 'toggleFavorite',
        data: item.dataset.id,
      });
    }

    isFavoriteButtonClicked($target) {
      return !!$target.closest('.favorite');
    }

    getListItem($target) {
      return $target.closest('restaurant-list-item');
    }
  }
);
