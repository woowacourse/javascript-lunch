import createRestaurantItem from './createRestaurantItem.js';

function createRestaurantList(data) {
  const restaurantList = createElement('ul', 'restaurant-list');

  const fragment = new DocumentFragment();
  data.forEach((data) => {
    const restaurantItem = createRestaurantItem(data);
    fragment.appendChild(restaurantItem);
  });

  restaurantList.appendChild(fragment);

  return restaurantList;
}

export default createRestaurantList;
