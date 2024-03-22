import './RestaurantList.css';

import RestaurantItem from '../RestaurantItem/RestaurantItem';

export default class RestaurantList extends HTMLUListElement {
  #restaurants = [];

  constructor() {
    super();
    this.classList.add('restaurant-list');
  }

  get restaurants() {
    return [...this.#restaurants];
  }

  set restaurants(restaurants) {
    this.#restaurants = restaurants ? [...restaurants] : [];
    this.#updateList();
  }

  #updateList() {
    this.innerHTML = '';

    const fragment = document.createDocumentFragment();
    this.restaurants.forEach((restaurant) => {
      const restaurantItem = new RestaurantItem(restaurant);
      fragment.appendChild(restaurantItem);
    });
    this.appendChild(fragment);
  }
}
