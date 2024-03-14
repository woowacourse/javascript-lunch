import './style.css';

import { LIKE, UNLIKE } from '../../imgs';
import { Restaurant } from '../../types';
import FavoriteRestaurantsRegistry from '../../domain/FavoriteRestaurantsRegistry';
import LunchItems from '../LunchItems/LunchItems';
import LunchTab from '../LunchTab/LunchTab';

class LunchFavoriteIcon extends HTMLImageElement {
  constructor(restaurant: Restaurant) {
    super();
    this.src = FavoriteRestaurantsRegistry.isLikedRestaurant(restaurant) ? LIKE : UNLIKE;
    this.className = 'favorite-icon';
    this.setAttribute('restaurant', `${restaurant.name}`);
    this.setEventListener(restaurant);
  }

  setEventListener(restaurant: Restaurant) {
    const items = document.querySelector('lunch-items') as LunchItems;
    this.addEventListener('click', () => {
      this.handleFavorite(restaurant);
      const tab = (document.querySelector('.lunch-tab') as LunchTab).nowSelected;
      items.renderItems({ database: tab === 'favorite-restaurants' ? 'liked' : 'restaurants' });
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
