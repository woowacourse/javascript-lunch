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

    LunchMenuView.render(
      sortingType === 'name'
        ? restaurants.sortByName(filteredRestaurants)
        : restaurants.sortByDistance(filteredRestaurants)
    );
  },
};

export default LunchMenuController;
