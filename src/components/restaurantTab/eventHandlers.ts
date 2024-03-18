import RestaurantListStorageService from '../../services/restaurantListStorageService';
import { TabValue } from '../../types';
import { mountFilterBarComponent, unMountFilterBarComponent } from './renderHandlers';

const applySelectedTabStyle = (buttonElement: HTMLButtonElement) => {
  document.querySelectorAll('.tab-button').forEach((button) => {
    button.classList.remove('selected');
  });
  buttonElement.classList.add('selected');
};

const reRenderRestaurantListFromTabValue = (targetValue: TabValue) => {
  const filteredRestaurantListFromTabValueQuery =
    RestaurantListStorageService.getDataFromTabValueQuery(targetValue) ?? [];
  if (targetValue === 'all') mountFilterBarComponent(filteredRestaurantListFromTabValueQuery);
  if (targetValue === 'favorite') unMountFilterBarComponent(filteredRestaurantListFromTabValueQuery);
};

const tabHandler = (buttonElement: HTMLButtonElement) => {
  buttonElement.addEventListener('click', (event) => {
    applySelectedTabStyle(buttonElement);
    const target = event.target as HTMLButtonElement;

    reRenderRestaurantListFromTabValue(target.value as TabValue);
  });
};

export const allRestaurantTabClickHandler = () => {
  const allRestaurantTabButton = document.getElementById('allRestaurantTabButton');
  if (allRestaurantTabButton instanceof HTMLButtonElement) {
    tabHandler(allRestaurantTabButton);
  }
};

export const favoritedRestaurantTabClickHandler = () => {
  const favoriteRestaurantTabButton = document.getElementById('favoriteRestaurantTabButton');
  if (favoriteRestaurantTabButton instanceof HTMLButtonElement) {
    tabHandler(favoriteRestaurantTabButton);
  }
};
