import createElement from '../utils/createElement.js';
import createRestaurantItem from './RestaurantItem.js';

function createRestaurantList(datas, onItemClick, onStarClick) {
  const restaurantList = createElement({ tag: 'ul', className: 'restaurant-list' });

  const fragment = new DocumentFragment();

  datas.forEach((data) => {
    const restaurantItem = createRestaurantItem(data, onItemClick, onStarClick);
    fragment.appendChild(restaurantItem);
  });

  restaurantList.appendChild(fragment);

  return restaurantList;
}

function addRestaurantList(inputData, onItemClick, onStarClick) {
  const $restaurantList = document.querySelector('.restaurant-list');
  const $restaurantItem = createRestaurantItem(inputData, onItemClick, onStarClick);

  $restaurantList.appendChild($restaurantItem);

  return $restaurantList;
}

function updateRestaurantList(datas, onItemClick, onStarClick) {
  const $listContainer = document.querySelector('.restaurant-list-container');
  $listContainer.replaceChildren();

  const restaurantList = createElement({ tag: 'ul', className: 'restaurant-list' });
  const fragment = new DocumentFragment();

  datas.forEach((data) => {
    const restaurantItem = createRestaurantItem(data, onItemClick, onStarClick);
    fragment.appendChild(restaurantItem);
  });

  restaurantList.appendChild(fragment);
  $listContainer.appendChild(restaurantList);

  return $listContainer;
}

export { createRestaurantList, updateRestaurantList, addRestaurantList };
