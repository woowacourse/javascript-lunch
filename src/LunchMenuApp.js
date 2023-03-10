import { restaurantManager } from './domain/restaurantManager';
import { LOCAL_STORAGE_KEY } from './domain/constants';

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
    $('.restaurant-list-container').innerHTML = `<restaurant-list></restaurant-list>`;
    $('restaurant-list').render(restaurants);
  },

  bindEvents() {
    $('.gnb__button').addEventListener('click', () => this.openRestaurantRegisterModal());
    $('restaurant-tab').addEventListener('change', (e) => this.handleTabChange(e));
    $('restaurant-filter').addEventListener('change', () => this.renderUpdatedRestaurantList());
  },

  bindCustomEvents() {
    $('.restaurant-list-container').addEventListener(
      'openRestaurantDetailModal',
      ({ detail: restaurantId }) => this.openRestaurantDetailModal(restaurantId)
    );
    $('custom-modal').addEventListener('registerRestaurant', ({ detail: restaurant }) =>
      this.handleRestaurantRegister(restaurant)
    );
    $('custom-modal').addEventListener('removeRestaurant', ({ detail: restaurantId }) =>
      this.handleRestaurantRemove(restaurantId)
    );
    $('body').addEventListener('toggleFavorite', ({ detail: restaurantId }) =>
      this.handleFavoriteToggle(restaurantId)
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

  handleTabChange(e) {
    if (e.target.id === 'all-restaurants') {
      this.renderUpdatedRestaurantList();
      return;
    }

    this.render(restaurantManager.filterByFavorite(restaurantManager.list));
  },

  handleRestaurantRegister(restaurant) {
    restaurantManager.add(restaurant);

    this.resetFilter();

    if (this.isFavoriteTabChecked()) {
      this.moveToAllRestaurantsTab();
    }

    this.updateRestaurantList();
  },

  resetFilter() {
    const $categoryFilter = $('#category-filter');
    const $sortingFilter = $('#sorting-filter');
    const initialCategory = $categoryFilter.options[0].value;
    const initialSorting = $sortingFilter.options[0].value;

    $categoryFilter.value = initialCategory;
    $sortingFilter.value = initialSorting;
  },

  isFavoriteTabChecked() {
    return isChecked($('#favorite-restaurants'));
  },

  moveToAllRestaurantsTab() {
    $('#all-restaurants').checked = true;
    $('restaurant-tab').handleTabChange();
  },

  handleRestaurantRemove(restaurantId) {
    restaurantManager.remove(restaurantId);
    this.updateRestaurantList();
  },

  handleFavoriteToggle(restaurantId) {
    restaurantManager.toggleFavorite(restaurantId);

    if (this.isDetailModalOpened()) {
      this.updateDetailModal(
        restaurantManager.list.find((restaurant) => restaurant.id === restaurantId)
      );
    }

    this.updateRestaurantList();
  },

  isDetailModalOpened() {
    return $('.modal').open;
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
