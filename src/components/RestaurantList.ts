import { Restaurant } from '../domain/Restaurant';
import RestaurantItemTemplate from './RestaurantItem';

interface IRestaurantList {
  restaurantList: Restaurant[];
}

export default class RestaurantList {
  $restaurantListSection = document.createElement('section');
  $ul = document.createElement('section');
  state!: IRestaurantList;

  constructor($root: HTMLElement, restaurants: Restaurant[]) {
    this.$restaurantListSection.className = 'restaurant-list-cotainer';
    this.$ul.className = 'restaurant-list';

    this.setState({ restaurantList: restaurants });
    this.render($root);
  }

  template() {
    this.$ul.innerHTML = '';
    for (const restaurant of this.state.restaurantList) {
      this.$ul.insertAdjacentElement(
        'beforeend',
        RestaurantItemTemplate(restaurant)
      );
    }
  }

  render = ($targetElement: HTMLElement) => {
    this.$restaurantListSection.innerHTML = '';
    this.template();
    this.$restaurantListSection.appendChild(this.$ul);

    $targetElement.insertAdjacentElement(
      'beforeend',
      this.$restaurantListSection
    );
  };

  setState = (state: IRestaurantList) => {
    this.state = { ...this.state, ...state };
  };
}
