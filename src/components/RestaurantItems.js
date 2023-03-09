import { $ } from '../utils/dom';
import store from '../utils/store';
import RestaurantDetailModal from './RestaurantDetailModal';

import RestaurantItem from './RestaurantItem';

const html = `
  <ul class="restaurant-list">
  </ul>`;

export default class RestaurantItems {
  restaurants;
  updateRestaurant;
  deleteRestaurant;

  constructor(restaurants, updateRestaurant, deleteRestaurant) {
    this.restaurants = restaurants;
    this.updateRestaurant = updateRestaurant;
    this.deleteRestaurant = deleteRestaurant;

    $('.restaurant-list-container').innerHTML = html;

    restaurants.forEach((restaurant) => new RestaurantItem(restaurant));

    $('.restaurant-list').addEventListener('click', this.onClickRestaurant.bind(this));
  }

  onClickRestaurant(e) {
    const restaurantId = e.target.closest('li').id;
    const restaurantIndex = this.restaurants.findIndex((restaurant) => {
      return restaurant.id === restaurantId;
    });

    if ([...e.target.classList].includes('favorite-icon')) {
      return this.onClickStarIcon(restaurantId, restaurantIndex);
    }

    new RestaurantDetailModal(this.restaurants[restaurantIndex], this.deleteRestaurant);
  }

  onClickStarIcon(restaurantId, restaurantIndex) {
    const isLiked = !this.restaurants[restaurantIndex].liked;
    this.restaurants[restaurantIndex].liked = isLiked;

    const likeStar = $(`#${restaurantId} .like-star`);
    isLiked ? likeStar.classList.remove('hidden') : likeStar.classList.add('hidden');

    const updatedRestaurants = this.updateRestaurant(restaurantId, isLiked);

    store.setLocalStorage(updatedRestaurants);
  }
}
