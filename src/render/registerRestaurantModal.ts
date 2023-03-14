import { CustomRegisterRestaurantModalElement } from '../components';

const registerRestaurantModal = {
  open: () => {
    const $registerRestaurantModal = '<r-register-restaurant-modal></r-register-restaurant-modal>';
    const $main = document.querySelector<HTMLElement>('main');

    if (!$main) return;

    $main.insertAdjacentHTML('beforeend', $registerRestaurantModal);
  },

  close: () => {
    const $registerRestaurantModal = document.querySelector<CustomRegisterRestaurantModalElement>(
      'r-register-restaurant-modal',
    );

    if (!$registerRestaurantModal) return;

    $registerRestaurantModal.remove();
  },
};

export default registerRestaurantModal;
