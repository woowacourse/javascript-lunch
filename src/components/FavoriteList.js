import { restaurantService } from '..';
import RestaurantItem from './RestaurantItem';

export default class FavoriteList {
  constructor($root) {
    this.$root = $root;
    this.tabName = 'restaurant-favorite';
  }

  render() {
    this.$root.insertAdjacentHTML('beforeend', this.template());
    this.$ul = this.$root.querySelector('ul');

    restaurantService.getFavoriteRestaurant().forEach((restaurant) => {
      new RestaurantItem(this.$ul).inject(this.restaurantInfo, restaurant).mount();
    });
  }

  template() {
    return `
      <ul class="restaurant-list favorite-list"></ul>
    `;
  }

  rerender() {
    this.$ul.remove();
    this.render();
  }

  inject(restaurantInfo) {
    this.restaurantInfo = restaurantInfo;

    return this;
  }

  mount() {
    this.render();
  }
}
