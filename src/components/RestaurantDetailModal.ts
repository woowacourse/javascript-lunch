import Component from '../core/Component.ts';
import Modal from './Modal.ts';
import Button from './Button.ts';
import { CATEGORY_MAP } from '../lib/constants.ts';
import { RestaurantType } from '../Application.ts';

export default class RestaurantDetailModal extends Component<
  {},
  {
    currentRestaurant: RestaurantType | null;
  }
> {
  template() {
    const currentRestaurant = this.props?.currentRestaurant;

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
                src="./public/images/category-${CATEGORY_MAP[currentRestaurant?.category]}.png"
                alt="${currentRestaurant?.category}"
                class="category-icon"
              />
            </div>
            ${
              currentRestaurant?.isLike
                ? `<img src="./public/images/star_filled.svg" alt="음식점 추가" id="like__button" data-name="${currentRestaurant?.name}" />`
                : `<img src="./public/images/star.svg" alt="음식점 추가" id="like__button" data-name="${currentRestaurant?.name}" />`
            }
          </div>
          <div class="restaurant__info">
            <div class="restaurant__info--inner">
              <div>
                <h3 class="restaurant__name text-subtitle">${currentRestaurant?.name}</h3>
                <span class="restaurant-detail-modal__distance text-body">캠퍼스부터 ${
                  currentRestaurant?.distance
                }분 내</span>
              </div>
            </div>
            <p class="text-body">
              ${currentRestaurant?.description}
            </p>
            <a class="text-body restaurant-detail-modal__url" href="${currentRestaurant?.url}" target="_blank">
              ${currentRestaurant?.url}
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
