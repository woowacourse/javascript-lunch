import './RestaurantList.css';

import RestaurantItem from './RestaurantItem';

export default class RestaurantList extends HTMLUListElement {
  constructor() {
    super();
    this.classList.add('restaurant-list');
  }

  static observedAttributes = ['data-restaurants'];

  get restaurants() {
    if (!this.dataset.restaurants) {
      return [];
    }
    return JSON.parse(this.dataset.restaurants);
  }

  set restaurants(value) {
    this.setAttribute('data-restaurants', JSON.stringify(value));
  }

  attributeChangedCallback() {
    this.#updateList();
  }

  #updateList() {
    this.innerHTML = '';

    const fragment = document.createDocumentFragment();
    this.restaurants?.forEach((restaurant) => {
      const restaurantItem = this.#getRestaurantItem(restaurant);
      fragment.appendChild(restaurantItem);
    });
    this.appendChild(fragment);
  }

  #getRestaurantItem(restaurant) {
    const restaurantItem = new RestaurantItem();
    restaurantItem.restaurant = restaurant;
    return restaurantItem;
  }
}
