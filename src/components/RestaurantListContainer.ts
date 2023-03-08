import { Restaurant } from '../types/types';
import RestaurantItem from './RestaurantItem';

class RestaurantListContainer {
  create() {
    return `
      <section class="restaurant-list-container">
        <ul class="restaurant-list"></ul>
      </section>`;
  }

  renderRestaurantItems(target: Element, restaurantList: Restaurant[], onClick: CallableFunction) {
    const restaurantItems = restaurantList.map((restaurant: Restaurant) =>
      new RestaurantItem(restaurant).create()
    );

    target.innerHTML = '';
    target.insertAdjacentHTML('beforeend', restaurantItems.join(''));
  }
}

export default new RestaurantListContainer();
