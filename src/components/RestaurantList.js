import { RESTAURANT_IMAGE, FAVORITE } from '../constants/images.ts';
import RestaurantItem from './RestaurantItem.js';
import Component from '../Component.js';

export default class RestaurantList extends Component {
  constructor($target) {
    super($target);

    this.restaurantManager.subscribe(this.render.bind(this));
  }

  template(restaurantData) {
    if (restaurantData === '') {
      return `${this.restaurantManager
        .getRestaurantList()
        .map((restaurant) => new RestaurantItem(RESTAURANT_IMAGE, FAVORITE).render(restaurant))
        .join('')}`;
    }
    if (restaurantData !== '') {
      return `${restaurantData
        .map((restaurant) => new RestaurantItem(RESTAURANT_IMAGE, FAVORITE).render(restaurant))
        .join('')}`;
    }
  }
}
