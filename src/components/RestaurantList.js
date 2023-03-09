import { RESTAURANT_IMAGE } from '../constants/images.ts';
import RestaurantItem from './RestaurantItem.js';
import Component from '../Component.js';

export default class RestaurantList extends Component {
  constructor($target) {
    super($target);

    this.restaurantManager.subscribe(this.render.bind(this));
  }

  template() {
    return `
    ${this.restaurantItemTemplate()}
    `;
  }

  restaurantItemTemplate() {
    return this.filterOrSort();
  }

  filterOrSort() {
    if (this.restaurantManager.getIsFiltered()) {
      return `
      ${this.restaurantManager
        .getFilterRestaurantList()
        .map((restaurant) => new RestaurantItem(RESTAURANT_IMAGE).render(restaurant))}
      
      `;
    }

    return `
    ${this.restaurantManager
      .getRestaurantList()
      .map((restaurant) => new RestaurantItem(RESTAURANT_IMAGE).render(restaurant))}
    `;
  }
}
