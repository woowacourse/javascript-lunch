import DOM from '../utils/DOM';
import RestaurantForm from './RestaurantForm';

const { $ } = DOM;

class Modal extends HTMLElement {
  constructor() {
    super();
    this.setEvent();
  }

  setEvent() {
    this.createLayout();
    this.appendForm();
    this.closeModal();
  }

  createLayout() {
    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop';
    modal.appendChild(modalBackdrop);

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    
    const modalTitle = document.createElement('h2');
    modalTitle.className = 'modal-title';
    const modalTitleClassList = ['modal-title', 'text-title'];
    modalTitle.textContent = '새로운 음식점';
    modalTitle.classList.add(...modalTitleClassList);
    
    modalContainer.appendChild(modalTitle);
    modal.appendChild(modalContainer);
    this.appendChild(modal);
  }

  appendForm() {
    $<HTMLDivElement>('.modal-container').appendChild(new RestaurantForm());
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
