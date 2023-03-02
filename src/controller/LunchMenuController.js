import { restaurants } from '../domain/restaurants';

import LunchMenuView from '../view/LunchMenuView';

import { $ } from '../utils/dom';

const LunchMenuController = {
  init() {
    LunchMenuView.render(restaurants.list);
    LunchMenuView.bindEvents();
    this.bindEvents();
  },

  bindEvents() {
    $('restaurant-register-modal').addEventListener('registerRestaurant', (e) =>
      this.handleRestaurantRegister(e.detail)
    );
    $('#category-filter').addEventListener('change', (e) =>
      this.handleRestaurantFilter(e.target.value)
    );
    $('#sorting-filter').addEventListener('change', (e) =>
      this.handleRestaurantSort(e.target.value)
    );
  },

  handleRestaurantRegister(data) {
    restaurants.add(data);
    LunchMenuView.render(restaurants.list);
    LunchMenuView.closeModal();
  },

  handleRestaurantFilter(category) {
    const filteredRestaurants = restaurants.filterByCategory(category);
    LunchMenuView.render(filteredRestaurants);
  },

  handleRestaurantSort(sortingType) {
    LunchMenuView.render(
      sortingType === 'name' ? restaurants.sortByName() : restaurants.sortByDistance()
    );
  },
};

export default LunchMenuController;
