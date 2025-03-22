import createElement from '../utils/createElement.js';
import createRestaurantItem from './RestaurantItem.js';

function createRestaurantList({ datas, onClickItem, onClickStar }) {
  const restaurantList = createElement({ tag: 'ul', className: 'restaurant-list' });

  const fragment = new DocumentFragment();

  datas.forEach((data) => {
    const restaurantItem = createRestaurantItem({ data, onClickItem, onClickStar });
    fragment.appendChild(restaurantItem);
  });

  restaurantList.appendChild(fragment);

  return restaurantList;
}

function addRestaurantList({ data, onClickItem, onClickStar }) {
  const $restaurantList = document.querySelector('.restaurant-list');
  const $restaurantItem = createRestaurantItem({ data, onClickItem, onClickStar });

  $restaurantList.appendChild($restaurantItem);

  return $restaurantList;
}

function updateRestaurantList({ datas, onClickItem, onClickStar }) {
  const $listContainer = document.querySelector('.restaurant-list-container');
  $listContainer.replaceChildren();

  const restaurantList = createElement({ tag: 'ul', className: 'restaurant-list' });
  const fragment = new DocumentFragment();

  datas.forEach((data) => {
    const restaurantItem = createRestaurantItem({ data, onClickItem, onClickStar });
    fragment.appendChild(restaurantItem);
  });

  restaurantList.appendChild(fragment);
  $listContainer.appendChild(restaurantList);

  return $listContainer;
}

export { createRestaurantList, updateRestaurantList, addRestaurantList };
