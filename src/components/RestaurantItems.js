import { $ } from '../utils/dom';

import RestaurantItem from './RestaurantItem';

const html = `
  <ul class="restaurant-list">
  </ul>`;

export default class RestaurantItems {
  constructor(restaurants, onClickRestaurant) {
    $('.restaurant-list-container').innerHTML = html;

    restaurants.forEach((restaurant) => new RestaurantItem(restaurant));

    $('.restaurant-list').addEventListener('click', onClickRestaurant.bind(this));
  }
}
