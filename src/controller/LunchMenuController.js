import { restaurants } from '../domain/restaurants';

import LunchMenuView from '../view/LunchMenuView';

import { $ } from '../utils/dom';
import { setLocalStorage } from '../utils/localStorage';

const LunchMenuController = {
  init() {
    restaurants.init();
    LunchMenuView.render(restaurants.list);
    LunchMenuView.bindEvents();
    this.bindEvents();
  },

  bindEvents() {
    $('restaurant-register-modal').addEventListener('registerRestaurant', (e) =>
      this.handleRestaurantRegister(e.detail)
    );
    $('#category-filter').addEventListener('change', () => this.handleRestaurantFilter());
    $('#sorting-filter').addEventListener('change', () => this.handleRestaurantFilter());
  },

  handleRestaurantRegister(data) {
    restaurants.add(data);
    this.setRestaurantList();
    LunchMenuView.render(restaurants.list);
    LunchMenuView.closeModal();
  },

  setRestaurantList() {
    setLocalStorage('restaurants', restaurants.list);
  },

  handleRestaurantFilter() {
    const sortingType = $('#sorting-filter').value;
    const category = $('#category-filter').value;
    const filteredRestaurants = restaurants.filterByCategory(category, restaurants.list);

    const sortByType = {
      register: () => [...filteredRestaurants].reverse(),
      name: () => restaurants.sortByName(filteredRestaurants),
      distance: () => restaurants.sortByDistance(filteredRestaurants),
    };

    LunchMenuView.render(sortByType[sortingType]());
  },
};

export default LunchMenuController;
