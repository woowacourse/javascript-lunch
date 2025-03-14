import { IMAGE } from '../constants/elements.js';

function createRestaurantItem({ id, category, name, distance, description, favorite }) {
  const item = `<li class="restaurant" data-id="${id}">
              <div class="restaurant__category">
                <img src="${IMAGE.get(category)}" alt="${category}" class="category-icon" />
              </div>
              <div class="restaurant__info">
                <div class="restaurant__header">
                  <div class="restaurant__details">
                    <h3 class="restaurant__name text-subtitle">${name}</h3>
                    <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
                  </div>
                  <button type="button" class="button restaurant__favorite">
                    <img src="${
                      favorite ? 'favorite-icon-filled.png' : 'favorite-icon-lined.png'
                    }" alt="favorite-icon" />
                  </button>
                </div>
                <p class="restaurant__description text-body">${description}</p>
              </div>
            </li>
          `;

  return item;
}

export default createRestaurantItem;
