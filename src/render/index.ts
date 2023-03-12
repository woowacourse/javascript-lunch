import registerRestaurantModal from './registerRestaurantModal';
import restaurantList from './restaurantList';

export default {
  openRegisterRestaurantModal: registerRestaurantModal.open,
  closeRegisterRestaurantModal: registerRestaurantModal.close,

  restaurantList,
};