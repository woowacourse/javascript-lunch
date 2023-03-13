import { components } from '../components/components';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import restaurantManager from '../domains/restaurantManager';
import { getListOnLocalStorage } from '../utils/localStorage';
import { resetForm, scrollToTopForm } from './form';
import { handleModalClose } from './modal';

export const handleCancelClick = (event: Event) => {
  const target = event.target;

  if (target instanceof HTMLButtonElement && target.ariaLabel === 'cancel') {
    handleModalClose('#restaurant-add-modal');
    resetForm('#new-restaurant-form');
    scrollToTopForm('.restaurant-add-container');
  }
};

export const handleBackdropClick = (event: Event) => {
  const target = event.target;

  if (
    target instanceof HTMLDivElement &&
    target.className === 'restaurant-add-backdrop'
  ) {
    handleModalClose('#restaurant-add-modal');
    resetForm('#new-restaurant-form');
    scrollToTopForm('.restaurant-add-container');
  }
};

export const handleNewRestaurantFormSubmit = (
  event: Event,
  RestaurantManager: restaurantManager
) => {
  const target = event.target;

  if (
    target instanceof HTMLFormElement &&
    target.ariaLabel === 'register' &&
    RestaurantManager.addNewRestaurant(event)
  ) {
    components.restaurantList.render(
      getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST)
    );

    handleModalClose('#restaurant-add-modal');
    resetForm('#new-restaurant-form');
  }

  scrollToTopForm('.restaurant-add-container');
};
