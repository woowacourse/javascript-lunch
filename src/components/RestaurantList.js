import { restaurantService } from '..';
import RestaurantItem from './RestaurantItem';

export default class RestaurantList {
  constructor($root) {
    this.$root = $root;
    this.tabName = 'restaurant-list';
  }

  render() {
    this.$root.insertAdjacentHTML('beforeend', this.template());
    this.$ul = this.$root.querySelector('ul');

    restaurantService.getFilteredRestaurant().forEach((restaurant) => {
      new RestaurantItem(this.$ul).inject(this.restaurantInfo, restaurant).mount();
    });
  }

  bindEvents() {
    this.$ul.querySelectorAll('li').forEach((li) => {
      li.addEventListener('click', this.handleFavoriteClick.bind(this));
    });
  }

  handleFavoriteClick(event) {
    if (event.target.className === 'favorite-icon') {
      this.favoriteList.rerender();
    }
  }

  template() {
    return `
      <ul class="restaurant-list"></ul>
    `;
  }

  rerender() {
    this.$ul.remove();
    this.mount();
  }

  inject(favoriteList, restaurantInfo) {
    this.favoriteList = favoriteList;
    this.restaurantInfo = restaurantInfo;

    return this;
  }

  mount() {
    this.render();
    this.bindEvents();
  }
}
