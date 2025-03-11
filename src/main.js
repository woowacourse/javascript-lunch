import { DOM } from './dom.js';
import { RestaurantList } from './Domain/RestaurantList.js';
import Header from './UI/components/Header.js';
import RestaurantItem from './UI/components/RestaurantItem.js';
import AddRestaurantModal from './UI/modal/AddRestaurantModal.js';

const addRestaurantModal = new AddRestaurantModal();
new Header(() => addRestaurantModal.handleToggleModal());

const createRestaurantList = (restaurantList) => {
  restaurantList.forEach((restaurant) => {
    const restaurantItem = new RestaurantItem(restaurant);
    DOM.RESTAURANT_LIST.appendChild(restaurantItem);
  });
};

createRestaurantList(RestaurantList);
