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
    const fragment = document.createDocumentFragment();
    const parser = new DOMParser();

    restaurantList.forEach((restaurant: Restaurant) => {
      fragment.append(new RestaurantItem(restaurant).render(parser, onClick));
    });

    target.innerHTML = '';
    target.append(fragment);
  }
}

export default new RestaurantListContainer();
