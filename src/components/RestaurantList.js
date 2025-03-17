import createElement from '../utils/createElement.js';
import createRestaurantItem from './RestaurantItem.js';
import { getAllRestaurants, deleteRestaurantById } from '../services/RestaurantListService.ts';

function createRestaurantList(datas) {
  const restaurantList = createElement('ul', 'restaurant-list');

  const fragment = new DocumentFragment();
  datas.forEach((data) => {
    const restaurantItem = createRestaurantItem(data);
    fragment.appendChild(restaurantItem);
  });

  restaurantList.appendChild(fragment);

  return restaurantList;
}

function updateRestaurantList(inputData) {
  const $restaurantList = document.querySelector('.restaurant-list');
  const $restaurantItem = createRestaurantItem(inputData);

  $restaurantList.appendChild($restaurantItem);

  return $restaurantList;
}

function handleDeleteRestaurant(id) {
  deleteRestaurantById(id);

  const $container = document.querySelector('.restaurant-list-container');
  const $updatedList = createRestaurantList(getAllRestaurants());

  const oldList = $container.querySelector('.restaurant-list');
  if (oldList) oldList.remove();

  $container.appendChild($updatedList);
}

export { createRestaurantList, updateRestaurantList, handleDeleteRestaurant };
