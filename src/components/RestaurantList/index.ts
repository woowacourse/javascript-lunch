import Restaurant from './Restaurant';

import { IRestaurant } from '../../types';

const RestaurantList = {
  render(targetElement: Element, restaurants: IRestaurant[]) {
    const template = this.getTemplate(restaurants);

    targetElement.innerHTML = template;
  },

  getTemplate(restaurants: IRestaurant[]) {
    return `
      <ul class="restaurant-list">
        ${restaurants.reduce((html, restaurant) => html + Restaurant.getTemplate(restaurant), '')}
      </ul>`;
  },
};

export default RestaurantList;
