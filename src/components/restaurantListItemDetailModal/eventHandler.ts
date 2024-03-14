import { RestaurantState } from '../../types/index.d';
import { changeFavoriteState } from '../restaurantListItem/favoriteStateChangeHandler';
import RestaurantListStorageService from '../../services/restaurantListStorageService';
import { createIsFavoriteImageComponent } from '../../services/createComponent';
import { initializeModal } from '../modal/modalButton/eventHandlers';
import renderRestaurantList from '../restaurantList/renderHandlers';

const updateFavoriteIconUI = (newHtml: HTMLElement) => {
  const favoritedIcon = document.querySelector('.favorited-icon');
  if (favoritedIcon && favoritedIcon.parentNode) {
    favoritedIcon.parentNode.replaceChild(newHtml, favoritedIcon);
  }
};

const toggleIconImageComponent = (targetRestaurant: RestaurantState) => {
  return createIsFavoriteImageComponent(targetRestaurant.isFavorited);
};

const reRenderFavoriteIconComponent = (targetRestaurantListItem: RestaurantState) => {
  const allRestaurants = RestaurantListStorageService.getData();
  const targetRestaurant = allRestaurants?.filter((restaurant) => restaurant.id === targetRestaurantListItem.id);
  if (targetRestaurant && targetRestaurant.length > 0) {
    const favoritedIconComponent = toggleIconImageComponent(targetRestaurant[0]);
    updateFavoriteIconUI(favoritedIconComponent);
  }
};

const favoriteIconChangeHandler = (event: Event, targetRestaurantListItem: RestaurantState) => {
  const target = event.target as Element;
  if (target.classList.contains('favorited-icon')) {
    changeFavoriteState(targetRestaurantListItem.id);
    reRenderFavoriteIconComponent(targetRestaurantListItem);
  }
};
const deleteButtonClickHandler = (targetRestaurantListItem: RestaurantState) => {
  RestaurantListStorageService.deleteData(targetRestaurantListItem);
  const filteredData = RestaurantListStorageService.getData() ?? [];
  renderRestaurantList(filteredData);
  initializeModal();
};

const closeBottomSheetClickHandler = () => {
  initializeModal();
};

export const ListItemDetailBottomSheetEventHandler = (targetRestaurantListItem: RestaurantState) => {
  const favoritedIconContainer = document.querySelector('.favorited-icon-container') as HTMLElement;

  const deleteButton = document.querySelector('.button--secondary') as HTMLButtonElement;
  const closeButton = document.querySelector('.button--primary') as HTMLButtonElement;

  favoritedIconContainer.addEventListener('click', (event) =>
    favoriteIconChangeHandler(event, targetRestaurantListItem),
  );
  deleteButton.addEventListener('click', () => deleteButtonClickHandler(targetRestaurantListItem));
  closeButton.addEventListener('click', closeBottomSheetClickHandler);
};
