import './style.css';

class LunchModal extends HTMLDivElement {
  constructor() {
    super();

    this.className = 'modal';
    this.createBackdrop();
    this.setEventListener();
  }

  createBackdrop() {
    const backDrop = document.createElement('div');
    backDrop.className = 'modal-backdrop';
    const container = document.createElement('div');
    container.className = 'modal-container';
    this.insertAdjacentElement('beforeend', backDrop);
    this.insertAdjacentElement('beforeend', container);
  }

  setEventListener() {
    const backdrop = this.querySelector('.modal-backdrop');
    backdrop?.addEventListener('click', () => {
      this.handleModalOpen();
    });
  }

  handleModalOpen() {
    this.classList.toggle('modal--open');
  }
}

customElements.define('lunch-modal', LunchModal, { extends: 'div' });

export default LunchModal;
