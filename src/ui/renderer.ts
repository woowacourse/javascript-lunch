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
} from '../constants/elements.ts';

import {
  createButton,
  createHeader,
  createInput,
  createModal,
  createRestaurantItem,
  createSelect,
  createTextarea,
} from '../components/index.ts';
import { renderElement, selectElement, selectElements } from '../utils/dom.ts';
import { Restaurant } from '../../types/domain';

export function renderHeader() {
  const header = createHeader({ title: '점심 뭐 먹지' });
  renderElement('#app', header, 'afterbegin');
}

export function renderTabs() {
  const div = document.createElement('div');
  div.classList.add('tab-container');
  renderElement('main', div, 'afterbegin');

  const totalItemsTab = createButton(TOTAL_ITEMS_TAB);
  const frequentItemsTab = createButton(FREQUENT_ITEMS_TAB);
  renderElement('.tab-container', totalItemsTab);
  renderElement('.tab-container', frequentItemsTab);

  const tabs = selectElements('.tab') as NodeListOf<HTMLElement>;
  ['all', 'favorite'].forEach((value, index) => {
    tabs[index].dataset.tab = value;
  });
}

export function renderItemsController() {
  const div = document.createElement('div');
  div.classList.add('items-controller');
  renderElement('.tab-container', div, 'afterend');

  const categoryFilter = createSelect(CATEGORY_FILTER);
  const sortSelector = createSelect(SORT_SELECTOR);
  renderElement('.items-controller', categoryFilter);
  renderElement('.items-controller', sortSelector);
}

export function renderAddRestaurantModal() {
  const modal = createModal(ADD_RESTAURANT_MODAL);
  renderElement('main', modal);

  const h2 = document.createElement('h2');
  h2.classList.add('modal-title', 'text-title');
  h2.textContent = '새로운 음식점';

  const form = document.createElement('form');
  form.id = 'new-restaurant-form';

  const selector = '.add-restaurant-modal > .modal-container';
  renderElement(selector, h2);
  renderElement(selector, form);
}

export function renderModalContents() {
  const categorySelect = createSelect(CATEGORY);
  const nameInput = createInput(NAME);
  const distanceSelect = createSelect(DISTANCE);
  const descriptionTextarea = createTextarea(DESCRIPTION);
  const linkInput = createInput(LINK);

  const selector = '#new-restaurant-form';
  renderElement(selector, categorySelect);
  renderElement(selector, nameInput);
  renderElement(selector, distanceSelect);
  renderElement(selector, descriptionTextarea);
  renderElement(selector, linkInput);

  renderModalButton(selector);
}

export function renderModalButton(parent: string) {
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button-container');
  renderElement(parent, buttonDiv);

  const addButton = createButton(ADD_BUTTON);
  const cancelButton = createButton(CANCEL_BUTTON);
  renderElement('.button-container', cancelButton);
  renderElement('.button-container', addButton);
}

export function renderRestaurantItems(restaurants: Restaurant[]) {
  const ul = selectElement('.restaurant-list');
  const items = restaurants.map((restaurant) => createRestaurantItem(restaurant)).join('');

  if (ul.hasChildNodes()) {
    ul.replaceChildren();
  }

  renderElement('.restaurant-list', items);
}

export function renderRestaurantInfo() {
  const modal = createModal(RESTAURANT_INFO_MODAL);
  renderElement('main', modal);

  renderInfoModalButton();
}

export function renderInfoModalButton() {
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button-container');

  const closeInfoButton = createButton(CLOSE_INFO_BUTTON);
  const deleteInfoButton = createButton(DELETE_INFO_BUTTON);

  buttonDiv.insertAdjacentHTML('beforeend', deleteInfoButton);
  buttonDiv.insertAdjacentHTML('beforeend', closeInfoButton);

  renderElement('.restaurant-info-modal > .modal-container', buttonDiv);
}

export function setRequired(element: HTMLInputElement) {
  element.required = true;
}
