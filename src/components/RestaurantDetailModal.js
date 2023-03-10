import { $ } from '../utils/dom';

import { IMG_FILENAME } from '../constants';

const html = ({ category, name, distance, description, link, liked }) => `
<div class="modal-backdrop"></div>
<div class="modal-container">
  <div class="restaurant-top-info">
    <div class="restaurant__category">
      <img src="./${IMG_FILENAME[`${category}`]}.png" alt="${category}" class="category-icon" />
    </div>
    <div class="restaurant-detail-name">${name}</div>

    <img src="./favorite-icon-lined.png" alt="favorite-icon-lined" class="favorite-icon unlike-star" />
    <img src="./favorite-icon-filled.png" alt="favorite-icon-filled" class="favorite-icon like-star ${
      liked ? '' : 'hidden'
    }" />
  </div>

  <div class="restaurant-detail-info">
    <div class="restaurant-detail-distance">캠퍼스로부터 ${distance}분 내</div>
    ${description ? '<div class="restaurant-detail-description">설명 솰랴솰랴</div>' : ''}
    ${link ? `<a href="${link}">${link}</a>` : ''}
  </div>

  <!-- 취소/추가 버튼 -->
  <div class="button-container">
    <button
      type="button"
      class="delete-restaurant-button button button--secondary text-caption"
    >
      삭제하기
    </button>
    <button
      class="restaurant-detail-modal-close-button button button--primary text-caption"
    >
      닫기
    </button>
  </div>
</div>
`;

export default class RestaurantDetailModal {
  constructor(restaurant, onClickDeleteButton, toggleRestaurantDetailModal) {
    const modal = $('.restaurant-detail-modal');
    modal.innerHTML = html(restaurant);
    modal.classList.add('modal--open');

    $('.restaurant-detail-modal-close-button').addEventListener(
      'click',
      toggleRestaurantDetailModal
    );
    $('.delete-restaurant-button').addEventListener(
      'click',
      onClickDeleteButton.bind(this, restaurant.id)
    );
  }
}
