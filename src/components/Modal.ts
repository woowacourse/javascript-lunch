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
    $<HTMLFormElement>('#restaurant-form').appendChild(new RestaurantForm());
  }

  closeModal() {
    $<HTMLDivElement>('.modal-backdrop').addEventListener('click', () => {
      $<HTMLDivElement>('.modal').classList.remove('modal--open');
    });
    $<HTMLButtonElement>('.modal--close')?.addEventListener('click', () => {
      $<HTMLDivElement>('.modal').classList.remove('modal--open');
    });
  }
}

customElements.define('matzip-modal', Modal);
