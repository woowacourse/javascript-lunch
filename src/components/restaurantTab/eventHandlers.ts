import { TabValue } from '../../types';
import RestaurantListStorageService from '../../services/restaurantListStorageService';

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
const applySelectedTabStyle = (buttonElement: HTMLButtonElement) => {
  document.querySelectorAll('.tab-button').forEach((button) => {
    button.classList.remove('selected');
  });
  buttonElement.classList.add('selected');
};

const reRenderRestaurantListFromTabValue = (tabValue: TabValue) => {
  console.log(tabValue);
  // const filteredRestaurantList =
};

const tabHandler = (buttonElement: HTMLButtonElement) => {
  buttonElement.addEventListener('click', (event) => {
    applySelectedTabStyle(buttonElement);
    const target = event.target as HTMLButtonElement;

    reRenderRestaurantListFromTabValue(target.value as TabValue);
  });
};
