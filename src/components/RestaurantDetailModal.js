import Component from '../core/Component.js';
import Modal from './Modal.js';
import Button from './Button.js';
import { CATEGORY_MAP } from '../lib/constants.js';

export default class RestaurantDetailModal extends Component {
  template() {
    const deleteButton = new Button({
      type: 'button',
      class: 'button--secondary',
      id: 'modal-delete',
      message: '삭제하기',
    });

    const cancelButton = new Button({
      type: 'button',
      class: 'button--primary',
      id: 'modal-cancel',
      message: '닫기',
    });

    return `
    ${new Modal({
      id: 'restaurant-detail-modal',
      children: `
        <div class="restaurant-detail-modal">
          <div class="restaurant-detail-modal__header">
            <div class="restaurant__category">
              <img
                src="./public/images/category-${CATEGORY_MAP[this.props?.category]}.png"
                alt="${this.props?.category}"
                class="category-icon"
              />
            </div>
            ${
              this.props?.isLike
                ? `<img src="./public/images/star_filled.svg" alt="음식점 추가" id="like__button" data-name=${this.props?.name} />`
                : `<img src="./public/images/star.svg" alt="음식점 추가" id="like__button" data-name=${this.props?.name} />`
            }
          </div>
          <div class="restaurant__info">
            <div class="restaurant__info--inner">
              <div>
                <h3 class="restaurant__name text-subtitle">${this.props?.name}</h3>
                <span class="restaurant-detail-modal__distance text-body">캠퍼스부터 ${this.props?.distance}분 내</span>
              </div>
            </div>
            <p class="text-body">
              ${this.props?.description}
            </p>
            <a class="text-body restaurant-detail-modal__url" href="${this.props?.url}" target="_blank">
              ${this.props?.url}
            </a>
            <div class="button-container">
              ${deleteButton.template()}
              ${cancelButton.template()}
          </div>
          </div>
        </div>
      `,
    }).template()}
  `;
  }
}
