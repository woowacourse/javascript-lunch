import { IMAGE } from '../constants/elements.js';

function createRestaurantInfo({ id, category, name, distance, description, favorite }) {
  const information = `<div class="restaurant restaurant__body" data-id="${id}">
                <div class="restaurant__category">
                  <img src="${IMAGE.get(category)}" alt="${category}" class="category-icon" />
                </div>
                <button type="button" class="button restaurant__favorite">
                  <img src="${favorite ? 'favorite-icon-filled.png' : 'favorite-icon-lined.png'}" alt="favorite-icon" />
                </button>
              <div class="restaurant__info__details">
                <h3 class="restaurant__name text-subtitle">${name}</h3>
                <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
                <p class="restaurant__description__details text-body">${description}</p>
              </div>
            </div>
            `;

  return information;
}

export default createRestaurantInfo;
