import BaseComponent from '../baseComponent/BaseComponent.js';
import restaurantAPI from '../../util/restaurantAPI';
import { EVENT } from '../../types/types';
import { $ } from '../../util/dom';

class RestaurantListComponent extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    const instance = this.getTemplate('#restaurant-list-template');
    this.render(instance);
    this.setEvent();

    // window.setTimeout(this.#handleCreateCards.bind(this), 0);
    this.#handleLoadRestaurants();
  }

  setEvent() {
    this.on(
      { target: document, eventName: EVENT.clickedModalSubmitButton },
      this.#handleLoadRestaurants.bind(this)
    );
    this.on({ target: document, eventName: 'change' }, this.#handleLoadRestaurants.bind(this));
  }

  removeEvent() {}

  #handleLoadRestaurants() {
    this.replaceChildren();
    const $categoryFilter = $(`#category-filter .restaurant-filter`);
    const $sortingFilter = $(`#sorting-filter .restaurant-filter`);
    const list = restaurantAPI.load(
      $categoryFilter.getAttribute('name'),
      $sortingFilter.getAttribute('name')
    );
    list.forEach((restaurant) => {
      const $card = document.createElement('restaurant-card');
      $card.dataset.category = restaurant.category;
      $card.dataset.name = restaurant.name;
      $card.dataset.distance = restaurant.distance;
      $card.dataset.description = restaurant.description;
      // $card.dataset.link = restaurant.link;
      this.appendChild($card);
    });
  }
}

customElements.define('restaurant-list', RestaurantListComponent);
