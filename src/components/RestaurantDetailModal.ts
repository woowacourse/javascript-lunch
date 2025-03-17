import { CATEGORY_MAP } from '../lib/constants.ts';
import { html } from '../lib/utils.ts';
import type { RestaurantType } from './../lib/types';
import { Button } from './common/index.ts';
import { Component } from './core/index.ts';

interface RestaurantDetailModalProps extends RestaurantType {}

export default class RestaurantDetailModal extends Component<RestaurantDetailModalProps> {
  override template() {
    const currentRestaurant = this.props;

    return html`<div class="restaurant-detail-modal">
      <div class="restaurant-detail-modal__header">
        <div class="restaurant__category">
          <img
            src="images/category-${CATEGORY_MAP[currentRestaurant.category as keyof typeof CATEGORY_MAP]}.png"
            alt="${currentRestaurant.category ?? ''}"
            class="category-icon"
          />
        </div>
        <img
          src="images/star${currentRestaurant.isLike ? '_filled' : ''}.svg"
          alt="음식점 추가"
          class="restaurant-detail-modal__like"
          data-action="restaurant-like"
          data-id="${currentRestaurant.id ?? ''}"
        />
      </div>
      <div class="restaurant__info">
        <div class="restaurant__info--inner">
          <div>
            <h3 class="restaurant__name text-subtitle">${currentRestaurant.name ?? ''}</h3>
            <span class="restaurant-detail-modal__distance text-body"
              >캠퍼스부터 ${currentRestaurant.distance ?? 5}분 내</span
            >
          </div>
        </div>
        <p class="text-body">${currentRestaurant.description ?? ''}</p>
        <a class="text-body restaurant-detail-modal__url" href="${currentRestaurant.url ?? ''}" target="_blank">
          ${currentRestaurant.url ?? ''}
        </a>
        <div class="buttons"></div>
      </div>
    </div>`;
  }

  onRender() {
    this.appendButtons();
  }

  appendButtons() {
    const deleteButton = new Button({
      type: 'button',
      class: 'button--secondary',
      message: '삭제하기',
      dataAction: 'restaurant-delete',
      dataId: this.props.id,
    });

    const cancelButton = new Button({
      type: 'button',
      class: 'button--primary',
      message: '닫기',
      dataAction: 'modal-cancel',
    });

    this.appendChild(deleteButton.element, '.buttons');
    this.appendChild(cancelButton.element, '.buttons');
  }
}
