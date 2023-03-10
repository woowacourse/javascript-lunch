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
    $('.restaurant-list-container').replaceChildren();
    $('.restaurant-list-container').insertAdjacentHTML(
      'beforeend',
      `<restaurant-list></restaurant-list>`
    );
    $('restaurant-list').render(restaurants);
  },

  bindEvents() {
    $('.gnb__button').addEventListener('click', () => this.handleGnbButtonClick());
    $('restaurant-tab').addEventListener('change', (e) => this.handleTabChange(e));
    $('restaurant-filter').addEventListener('change', () => this.renderUpdatedRestaurantList());
  },

  bindCustomEvents() {
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
      this.renderUpdatedRestaurantList();
      return;
    }

    this.render(restaurantManager.filterByFavorite(restaurantManager.list));
  },

  handleRestaurantRegister(restaurant) {
    restaurantManager.add(restaurant);

    if (this.isFavoriteTabChecked()) {
      this.moveToAllRestaurantsTab();
    }

    this.updateRestaurantList();
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
    this.updateRestaurantList();
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
