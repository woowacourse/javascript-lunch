import render from '.';
import { CustomRestaurantListElement } from '../components';
import Restaurant from '../domain/Restaurant';

export default {
  render: (restaurants: Restaurant[]) => {
    const $restaurantList = document.querySelector<CustomRestaurantListElement>('#restaurant-list');

    if (!$restaurantList) return;

    $restaurantList.setRestaurants(restaurants);
  },

  toggleRestaurantFavorite: (restaurantName: string) => {
    const $targetRestaurant = document.querySelector(`r-restaurant[name="${restaurantName}"]`);
    const $modal = document.querySelector('.modal-container');

    if (!$targetRestaurant) return;

    if ($targetRestaurant.hasAttribute('favorite')) {
      $targetRestaurant.removeAttribute('favorite');
      render.message('success', 'bottom', '자주 가는 음식점에서 제거되었습니다.');
    } else {
      $targetRestaurant.setAttribute('favorite', '');
      render.message('success', $modal ? 'top' : 'bottom', '자주 가는 음식점에 추가되었습니다.');
    }
  },

  deleteRestaurantInFavoriteList: (restaurantName: string) => {
    const $targetRestaurant = document.querySelector(`r-restaurant[name="${restaurantName}"]`);

    if (!$targetRestaurant) return;

    render.closeRestaurantDetailModal();
    $targetRestaurant.remove();
  },
};
