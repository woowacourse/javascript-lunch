import { RESTAURANTS } from './constants.js';
import openModal from './eventHandlers.js';

addEventListener('load', () => {
  const app = document.querySelector('#app');

  const header = createHeader({ title: '점심 뭐 먹지' });
  app.prepend(header);

  const ul = document.querySelector('.restaurant-list');
  const items = RESTAURANTS.map((restaurant) => {
    return createRestaurantItem(restaurant);
  }).join('');

  ul.insertAdjacentHTML('beforeend', items);

  openModal();
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

function createRestaurantItem({ imageSource, imageAlt, name, distance, description, link }) {
  const item = `<li class="restaurant">
              <div class="restaurant__category">
                <img src="${imageSource}" alt="${imageAlt}" class="category-icon" />
              </div>
              <div class="restaurant__info">
                <h3 class="restaurant__name text-subtitle">${name}</h3>
                <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
                <p class="restaurant__description text-body">
                  ${description}
                </p>
                <a href="${link}"></a>
              </div>
            </li>`;

  return item;
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
