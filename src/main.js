import { DOM } from './dom.js';
import { createRestaurantItem } from './components/restaurantItem.js';
import { RestaurantList } from './RestaurantList.js';
import Header from './components/header.js';

new Header();

const createRestaurantList = (restaurantList) => {
  restaurantList.forEach((restaurant) => {
    const restaurantItem = createRestaurantItem(restaurant);
    DOM.RESTAURANT_LIST.appendChild(restaurantItem);
  });
};

createRestaurantList(RestaurantList);
