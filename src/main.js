import { RESTAURANTS } from './constants.js';
import eventHandlers from './eventHandlers.js';
import stateStore from './stateStore.js';
import lunchUI from './lunchUI.js';

addEventListener('load', () => {
  const app = document.querySelector('#app');

  const header = createHeader({ title: '점심 뭐 먹지' });
  app.prepend(header);

  const ul = document.querySelector('.restaurant-list');
  const items = RESTAURANTS.map((restaurant) => {
    return lunchUI.createRestaurantItem(restaurant);
  }).join('');

  ul.insertAdjacentHTML('beforeend', items);

  eventHandlers.openModal();
  eventHandlers.closeModal();
  eventHandlers.readNewRestaurant(lunchUI.addNewRestaurantItem);
});

function createHeader({ title }) {
  const header = document.createElement('header');

  header.innerHTML = `<h1 class="gnb__title text-title">${title}</h1>
    <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src="./add-button.png" alt="음식점 추가" />
    </button>`;
  header.classList.add('gnb');

  return header;
}

function createModal() {
  const modal = `<div class="modal">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form></form>
      </div>
    </div>`;

  return modal;
}

function createSelect(name, data) {
  const select = `<div class="form-item form-item--required">
    <label for="${name} text-caption">카테고리</label>
    <select name="${name}" id="${name}" required>
      <option value="">선택해 주세요</option>
      ${CATEGORY.map((category) => {
        `<option value="${category}">${category}</option>`;
      })}
    </select>
  </div>`;

  return select;
}

function createInput(name, data) {
  const select = `<div class="form-item">
    <label for="${name} text-caption">${name}</label>
    <input type="text" name="${name}" id="${name}">
  </div>`;

  return select;
}
