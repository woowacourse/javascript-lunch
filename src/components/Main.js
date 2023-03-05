import RestaurantItem from './RestaurantItem.js';
import { $ } from '../utils/domHelpers.js';
import { RESTAURANT_IMAGE } from '../constants/images.ts';

class Main {
  #restaurant;
  #restaurantManager;

  constructor(RestaurantManager) {
    this.#restaurant = new RestaurantItem(RESTAURANT_IMAGE);
    this.#restaurantManager = RestaurantManager;

    this.addEvent();
  }

  addEvent() {
    $('#category-filter').addEventListener('change', (e) => {
      if (e.target.value === '전체') {
        const renderData = this.#restaurantManager.getRestaurantList();
        return ($('.restaurant-list-container').innerHTML = this.render(renderData));
      }
      const reRenderData = this.#restaurantManager.filterRestaurantList(e.target.value);
      $('.restaurant-list-container').innerHTML = this.render(reRenderData);
    });

    $('#sorting-filter').addEventListener('change', (e) => {
      const reRenderData = this.#restaurantManager.sortRestaurantList(e.target.value);
      $('.restaurant-list-container').innerHTML = this.render(reRenderData);
    });
  }

  render(data) {
    return `
    ${data.reduce((acc, element) => {
      acc += this.#restaurant.render(element);
      return acc;
    }, '')}
    `;
  }
}

export default Main;
