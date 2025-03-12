import { DOM } from './dom.js';
import { getRestaurantList } from './Domain/services/RestaurantService.js';
import Header from './UI/components/header/Header.js';
import RestaurantItem from './UI/components/restaurant/RestaurantItem.js';
import AddRestaurantModal from './UI/modal/AddRestaurantModal.js';

const addRestaurantModal = new AddRestaurantModal();
new Header(() => addRestaurantModal.handleToggleModal());

const createRestaurantList = (restaurantList) => {
  restaurantList.forEach((restaurant) => {
    const restaurantItem = new RestaurantItem(restaurant);
    DOM.RESTAURANT_LIST.appendChild(restaurantItem);
  });
};

createRestaurantList(getRestaurantList());
