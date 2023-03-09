import { $ } from '../utils/dom';

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
          ></restaurant-list-item>
        `
        )
        .join('')}
      </ul>`;
    }

    connectedCallback() {
      this.addEventListener('click', (e) => this.handleListItemClick(e));
    }

    handleListItemClick(e) {
      const item = e.target.closest('restaurant-list-item');

      if (!item) return;

      this.openRestaurantDetailModal({
        id: item.dataset.id,
        category: item.getAttribute('category'),
        restaurantName: item.getAttribute('restaurantName'),
        distance: item.getAttribute('distance'),
        description: item.getAttribute('description'),
        link: item.getAttribute('link'),
      });
    }

    openRestaurantDetailModal(restaurant) {
      const { id, category, restaurantName, distance, description, link } = restaurant;

      $('.modal-container').replaceChildren();
      $('.modal-container').insertAdjacentHTML(
        'beforeend',
        /* html */ `
      <restaurant-detail-modal
        data-id="${id}"
        category="${category}"
        restaurantName="${restaurantName}"
        distance="${distance}"
        description="${description ? description : ''}"
        link="${link ? link : ''}"
      ></restaurant-detail-modal>`
      );
      $('custom-modal').openModal();
    }
  }
);
