import Restaurant from '../../../domain/Restaurant';
import Component from '../../Component';
import { define } from '../../decorators';
import style from './index.css';

@define('r-restaurant-list')
class RestaurantList extends Component {
  #restaurants: Restaurant[] = [];

  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  setRestaurants(restaurants: Restaurant[]) {
    this.#restaurants = restaurants;
    this.render();
  }

  getRestaurants() {
    return this.#restaurants;
  }

  override renderTemplate() {
    return `
      <ul>
        ${this.#restaurants
          .map((restaurant) => {
            return `<r-restaurant-list-item
              name="${restaurant.getName()}"
              distance="${restaurant.getDistance()}"
              description="${restaurant.getDescription() ?? ''}"
              category="${restaurant.getCategory() ?? ''}"
            ></r-restaurant-list-item>`;
          })
          .join('')}
      </ul>
    `;
  }
}

export default RestaurantList;
