/* eslint-disable max-lines-per-function */
import { RestaurantState } from '../../types/index.d';
import { renderRestaurantList } from './renderHandlers';
import { bindChangeFavoriteIconStateHandler } from '../restaurantListItem/favoriteStateChangeHandler';

function RestaurantList(filterData: RestaurantState[]) {
  const main = document.querySelector('main');
  const existingSection = document.querySelector('.restaurant-list-container');
  const restaurantList = renderRestaurantList(filterData);

  if (main && existingSection) main.removeChild(existingSection);
  if (main) main.appendChild(restaurantList);
  bindChangeFavoriteIconStateHandler();
}

export default RestaurantList;
