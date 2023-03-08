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

    if (!$targetRestaurant) return;

    if ($targetRestaurant.hasAttribute('favorite')) {
      $targetRestaurant.removeAttribute('favorite');
    } else {
      $targetRestaurant.setAttribute('favorite', '');
    }
  },

  deleteRestaurantInFavoriteList: (restaurantName: string) => {
    const $targetRestaurant = document.querySelector(`r-restaurant[name="${restaurantName}"]`);

    if (!$targetRestaurant) return;

    $targetRestaurant.remove();
  },
};
