import { DOM } from './dom.js';
import Header from './components/Header.js';
import RestaurantItem from './components/RestaurantItem.js';
import AddRestaurantModal from './modal/AddRestaurantModal.js';
import RestaurantList from './RestaurantList.js';

const addRestaurantModal = new AddRestaurantModal();
const modalClickHandler = () => {
  addRestaurantModal.openModal();
};
new Header(modalClickHandler);
new RestaurantList();
