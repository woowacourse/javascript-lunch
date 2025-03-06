import { DOM } from './dom.js';
import { RestaurantList } from './RestaurantList.js';
import Header from './components/Header.js';
import RestaurantItem from './components/RestaurantItem.js';
import Modal from './components/Modal.js';

new Header();

const createRestaurantList = (restaurantList) => {
  restaurantList.forEach((restaurant) => {
    const restaurantItem = new RestaurantItem(restaurant);
    DOM.RESTAURANT_LIST.appendChild(restaurantItem);
  });
};

createRestaurantList(RestaurantList);

const modal = new Modal();
DOM.APP.appendChild(modal);
