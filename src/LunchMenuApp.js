import { restaurantManager } from './domain/restaurantManager';

import { $, isChecked } from './utils/dom';
import { setLocalStorage } from './utils/localStorage';

const LunchMenuApp = {
  init() {
    restaurantManager.init();
    this.render(restaurantManager.list);
    this.bindEvents();
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
    $('custom-modal').addEventListener('registerRestaurant', ({ detail: restaurant }) =>
      this.handleRestaurantRegister(restaurant)
    );
    $('custom-modal').addEventListener('removeRestaurant', ({ detail: restaurantId }) =>
      this.handleRestaurantRemove(restaurantId)
    );
    $('restaurant-tab').addEventListener('change', (e) => this.handleTabChange(e));
    $('restaurant-filter').addEventListener('change', () => this.renderUpdatedRestaurantList());
  },

  handleGnbButtonClick() {
    $('.modal-container').replaceChildren();
    $('.modal-container').insertAdjacentHTML(
      'beforeend',
      `<restaurant-register-modal></restaurant-register-modal>`
    );
    $('custom-modal').openModal();
  },

  handleRestaurantRegister(restaurant) {
    restaurantManager.add(restaurant);

    if (this.isFavoriteTabChecked()) {
      this.moveToAllRestaurantsTab();
    }

    this.updateRestaurantList();
  },

  moveToAllRestaurantsTab() {
    $('#all-restaurants').checked = true;
    $('restaurant-tab').handleTabChange();
  },

  handleRestaurantRemove(restaurantId) {
    restaurantManager.remove(restaurantId);
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

  isFavoriteTabChecked() {
    return isChecked($('#favorite-restaurants'));
  },

  setRestaurantList() {
    setLocalStorage('restaurants', restaurantManager.list);
  },

  handleTabChange(e) {
    if (e.target.id === 'all-restaurants') {
      this.render(restaurantManager.list);
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
};

export default LunchMenuApp;
