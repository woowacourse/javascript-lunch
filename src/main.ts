import {
  CATEGORY,
  DISTANCE,
  NAME,
  LINK,
  DESCRIPTION,
  CANCEL_BUTTON,
  ADD_BUTTON,
  multiSelect,
  CATEGORY_FILTER_SELECT,
  SORTING_FILTER_SELECT,
  filterTab,
  ALL_RESTAURANT_TAB,
  FAVORITE_RESTAURANT_TAB,
  DELETE_BUTTON,
  CLOSE_BUTTON,
} from './constants/constants.ts';
import { RESTAURANTS } from './data/restaurantData.ts';
import eventHandlers, { handleStarToggle } from './handlers/eventHandlers.ts';
import stateStore from './store/stateStore.ts';

import {
  createButton,
  createHeader,
  createInput,
  createModal,
  createRestaurantItem,
  createSelect,
  createTextarea,
  createMultiSelect,
  createFilterTab,
  createModalContent,
} from './components/index.js';

addEventListener('load', () => {
  appendHeader();
  initRestaurantItems();
  appendModal();
  appendModalContents();
  appendCategoryFilterSelect(CATEGORY_FILTER_SELECT);
  appendCategoryFilterSelect(SORTING_FILTER_SELECT);
  appendFilterTab(ALL_RESTAURANT_TAB);
  appendFilterTab(FAVORITE_RESTAURANT_TAB);

  const nameInputElement = document.querySelector('#name');
  if (nameInputElement instanceof HTMLInputElement) {
    setRequired(nameInputElement);
  }

  eventHandlers.registerEventHandlers(addNewRestaurantItem, openRestaurantModal);
});

function appendHeader() {
  const app = document.querySelector('#app');
  if (!app) return;
  const header = createHeader({ title: '점심 뭐 먹지' });
  app.prepend(header);
}

function addNewRestaurantItem() {
  const ul = document.querySelector('.restaurant-list');
  if (!ul) return;
  const newRestaurantData = stateStore.getState();
  const newItem = createRestaurantItem(newRestaurantData, false);
  ul.insertAdjacentHTML('beforeend', newItem);
}

function setRequired(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
  element.required = true;
}

function appendModal() {
  const main = document.querySelector('main');
  if (!main) return;

  const newRestaurantModal = createModal('new-restaurant');
  if (newRestaurantModal) main.appendChild(newRestaurantModal);

  const restaurantDetailModal = createModal('restaurant-detail');
  if (restaurantDetailModal) main.appendChild(restaurantDetailModal);
}

function appendModalContents() {
  const form = document.querySelector('#new-restaurant-form');
  if (!(form instanceof HTMLFormElement)) return;
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

function appendModalButton(form: HTMLFormElement) {
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button-container');
  form.appendChild(buttonDiv);

  const addButton = createButton(ADD_BUTTON);
  const cancelButton = createButton(CANCEL_BUTTON);

  const buttonContainer = document.querySelector('.button-container');
  if (!buttonContainer) return;
  buttonContainer.insertAdjacentHTML('beforeend', cancelButton);
  buttonContainer.insertAdjacentHTML('beforeend', addButton);
}

function initRestaurantItems() {
  const ul = document.querySelector('.restaurant-list');
  if (!ul) return;
  const items: string = RESTAURANTS.map((restaurant) => {
    return createRestaurantItem(restaurant);
  }).join('');

  ul.insertAdjacentHTML('beforeend', items);
}

function appendCategoryFilterSelect(fieldName: multiSelect) {
  const filterContainer = document.querySelector('.restaurant-filter-container');
  if (!filterContainer) return;
  const categoryFilterSelect = createMultiSelect(fieldName);
  filterContainer.insertAdjacentHTML('beforeend', categoryFilterSelect);
}

function appendFilterTab(fieldName: filterTab) {
  const tabContainer = document.querySelector('.tab-container');
  if (!tabContainer) return;
  const tab = createFilterTab(fieldName);
  tabContainer.insertAdjacentHTML('beforeend', tab);
}

function openRestaurantModal({
  category,
  name,
  distance,
  description,
  image,
  isFavorite,
  link,
}: {
  category: string;
  name: string;
  distance: string;
  description: string;
  image: string;
  isFavorite: boolean;
  link: string;
}) {
  const modal = document.querySelector('.restaurant-detail-modal');
  const modalContent = modal?.querySelector('#restaurant-detail-content');

  if (!modal || !modalContent) return;

  const restaurantModalContent = createModalContent({ category, name, distance, description, image, isFavorite, link });
  modalContent.innerHTML = restaurantModalContent;

  appendRestaurantDetailModalButton(modalContent);

  const modalStar = modalContent.querySelector('.favorite-star');
  if (modalStar) {
    modalStar.addEventListener('click', handleStarToggle);
  }

  modal.classList.add('modal--open');
}

function appendRestaurantDetailModalButton(modalContent: Element) {
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button-container');

  modalContent.appendChild(buttonDiv);

  const deleteButton = createButton(DELETE_BUTTON);
  const closeButton = createButton(CLOSE_BUTTON);
  buttonDiv.insertAdjacentHTML('beforeend', deleteButton);
  buttonDiv.insertAdjacentHTML('beforeend', closeButton);
}
