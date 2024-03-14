import './style.css';

import { LIKE, UNLIKE } from '../../imgs';
import { Restaurant } from '../../types';
import FavoriteRestaurantsRegistry from '../../domain/FavoriteRestaurantsRegistry';

class LunchFavoriteIcon extends HTMLImageElement {
  constructor(restaurant: Restaurant) {
    super();
    this.src = FavoriteRestaurantsRegistry.isLikedRestaurant(restaurant) ? LIKE : UNLIKE;
    this.className = 'favorite-icon';
    this.setAttribute('restaurant', `${restaurant.name}`);
    this.setEventListener(restaurant);
  }

  setEventListener(restaurant: Restaurant) {
    this.addEventListener('click', () => {
      this.handleFavorite(restaurant);
    });
  }

  handleFavorite(restaurant: Restaurant) {
    if (!FavoriteRestaurantsRegistry.isLikedRestaurant(restaurant)) {
      FavoriteRestaurantsRegistry.likeOneRestaurant(restaurant);
    } else {
      FavoriteRestaurantsRegistry.unlikeOneRestaurant(restaurant);
    }
    this.src = FavoriteRestaurantsRegistry.isLikedRestaurant(restaurant) ? LIKE : UNLIKE;
  }
}

customElements.define('lunch-favorite-icon', LunchFavoriteIcon, { extends: 'img' });

export default LunchFavoriteIcon;
