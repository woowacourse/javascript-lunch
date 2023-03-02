import RestaurantItem from './RestaurantItem.js';
import RestaurantManager from '../domain/RestaurantManager.ts';
import { $ } from '../utils/domHelpers.js';

class Main {
  #restaurant;
  #restaurantManager;
  #renderListData;

  constructor() {
    this.#restaurant = new RestaurantItem();
    this.#restaurantManager = new RestaurantManager();
    this.#renderListData = this.#restaurantManager.getRestaurantList();

    this.addEvent();
  }

  addEvent() {
    $('#category-filter').addEventListener('change', (e) => {
      if (e.target.value === '전체') {
        const renderData = this.#restaurantManager.getRestaurantList();
        return ($('.restaurant-list-container').innerHTML = this.reRender(e, renderData));
      }
      const reRenderData = this.#restaurantManager.filterRestaurantList(e.target.value);
      $('.restaurant-list-container').innerHTML = this.reRender(e, reRenderData);
    });

    $('#sorting-filter').addEventListener('change', (e) => {
      const reRenderData = this.#restaurantManager.sortRestaurantList(e.target.value);
      $('.restaurant-list-container').innerHTML = this.reRender(e, reRenderData);
    });
  }

  render() {
    return `
    ${this.#renderListData.reduce((acc, element) => {
      acc += this.#restaurant.render(element);
      return acc;
    }, '')}
    `;
  }

  reRender(e, data) {
    return `
    ${data.reduce((acc, element) => {
      acc += this.#restaurant.render(element);
      return acc;
    }, '')}
    `;
  }
}

export default Main;
