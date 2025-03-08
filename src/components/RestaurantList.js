import createElement from '../utils/createElement.js';
import createRestaurantItem from './RestaurantItem.js';

function createRestaurantList(datas) {
  const restaurantList = createElement({ tag: 'ul', className: 'restaurant-list' });

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

export { createRestaurantList, updateRestaurantList };
