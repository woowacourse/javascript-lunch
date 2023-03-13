import Restaurant from './Restaurant';

import { Restaurant as RestaurantType } from '../../types';

export default class RestaurantList {
  #targetElement: Element;

  constructor(targetElement: Element) {
    this.#targetElement = targetElement;
  }

  render(restaurants: RestaurantType[]) {
    this.#targetElement.innerHTML = this.getTemplate(restaurants);
  }

  getTemplate(restaurants: RestaurantType[]) {
    return `
      <ul class="restaurant-list">
        ${restaurants.reduce((html, restaurant) => html + Restaurant.getTemplate(restaurant), '')}
      </ul>`;
  }
}
