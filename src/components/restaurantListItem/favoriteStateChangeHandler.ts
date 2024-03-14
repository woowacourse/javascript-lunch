import RestaurantListStorageService from '../../services/restaurantListStorageService';
import generateRestaurantListItemComponent from './renderHandlers';

const updateRestaurantListItemUI = (restaurantId: number, newHtml: HTMLElement) => {
  const existingElement = document.querySelector(`li[data-id="${restaurantId}"]`);
  if (existingElement && existingElement.parentNode) {
    existingElement.parentNode.replaceChild(newHtml, existingElement);
  }
};

export const changeFavoriteState = (restaurantId: number) => {
  RestaurantListStorageService.patchData(restaurantId);
  const allRestaurants = RestaurantListStorageService.getData();
  const targetRestaurant = allRestaurants?.filter((restaurant) => restaurant.id === restaurantId)!;
  const listComponent = generateRestaurantListItemComponent(targetRestaurant[0]);
  updateRestaurantListItemUI(restaurantId, listComponent);
};

export const favoriteIconEventPhaseHandler = (event: Event) => {
  const target = (event.target as Element).closest('.favorited-icon') as HTMLElement;
  if (target) {
    const listItem = target.closest('li') as HTMLLIElement;
    const restaurantId = Number(listItem.dataset.id);
    changeFavoriteState(restaurantId ?? '');
  }
};

const changeFavoriteIconStateHandler = () => {
  const listContainer = document.querySelector('.restaurant-list') as HTMLLIElement;
  listContainer.addEventListener('click', (event) => favoriteIconEventPhaseHandler(event));
};

const changeFavoriteIconState = () => {
  document.addEventListener('DOMContentLoaded', changeFavoriteIconStateHandler);
};

export default changeFavoriteIconState;
