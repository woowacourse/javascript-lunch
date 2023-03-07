import { $ } from '../utils/dom';

import RestaurantItem from './RestaurantItem';

const html = `
  <ul class="restaurant-list">
  </ul>`;

export default class RestaurantItems {
  constructor(restaurants) {
    $('.restaurant-list-container').innerHTML = html;
    this.renderItems(restaurants);
  }

  renderItems(restaurants) {
    restaurants.forEach((restaurant) => new RestaurantItem(restaurant));
  }
}
