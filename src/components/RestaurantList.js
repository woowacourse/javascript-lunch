import { RESTAURANT_IMAGE } from '../constants/images.ts';
import RestaurantItem from './RestaurantItem.js';
import Component from '../Component.js';

export default class Main extends Component {
  constructor($target) {
    super($target);
  }

  template() {
    return `
    ${this.restaurantItemTemplate()}
    `;
  }

  restaurantItemTemplate() {
    return `
    ${this.restaurantManager
      .getRestaurantList()
      .map((restaurant) => new RestaurantItem(RESTAURANT_IMAGE).render(restaurant))}
    `;
  }
}
