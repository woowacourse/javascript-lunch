import {
  openAddRestaurantModal,
  openRestaurantInfoModal,
  closeModal,
  selectSortKey,
  selectCategory,
  deleteRestaurant,
  switchTab,
  readNewRestaurant,
  toggleFavoriteButton,
} from './eventHandlers/index.ts';

import stateStore from './domain/stateStore.ts';
import restaurantService from './service/restaurantService.ts';
import {
  renderAddRestaurantModal,
  renderHeader,
  renderItemsController,
  renderModalContents,
  renderRestaurantInfo,
  renderRestaurantItems,
  renderTabs,
  setRequired,
} from './ui/renderer.ts';
import { renderElement, selectElement, selectElements } from './utils/dom.ts';
import { RESTAURANTS } from './data/initialData.ts';
import createRestaurantInfo from './components/RestaurantInfo.ts';

addEventListener('load', () => {
  renderHeader();
  renderTabs();
  renderItemsController();
  initRestaurantItems();
  updateRestaurantElements();
  renderAddRestaurantModal();
  renderModalContents();
  renderRestaurantInfo();

  const nameInputElement = selectElement('#name') as HTMLInputElement;
  const categorySelectElement = selectElement('#category') as HTMLInputElement;
  const distanceSelectElement = selectElement('#distance') as HTMLInputElement;

  setRequired(nameInputElement);
  setRequired(categorySelectElement);
  setRequired(distanceSelectElement);

  addEventHandlers();
});

function addEventHandlers() {
  openAddRestaurantModal();
  openRestaurantInfoModal(renderRestaurantInfoContents);
  readNewRestaurant(restaurantService.addRestaurant.bind(restaurantService), updateRestaurantElements);
  closeModal();
  switchTab(stateStore.updateState.bind(stateStore), updateRestaurantElements);
  selectSortKey(stateStore.updateState.bind(stateStore), updateRestaurantElements);
  selectCategory(stateStore.updateState.bind(stateStore), updateRestaurantElements);
  toggleFavoriteButton(restaurantService.toggleFavorite.bind(restaurantService), updateFavoriteIcon);
  deleteRestaurant(restaurantService.deleteRestaurant.bind(restaurantService), updateRestaurantElements);
}

export function initRestaurantItems() {
  const restaurants = restaurantService.getRestaurants();
  if (!restaurants) {
    [...RESTAURANTS].forEach((restaurant) => {
      restaurantService.addRestaurant(restaurant);
    });
  }
}

export function updateRestaurantElements() {
  const states = stateStore.getState();
  const restaurants = restaurantService.getRestaurants();
  const filteredRestaurants = restaurantService.getFilteredRestaurants(states, restaurants);

  renderRestaurantItems(filteredRestaurants);
}

export function renderRestaurantInfoContents(id: number) {
  const targetData = restaurantService.getRestaurantById(id);
  const contents = createRestaurantInfo(targetData);

  const targetModal = document.querySelector('.restaurant-info-modal > .modal-container') as HTMLElement;
  const prevInformation = targetModal.querySelector('.restaurant');

  if (prevInformation) {
    targetModal.removeChild(prevInformation);
  }

  renderElement('.restaurant-info-modal > .modal-container', contents, 'afterbegin');
}

export function updateFavoriteIcon(id: number, favorite: boolean) {
  const targetItems = document.querySelectorAll(`[data-id="${id}"]`);

  targetItems.forEach((target) => {
    const imageElement = target.querySelector('.restaurant__favorite > img') as HTMLImageElement;

    imageElement.src = favorite ? 'favorite-icon-filled.png' : 'favorite-icon-lined.png';
  });

  const { isFavoriteTab } = stateStore.getState();

  if (isFavoriteTab) {
    updateRestaurantElements();
  }
}
