import { CATEGORY_IMG_PATH, STAR_IMG_PATH } from '../../../constant';
import { Restaurant } from '../../../type/common';
import { $ } from '../../../utils/querySelector';
import CancelModalButton from '../Button/CancelModalButton';
import RemoveRestaurantModalButton from '../Button/RemoveRestaurantModalButton';
import Modal from './abstract/Modal';

class RestaurantItemModal extends Modal {
  constructor($target: Element) {
    super($target);
  }

  innerTemplate(restaurant: Restaurant) {
    return `
    <li id=${restaurant.id}>
      <div class="restaurant">
        <div class="restaurant__category">
        
          <img src="${
            CATEGORY_IMG_PATH[restaurant.category]
          }" class="category-icon">
          
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${
            restaurant.distance
          }분 내</span>
          <p class="restaurant__description--not-overflow" text-body">${
            restaurant.description
          }</p>
        </div>
      
        <img class="star" src="${
          restaurant.favorite ? STAR_IMG_PATH['fill'] : STAR_IMG_PATH['line']
        }" />
      </div>
      <div class="modal-button-container"></div>
    </li>
    `;
  }

  mounted() {
    new RemoveRestaurantModalButton($('.modal-button-container'))
      .render({
        buttonType: 'button',
        buttonStyle: 'button--secondary',
        buttonText: '삭제하기',
        func: 'remove',
      })
      .setEvent();

    new CancelModalButton($('.modal-button-container'))
      .render({
        buttonType: 'button',
        buttonStyle: 'button--primary',
        buttonText: '닫기',
        func: 'cancel',
      })
      .setEvent();

    return this;
  }

  setEvent() {
    $('.modal-item-wrapper .modal').classList.add('modal--open');
  }
}

export default RestaurantItemModal;
