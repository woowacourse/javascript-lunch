import { $ } from '../utils/dom';

const imgFileName = {
  한식: 'category-korean',
  중식: 'category-chinese',
  일식: 'category-japanese',
  아시안: 'category-asian',
  양식: 'category-western',
  기타: 'category-etc',
};

const html = ({ category, name, distance, description }) => `
  <li class="restaurant">
    <div class="restaurant__category">
      <img src="./${imgFileName[`${category}`]}.png" alt="${category}" class="category-icon" />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
      <p class="restaurant__description text-body">${description}</p>
    </div>
  </li>`;

export default class RestaurantItem {
  constructor(restaurant) {
    this.renderItem(restaurant);
  }

  renderItem(restaurant) {
    $('.restaurant-list').insertAdjacentHTML('beforeend', html(restaurant));
  }
}
