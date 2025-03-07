import { IMAGE } from './constants.js';
import stateStore from './stateStore.js';

function createHeader({ title }) {
  const header = document.createElement('header');

  header.innerHTML = `<h1 class="gnb__title text-title">${title}</h1>
    <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src="./add-button.png" alt="음식점 추가" />
    </button>`;
  header.classList.add('gnb');

  return header;
}

function createRestaurantItem({ category, name, distance, description, link }) {
  const item = `<li class="restaurant">
              <div class="restaurant__category">
                <img src="${IMAGE.get(category)}" alt="${category}" class="category-icon" />
              </div>
              <div class="restaurant__info">
                <h3 class="restaurant__name text-subtitle">${name}</h3>
                <span class="restaurant__distance text-body">캠퍼스부터 ${distance}</span>
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
        <form id="new-restaurant-form"></form>
      </div>
    </div>`;

  return modal;
}

function createSelect(fieldName) {
  const select = `<div class="form-item form-item--required">
    <label for="${fieldName.name} text-caption">${fieldName.label}</label>
    <select name="${fieldName.name}" id="${fieldName.name}" required>
      <option value="">선택해 주세요</option>
      ${Array.from(fieldName.lists.values()).map((list) => {
        return `<option value="${list}">${list}</option>`;
      })}
    </select>
  </div>`;

  return select;
}

function createInput(fieldName) {
  const input = `<div class="form-item ${fieldName.required}">
    <label for="${fieldName.name} text-caption">${fieldName.label}</label>
    <input type="text" name="${fieldName.name}" id="${fieldName.name}">
    <span class="help-text text-caption">${fieldName.helpText}</span>
  </div>`;

  return input;
}

function createTextarea(fieldName) {
  const textarea = `<div class="form-item">
      <label for="${fieldName.name} text-caption">${fieldName.label}</label>
      <textarea name="${fieldName.name}" id="${fieldName.name}" cols="30" rows="5"></textarea>
      <span class="help-text text-caption">${fieldName.helpText}</span>
    </div>`;

  return textarea;
}

function createButton(fieldName) {
  const button = `<button type="${fieldName.type}" class="button ${fieldName.className} text-caption">${fieldName.content}</button>`;
  return button;
}

const lunchUI = {
  createHeader,
  createRestaurantItem,
  createModal,
  createSelect,
  createInput,
  createTextarea,
  createButton,
};

export default lunchUI;
