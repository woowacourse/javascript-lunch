import { DOM } from './dom.js';
import { RestaurantList } from './RestaurantList.js';
import Header from './components/Header.js';
import RestaurantItem from './components/RestaurantItem.js';
import AddRestaurantModal from './modal/AddRestaurantModal.js';

const addRestaurantModal = new AddRestaurantModal();
new Header(addRestaurantModal);

const createRestaurantList = (restaurantList) => {
  restaurantList.forEach((restaurant) => {
    const restaurantItem = new RestaurantItem(restaurant);
    DOM.RESTAURANT_LIST.appendChild(restaurantItem);
  });
};

createRestaurantList(RestaurantList);
