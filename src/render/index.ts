import init from './init';
import restaurantList from './restaurantList';
import registerRestaurantModal from './registerRestaurantModal';

export default {
  init,

  restaurantList,

  openRegisterRestaurantModal: registerRestaurantModal.open,
  closeRegisterRestaurantModal: registerRestaurantModal.close,
};
