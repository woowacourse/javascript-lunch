import RestaurantListStorageService from '../../services/restaurantListStorageService';
import generateRestaurantListItemComponent from './renderHandlers';
import isHTMLElement from '../../utils/isHTMLElement';

const updateRestaurantListItemUI = (restaurantId: number, newHtml: HTMLElement) => {
  const existingElement = document.querySelector(`li[data-id="${restaurantId}"]`);
  if (isHTMLElement(existingElement) && isHTMLElement(existingElement.parentNode)) {
    existingElement.parentNode.replaceChild(newHtml, existingElement);
  }
};

export const changeFavoriteState = (restaurantId: number) => {
  RestaurantListStorageService.patchData(restaurantId);
  const allRestaurants = RestaurantListStorageService.getData();
  const targetRestaurant = allRestaurants?.find((restaurant) => restaurant.id === restaurantId);
  if (targetRestaurant) {
    const listComponent = generateRestaurantListItemComponent(targetRestaurant);
    updateRestaurantListItemUI(restaurantId, listComponent);
  }
};

const getRestaurantIdFromListItem = (element: Element) => {
  const listItem = element.closest('li');
  if (isHTMLElement(listItem)) {
    const restaurantId = Number(listItem.dataset.id);
    return !Number.isNaN(restaurantId) ? restaurantId : undefined;
  }
  return undefined;
};

const favoriteIconEventPhaseHandler = (event: Event) => {
  const target = event.target as Element;
  const favoritedIcon = target.closest('.favorited-icon');
  if (!isHTMLElement(favoritedIcon)) return;
  const restaurantId = getRestaurantIdFromListItem(favoritedIcon);
  if (restaurantId !== undefined) {
    changeFavoriteState(restaurantId);
  }
};

export const bindChangeFavoriteIconStateHandler = () => {
  const listContainer = document.querySelector('.restaurant-list');
  if (isHTMLElement(listContainer)) {
    listContainer.addEventListener('click', favoriteIconEventPhaseHandler);
  }
};
