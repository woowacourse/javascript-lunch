import init from './init';
import restaurantList from './restaurantList';
import registerRestaurantModal from './registerRestaurantModal';
import restaurantDetailModal from './restaurantDetailModal';

export default {
  init,

  restaurantList,

  openRegisterRestaurantModal: registerRestaurantModal.open,
  closeRegisterRestaurantModal: registerRestaurantModal.close,

  openRestaurantDetailModal: restaurantDetailModal.open,
  closeRestaurantDetailModal: restaurantDetailModal.close,
};
