import { $ } from '../../utils/querySelector';
import AllRestaurantTab from './Tab/AllRestaurantTab';
import FavoriteTab from './Tab/FavoritTab';

class RestaurantTabs {
  #root;

  constructor($root: HTMLElement) {
    this.#root = $root;
  }

  #template() {
    return `
      <ul class="tabs"></ul>
    `;
  }

  #mounted() {
    new AllRestaurantTab($('.tabs'))
      .render('tab--all-restaurant tab--open', '모든 음식점')
      .setEvent();

    new FavoriteTab($('.tabs'))
      .render('tab--favorite-restaurant', '자주 가는 음식점')
      .setEvent();
  }

  render() {
    this.#root.insertAdjacentHTML('beforeend', this.#template());

    this.#mounted();
  }
}

export default RestaurantTabs;
