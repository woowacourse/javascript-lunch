import { restaurants } from './domain/restaurants';

import { $ } from './utils/dom';
import { setLocalStorage } from './utils/localStorage';

const LunchMenuApp = {
  init() {
    restaurants.init();
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
    $('.restaurant-filter-container').addEventListener('change', () =>
      this.handleRestaurantFilter()
    );
    $('.gnb__button').addEventListener('click', () => $('restaurant-register-modal').openModal());
  },

  handleRestaurantRegister(restaurant) {
    restaurants.add(restaurant);
    this.setRestaurantList();
    this.handleRestaurantFilter();

    $('restaurant-register-modal').closeModal();
  },

  setRestaurantList() {
    setLocalStorage('restaurants', restaurants.list);
  },

  handleRestaurantFilter() {
    const sortingType = $('#sorting-filter').value;
    const category = $('#category-filter').value;
    const filteredRestaurants = restaurants.filterByCategory(category, restaurants.list);
    const sortByType = {
      register: () => filteredRestaurants,
      name: () => restaurants.sortByName(filteredRestaurants),
      distance: () => restaurants.sortByDistance(filteredRestaurants),
    };

    this.render(sortByType[sortingType]());
  },
};

export default LunchMenuApp;
