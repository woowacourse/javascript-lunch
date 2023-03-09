import { $ } from '../utils/dom';

const imgFileName = {
  한식: 'category-korean',
  중식: 'category-chinese',
  일식: 'category-japanese',
  아시안: 'category-asian',
  양식: 'category-western',
  기타: 'category-etc',
};

const html = ({ id, category, name, distance, description, link, liked }) => `
<div class="modal-backdrop"></div>
<div class="modal-container">
  <div class="restaurant-top-info">
  <img src="./${imgFileName[`${category}`]}.png" alt="${category}" class="category-icon" />
    <div class="restaurant-detail-name">${name}</div>
  </div>
  <div class="restaurant-top-info">
    <div class="restaurant-detail-distance">캠퍼스로부터 ${distance}분 내</div>
    ${description ? '<div class="restaurant-detail-description">설명 솰랴솰랴</div>' : ''}
    ${link ? '<a href="https://naver.me/G6DyD9tg">https://naver.me/G6DyD9tg</a>' : ''}
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
  constructor(restaurant) {
    $('.restaurant-detail-modal').innerHTML = html(restaurant);

    $('.restaurant-detail-modal-close-button').addEventListener('click', this.onClickCloseButton);
  }

  onClickCloseButton() {
    $('.restaurant-detail-modal').classList.remove('modal--open');
  }
}
