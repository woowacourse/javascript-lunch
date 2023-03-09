import { restaurantManager } from './domain/restaurantManager';

import { $ } from './utils/dom';
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
    $('restaurant-register-modal').addEventListener(
      'registerRestaurant',
      ({ detail: restaurant }) => this.handleRestaurantRegister(restaurant)
    );
    $('restaurant-filter').addEventListener('change', () => this.handleRestaurantFilter());
    $('.gnb__button').addEventListener('click', () => $('restaurant-register-modal').openModal());
  },

  handleRestaurantRegister(restaurant) {
    restaurantManager.add(restaurant);
    this.setRestaurantList();
    this.handleRestaurantFilter();
  },

  setRestaurantList() {
    setLocalStorage('restaurants', restaurantManager.list);
  },

  handleRestaurantFilter() {
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
