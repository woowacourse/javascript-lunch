import type { RestaurantType } from './../lib/types';
import Component from '../core/Component.ts';
import Modal from './common/Modal.ts';
import { Button } from './common/index.ts';
import { CATEGORY_MAP } from '../lib/constants.ts';
import { html } from '../lib/utils.ts';

interface RestaurantDetailModalProps extends RestaurantType {}

export default class RestaurantDetailModal extends Component<null, RestaurantDetailModalProps | null> {
  override template() {
    return html`<section class="restaurant-add-modal"></section>`;
  }

  onRender(): void {
    this.#appendRestaurantDetailModal();
  }

  #appendRestaurantDetailModal() {
    const currentRestaurant = this.props ?? null;

    const deleteButton = new Button({
      type: 'button',
      class: 'button--secondary',
      id: 'delete-restaurant',
      message: '삭제하기',
    });

    const cancelButton = new Button({
      type: 'button',
      class: 'button--primary',
      id: 'modal-cancel',
      message: '닫기',
    });

    this.appendChild(
      new Modal({
        id: 'restaurant-detail-modal',
        children: html`
          <div class="restaurant-detail-modal">
            <div class="restaurant-detail-modal__header">
              <div class="restaurant__category">
                <img
                  src="images/category-${CATEGORY_MAP[currentRestaurant?.category as keyof typeof CATEGORY_MAP]}.png"
                  alt="${currentRestaurant?.category ?? ''}"
                  class="category-icon"
                />
              </div>
              <img
                src="images/star${currentRestaurant?.isLike ? '_filled' : ''}.svg"
                alt="음식점 추가"
                id="like__button"
                data-id="${currentRestaurant?.id ?? ''}"
              />
            </div>
            <div class="restaurant__info">
              <div class="restaurant__info--inner">
                <div>
                  <h3 class="restaurant__name text-subtitle">${currentRestaurant?.name ?? ''}</h3>
                  <span class="restaurant-detail-modal__distance text-body"
                    >캠퍼스부터 ${currentRestaurant?.distance ?? 5}분 내</span
                  >
                </div>
              </div>
              <p class="text-body">${currentRestaurant?.description ?? ''}</p>
              <a class="text-body restaurant-detail-modal__url" href="${currentRestaurant?.url ?? ''}" target="_blank">
                ${currentRestaurant?.url ?? ''}
              </a>
              <div class="button-container">${deleteButton} ${cancelButton}</div>
            </div>
          </div>
        `,
      }).render(),
    );
  }
}
