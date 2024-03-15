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
    this.addEventListener('click', () => {
      this.handleFavorite(restaurant);
      this.handleRender();
    });
  }

  handleRender() {
    const items = document.querySelector('lunch-items') as LunchItems;
    const tab = (document.querySelector('.lunch-tab') as LunchTab).nowSelected;
    const dropdowns = this.querySelectorAll('select');
    if (tab === 'favorite-restaurants') {
      items.renderItems({ database: 'liked' });
    } else {
      items.renderItems({ category: dropdowns[0].value, sortBy: dropdowns[1].value });
    }
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
