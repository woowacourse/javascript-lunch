import $template from './index.html';
import { Restaurant } from '../../types';
import { $ } from '../../utils/dom';

class RestaurantItems extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = $template;
  }

  render(restaurants: Restaurant[]) {
    this.innerHTML = $template;
    const $restaurantList = $<HTMLElement>('.restaurant-list', this);

    restaurants.forEach((restaurant) => {
      $restaurantList.insertAdjacentHTML('beforeend', this.createRestaurantItem(restaurant));
    });
  }

  createRestaurantItem(restaurant: Restaurant) {
    const { category, name, distance, description } = restaurant;
    return `<restaurant-item category=${category} name=${name} distance=${distance} description=${description}></restaurant-item>`;
  }
}

export default RestaurantItems;
