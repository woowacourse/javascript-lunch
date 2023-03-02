import RestaurantItem from './RestaurantItem.js';
import RestaurantManager from '../domain/RestaurantManager.ts';
import { $ } from '../utils/domHelpers.js';

class Main {
  #restaurant;
  #restaurantManager;
  $target = $('#category-filter');

  constructor() {
    this.#restaurant = new RestaurantItem();
    this.#restaurantManager = new RestaurantManager();

    // this.addEvent();
  }

  addEvent() {
    this.$target.addEventListener('onChange');
  }

  render() {
    const renderListData = this.#restaurantManager.getRestaurantList();

    return `
    ${renderListData.reduce((acc, element) => {
      acc += this.#restaurant.render(element);
      return acc;
    }, '')}      

        `;
  }
}

export default Main;
