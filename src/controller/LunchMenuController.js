import { restaurants } from '../domain/restaurants';

import LunchMenuView from '../view/LunchMenuView';

import { $ } from '../utils/dom';

const LunchMenuController = {
  init() {
    LunchMenuView.render();
    LunchMenuView.bindEvents();
    this.bindEvents();
  },

  bindEvents() {
    $('restaurant-register-modal').addEventListener('registerRestaurant', (e) =>
      this.handleRestaurantRegister(e.detail)
    );
  },

  handleRestaurantRegister(data) {
    restaurants.add(data);
    LunchMenuView.render();
    LunchMenuView.closeModal();
  },
};

export default LunchMenuController;
