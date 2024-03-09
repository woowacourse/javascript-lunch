import { Restaurant as RestaurantType, CategoryType } from '../types/index';
import {
  CategoryAsian,
  CategoryChinese,
  CategoryEtc,
  CategoryJapanese,
  CategoryKorean,
  CategoryWestern,
} from '../asset/img/index';

const CATEGORY_IMAGE: Record<CategoryType, string> = {
  한식: CategoryKorean,
  중식: CategoryChinese,
  일식: CategoryJapanese,
  양식: CategoryWestern,
  아시안: CategoryAsian,
  기타: CategoryEtc,
  전체: '',
};

class Restaurant extends HTMLLIElement {
  constructor(restaurant: RestaurantType) {
    super();
    
    this.className = 'restaurant';
    const { category, name, distance, introduction } = restaurant;
    this.innerHTML = `
    <div class="restaurant__category">
      <img src="${CATEGORY_IMAGE[category]}" alt="${category}" class="category-icon">
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
      <p class="restaurant__description text-body">${introduction}</p>
    </div>
    `;
  }
}

customElements.define('restaurant-list-container', Restaurant, { extends: 'li' });

export default Restaurant;
