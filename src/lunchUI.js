import { IMAGE } from './constants.js';
import stateStore from './stateStore.js';

function addNewRestaurantItem() {
  const ul = document.querySelector('.restaurant-list');
  const newRestaurantData = stateStore.getState();
  const newItem = createRestaurantItem(newRestaurantData);
  ul.insertAdjacentHTML('beforeend', newItem);
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
  addNewRestaurantItem,
  createRestaurantItem,
};

export default lunchUI;
