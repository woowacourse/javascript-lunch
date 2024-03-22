import './style.css';

import { LIKE, UNLIKE } from '../../imgs';
import { Restaurant } from '../../types';
import { RestaurantRegistry } from '../../domain';

class LunchFavoriteIcon extends HTMLImageElement {
  constructor(restaurant: Restaurant) {
    super();
    this.src = RestaurantRegistry.hasOneRestaurant({ restaurant, database: 'liked' })
      ? LIKE
      : UNLIKE;
    this.className = 'favorite-icon';
    this.setAttribute('restaurant', `${restaurant.name}`);
    this.setEventListener(restaurant);
  }

  setEventListener(restaurant: Restaurant) {
    this.addEventListener('click', () => {
      this.handleFavorite(restaurant);
      this.dispatchRerenderEvent();
    });
  }

  dispatchRerenderEvent() {
    const rerenderEvent = new CustomEvent('rerender', { bubbles: true });
    this.dispatchEvent(rerenderEvent);
  }

  handleFavorite(restaurant: Restaurant) {
    if (!RestaurantRegistry.hasOneRestaurant({ restaurant, database: 'liked' })) {
      RestaurantRegistry.registerOneRestaurant({ restaurant, database: 'liked' });
    } else {
      RestaurantRegistry.deleteOneRestaurant({ restaurant, database: 'liked' });
    }
    this.src = RestaurantRegistry.hasOneRestaurant({ restaurant, database: 'liked' })
      ? LIKE
      : UNLIKE;
  }
}

customElements.define('lunch-favorite-icon', LunchFavoriteIcon, { extends: 'img' });

export default LunchFavoriteIcon;
