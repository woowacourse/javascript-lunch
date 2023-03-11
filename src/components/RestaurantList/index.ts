import Restaurant from './Restaurant';

import { IRestaurant } from '../../types';

export default class RestaurantList {
  #targetElement: Element;

  constructor(targetElement: Element) {
    this.#targetElement = targetElement;
  }

  render(restaurants: IRestaurant[]) {
    this.#targetElement.innerHTML = this.getTemplate(restaurants);
  }

  getTemplate(restaurants: IRestaurant[]) {
    return `
      <ul class="restaurant-list">
        ${restaurants.reduce((html, restaurant) => html + Restaurant.getTemplate(restaurant), '')}
      </ul>`;
  }
}
