import { components } from '../components/components';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { getListOnLocalStorage } from '../utils/localStorage';
import { resetForm, scrollToTopForm } from './form';
import { handleModalClose } from './modal';

export const handleNewRestaurantCancel = () => {
  handleModalClose('#restaurant-add-modal');
  scrollToTopForm('.restaurant-add-container');
};

export const handleNewRestaurantAdd = () => {
  handleNewRestaurantCancel();
  resetForm('#new-restaurant-form');
  components.restaurantList.render(getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST));
};
