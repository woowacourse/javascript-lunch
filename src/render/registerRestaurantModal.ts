import { CustomRegisterRestaurantModalElement } from '../components';
import errorHandler from '../utils/errorHandler';

const registerRestaurantModal = {
  open: () => {
    const $registerRestaurantModal = '<r-register-restaurant-modal></r-register-restaurant-modal>';
    const $main = document.querySelector<HTMLElement>('main');

    if (!$main) return errorHandler.doesNotExistElement();

    $main.insertAdjacentHTML('beforeend', $registerRestaurantModal);
  },

  close: () => {
    const $registerRestaurantModal = document.querySelector<CustomRegisterRestaurantModalElement>(
      'r-register-restaurant-modal',
    );

    if (!$registerRestaurantModal) return errorHandler.doesNotExistElement();

    $registerRestaurantModal.remove();
  },
};

export default registerRestaurantModal;
