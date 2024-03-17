import DOM from '../utils/DOM';
import RestaurantForm from './RestaurantForm';
import { Restaurant } from '../types';
import RestaurantDetail from './RestaurantDetail';

const { $ } = DOM;

class Modal extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
    <div class="restaurant-form-modal">
    <div class="modal-backdrop"></div>
      <div class="modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id="restaurant-form"></form>
    </div>
    </div>
    <div class="detail-info-modal">
      <div class="modal-backdrop"></div>
      <div class="detail-info-container"></div>
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
    $('.modal-backdrop')?.addEventListener('click', () => this.toggleModal());
    $('.modal--close')?.addEventListener('click', () => this.toggleModal());
  }

  toggleModal() {
    $('.restaurant-form-modal')?.classList.toggle('modal--open', false);
  }
}

customElements.define('matzip-modal', Modal);
