import createElement from '../../utils/createElement.js';
import createRestaurantItem from '../createRestaurantItem.js';

function updateRestaurantList(inputData) {
  const $restaurantList = document.querySelector('.restaurant-list');
  const $restaurantItem = createRestaurantItem(inputData);

  $restaurantList.appendChild($restaurantItem);

  return $restaurantList;
}

export default updateRestaurantList;
