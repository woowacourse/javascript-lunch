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

type favoriteType = boolean;

class Restaurant extends HTMLUListElement {
  #isFavorite;

  constructor(restaurant: RestaurantType, isFavorite: favoriteType) {
    super();
    this.#isFavorite = isFavorite;

    const { category, name, distance, introduction, link } = restaurant;
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
          <img src="${isFavorite ? FavoriteIconFilled : FavoriteIconLined}">
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
      console.log('hi');
      $('.detail-info-container')?.classList.remove('detail-info-container--close');

      $('.detail-info-container')?.appendChild(new RestaurantDetail(restaurant));
      $('.detail-modal-backdrop')?.classList.remove('detail-info-container--close');
    });
  }

  toggleFavoriteIcon(restaurant: RestaurantType) {
    const favoriteImg = $('.restaurant__favorite_img img', this);
    favoriteImg?.addEventListener('click', (e) => {
      favoriteImg.setAttribute('src', this.#isFavorite ? FavoriteIconLined : FavoriteIconFilled);
      this.#isFavorite = !this.#isFavorite;

      //const storageDate = storage.getData('favoriteMatzipData');
      //const storageIndex = storageDate.findIndex((data) => data.name === restaurant.name);

      if (this.#isFavorite) {
        const matzip = new Matzip([restaurant]);
        //storage.addData('favoriteMatzipData', restaurant);
        $('matzip-favorite-container .restaurant-list-container')?.appendChild(
          new Restaurant(restaurant, true),
        );
      } else {
        // storage.removeData('favoriteMatzipData');
        // storageDate.forEach((data, index) => {
        //   if (index !== storageIndex) storage.addData('favoriteMatzipData', data);
        // });
        $(`matzip-favorite-container #${restaurant.category}_${restaurant.name}`)?.remove();
      }
    });
  }
}

customElements.define('restaurant-list-container', Restaurant, { extends: 'ul' });

export default Restaurant;
