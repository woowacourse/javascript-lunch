import { $ } from '../utils/dom';
import RestaurantDetailModal from './RestaurantDetailModal';

import RestaurantItem from './RestaurantItem';

const html = `
  <ul class="restaurant-list">
  </ul>`;

export default class RestaurantItems {
  constructor(restaurants, updateRestaurant) {
    $('.restaurant-list-container').innerHTML = html;

    restaurants.forEach((restaurant) => new RestaurantItem(restaurant, updateRestaurant));
  }
}
