import RestaurantItem from './RestaurantItem.js';
import { qs } from '../utils/domHelpers.js';
import { RESTAURANT_IMAGE } from '../constants/images.ts';

class Main {
  #restaurant;
  #restaurantManager;
  #renderListData;

  constructor(RestaurantManager) {
    this.#restaurant = new RestaurantItem(RESTAURANT_IMAGE);
    this.#restaurantManager = RestaurantManager;
    this.#renderListData = this.#restaurantManager.getRestaurantList();

    this.addEvent();
  }

  addEvent() {
    qs('#category-filter').addEventListener('change', (e) => {
      if (e.target.value === '전체') {
        const renderData = this.#restaurantManager.getRestaurantList();
        return (qs('.restaurant-list-container').innerHTML = this.reRender(renderData));
      }
      const reRenderData = this.#restaurantManager.filterRestaurantList(e.target.value);
      qs('.restaurant-list-container').innerHTML = this.reRender(reRenderData);
    });

    qs('#sorting-filter').addEventListener('change', (e) => {
      const reRenderData = this.#restaurantManager.sortRestaurantList(e.target.value);
      qs('.restaurant-list-container').innerHTML = this.reRender(reRenderData);
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

  reRender(data) {
    return `
    ${data.reduce((acc, element) => {
      acc += this.#restaurant.render(element);
      return acc;
    }, '')}
    `;
  }
}

export default Main;
