import createElement from '../utils/createElement.js';
import createRestaurantItem from './RestaurantItem.js';

function createRestaurantList(datas, handleClick) {
  const restaurantList = createElement({ tag: 'ul', className: 'restaurant-list' });

  const fragment = new DocumentFragment();

  datas.forEach((data) => {
    const restaurantItem = createRestaurantItem(data.getInfo(), handleClick);
    fragment.appendChild(restaurantItem);
  });

  restaurantList.appendChild(fragment);

  return restaurantList;
}

function addRestaurantList(inputData, handleClick) {
  const $restaurantList = document.querySelector('.restaurant-list');
  const $restaurantItem = createRestaurantItem(inputData, handleClick);

  $restaurantList.appendChild($restaurantItem);

  return $restaurantList;
}

function updateRestaurantList(datas, handleClick) {
  const $listContainer = document.querySelector('.restaurant-list-container');
  $listContainer.replaceChildren();

  const restaurantList = createElement({ tag: 'ul', className: 'restaurant-list' });
  const fragment = new DocumentFragment();

  datas.forEach((data) => {
    const restaurantItem = createRestaurantItem(data.getInfo(), handleClick);
    fragment.appendChild(restaurantItem);
  });

  restaurantList.appendChild(fragment);
  $listContainer.appendChild(restaurantList);

  return $listContainer;
}

export { createRestaurantList, updateRestaurantList, addRestaurantList };
