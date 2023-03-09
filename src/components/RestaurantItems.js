import { $ } from '../utils/dom';

import RestaurantItem from './RestaurantItem';

const html = `
  <ul class="restaurant-list">
  </ul>`;

export default class RestaurantItems {
  constructor(restaurants, updateRestaurant) {
    $('.restaurant-list-container').innerHTML = html;

    this.renderItems(restaurants, updateRestaurant);
  }

  renderItems(restaurants, updateRestaurant) {
    restaurants.forEach((restaurant) => new RestaurantItem(restaurant, updateRestaurant));
  }
}
