import Restaurant from './Restaurant';

import { IRestaurant } from '../../types';

const RestaurantList = {
  render(targetElement: Element, template: string) {
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
