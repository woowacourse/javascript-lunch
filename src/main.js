import { CATEGORY, DISTANCE, NAME, LINK, DESCRIPTION, CANCEL_BUTTON, ADD_BUTTON } from './constants.js';
import { RESTAURANTS } from './restaurantData.js';
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

addEventListener('load', () => {
  appendHeader();
  initRestaurantItems();
  appendModal();
  appendModalContents();

  const nameInputElement = document.querySelector('#name');
  setRequired(nameInputElement);

  addEventHandlers();
});

function appendHeader() {
  const app = document.querySelector('#app');
  const header = createHeader({ title: '점심 뭐 먹지' });
  app.prepend(header);
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
  const ul = document.querySelector('.restaurant-list');
  const items = RESTAURANTS.map((restaurant) => {
    return createRestaurantItem(restaurant);
  }).join('');

  ul.insertAdjacentHTML('beforeend', items);
}
