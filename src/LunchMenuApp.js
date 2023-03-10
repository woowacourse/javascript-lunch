import { RESTAURANTS_LOCAL_STORAGE_KEY } from './constants';
import { restaurants } from './domain/restaurants';

import { $ } from './utils/dom';
import { setLocalStorage } from './utils/localStorage';

const LunchMenuApp = {
  init() {
    restaurants.init();
    this.setRestaurantList();
    this.render(restaurants.list);
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
    $('restaurant-register-modal').addEventListener(
      'registerRestaurant',
      ({ detail: restaurant }) => this.handleRestaurantRegister(restaurant)
    );
    $('restaurant-filter').addEventListener('change', () => this.handleRestaurantFilter());
    $('.gnb__button').addEventListener('click', () => $('restaurant-register-modal').openModal());
    $('restaurant-tab').addEventListener('changeRestaurantTab', ({ detail: tabType }) =>
      this.handleRestaurantTabChange(tabType)
    );
    $('.restaurant-list-container').addEventListener(
      'changeRestaurantFavorite',
      ({ detail: restaurantID }) => this.handleRestaurantFavoriteChange(restaurantID)
    );
    $('.restaurant-list-container').addEventListener(
      'clickRestaurantDetail',
      ({ detail: restaurantID }) => this.handleRestaurantDetailClick(restaurantID)
    );
    $('.restaurant-list-container').addEventListener(
      'deleteRestaurant',
      ({ detail: restaurantID }) => this.handleRestaurantDelete(restaurantID)
    );
    $('.restaurant-list-container').addEventListener(
      'changeDetailRestaurantFavorite',
      ({ detail: restaurantID }) => this.handleDetailRestaurantFavoriteChange(restaurantID)
    );
  },

  handleRestaurantRegister(restaurant) {
    restaurants.add(restaurant);
    this.setRestaurantList();
    $('#tab-all').checked = true;
    this.handleRestaurantTabChange('all');
  },

  setRestaurantList() {
    setLocalStorage(RESTAURANTS_LOCAL_STORAGE_KEY, restaurants.list);
  },

  handleRestaurantFilter() {
    const category = $('#category-filter').value;
    const sortingType = $('#sorting-filter').value;
    const filteredRestaurants = restaurants.filterByCategory(category, restaurants.list);
    const sortByType = {
      register: () => filteredRestaurants,
      name: () => restaurants.sortByName(filteredRestaurants),
      distance: () => restaurants.sortByDistance(filteredRestaurants),
    };

    this.render(sortByType[sortingType]());
  },

  handleRestaurantTabChange(tabType) {
    const filteredRestaurants = restaurants.filterByFavorite(tabType, restaurants.list);
    if (tabType === 'favorite') {
      $('restaurant-filter').hide();
      this.render(filteredRestaurants);
    } else {
      $('restaurant-filter').show();
      this.handleRestaurantFilter();
    }
  },

  handleRestaurantFavoriteChange(restaurantID) {
    restaurants.changeFavorite(restaurantID);
    this.setRestaurantList();
    if ($('input[name="tab"]:checked').value === 'favorite') {
      this.handleRestaurantTabChange('favorite');
    }
  },

  handleDetailRestaurantFavoriteChange(restaurantID) {
    restaurants.changeFavorite(restaurantID);
    this.setRestaurantList();
    this.handleRestaurantTabChange($('input[name="tab"]:checked').value);
    $('restaurant-detail-modal').render(
      restaurants.list.find((restaurant) => restaurant.restaurantID === restaurantID)
    );
  },

  handleRestaurantDetailClick(restaurantID) {
    $('restaurant-detail-modal').render(
      restaurants.list.find((restaurant) => restaurant.restaurantID === restaurantID)
    );
    $('restaurant-detail-modal').openModal();
  },

  handleRestaurantDelete(restaurantID) {
    restaurants.delete(restaurantID);
    this.setRestaurantList();
    this.handleRestaurantTabChange($('input[name="tab"]:checked').value);
  },
};

export default LunchMenuApp;
