import { DOM } from './dom.js';
import { RestaurantList } from './RestaurantList.js';
import Header from './components/Header.js';
import RestaurantItem from './components/RestaurantItem.js';
import AddRestaurantModal from './modal/AddRestaurantModal.js';

new Header();

const createRestaurantList = (restaurantList) => {
  restaurantList.forEach((restaurant) => {
    const restaurantItem = new RestaurantItem(restaurant);
    DOM.RESTAURANT_LIST.appendChild(restaurantItem);
  });
};

createRestaurantList(RestaurantList);

new AddRestaurantModal(); //모달창 테스트하기 위함.
