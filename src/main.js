import { DOM } from './dom.js';
import { createHeader } from './components/header.js';
import { createRestaurantItem } from './components/restaurantItem.js';
import { RestaurantList } from './restaurantList.js';

createHeader();

const createRestaurantList = (restaurantList) => {
  restaurantList.forEach((restaurant) => {
    const restaurantItem = createRestaurantItem(restaurant);
    DOM.RESTAURANT_LIST.appendChild(restaurantItem);
  });
};

createRestaurantList(RestaurantList);
