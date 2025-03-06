import { RESTAURANTS } from './constants.js';
import eventHandlers from './eventHandlers.js';
import stateStore from './stateStore.js';
import lunchUI from './lunchUI.js';

addEventListener('load', () => {
  const app = document.querySelector('#app');

  const header = lunchUI.createHeader({ title: '점심 뭐 먹지' });
  app.prepend(header);

  const ul = document.querySelector('.restaurant-list');
  const items = RESTAURANTS.map((restaurant) => {
    return lunchUI.createRestaurantItem(restaurant);
  }).join('');

  ul.insertAdjacentHTML('beforeend', items);

  eventHandlers.openModal();
  eventHandlers.readNewRestaurant(addNewRestaurantItem);
  eventHandlers.closeModal();
});

function addNewRestaurantItem() {
  const ul = document.querySelector('.restaurant-list');
  const newRestaurantData = stateStore.getState();
  const newItem = lunchUI.createRestaurantItem(newRestaurantData);
  ul.insertAdjacentHTML('beforeend', newItem);
}
