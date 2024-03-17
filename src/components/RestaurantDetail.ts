import { Restaurant } from '../types/index';
import { FavoriteIconFilled, FavoriteIconLined } from '../asset/img/index';
import { CATEGORY_IMAGE } from './Restaurant';
import DOM from '../utils/DOM';

const { $, $$ } = DOM;

class RestaurantDetail extends HTMLElement {
  constructor(restaurant: Restaurant) {
    super();

    const { category, name, distance, introduction, link, favorite } = restaurant;
    this.innerHTML = /* html */ `
    <div class="detail-info-column">
      <div class="restaurant__category">
        <img src="${CATEGORY_IMAGE[category]}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__favorite_img">
        <img src="${favorite ? FavoriteIconFilled : FavoriteIconLined}">
      </div>
    </div>
    <div class="detail-info-column">
        <h2 class="restaurant__name text-title">${name}</h2>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body restaurant__detail__description">${introduction}</p>
        <span class="detailed-info-link">${link}</span>
    </div>
    <div class="button-container">
        <button type="button" class="button button--secondary text-caption delete-btn">삭제하기</button>
        <button type="button" class="button button--primary text-caption close-btn">닫기</button>
    </div>
    `;

    this.setEvent();
  }

  setEvent() {
    this.openRestaurantDetail();
    this.clickDeleteButton();
    this.clickCloseButton();
  }

  openRestaurantDetail() {}

  clickDeleteButton() {}

  clickCloseButton() {
    $('.close-btn', this)?.addEventListener('click', (event) => {
      $('detail-info-container')?.remove();
      $('.detail-modal-backdrop')?.classList.add('detail-info-container--close');
    });
  }
}

customElements.define('detail-info-container', RestaurantDetail);

export default RestaurantDetail;
