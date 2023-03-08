import init from './init';
import restaurantList from './restaurantList';
import registerRestaurantModal from './registerRestaurantModal';
import restaurantDetailModal from './restaurantDetailModal';
import searchRestaurantSection from './searchRestaurantSection';

export default {
  init,

  restaurantList: restaurantList.render,
  toggleRestaurantFavorite: restaurantList.toggleRestaurantFavorite,
  deleteRestaurantInFavoriteList: restaurantList.deleteRestaurantInFavoriteList,

  openRegisterRestaurantModal: registerRestaurantModal.open,
  closeRegisterRestaurantModal: registerRestaurantModal.close,

  openRestaurantDetailModal: restaurantDetailModal.open,
  closeRestaurantDetailModal: restaurantDetailModal.close,

  openSearchRestaurantSection: searchRestaurantSection.open,
  closeSearchRestaurantSection: searchRestaurantSection.close,
};
