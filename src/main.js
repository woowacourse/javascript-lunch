import {
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
} from './constants.js';
import { RESTAURANTS } from './database/restaurantData.js';
import eventHandlers from './eventHandlers.js';
import stateStore from './stateStore.js';
import {
  createButton,
  createHeader,
  createInput,
  createModal,
  createRestaurantItem,
  createSelect,
  createTextarea,
} from './components/index.js';
import storeService from './database/storeService.js';

addEventListener('load', () => {
  appendHeader();
  appendTabs();
  appendItemsController();
  initRestaurantItems();
  appendRestaurantItems();
  appendModal();
  appendModalContents();

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

function addNewRestaurantItem() {
  const ul = document.querySelector('.restaurant-list');
  const newRestaurantData = stateStore.getState();
  const newItem = createRestaurantItem(newRestaurantData);
  ul.insertAdjacentHTML('beforeend', newItem);
}

function addEventHandlers() {
  eventHandlers.openModal();
  eventHandlers.readNewRestaurant(addNewRestaurantItem);
  eventHandlers.closeModal();
  eventHandlers.switchTab();
  eventHandlers.sortRestaurantItems(storeService.getRestaurants(), appendRestaurantItems);
}

function setRequired(element) {
  element.required = true;
}

function appendModal() {
  const main = document.querySelector('main');
  const modal = createModal();

  main.insertAdjacentHTML('beforeend', modal);
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

function appendModalButton(form) {
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button-container');
  form.appendChild(buttonDiv);

  const addButton = createButton(ADD_BUTTON);
  const cancelButton = createButton(CANCEL_BUTTON);

  const buttonContainer = document.querySelector('.button-container');
  buttonContainer.insertAdjacentHTML('beforeend', cancelButton);
  buttonContainer.insertAdjacentHTML('beforeend', addButton);
}

function initRestaurantItems() {
  RESTAURANTS.forEach((restaurant) => {
    storeService.updateRestaurantByName(restaurant.name, restaurant);
    return createRestaurantItem(restaurant);
  });
}

function appendRestaurantItems() {
  const ul = document.querySelector('.restaurant-list');
  const data = storeService.getRestaurants();
  const items = data.map((restaurant) => createRestaurantItem(restaurant)).join('');

  if (ul.hasChildNodes) {
    ul.replaceChildren();
  }

  ul.insertAdjacentHTML('beforeend', items);
}
