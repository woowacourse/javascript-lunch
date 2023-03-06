import Restaurant from './Restaurant';
import { $ } from '../../utils/dom';

const RestaurantList = {
  render(restaurants) {
    const template = this.getTemplate(restaurants);

    $('.restaurant-list-container').innerHTML = template;
  },

  getTemplate(restaurants) {
    return `
      <ul class="restaurant-list">
        ${restaurants.reduce((html, restaurant) => html + Restaurant.getTemplate(restaurant), '')}
      </ul>`;
  },
};

export default RestaurantList;
