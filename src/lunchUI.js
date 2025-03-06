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
                <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
                <p class="restaurant__description text-body">
                  ${description}
                </p>
                <a href="${link}"></a>
              </div>
            </li>`;

  return item;
}

const lunchUI = {
  createHeader,
  createRestaurantItem,
};

export default lunchUI;
