import { Restaurant } from '../domain/Restaurant';
import RestaurantItemTemplate from './RestaurantItem';

interface IRestaurantList {
  restaurantList: Restaurant[];
}

export default class RestaurantList {
  $restaurantListSection = document.createElement('section');

  state!: IRestaurantList;

  constructor($root: HTMLElement, restaurants: Restaurant[]) {
    this.$restaurantListSection.className = 'restaurant-list-cotainer';

    this.setState({ restaurantList: restaurants });

    $root.appendChild(this.$restaurantListSection);
  }

  render = () => {
    this.$restaurantListSection.innerHTML = `
    <ul class="restaurant-list">
      ${this.state.restaurantList.reduce(
        (html, restaurant) =>
          html + RestaurantItemTemplate(restaurant.getRestaurantInfo()),
        ''
      )}
    </ul>
    `;
  };

  setState = (state: IRestaurantList) => {
    this.state = { ...this.state, ...state };
    this.render();
  };
}
