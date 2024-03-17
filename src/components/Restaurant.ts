import { Restaurant as RestaurantType, CategoryType } from '../types/index';

import {
  CategoryAsian,
  CategoryChinese,
  CategoryEtc,
  CategoryJapanese,
  CategoryKorean,
  CategoryWestern,
  FavoriteIconFilled,
  FavoriteIconLined,
} from '../asset/img/index';

export const CATEGORY_IMAGE: Record<CategoryType, string> = {
  한식: CategoryKorean,
  중식: CategoryChinese,
  일식: CategoryJapanese,
  양식: CategoryWestern,
  아시안: CategoryAsian,
  기타: CategoryEtc,
  전체: '',
};

import DOM from '../utils/DOM';
import RestaurantDetail from './RestaurantDetail';
import Category from '../types/category';
import Matzip from '../matzip';

const { $, $$ } = DOM;

class Restaurant extends HTMLUListElement {
  constructor(restaurant: RestaurantType) {
    super();

    const { category, name, distance, introduction, link, favorite } = restaurant;
    this.classList.add('restaurant-box');
    this.innerHTML = /* html */ `
    <li id="${category}_${name}" class="restaurant">
      <div class="restaurant__category">
        <img src="${CATEGORY_IMAGE[category]}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h2 class="restaurant__name text-subtitle">${name}</h2>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${introduction}</p>
        <div class="restaurant__link" style="display:none">${link}</div>
        <div class="restaurant__favorite_img">
          <img src="${favorite ? FavoriteIconFilled : FavoriteIconLined}">
        </div>
      </div>
    </li>
    `;

    this.setEvent(restaurant);
  }

  setEvent(restaurant: RestaurantType) {
    this.openRestaurantDetail(restaurant);
    this.toggleFavoriteIcon(restaurant);
  }

  openRestaurantDetail(restaurant: RestaurantType) {
    $('.restaurant', this)?.addEventListener('click', (event) => {
      event.preventDefault();
      $('.detail-info-container')?.classList.remove('detail-info-container--close');

      $('.detail-info-container')?.appendChild(new RestaurantDetail(restaurant));
      $('.detail-modal-backdrop')?.classList.remove('detail-info-container--close');
    });
  }

  toggleFavoriteIcon(restaurant: RestaurantType) {
    const favoriteImg = $('.restaurant__favorite_img img', this);
    favoriteImg?.addEventListener('click', (e) => {
      e.stopPropagation();

      favoriteImg.setAttribute('src', restaurant.favorite ? FavoriteIconLined : FavoriteIconFilled);
      restaurant.favorite = !restaurant.favorite;

      if (restaurant.favorite) {
        const matzip = new Matzip([restaurant]);
        $('matzip-favorite-container .restaurant-list-container')?.appendChild(
          new Restaurant(restaurant),
        );
      } else {
        $(`matzip-favorite-container #${restaurant.category}_${restaurant.name}`)?.remove();
      }
    });
  }
}

customElements.define('restaurant-list-container', Restaurant, { extends: 'ul' });

export default Restaurant;
