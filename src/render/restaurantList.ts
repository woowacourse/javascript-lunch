import render from '.';
import { CustomRestaurantListElement } from '../components';
import Restaurant from '../domain/Restaurant';
import { ALERT_MESSAGE } from '../utils/constants';
import errorHandler from '../utils/errorHandler';

export default {
  render: (restaurants: Restaurant[]) => {
    const $restaurantList = document.querySelector<CustomRestaurantListElement>('#restaurant-list');

    if (!$restaurantList) return errorHandler.doesNotExistElement();

    $restaurantList.setRestaurants(restaurants);
  },

  toggleRestaurantFavorite: (restaurantName: string) => {
    const $targetRestaurant = document.querySelector(`r-restaurant[name="${restaurantName}"]`);
    const $modal = document.querySelector('.modal-container');

    if (!$targetRestaurant) return errorHandler.doesNotExistElement();

    if ($targetRestaurant.hasAttribute('favorite')) {
      $targetRestaurant.removeAttribute('favorite');
      render.message('success', 'bottom', ALERT_MESSAGE.removeFavorite);
    } else {
      $targetRestaurant.setAttribute('favorite', '');
      render.message('success', $modal ? 'top' : 'bottom', ALERT_MESSAGE.addFavorite);
    }
  },

  deleteRestaurantInFavoriteList: (restaurantName: string) => {
    const $targetRestaurant = document.querySelector(`r-restaurant[name="${restaurantName}"]`);

    if (!$targetRestaurant) return errorHandler.doesNotExistElement();

    render.closeRestaurantDetailModal();
    $targetRestaurant.remove();
  },
};
