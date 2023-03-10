import { $, dispatchCustomEvent } from '../utils/dom';

customElements.define(
  'restaurant-detail-modal',
  class RestaurantDetailModal extends HTMLElement {
    categories = {
      한식: 'korean',
      중식: 'chinese',
      일식: 'japanese',
      아시안: 'asian',
      양식: 'western',
      기타: 'etc',
    };

    constructor() {
      super();

      const category = this.getAttribute('category');
      const restaurantName = this.getAttribute('restaurantName');
      const distance = this.getAttribute('distance');
      const description = this.getAttribute('description');
      const link = this.getAttribute('link');
      const isFavorite = JSON.parse(this.getAttribute('isFavorite'));

      this.innerHTML = /* html */ `
      <div class="icon-container">
        <div class="restaurant__category">
          <img src="./category-${
            this.categories[category]
          }.png" alt="${category}" class="category-icon" />
        </div>
        <button class="favorite">
          <img src="./favorite-icon-${
            isFavorite ? 'filled' : 'lined'
          }.png" alt="favorite" class="favorite-icon" />
        </button>
      </div>
      <h2 class="modal-title text-title detail-title">${restaurantName}</h2>
      <span class="restaurant__distance text-body detail-distance">캠퍼스부터 ${distance}분 내</span>
      <div class="description">
        ${description}
      </div>
      ${link ? `<a href="${link}" target="_blank" class="text-body link">${link}</a>` : ''}
      <div class="button-container detail-button-container">
        <button type="button" class="button button--secondary text-caption cancel-button">
          닫기
        </button>
        <button class="button button--primary text-caption delete-button">삭제하기</button>
      </div>
      `;
    }

    connectedCallback() {
      $('.delete-button').addEventListener('click', () => this.handleDeleteButtonClick());
      $('.cancel-button').addEventListener('click', $('custom-modal').closeModal);
    }

    handleDeleteButtonClick() {
      if (confirm('정말 삭제하시겠어요?')) {
        dispatchCustomEvent($('custom-modal'), {
          eventType: 'removeRestaurant',
          data: this.dataset.id,
        });
        $('custom-modal').closeModal();
      }
    }
  }
);
