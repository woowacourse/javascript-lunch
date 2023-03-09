import { getFavoriteIcon } from '../constants/images';
import { Restaurant } from '../types/types';
import { $ } from '../utils/domSelectors';
import RestaurantItem from './RestaurantItem';

class RestaurantListContainer {
  create() {
    return `
      <section class="restaurant-list-container">
        <ul class="restaurant-list"></ul>
      </section>`;
  }

  renderRestaurantItems(target: Element, restaurantList: Restaurant[]) {
    const restaurantItems = restaurantList.map((restaurant: Restaurant) =>
      new RestaurantItem(restaurant).create()
    );

    target.replaceChildren();
    target.insertAdjacentHTML('beforeend', restaurantItems.join(''));
  }

  changeRestaurantFavoriteIcon(element: HTMLImageElement) {
    if (element.classList.contains('favorite')) {
      element.classList.remove('favorite');
      element.src = getFavoriteIcon(false);
    } else {
      element.classList.add('favorite');
      element.src = getFavoriteIcon(true);
    }
  }

  addEvent(onFavoriteIconClick: CallableFunction) {
    const restaurantList = $('.restaurant-list') as HTMLUListElement;

    restaurantList.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('restaurant-star-icon') && target instanceof HTMLImageElement) {
        onFavoriteIconClick(Number(target.dataset.id));
        this.changeRestaurantFavoriteIcon(target);
      }
    });
  }
}

export default new RestaurantListContainer();
