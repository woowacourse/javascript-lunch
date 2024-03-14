import './style.css';

class LunchModal extends HTMLDivElement {
  constructor() {
    super();

    this.className = 'modal';
    this.createBackdrop();
  }

  createBackdrop() {
    const backDrop = document.createElement('div');
    backDrop.className = 'modal-backdrop';
    const container = document.createElement('div');
    container.className = 'modal-container';
    this.insertAdjacentElement('beforeend', backDrop);
    this.insertAdjacentElement('beforeend', container);
  }
}

customElements.define('lunch-modal', LunchModal, { extends: 'div' });

export default LunchModal;
