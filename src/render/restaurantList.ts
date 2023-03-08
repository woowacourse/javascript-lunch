import { CustomRestaurantListElement } from '../components';
import Restaurant from '../domain/Restaurant';

export default (restaurants: Restaurant[]) => {
  const $restaurantList = document.querySelector<CustomRestaurantListElement>('#restaurant-list');

  if (!$restaurantList) return;

  $restaurantList.setRestaurants(restaurants);
};
