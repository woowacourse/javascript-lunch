import LunchMenuApp from './LunchMenuApp';

import { restaurantManager } from './domain/restaurantManager';

import { $ } from './utils/dom';

export const eventHandlers = {
  handleGnbButtonClick() {
    $('.modal-container').replaceChildren();
    $('.modal-container').insertAdjacentHTML(
      'beforeend',
      `<restaurant-register-modal></restaurant-register-modal>`
    );
    $('custom-modal').openModal();
  },

  handleTabChange(e) {
    if (e.target.id === 'all-restaurants') {
      LunchMenuApp.renderUpdatedRestaurantList();
      return;
    }

    LunchMenuApp.render(restaurantManager.filterByFavorite(restaurantManager.list));
  },

  handleRestaurantRegister(restaurant) {
    restaurantManager.add(restaurant);

    if (LunchMenuApp.isFavoriteTabChecked()) {
      LunchMenuApp.moveToAllRestaurantsTab();
    }

    LunchMenuApp.updateRestaurantList();
  },

  handleRestaurantRemove(restaurantId) {
    restaurantManager.remove(restaurantId);
    LunchMenuApp.updateRestaurantList();
  },

  handleFavoriteToggle(restaurantId) {
    restaurantManager.toggleFavorite(restaurantId);

    if (LunchMenuApp.isDetailModalOpened()) {
      LunchMenuApp.updateDetailModal(
        restaurantManager.list.find((restaurant) => restaurant.id === restaurantId)
      );
    }

    LunchMenuApp.updateRestaurantList();
  },
};
