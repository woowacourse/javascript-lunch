import { eventHandlers } from './eventHandlers';

import { LOCAL_STORAGE_KEY } from './domain/constants';
import { restaurantManager } from './domain/restaurantManager';

import { $, isChecked } from './utils/dom';
import { setLocalStorage } from './utils/localStorage';

const LunchMenuApp = {
  init() {
    restaurantManager.init();
    this.render(restaurantManager.list);
    this.bindEvents();
    this.bindCustomEvents();
  },

  render(restaurants) {
    $('.restaurant-list-container').replaceChildren();
    $('.restaurant-list-container').insertAdjacentHTML(
      'beforeend',
      `<restaurant-list></restaurant-list>`
    );
    $('restaurant-list').render(restaurants);
  },

  bindEvents() {
    $('.gnb__button').addEventListener('click', () => eventHandlers.handleGnbButtonClick());
    $('restaurant-tab').addEventListener('change', (e) => eventHandlers.handleTabChange(e));
    $('restaurant-filter').addEventListener('change', () => this.renderUpdatedRestaurantList());
  },

  bindCustomEvents() {
    $('custom-modal').addEventListener('registerRestaurant', ({ detail: restaurant }) =>
      eventHandlers.handleRestaurantRegister(restaurant)
    );
    $('custom-modal').addEventListener('removeRestaurant', ({ detail: restaurantId }) =>
      eventHandlers.handleRestaurantRemove(restaurantId)
    );
    $('body').addEventListener('toggleFavorite', ({ detail: restaurantId }) =>
      eventHandlers.handleFavoriteToggle(restaurantId)
    );
  },

  isFavoriteTabChecked() {
    return isChecked($('#favorite-restaurants'));
  },

  moveToAllRestaurantsTab() {
    $('#all-restaurants').checked = true;
    $('restaurant-tab').handleTabChange();
  },

  isDetailModalOpened() {
    return $('.modal').open;
  },

  updateDetailModal(updatedRestaurant) {
    $('restaurant-list').renderRestaurantDetailModal({
      ...updatedRestaurant,
      restaurantName: updatedRestaurant.name,
    });
  },

  updateRestaurantList() {
    this.setRestaurantList();

    if (this.isFavoriteTabChecked()) {
      this.render(restaurantManager.filterByFavorite(restaurantManager.list));
      return;
    }

    this.renderUpdatedRestaurantList();
  },

  setRestaurantList() {
    setLocalStorage(LOCAL_STORAGE_KEY, restaurantManager.list);
  },

  renderUpdatedRestaurantList() {
    const category = $('#category-filter').value;
    const sortingType = $('#sorting-filter').value;
    const filteredRestaurants = restaurantManager.filterByCategory(
      category,
      restaurantManager.list
    );
    const sortByType = {
      register: () => filteredRestaurants,
      name: () => restaurantManager.sortByName(filteredRestaurants),
      distance: () => restaurantManager.sortByDistance(filteredRestaurants),
    };

    this.render(sortByType[sortingType]());
  },
};

export default LunchMenuApp;
