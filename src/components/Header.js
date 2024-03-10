import { $ } from '../utils/dom';
import ICON from '../icons';
import { openModal } from '../utils/modalHandler';

class Header {
  constructor() {
    this.initEventListeners();
  }

  static getTemplate() {
    return `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" id="gnb__button" class="gnb__button" aria-label="음식점 추가">
        <img src="${ICON.추가버튼}" alt="음식점 추가" />
      </button>
    `;
  }

  initEventListeners() {
    $('header').addEventListener('click', this.openRestaurantCreationModal.bind(this));
  }

  openRestaurantCreationModal(event) {
    if (event.target.closest('#gnb__button')) {
      openModal($('restaurant-creation-modal'));
    }
  }
}

export default Header;
