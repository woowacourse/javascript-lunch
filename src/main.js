import { DOM } from './dom.js';
import { RestaurantList } from './RestaurantList.js';
import Header from './components/header.js';
import RestaurantItem from './components/restaurantItem.js';

new Header();

const createRestaurantList = (restaurantList) => {
  restaurantList.forEach((restaurant) => {
    const restaurantItem = new RestaurantItem(restaurant);
    DOM.RESTAURANT_LIST.appendChild(restaurantItem);
  });
};

createRestaurantList(RestaurantList);
