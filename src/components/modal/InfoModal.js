import { CATEGORY_TO_FILENAME } from '../../constants/constants';
import Modal from './Modal';
import { $ } from '../../utils/common';

class InfoModal extends Modal {
  constructor() {
    super();
    this.container = $('.modal-container');
  }

  template(restaurant) {
    const imageFile = CATEGORY_TO_FILENAME[restaurant.category];

    return `
    <div class="info-modal-icon">
      <div class="restaurant__category">
        <img src="./${imageFile}.png" alt="${restaurant.category}" class="category-icon" />
      </div>
      <div>
        <img class="favorite-icon" src="./${
          restaurant.favorites ? 'favorite-icon-filled' : 'favorite-icon-lined'
        }.png" alt="${restaurant.name}" />
      </div>
    </div>
    <div class="info-modal-content">
      <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
      <div class="restaurant__distance text-body info-modal-distance">캠퍼스부터 ${restaurant.distance}분 내</div>
      <div class="text-body">
        ${restaurant.description}
      </div>
      <div class="link-container">
        <a href="${restaurant.link}">${restaurant.link}</a>
      </div>
    </div>
    <div class="button-container">
      <button type="button" class="button button--secondary text-caption">삭제하기</button>
      <button class="button button--primary text-caption">닫기</button>
    </div>
    `;
  }

  render(restaurant) {
    this.container.replaceChildren();
    this.container.innerHTML = this.template(restaurant);

    this.cancelModal();
    this.toggleModalOpen();
  }

  cancelModal() {
    const cancelButton = $('.button--primary');

    cancelButton.addEventListener('click', this.toggleModalOpen);
  }
}

export default InfoModal;
