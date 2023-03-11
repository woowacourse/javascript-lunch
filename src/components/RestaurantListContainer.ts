import { Restaurant, RestaurantFilter } from '../types/index';
import { $ } from '../utils/domSelectors';
import { changeRestaurantFavoriteIcon } from './utils';
import { createRestaurantItem } from '../template/RestaurantItemTemplate';
import RestaurantService from '../domains/RestaurantService';
import { filterAndSort } from '../domains/utils';

class RestaurantListContainer {
  private restaurantListElement: HTMLUListElement = $<HTMLUListElement>('.restaurant-list');
  private restaurantService: RestaurantService;

  constructor(restaurantService: RestaurantService) {
    this.restaurantService = restaurantService;
  }

  removeRestaurantItem(restaurantId: number) {
    const restaurantItem = $<HTMLUListElement>(`.restaurant[data-id="${restaurantId}"]`);
    this.restaurantListElement.removeChild(restaurantItem);
  }

  renderRestaurantItems(restaurantList: Restaurant[]) {
    const restaurantItems = restaurantList.map((restaurant: Restaurant) => createRestaurantItem(restaurant));

    this.restaurantListElement.replaceChildren();
    this.restaurantListElement.insertAdjacentHTML('beforeend', restaurantItems.join(''));
  }

  filterAndSortRestaurants(currentTab: string, displayStatus: RestaurantFilter) {
    const restaurantList =
      currentTab === 'all-restaurants'
        ? this.restaurantService.getRestaurantList()
        : this.restaurantService.getFavoriteRestaurantList();

    return filterAndSort(displayStatus, restaurantList);
  }

  updateRestaurantList(currentTab: string, displayStatus: RestaurantFilter) {
    const restaurantList = this.filterAndSortRestaurants(currentTab, displayStatus);
    this.renderRestaurantItems(restaurantList);
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
}

export default RestaurantListContainer;
