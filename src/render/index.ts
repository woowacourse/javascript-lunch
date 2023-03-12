import init from './init';
import restaurantList from './restaurantList';
import registerRestaurantModal from './registerRestaurantModal';
import restaurantDetailModal from './restaurantDetailModal';
import searchRestaurantSection from './searchRestaurantSection';
import message from './message';

export default {
  init,

  restaurantList: restaurantList.render,
  toggleRestaurantFavorite: restaurantList.toggleRestaurantFavorite,

  openRegisterRestaurantModal: registerRestaurantModal.open,
  closeRegisterRestaurantModal: registerRestaurantModal.close,

  openRestaurantDetailModal: restaurantDetailModal.open,
  closeRestaurantDetailModal: restaurantDetailModal.close,

  openSearchRestaurantSection: searchRestaurantSection.open,
  closeSearchRestaurantSection: searchRestaurantSection.close,

  message: message.render,
};
