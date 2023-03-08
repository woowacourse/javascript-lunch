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

  template() {
    return `
    <ul class="restaurant-list">
      ${this.state.restaurantList.reduce(
        (html, restaurant) =>
          html + RestaurantItemTemplate(restaurant.getRestaurantInfo()),
        ''
      )}
    </ul>
    `;
  }

  render = ($targetElement: HTMLElement) => {
    this.$restaurantListSection.innerHTML = this.template();
    $targetElement.insertAdjacentElement(
      'beforeend',
      this.$restaurantListSection
    );
  };

  setState = (state: IRestaurantList) => {
    this.state = { ...this.state, ...state };
  };
}
