import { RESTAURANT_ICON_CATEGORY } from '../domain/constants';

import { $, dispatchCustomEvent } from '../utils/dom';

customElements.define(
  'restaurant-detail-modal',
  class RestaurantDetailModal extends HTMLElement {
    constructor() {
      super();
    }

    render(restaurant) {
      const { id, category, name, distance, description, link, isFavorite } = restaurant;

      this.dataset.id = id;
      this.innerHTML = /* html */ `
      <div class="icon-container">
        <div class="restaurant__category">
          <img src="./category-${
            RESTAURANT_ICON_CATEGORY[category]
          }.png" alt="${category}" class="category-icon" />
        </div>
        <button class="favorite">
          <img src="./favorite-icon-${
            isFavorite ? 'filled' : 'lined'
          }.png" alt="favorite" class="favorite-icon" />
        </button>
      </div>
      <h2 class="modal-title text-title detail-title">${name}</h2>
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

      this.bindEvents();
    }

    bindEvents() {
      $('.icon-container').addEventListener('click', (e) => this.handleFavoriteButtonClick(e));
      $('.delete-button').addEventListener('click', () => this.handleDeleteButtonClick());
      $('.cancel-button').addEventListener('click', $('custom-modal').closeModal);
    }

    handleFavoriteButtonClick(e) {
      if (!e.target.closest('.favorite')) return;

      dispatchCustomEvent($('body'), {
        eventType: 'toggleFavorite',
        data: this.dataset.id,
      });
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
