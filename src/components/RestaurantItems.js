import { $ } from '../utils/dom';
import RestaurantDetailModal from './RestaurantDetailModal';

import RestaurantItem from './RestaurantItem';

const html = `
  <ul class="restaurant-list">
  </ul>`;

export default class RestaurantItems {
  updateRestaurant;

  constructor(restaurants, updateRestaurant) {
    this.updateRestaurant = updateRestaurant;

    $('.restaurant-list-container').innerHTML = html;

    restaurants.forEach((restaurant) => new RestaurantItem(restaurant, updateRestaurant));
  }

  renderItems(restaurants, updateRestaurant) {
    restaurants.forEach((restaurant) => new RestaurantItem(restaurant, updateRestaurant));
  }
}
