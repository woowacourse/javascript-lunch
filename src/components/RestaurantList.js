import { qs } from '../utils/domHelpers.js';
import RestaurantItem from './RestaurantItem.js';
import Component from '../Component.js';

export default class RestaurantList extends Component {
  constructor($target) {
    super($target);

    this.restaurantManager.subscribe(this.render.bind(this));
  }

  template(restaurantData = null) {
    if (!restaurantData) {
      return `${this.restaurantManager
        .getRestaurantList()
        .map((restaurant) => new RestaurantItem(qs('.restaurant-list'), restaurant).render())
        .join('')}`;
    }
    if (restaurantData) {
      return `${restaurantData
        .map((restaurant) => new RestaurantItem(qs('.restaurant-list'), restaurant).render())
        .join('')}`;
    }
  }
}
