import { Restaurant } from '../types/index';
import { $ } from '../utils/domSelectors';
import { createRestaurantItem } from '../template/RestaurantItemTemplate';
import { changeRestaurantFavoriteIcon } from './utils';

function removeRestaurantItem(target: Element, restaurantId: number) {
  const restaurantItem = $<HTMLUListElement>(`.restaurant[data-id="${restaurantId}"]`);
  target.removeChild(restaurantItem);
}

function addRestaurantClickEvent(
  onFavoriteIconClick: CallableFunction,
  onItemClick: CallableFunction,
  getRestaurantInformation: CallableFunction
) {
  const restaurantList = $<HTMLUListElement>('.restaurant-list');

  restaurantList.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    const itemElement = target.closest('.restaurant[data-id]') as HTMLElement;

    if (target.classList.contains('restaurant-star-icon') && target instanceof HTMLImageElement) {
      onFavoriteIconClick(Number(itemElement.dataset.id));
      changeRestaurantFavoriteIcon(target);
    } else {
      onItemClick();
      getRestaurantInformation(Number(itemElement.dataset.id));
    }
  });
}

function renderRestaurantItems(restaurantList: Restaurant[]) {
  const restaurantItems = restaurantList.map((restaurant: Restaurant) =>
    createRestaurantItem(restaurant)
  );

  const restaurantListElement = $<HTMLUListElement>('.restaurant-list');
  restaurantListElement.replaceChildren();
  restaurantListElement.insertAdjacentHTML('beforeend', restaurantItems.join(''));
}

export { removeRestaurantItem, addRestaurantClickEvent, renderRestaurantItems };
