import { Restaurant } from '../types/index';
import { $ } from '../utils/domSelectors';
import { changeRestaurantFavoriteIcon } from './utils';
import { createRestaurantItem } from '../template/RestaurantItemTemplate';

class RestaurantListContainer {
  private restaurantListElement: HTMLUListElement = $<HTMLUListElement>('.restaurant-list');

  removeRestaurantItem(restaurantId: number) {
    const restaurantItem = $<HTMLUListElement>(`.restaurant[data-id="${restaurantId}"]`);
    this.restaurantListElement.removeChild(restaurantItem);
  }

  addEvent(
    handleFavoriteIconClick: CallableFunction,
    handleRestaurantClick: CallableFunction,
    handleInformation: CallableFunction
  ) {
    this.restaurantListElement.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      const itemElement = target.closest('.restaurant[data-id]') as HTMLElement;

      if (target.classList.contains('restaurant-star-icon') && target instanceof HTMLImageElement) {
        handleFavoriteIconClick(Number(itemElement.dataset.id));
        changeRestaurantFavoriteIcon(target);
      } else {
        handleRestaurantClick();
        handleInformation(Number(itemElement.dataset.id));
      }
    });
  }

  renderRestaurantItems(restaurantList: Restaurant[]) {
    const restaurantItems = restaurantList.map((restaurant: Restaurant) => createRestaurantItem(restaurant));

    this.restaurantListElement.replaceChildren();
    this.restaurantListElement.insertAdjacentHTML('beforeend', restaurantItems.join(''));
  }
}

export default new RestaurantListContainer();
