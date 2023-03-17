import { RESTAURANTS_LOCAL_STORAGE_KEY } from './domain/constants';
import { restaurantManager } from './domain/restaurantManager';

import { $, isChecked, resetSelect, isModalOpened } from './utils/dom';
import { setLocalStorage } from './utils/localStorage';

const LunchMenuApp = {
  init() {
    restaurantManager.init();
    this.render(restaurantManager.list);
    this.bindEvents();
    this.bindCustomEvents();
  },

  render(restaurants) {
    $('.restaurant-list-container').innerHTML = `<restaurant-list></restaurant-list>`;
    $('restaurant-list').render(restaurants);
  },

  bindEvents() {
    $('.gnb__button').addEventListener('click', () => this.openRestaurantRegisterModal());
    $('restaurant-tab').addEventListener('change', (e) => this.renderByCheckedTab(e));
    $('restaurant-filter').addEventListener('change', () => this.renderUpdatedRestaurantList());
  },

  bindCustomEvents() {
    $('.restaurant-list-container').addEventListener(
      'openRestaurantDetailModal',
      ({ detail: restaurantId }) => this.openRestaurantDetailModal(restaurantId)
    );
    $('custom-modal').addEventListener('registerRestaurant', ({ detail: restaurant }) =>
      this.registerRestaurant(restaurant)
    );
    $('custom-modal').addEventListener('removeRestaurant', ({ detail: restaurantId }) =>
      this.removeRestaurant(restaurantId)
    );
    $('body').addEventListener('toggleFavorite', ({ detail: restaurantId }) =>
      this.toggleFavorite(restaurantId)
    );
  },

  openRestaurantRegisterModal() {
    $('.modal-container').innerHTML = `<restaurant-register-modal></restaurant-register-modal>`;
    $('custom-modal').openModal();
  },

  openRestaurantDetailModal(restaurantId) {
    $('.modal-container').innerHTML = `<restaurant-detail-modal></restaurant-detail-modal>`;
    $('restaurant-detail-modal').render(
      restaurantManager.list.find((restaurant) => restaurant.id === restaurantId)
    );
    $('custom-modal').openModal();
  },

  registerRestaurant(restaurant) {
    restaurantManager.add(restaurant);

    this.resetFilter();

    if (this.isFavoriteTabChecked()) {
      this.resetRestaurantsTab();
    }

    this.updateRestaurantList();
  },

  removeRestaurant(restaurantId) {
    restaurantManager.remove(restaurantId);
    this.updateRestaurantList();
  },

  toggleFavorite(restaurantId) {
    restaurantManager.toggleFavorite(restaurantId);

    if (isModalOpened($('.modal'))) {
      this.updateDetailModal(
        restaurantManager.list.find((restaurant) => restaurant.id === restaurantId)
      );
    }

    this.updateRestaurantList();
  },

  renderByCheckedTab(e) {
    if (e.target.id === 'all-restaurants') {
      this.renderUpdatedRestaurantList();
      return;
    }

    this.render(restaurantManager.filterByFavorite(restaurantManager.list));
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

  resetFilter() {
    resetSelect($('#category-filter'));
    resetSelect($('#sorting-filter'));
  },

  resetRestaurantsTab() {
    $('#all-restaurants').checked = true;
    $('restaurant-tab').renderByCheckedTab();
  },

  isFavoriteTabChecked() {
    return isChecked($('#favorite-restaurants'));
  },

  updateDetailModal(updatedRestaurant) {
    $('restaurant-detail-modal').render({
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
    setLocalStorage(RESTAURANTS_LOCAL_STORAGE_KEY, restaurantManager.list);
  },
};

export default LunchMenuApp;
