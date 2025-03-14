import {
  ADD_RESTAURANT_MODAL,
  CATEGORY,
  DISTANCE,
  NAME,
  LINK,
  DESCRIPTION,
  CANCEL_BUTTON,
  ADD_BUTTON,
  TOTAL_ITEMS_TAB,
  FREQUENT_ITEMS_TAB,
  CATEGORY_FILTER,
  SORT_SELECTOR,
  RESTAURANT_INFO_MODAL,
  CLOSE_INFO_BUTTON,
  DELETE_INFO_BUTTON,
} from './constants/elements.ts';
import { RESTAURANTS } from './database/restaurantData.js';
import eventHandlers from './eventHandlers/eventHandlers.js';
import stateStore from './domain/stateStore.ts';
import {
  createButton,
  createHeader,
  createInput,
  createModal,
  createRestaurantItem,
  createSelect,
  createTextarea,
} from './components/index.js';
import storeService from './database/storeService.ts';
import sortRestaurants from './domain/sortRestaurants.ts';
import createRestaurantInfo from './components/RestaurantInfo.js';

addEventListener('load', () => {
  appendHeader();
  appendTabs();
  appendItemsController();
  initRestaurantItems();
  updateRestaurantElements();
  appendAddRestaurantModal();
  appendModalContents();
  appendRestaurantInfo();

  const nameInputElement = document.querySelector('#name');
  const categorySelectElement = document.querySelector('#category');
  const distanceSelectElement = document.querySelector('#distance');

  setRequired(nameInputElement);
  setRequired(categorySelectElement);
  setRequired(distanceSelectElement);

  addEventHandlers();
});

function appendHeader() {
  const app = document.querySelector('#app');
  const header = createHeader({ title: '점심 뭐 먹지' });
  app.prepend(header);
}

function appendTabs() {
  const main = document.querySelector('main');
  const div = document.createElement('div');
  div.classList.add('tab-container');
  main.prepend(div);

  const totalItemsTab = createButton(TOTAL_ITEMS_TAB);
  const frequentItemsTab = createButton(FREQUENT_ITEMS_TAB);
  const tabContainer = document.querySelector('.tab-container');
  tabContainer.insertAdjacentHTML('beforeend', totalItemsTab);
  tabContainer.insertAdjacentHTML('beforeend', frequentItemsTab);
}

function appendItemsController() {
  const previousSibling = document.querySelector('.tab-container');
  const div = document.createElement('div');
  div.classList.add('items-controller');
  previousSibling.insertAdjacentElement('afterend', div);

  const itemsController = document.querySelector('.items-controller');
  const categoryFilter = createSelect(CATEGORY_FILTER);
  const sortSelector = createSelect(SORT_SELECTOR);
  itemsController.insertAdjacentHTML('beforeend', categoryFilter);
  itemsController.insertAdjacentHTML('beforeend', sortSelector);
}

// function addNewRestaurantItem() {
//   const ul = document.querySelector('.restaurant-list');
//   const newRestaurantData = stateStore.getState();
//   const newItem = createRestaurantItem(newRestaurantData);
//   ul.insertAdjacentHTML('beforeend', newItem);
// }

function addEventHandlers() {
  eventHandlers.openAddRestaurantModal();
  eventHandlers.openRestaurantInfoModal(appendRestaurantInfoContents);
  eventHandlers.readNewRestaurant();
  eventHandlers.closeModal();
  eventHandlers.switchTab();
  eventHandlers.sortRestaurantItems(appendRestaurantItems);
  eventHandlers.detectStorageEvent(updateRestaurantElements);
  eventHandlers.filteringRestaurantItems(appendRestaurantItems);
  eventHandlers.toggleFavoriteRestaurant(updateRestaurantElements);
}

function setRequired(element) {
  element.required = true;
}

function appendAddRestaurantModal() {
  const main = document.querySelector('main');
  const modal = createModal(ADD_RESTAURANT_MODAL);

  main.insertAdjacentHTML('beforeend', modal);

  const h2 = document.createElement('h2');
  const form = document.createElement('form');
  h2.className = 'modal-title text-title';
  h2.textContent = '새로운 음식점';
  form.id = 'new-restaurant-form';

  const targetModal = document.querySelector('.add-restaurant-modal > .modal-container');
  targetModal.appendChild(h2);
  targetModal.appendChild(form);
}

function appendModalContents() {
  const form = document.querySelector('#new-restaurant-form');
  const categorySelect = createSelect(CATEGORY);
  const nameInput = createInput(NAME);
  const distanceSelect = createSelect(DISTANCE);
  const descriptionTextarea = createTextarea(DESCRIPTION);
  const linkInput = createInput(LINK);

  form.insertAdjacentHTML('beforeend', categorySelect);
  form.insertAdjacentHTML('beforeend', nameInput);
  form.insertAdjacentHTML('beforeend', distanceSelect);
  form.insertAdjacentHTML('beforeend', descriptionTextarea);
  form.insertAdjacentHTML('beforeend', linkInput);

  appendModalButton(form);
}

function appendModalButton(parent) {
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button-container');
  parent.appendChild(buttonDiv);

  const addButton = createButton(ADD_BUTTON);
  const cancelButton = createButton(CANCEL_BUTTON);

  const buttonContainer = document.querySelector('.button-container');
  buttonContainer.insertAdjacentHTML('beforeend', cancelButton);
  buttonContainer.insertAdjacentHTML('beforeend', addButton);
}

function initRestaurantItems() {
  RESTAURANTS.forEach((restaurant) => {
    storeService.updateRestaurantById(restaurant.id, restaurant);
  });
}

function updateRestaurantElements() {
  const data = storeService.getRestaurants();
  const sortedRestaurants = sortRestaurants(SORT_SELECTOR.default, data);

  appendRestaurantItems(sortedRestaurants);
}

function appendRestaurantItems(restaurants) {
  const ul = document.querySelector('.restaurant-list');
  const items = restaurants.map((restaurant) => createRestaurantItem(restaurant)).join('');

  if (ul.hasChildNodes) {
    ul.replaceChildren();
  }

  ul.insertAdjacentHTML('beforeend', items);
}

function appendRestaurantInfo() {
  const main = document.querySelector('main');
  const modal = createModal(RESTAURANT_INFO_MODAL);

  main.insertAdjacentHTML('beforeend', modal);
}

function appendRestaurantInfoContents(id) {
  const targetData = storeService.findRestaurantById(id);
  const contents = createRestaurantInfo(targetData);

  const targetModal = document.querySelector('.restaurant-info-modal > .modal-container');

  if (targetModal.hasChildNodes) {
    targetModal.replaceChildren();
  }

  targetModal.insertAdjacentHTML('beforeend', contents);

  appendInfoModalButton(targetModal);
}

function appendInfoModalButton(parent) {
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button-container');
  parent.appendChild(buttonDiv);

  const closeInfoButton = createButton(CLOSE_INFO_BUTTON);
  const deleteInfoButton = createButton(DELETE_INFO_BUTTON);

  buttonDiv.insertAdjacentHTML('beforeend', deleteInfoButton);
  buttonDiv.insertAdjacentHTML('beforeend', closeInfoButton);
}
