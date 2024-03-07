import DOM from '../utils/DOM';
import RestaurantForm from './RestaurantForm';

const { $ } = DOM;

class Modal extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
    <div class="modal">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form id="restaurant-form"></form>
        <!-- 취소/추가 버튼 -->
        <div class="button-container">
          <button type="button" class="button button--secondary text-caption modal--close">취소하기</button>
          <button type="submit" form="restaurant-form" class="button button--primary text-caption">추가하기</button>
        </div>
      </div>
    </div>
    `;
    this.setEvent();
  }

  setEvent() {
    this.appendForm();
    this.closeModal();
  }

  appendForm() {
    $('#restaurant-form')?.appendChild(new RestaurantForm());
  }

  closeModal() {
    $('.modal-backdrop')?.addEventListener('click', () => {
      $('.modal')?.classList.remove('modal--open');
    });
    $('.modal--close')?.addEventListener('click', () => {
      $('.modal')?.classList.remove('modal--open');
    });
  }
}

customElements.define('matzip-modal', Modal);
