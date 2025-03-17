import createElement from '../utils/createElement.js';
import createRestaurantItem from './RestaurantItem.js';
import { RESTAURANT_ITEMS } from '../../public/restaurantData.js';

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

function deleteRestaurantById(id) {
  let storedData = JSON.parse(localStorage.getItem('addedRestaurants')) || [];

  storedData = storedData.filter((item) => item.id !== id);
  localStorage.setItem('addedRestaurants', JSON.stringify(storedData));

  const $container = document.querySelector('.restaurant-list-container');
  const $updatedList = createRestaurantList([...RESTAURANT_ITEMS, ...storedData]);

  const oldList = $container.querySelector('.restaurant-list');
  if (oldList) oldList.remove();

  $container.appendChild($updatedList);
}

export { createRestaurantList, updateRestaurantList, deleteRestaurantById };
