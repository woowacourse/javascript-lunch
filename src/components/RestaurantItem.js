import { $ } from '../utils/dom';

import { IMG_FILENAME } from '../constants';

const html = ({ id, category, name, distance, description, liked }) => `
  <li id="${id}" class="restaurant">
    <div class="restaurant__category">
      <img src="./${IMG_FILENAME[`${category}`]}.png" alt="${category}" class="category-icon" />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
      <p class="restaurant__description text-body">${description}</p>
    </div>
    <img src="./favorite-icon-lined.png" alt="favorite-icon-lined" class="favorite-icon unlike-star" />
    <img src="./favorite-icon-filled.png" alt="favorite-icon-filled" class="favorite-icon like-star ${
      liked ? '' : 'hidden'
    }" />
  </li>`;

export default class RestaurantItem {
  restaurant;

  constructor(restaurant) {
    $('.restaurant-list').insertAdjacentHTML('beforeend', html(restaurant));
  }
}
